import { useRef, useState } from "react";
import Header from "../Header/Header";
import checkValidData from "../../validators/validateForm";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useAppDispatch } from "../../store/hooks";
import { addUser } from "../../features/userSlice";

const Login = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Validate the form data
        const emailValue = email.current?.value ?? "";
        const passwordValue = password.current?.value ?? "";

        const message = checkValidData(emailValue, passwordValue);
        // if (message) console.log(message);
        setError(message);

        if (message) {
            return;
        }

        if (!isSignIn) {
            // Sign Up
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then(async (userCredential) => {
                    const user = userCredential.user;

                    const displayName = name.current?.value ?? "";

                    await updateProfile(user, {
                        displayName
                    });

                    await user.reload();

                    dispatch(
                        addUser({
                            uid: user.uid,
                            email: user.email,
                            displayName,
                        }),
                    );
                    console.log("Signed up with name:", user.displayName);

                    console.log("Signed up:", user);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            // Sign In
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("Signed in:", user);
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    };

    return (
        <div className="relative min-h-screen">
            <Header />
            <div>
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/e49aba81-ee7c-4f19-baef-7c54bbab003e/web/IN-en-20260202-TRIFECTA-perspective_04f5de39-b518-493c-9a8d-6aef11af0457_large.jpg"
                    alt="Logo"
                    aria-hidden="true"
                />
            </div>
            <div className="absolute inset-0 bg-linear-to-b from-neutral-950/90 via-neutral-900/80 to-neutral-950"></div>
            <form
                onSubmit={handleSubmit}
                className="bg-linear-to-b from-neutral-950/90 via-neutral-900/80 to-neutral-950 w-28/100 m-12 p-12 absolute mt-40 mb-40 mx-auto top-0 bottom-0 right-0 left-0 flex flex-col rounded-sm"
            >
                <h1 className="text-4xl font-semibold text-white mt-2 mb-5">
                    {isSignIn ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignIn && (
                    <input
                        type="text"
                        placeholder="Name"
                        ref={name}
                        className="m-2 p-3 bg-gray-800 text-gray-300 rounded-sm"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email address"
                    ref={email}
                    className="m-2 p-3 bg-gray-800 text-gray-300 rounded-sm"
                />
                <input
                    type="password"
                    placeholder="Password"
                    ref={password}
                    className="m-2 p-3 bg-gray-800 text-gray-300 rounded-sm"
                />
                {error && (
                    <p className=" text-red-500 text-center rounded-sm p-2 m-2 flex flex-wrap gap-2 justify-center items-center">
                        <img src="/cross.svg" alt="" className="w-3" />
                        {error}
                    </p>
                )}
                <button
                    className="bg-red-600 p-3 m-2 rounded-sm text-white mt-10 cursor-pointer"
                    type="submit"
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>
                <p
                    onClick={toggleForm}
                    className="text-white mx-auto mt-5 cursor-pointer"
                >
                    {/* New to Netflix?
                    <b>
                        <a href="/signup">Sign Up now!!</a>
                        Sign Up now
                    </b> */}
                    <b>
                        {isSignIn
                            ? `New to Netflix? Sign Up Now`
                            : `Already a User? Sign In Now`}
                    </b>
                </p>
            </form>
        </div>
    );
};

export default Login;
