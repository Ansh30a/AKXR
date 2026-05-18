import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../slice/connectionSlice";
import type { RootState } from "../store/appStore";
import type { User } from "../types/user";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();

    const connections = useSelector(
        (store: RootState) => store.connections,
    ) as User[];
    const [loading, setLoading] = useState<boolean>(false);

    const fetchConnections = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                import.meta.env.VITE_BASE_API_URL + "/user/connections",
                { withCredentials: true },
            );
            // API returns { message, data }
            const data = res.data?.data ?? [];
            dispatch(addConnections(data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchConnections();
    }, []);

    if (loading) return <div className="p-6">Loading connections…</div>;
    if (!connections || connections.length === 0)
        return <span className="text-xl justify-center flex font-bold p-6 bg-gray-500 rounded-full w-[75%] mt-10 mx-auto">No Connections Found.</span>

    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Connections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connections.map((u) => (
                    <ConnectionCard key={u._id} user={u} />
                ))}
            </div>
        </div>
    );
};

export default Connections;
