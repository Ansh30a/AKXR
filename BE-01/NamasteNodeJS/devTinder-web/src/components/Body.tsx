import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addUser } from "../slice/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const user = await axios.get(
                import.meta.env.VITE_BASE_API_URL + "/profile",
                { withCredentials: true },
            );
            dispatch(addUser(user.data));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                if (status === 401) {
                    return navigate("/login");
                }
                console.error(err);
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Body;
