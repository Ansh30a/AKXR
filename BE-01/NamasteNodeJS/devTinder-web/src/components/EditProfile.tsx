import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";
import type { User } from "../types/user";
import PreviewCard from "./PreviewCard";
import api from "../lib/api";

const EditProfile = ({ user }: { user: User }) => {
    const dispatch = useDispatch();
    const [toastState, setToastState] = useState<"idle" | "saving" | "success">(
        "idle",
    );
    const [toastVisible, setToastVisible] = useState(false);
    const saveTimerRef = useRef<number | null>(null);

    const [firstName, setFirstName] = useState<string>(user.firstName ?? "");
    const [lastName, setLastName] = useState<string>(user.lastName ?? "");
    const [age, setAge] = useState<string>(String(user.age ?? ""));
    const [gender, setGender] = useState<string>(user.gender ?? "");
    const [bio, setBio] = useState<string>(user.bio ?? "");
    const [skills, setSkills] = useState<string>(
        Array.isArray(user.skills) ? user.skills.join(", ") : "",
    );
    const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl ?? "");

    useEffect(() => {
        return () => {
            if (saveTimerRef.current !== null) {
                window.clearTimeout(saveTimerRef.current);
            }
        };
    }, []);

    const wait = (ms: number) =>
        new Promise<void>((resolve) => {
            saveTimerRef.current = window.setTimeout(() => resolve(), ms);
        });

    const hideToast = async () => {
        setToastVisible(false);
        await wait(500);
    };

    const handleSave = async () => {
        try {
            setToastState("saving");
            setToastVisible(true);
            const savingToastStartedAt = Date.now();

            const payload = {
                firstName,
                lastName,
                age: Number(age),
                gender,
                bio,
                skills: skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                photoUrl,
            };

            await api.patch("/profile/edit", payload);

            const remainingSavingTime = Math.max(
                0,
                2000 - (Date.now() - savingToastStartedAt),
            );

            if (remainingSavingTime > 0) {
                await wait(remainingSavingTime);
            }

            await hideToast();

            setToastState("success");
            setToastVisible(true);

            const res = await api.get("/profile");
            dispatch(addUser(res.data));

            await wait(2000);
            await hideToast();
            setToastState("idle");
        } catch (err) {
            setToastVisible(false);
            setToastState("idle");
            console.error("Failed to save profile", err);
        }
    };

    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center px-4">
                <div className="flex w-full max-w-md flex-col gap-3">
                    {toastState === "saving" && (
                        <div
                            className={`alert alert-info shadow-lg transition-all duration-500 ease-out ${
                                toastVisible
                                    ? "translate-y-0 opacity-100"
                                    : "-translate-y-2 opacity-0"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 shrink-0 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <span>Profile save in process.</span>
                        </div>
                    )}
                    {toastState === "success" && (
                        <div
                            className={`alert alert-success shadow-lg transition-all duration-500 ease-out ${
                                toastVisible
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-2 opacity-0"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Profile saved successfully.</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-30">
                <div className="">
                    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 shadow-xl">
                        <legend className="fieldset-legend text-sm font-semibold">
                            Edit Profile
                        </legend>

                        <label className="label">First Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label className="label">Last Name</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <label className="label">Age</label>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />

                        <label className="label">Gender</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />

                        <label className="label">Bio</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />

                        <label className="label">
                            Skills (comma separated)
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                        />

                        <label className="label">Profile Photo</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />

                        <button
                            className="btn btn-primary mt-10 w-full"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </fieldset>
                </div>
                {/* <div className="my-auto">
                <img
                    src={user.photoUrl}
                    alt="profile-photo"
                    className="rounded-full w-50"
                />
            </div> */}
                <div className="my-auto self-start pt-6">
                    <PreviewCard user={user} />
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
