import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import type { User } from "../types/user";
import RequestCard from "./RequestCard";
import { addRequests } from "../slice/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();

    const requests = useSelector(
        (store: RootState) => store.requests,
    ) as User[];
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                import.meta.env.VITE_BASE_API_URL + "/user/requests/received",
                { withCredentials: true },
            );
            // API returns { message, data }
            const data = res.data?.data ?? [];
            dispatch(addRequests(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchRequests();
    }, []);

    if (loading) return <div className="p-6">Loading connection requests…</div>;
    if (!requests || requests.length === 0)
        return <div className="p-6">No Requests Found.</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Connections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((u) => (
                    <RequestCard key={u._id} user={u} />
                ))}
            </div>
        </div>
    );
};

export default Requests;
