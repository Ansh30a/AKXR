import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type RequestState = User[];

const initialState: RequestState = [];

const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        addRequests: (_state, action: PayloadAction<User[]>) => action.payload,
        removeRequests: () => [],
    },
});

export const { addRequests, removeRequests } = connectionSlice.actions;

export default connectionSlice.reducer;
