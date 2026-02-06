import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import UserContext from "./context/userContext";
import { Provider } from "react-redux";
import appStore from "./Store/appStore";
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
        <Provider store={ appStore }>
            <UserContext.Provider value={{ loggedInUser: userName }}>
                <div className="app-shell">
                    <Header />
                    <main className="app-main">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </UserContext.Provider>
        </Provider>
    );
}

export default App;
