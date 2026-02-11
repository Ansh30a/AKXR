import { useLocation } from "react-router-dom";
import { signOutUser } from "../../lib/auth";
import { useAppSelector } from "../../store/hooks";

const Header = () => {
    const { pathname } = useLocation();
    const isBrowse = pathname === "/browse";

    const user = useAppSelector((state) => state.user);

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (err) {
            console.error(`Sign out failed. ${err}`);
        }
    };

    return (
        <header
            className={`
                fixed top-0 left-0 z-20 w-full
                transition-all duration-300
                justify-between
                flex
                ${isBrowse ? "bg-black px-8 py-1" : "px-40 pt-5"}
            `}
        >
            <img
                src="/netflix.svg"
                alt="logo"
                className={`
                    transition-all duration-300
                    ${isBrowse ? "w-24" : "w-40"}
                `}
            />
            {isBrowse && user && (
                <button
                    onClick={handleSignOut}
                    className="flex flex-col items-center gap-1 cursor-pointer transition duration-300 hover:scale-110"
                >
                    <img
                        className="w-8 h-8 rounded"
                        src="/user-icon.png"
                        alt="user-icon"
                    />
                    <span className="text-xs text-white opacity-80">
                        {user.displayName ?? "User"}
                    </span>
                </button>
            )}
        </header>
    );
};

export default Header;
