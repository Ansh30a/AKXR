import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Login from "./components/Login/Login.tsx";
import Browse from "./components/Browse/Browse.tsx";
import appStore from "./store/appStore.ts";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/browse", element: <Browse /> },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={appStore}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
