import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../slice/userSlice";
import { useCallback, useEffect, useState } from "react";
import api from "../lib/api";

const Body = () => {
    const dispatch = useDispatch();
    const [checkingAuth, setCheckingAuth] = useState(true);

    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        try {
            const user = await api.get("/profile");
            dispatch(addUser(user.data));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                if (status === 401) {
                    navigate("/login", { replace: true });
                    return;
                }
                console.error(err);
            } else {
                console.error(err);
            }
        } finally {
            setCheckingAuth(false);
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        void fetchUser();
    }, [fetchUser]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                {checkingAuth ? (
                    <div className="p-6 text-center">Loading...</div>
                ) : (
                    <Outlet />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Body;
