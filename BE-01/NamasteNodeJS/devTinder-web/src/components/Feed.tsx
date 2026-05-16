import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../slice/feedSlice";
import type { RootState } from "../store/appStore";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store: RootState) => store.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        const getFeed = async () => {
            try {
                const res = await axios.get(
                    import.meta.env.VITE_BASE_API_URL + "/user/feed",
                    { withCredentials: true },
                );
                dispatch(addFeed(res?.data));
            } catch (err) {
                console.error(err);
            }
        };

        void getFeed();
    }, [dispatch]);
    return (
        feed && (
            <div className="flex flex-wrap gap-6 justify-center mx-auto mt-8">
                {Array.isArray(feed) &&
                    feed.map((u) => (
                        <UserCard key={u._id} user={u} />
                    ))}
            </div>
        )
    );
};

export default Feed;
