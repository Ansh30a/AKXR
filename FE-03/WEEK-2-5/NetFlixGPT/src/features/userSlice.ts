import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    uid: string;
    email: string | null;
    displayName: string | null;
}

type UserSliceState = UserState | null;

const initialState: UserSliceState = null;

const userSlice = createSlice({
    name: "user",
    initialState: initialState as UserSliceState,
    reducers: {
        addUser: (_state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        removeUser: () => null,
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
