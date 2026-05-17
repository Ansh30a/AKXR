import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../slice/connectionSlice";
import type { RootState } from "../store/appStore";
import type { User } from "../types/user";

const Connections = () => {
    const dispatch = useDispatch();

    const connections = useSelector((store: RootState) => store.connections) as User[];
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
        return <div className="p-6">No Connections Found.</div>;

    const ConnectionCard = ({ user }: { user: User }) => (
        <div className="flex flex-col bg-base-300 rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center gap-4 p-4">
                <img
                    src={user.photoUrl ?? "https://via.placeholder.com/120"}
                    alt={user.firstName + "'s photo"}
                    className="w-20 h-20 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-muted">{user.age} • {user.gender}</p>
                    <p className="mt-2 text-sm text-gray-300 truncate">{user.bio}</p>
                    {Array.isArray(user.skills) && user.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {user.skills.map((s) => (
                                <span
                                    key={s}
                                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="p-3 border-t border-base-200 flex gap-3 justify-end">
                <button className="btn btn-sm btn-ghost">Message</button>
                <button className="btn btn-sm btn-outline">Remove</button>
            </div>
        </div>
    );

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
