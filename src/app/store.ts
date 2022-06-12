import { configureStore } from "@reduxjs/toolkit";
import inventoryProductReducer from "../features/InventoryProductSlice"

export const store = configureStore({
    reducer: {
        inventoryProducts: inventoryProductReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch