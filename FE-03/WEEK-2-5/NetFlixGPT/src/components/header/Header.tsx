import { useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../../lib/auth";
import { useAppSelector } from "../../store/hooks";
import React, { useState } from "react";
import "./Header.css";

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isBrowse = pathname === "/browse";

    const user = useAppSelector((state) => state.user);

    const [searchText, setSearchText] = useState<string>("");

    const handleSignOut = async () => {
        try {
            await signOutUser();
        } catch (err) {
            console.error(`Sign out failed. ${err}`);
        }
    };

    const handleSearch = (): void => {
        if (!searchText.trim()) return;

        navigate(`/search?query=${encodeURIComponent(searchText)}`);
        setSearchText("");
    };

    return (
        <header
            className={`
                fixed top-0 left-0 z-100 w-full
                transition-all duration-300
                justify-between
                flex items-center
                ${isBrowse ? "bg-linear-to-b from-[#212121] via-neutral-900 to-neutral-900/50 px-8 py-1" : "px-40 pt-5"}
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
            <div className="search-bar mt-1">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search.."
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchText(e.target.value)
                    }
                />
                <button
                    onClick={handleSearch}
                >
                    Search on GPT
                </button>
            </div>
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
