import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../slice/userSlice";
import type { User } from "../types/user";
import UserCard from "./UserCard";

const EditProfile = ({ user }: { user: User }) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState<string>(user.firstName ?? "");
    const [lastName, setLastName] = useState<string>(user.lastName ?? "");
    const [age, setAge] = useState<string>(String(user.age ?? ""));
    const [gender, setGender] = useState<string>(user.gender ?? "");
    const [bio, setBio] = useState<string>(user.bio ?? "");
    const [skills, setSkills] = useState<string>(
        Array.isArray(user.skills) ? user.skills.join(", ") : "",
    );
    const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl ?? "");

    const handleSave = async () => {
        try {
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

            await axios.patch(
                import.meta.env.VITE_BASE_API_URL + "/profile/edit",
                payload,
                { withCredentials: true },
            );

            const res = await axios.get(
                import.meta.env.VITE_BASE_API_URL + "/profile",
                { withCredentials: true },
            );
            dispatch(addUser(res.data));
        } catch (err) {
            console.error("Failed to save profile", err);
        }
    };

    return (
        <div className="flex gap-30">
            <div>
                <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Edit Profile</legend>

                    <label className="label">First Name</label>
                    <input
                        type="text"
                        className="input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className="label">Last Name</label>
                    <input
                        type="text"
                        className="input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className="label">Age</label>
                    <input
                        type="number"
                        className="input"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label className="label">Gender</label>
                    <input
                        type="text"
                        className="input"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />

                    <label className="label">Bio</label>
                    <input
                        type="text"
                        className="input"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <label className="label">Skills (comma separated)</label>
                    <input
                        type="text"
                        className="input"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <label className="label">Profile Photo</label>
                    <input
                        type="text"
                        className="input"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />

                    <button
                        className="btn btn-primary mt-10"
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
            <div className="my-auto ">
                <UserCard user={user} />
            </div>
        </div>
    );
};

export default EditProfile;
