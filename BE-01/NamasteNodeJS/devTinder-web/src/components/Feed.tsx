import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../slice/feedSlice";
import type { RootState } from "../store/appStore";
import { useEffect } from "react";
import UserCard from "./UserCard";
import api from "../lib/api";

const Feed = () => {
    const feed = useSelector((store: RootState) => store.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        const getFeed = async () => {
            try {
                const res = await api.get("/user/feed");
                dispatch(addFeed(res.data));
            } catch (err) {
                console.error(err);
                dispatch(addFeed([]));
            }
        };

        void getFeed();
    }, [dispatch]);

    const nextProfile = feed[0];

    if (!nextProfile) {
        return (
            <span className="text-xl justify-center flex font-bold p-6 bg-gray-500 rounded-full w-[75%] mt-10 mx-auto">
                No new profiles found.
            </span>
        );
    }

    return (
        <div className="flex justify-center mx-auto my-auto">
            <UserCard key={nextProfile._id} user={nextProfile} />
        </div>
    );
};

export default Feed;
