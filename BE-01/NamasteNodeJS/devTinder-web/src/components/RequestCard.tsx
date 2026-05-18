import type { User } from "../types/user";

const RequestCard = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-col bg-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center gap-10 p-4">
                <img
                    src={user.photoUrl ?? "https://via.placeholder.com/120"}
                    alt={user.firstName + "'s photo"}
                    className="w-30 h-30 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                        {user.firstName} {user.lastName}
                    </h3>
                    <h3 className="text-lg font-semibold">{user.bio}</h3>
                    <p className="text-sm text-muted">
                        {user.age} • {user.gender}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 truncate">
                        {user.bio}
                    </p>
                    {Array.isArray(user.skills) && user.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {user.skills.map((s) => (
                                <span
                                    key={s}
                                    className="text-xs px-2 py-1 bg-primary/10 shadow-md text-primary rounded-full"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="p-3 border-t border-base-200 flex gap-3 justify-end">
                <button className="btn btn-sm btn-ghost">Accept</button>
                <button className="btn btn-sm btn-outline">Reject</button>
            </div>
        </div>
    );
};

export default RequestCard;
