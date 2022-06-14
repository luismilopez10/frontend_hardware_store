import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import inventoryProductReducer from "../features/InventoryProductSlice"
import providerReducer from "../features/ProviderSlice"
import billReducer from "../features/BillSlice"
import receiptReducer from "../features/ReceiptSlice"
import loggedInReducer from './loggedInSlice'

const store = configureStore({
    reducer: {
        inventoryProduct: inventoryProductReducer,
        provider: providerReducer,
        bill: billReducer,
        receipt: receiptReducer,
        logged: loggedInReducer
    },
});

export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()