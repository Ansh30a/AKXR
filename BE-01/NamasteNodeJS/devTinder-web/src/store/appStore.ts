import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import feedReducer from "../slice/feedSlice";
import connectionReducer from "../slice/connectionSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
