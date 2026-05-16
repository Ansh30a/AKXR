import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [emailId, setEmailId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [photoUrl, setPhotoUrl] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [skills, setSkills] = useState<string>("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const payload = {
                firstName,
                lastName,
                email: emailId,
                password,
                age: Number(age),
                gender,
                photoUrl,
                bio,
                skills: skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };

            await axios.post(
                import.meta.env.VITE_BASE_API_URL! + "/sign-up",
                payload,
                { withCredentials: true },
            );
            return navigate("/login");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message ??
                        err.message ??
                        "Signup failed",
                );
            }
        }
    };

    return (
        <div className="flex justify-center mt-5 mb-5">
            <div className="card w-96 bg-black shadow-sm">
                <div className="card-body">
                    {/* <span className="badge badge-xs badge-warning">
                        Most Popular
                    </span> */}
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Sign Up</h2>
                        <span className="text-xl">Welcome</span>
                    </div>
                    <div>
                        {/* -------------- NAME -------------- */}
                        <legend className="fieldset-legend">First Name</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="Anshu"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Last Name</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="man"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>

                        {/* -------------- EMAIL -------------- */}
                        <legend className="fieldset-legend">Email ID</legend>
                        <label className="input validator">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input
                                type="email"
                                placeholder="mail@site.com"
                                required
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>
                        <div className="validator-hint hidden">
                            Enter valid email address
                        </div>

                        {/* -------------- PASSWORD -------------- */}
                        <legend className="fieldset-legend mt-5">
                            Password
                        </legend>

                        <label className="input">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle
                                        cx="16.5"
                                        cy="7.5"
                                        r=".5"
                                        fill="currentColor"
                                    ></circle>
                                </g>
                            </svg>
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Age</legend>
                        <label className="input validator">
                            <input
                                type="number"
                                placeholder='21'
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Gender</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Photo</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="link"
                                required
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Bio</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="About"
                                required
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </label>

                        <legend className="fieldset-legend">Skills</legend>
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="ReactJS, TypeScript"
                                required
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </label>
                    </div>

                    <p className="flex justify-center mt-4 text-red-500">
                        {error}
                    </p>

                    <div className="mt-6 items-center mx-auto">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
