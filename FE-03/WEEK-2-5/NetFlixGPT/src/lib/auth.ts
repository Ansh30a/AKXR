import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";

export const subscribeToAuthChanges = (
    callback: (user: User | null) => void,
) => {
    return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => {
    await signOut(auth);
};
