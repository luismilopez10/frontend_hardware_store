import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllReceipts } from "../actions/receipt/getAllReceipts";
import { postReceipt } from "../actions/receipt/postReceipt";
import { RootState } from "../app/store";
import { posibleStatus } from "./posibleStatus";

type receiptType = {
    id: string,
    date: string,
    productId: string,
    productAmount: number;
    providerId: string,
}

interface initialStateReceiptType {
    receipts: receiptType[],
    status: posibleStatus,
    error: string | null
}

const initialState: initialStateReceiptType = {
    receipts: [],
    status: posibleStatus.IDLE,
    error: null,
}

const receiptSlice = createSlice({
    name: "receipt",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //GET
        builder.addCase(getAllReceipts.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(getAllReceipts.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.receipts = action.payload
        })
        builder.addCase(getAllReceipts.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while fetching"
            state.receipts = []
        })
        //POST
        builder.addCase(postReceipt.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(postReceipt.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.receipts.push(action.payload)
        })
        builder.addCase(postReceipt.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while creating the bill"
        })
    }
})


export type { receiptType }
export type { initialStateReceiptType }
export default receiptSlice.reducer

export const selectReceiptsState = () => (state: RootState) => state.receipt.receipts
export const selectReceiptsStatus = () => (state: RootState) => state.receipt.status
export const selectReceiptsFetchError = () => (state: RootState) => state.receipt.error