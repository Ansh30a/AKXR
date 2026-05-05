import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [emailId, setEmailId] = useState<string>("iamanshuman30@gmail.com");
    const [password, setPassword] = useState<string>("Ansh@123");

    const handleLogin = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_BASE_API_URL!, {
                emailId,
                password,
            });
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="card w-96 bg-black shadow-sm">
                <div className="card-body">
                    {/* <span className="badge badge-xs badge-warning">
                        Most Popular
                    </span> */}
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">Login</h2>
                        <span className="text-xl">Welcome back</span>
                    </div>
                    <div>
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
                    </div>

                    <div className="mt-6 items-center mx-auto">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
