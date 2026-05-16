import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import type { RootState } from "../store/appStore";

const Profile = () => {
    const user = useSelector((store: RootState) => store.user.userInfo);

    return (
        user && (
            <div className="flex items-center justify-center mx-auto">
                <EditProfile user={user} />
            </div>
        )
    );
};

export default Profile;
