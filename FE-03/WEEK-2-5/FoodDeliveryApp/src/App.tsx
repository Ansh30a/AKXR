import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import UserContext from "./Context/userContext";
import "./App.css";

function App() {
    const [userName, setUserName] = useState("");

    // Fake Auth
    useEffect(() => {
        // Make an ACTUAL API call here to fetch user data
        const data = {
            name: "Ansh",
        };
        setUserName(data.name);
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser: userName }}>
            <div className="app-shell">
                <Header />
                <main className="app-main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </UserContext.Provider>
    );
}

export default App;
