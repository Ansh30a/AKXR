import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";

const appStore = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
