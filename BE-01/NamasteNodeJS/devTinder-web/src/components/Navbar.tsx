import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/appStore";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../slice/userSlice";
import api from "../lib/api";

const Navbar = () => {
    const user = useSelector((store: RootState) => store.user.userInfo);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            dispatch(removeUser());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to="/">
                    <img src="/logo.svg" className="w-20" />
                    DevTinder
                </Link>
            </div>
            <div className="flex gap-2">
                {/* <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-24 md:w-auto"
                /> */}
                {user && (
                    <div className="dropdown dropdown-end mx-10 flex gap-10">
                        <p className="my-auto">Welcome, {user.firstName}</p>
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            {user.photoUrl ? (
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={`${user.firstName} profile photo`}
                                        src={user.photoUrl}
                                    />
                                </div>
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-base-200 text-sm font-semibold">
                                    {user.firstName.charAt(0)}
                                </div>
                            )}
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-2 shadow"
                        >
                            {/* <li>
                                <p className="my-auto text-md border-b border-s-inherit">
                                    Welcome, {user.firstName}
                                </p>
                            </li> */}

                            <li>
                                <Link to="/" className="justify-between">
                                    Feed
                                    {/* <span className="badge">New</span> */}
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    {/* <span className="badge">New</span> */}
                                </Link>
                            </li>
                             <li>
                                <Link to="/connections" className="justify-between">
                                    Connections
                                    {/* <span className="badge">New</span> */}
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests" className="justify-between">
                                    Requests
                                    {/* <span className="badge">New</span> */}
                                </Link>
                            </li>
                            {/* <li>
                                <a>Settings</a>
                            </li> */}
                            <li>
                                <a onClick={handleLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
