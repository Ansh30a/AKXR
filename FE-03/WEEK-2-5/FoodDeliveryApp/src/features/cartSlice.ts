import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    name: string;
    price: number;
    imageId?: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [
        // ------------ Dummy Data ------------
        // {
        //     id: "1",
        //     name: "pizza",
        //     price: 100,
        // },
        // {
        //     id: "2",
        //     name: "burger",
        //     price: 50,
        // },
    ],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeItemById: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItemById, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
