import { useState } from "react";
import "./Login.css";

const Login = () => {

    const [btnName, setBtnName] = useState("Login");

    return (
        <button 
            className="btn" 
            onClick={() => {
                if (btnName === "Login") {
                    setBtnName("Log out");
                } else {
                    setBtnName("Login");
                }
            }}
        >
            {btnName}
        </button>
    );
};

export default Login;
