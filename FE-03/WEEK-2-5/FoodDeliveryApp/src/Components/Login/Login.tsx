import { useState } from "react";
import "./Login.css";

const Login = () => {

    const [btnName, setBtnName] = useState("Login");

    return (
        <button 
            className="btn" 
            onClick={() => {
                setBtnName("Log Out")
            }}
        >
            {btnName}
        </button>
    );
};

export default Login;
