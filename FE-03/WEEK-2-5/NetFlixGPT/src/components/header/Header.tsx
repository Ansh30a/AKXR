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
                flex flex-col md:flex-row items-center
                ${isBrowse ? "bg-linear-to-b from-[#212121] via-neutral-900 to-neutral-900/50 px-4 md:px-8 py-2" : "px-4 md:px-12 lg:px-40 pt-5"}
            `}
        >
            <div className={`flex justify-between w-full md:w-auto items-center`}>
                <img
                    src="/netflix.svg"
                    alt="logo"
                    className={`
                        transition-all duration-300
                        ${isBrowse ? "w-20 md:w-24" : "w-28 md:w-40"}
                    `}
                />
                <div className="md:hidden">
                    {isBrowse && user && (
                        <button
                            onClick={handleSignOut}
                            className="flex flex-col items-center gap-1 cursor-pointer transition duration-300 hover:scale-110"
                        >
                            <img
                                className="w-6 h-6 rounded"
                                src="/user-icon.png"
                                alt="user-icon"
                            />
                        </button>
                    )}
                </div>
            </div>
            {isBrowse && user && (
                <div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-2 md:mt-0 gap-4">
                    <div className="search-bar mt-0 w-full md:w-auto">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search.."
                            value={searchText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSearchText(e.target.value)
                            }
                        />
                        <button onClick={handleSearch}>Search on GPT</button>
                    </div>

                    <div className="hidden md:block">
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
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
