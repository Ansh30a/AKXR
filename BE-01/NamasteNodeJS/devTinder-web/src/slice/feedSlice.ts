import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

const initialState: User[] = [];

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addFeed: (_state, action: PayloadAction<unknown>) =>
            Array.isArray(action.payload) ? action.payload : [],
        removeFeed: (state, action: PayloadAction<string>) =>
            state.filter((user) => user._id !== action.payload),
        clearFeed: () => [],
    },
});

export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
