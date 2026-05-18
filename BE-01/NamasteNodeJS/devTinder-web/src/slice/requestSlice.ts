import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConnectionRequest } from "../types/user";

type RequestState = ConnectionRequest[];

const initialState: RequestState = [];

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        addRequests: (_state, action: PayloadAction<ConnectionRequest[]>) =>
            action.payload,
        removeRequest: (state, action: PayloadAction<string>) =>
            state.filter((request) => request._id !== action.payload),
        removeRequests: () => [],
    },
});

export const { addRequests, removeRequest, removeRequests } =
    requestSlice.actions;

export default requestSlice.reducer;
