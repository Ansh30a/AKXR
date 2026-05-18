import type { User } from "../types/user";
import { useDispatch } from "react-redux";
import { removeFeed } from "../slice/feedSlice";
import api from "../lib/api";

const UserCard = ({ user }: { user: User }) => {
    const { firstName, photoUrl, bio, lastName, age, gender } = user;

    const dispatch = useDispatch();

    const handleRequest = async (status: string, userId: string) => {
        try {
            await api.post(`/request/send/${status}/${userId}`);
            dispatch(removeFeed(userId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card bg-base-300 w-75 shadow-sm mt-5">
            <figure>
                <img
                    src={
                        photoUrl ??
                        "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={firstName + "'s photo"}
                    className="w-75"
                />
            </figure>
            <div className="card-body flex items-center justify-center">
                <h2 className="card-title mt-5">
                    {firstName} {lastName}
                </h2>
                <p>
                    {age} {gender}
                </p>
                <p>{bio}</p>
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-error flex justify-center"
                        onClick={() => handleRequest("ignored", user._id)}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary flex justify-center"
                        onClick={() => handleRequest("interested", user._id)}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
