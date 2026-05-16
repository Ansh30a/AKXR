import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

const initialState: User[] = [];

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers: {
        addFeed: (_state, action: PayloadAction<User[]>) => {
            return action.payload;
        },
        removeFeed: () => [],
    },
});

export const { addFeed } = feedSlice.actions;
export default feedSlice.reducer;
