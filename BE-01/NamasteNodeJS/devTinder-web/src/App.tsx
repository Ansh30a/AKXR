import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import appStore from "./store/appStore";
import Signup from "./components/Signup";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

const App = () => {
    return (
        <>
            <Provider store={appStore}>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route path="/" element={<Body />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/" element={<Feed />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/connections" element={<Connections />} />
                            <Route path="/requests" element={<Requests />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
};

export default App;
