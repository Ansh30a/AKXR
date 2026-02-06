import Login from "../login/Login";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import "./Header.css";

const Header = () => {
    const onlineStatus = useOnlineStatus();

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
                        <img src="/cart.svg" alt="Cart" />
                    </li>
                    <Login />
                </ul>
            </div>
        </div>
    );
};

export default Header;
