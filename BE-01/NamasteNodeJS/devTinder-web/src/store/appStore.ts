import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import feedReducer from "../slice/feedSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
