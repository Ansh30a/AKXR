import { useEffect } from "react";
import { subscribeToAuthChanges } from "./lib/auth";
import { addUser, removeUser } from "./features/userSlice";
import { useAppDispatch } from "./store/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((user) => {
            if (user) {
                dispatch(
                    addUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                    }),
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        return unsubscribe;
    }, [dispatch, navigate]);

    return <Outlet />;
}

export default App;
