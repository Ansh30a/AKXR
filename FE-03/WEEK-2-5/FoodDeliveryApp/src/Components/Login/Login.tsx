import { useContext, useState } from "react";
import UserContext from "../../Context/userContext";
import "./Login.css";

const Login = () => {

    const [btnName, setBtnName] = useState("Login");

    const { loggedInUser } = useContext(UserContext);

    // console.log(loggedInUser);   

    /*
    1. If there is no dependency array then useEffect gets called after every render
    2. If the dependency is empty then useEffect is called for only the initial render
    3. If there are dependencies in the dependency array then useEffect is called every time a dependency changes
    */

    return (
        <button 
            className="btn text-xs w-1" 
            onClick={() => {
                if (btnName === "Login") {
                    setBtnName(`${loggedInUser}`);
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
