import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";

type ConnectionsState = User[];

const initialState: ConnectionsState = [];

const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        addConnections: (_state, action: PayloadAction<User[]>) => action.payload,
        removeConnections: () => [],
    },
});

export const { addConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
