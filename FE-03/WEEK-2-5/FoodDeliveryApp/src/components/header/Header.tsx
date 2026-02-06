import Login from "../login/Login";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./Header.css";

const Header = () => {
    const onlineStatus = useOnlineStatus();

    // Subscribe to the store using the useSelector hook
    const cartItems = useAppSelector((store) => store.cart.items)

    return (
        <div className="header hover:bg-green-50">
            <div className="logo-container">
                <img className="logo" src="/logo.svg" alt="Logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>{onlineStatus ? "🟢" : "🔴"}</li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="flex flex-wrap items-center">
                            <img src="/cart.svg" alt="Cart" className="size-5.5"/>
                            <p className="w-4 px-4 justify-center items-center">{cartItems.length}</p>
                        </Link>
                    </li>
                    <Login />
                </ul>
            </div>
        </div>
    );
};

export default Header;
