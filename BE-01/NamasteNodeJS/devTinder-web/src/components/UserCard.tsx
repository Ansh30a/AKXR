import type { User } from "../types/user";

const UserCard = ({ user }: { user: User }) => {
    const { firstName, photoUrl, bio, lastName, age, gender } = user;

    const handleIgnore = async () => {};

    const handleInterested = async () => {};

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={
                        photoUrl ??
                        "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={firstName + "'s photo"}
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
                        onClick={handleIgnore}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary flex justify-center"
                        onClick={handleInterested}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
