import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllBills } from "../actions/bill/getAllBills";
import { postBill } from "../actions/bill/postBill";
import { RootState } from "../app/store";
import { posibleStatus } from "./posibleStatus";

type billType = {
    id: string,
    date: string,
    clientName: string,
    employeeName: string,
    productsAmount: string;
    productsId: string[],
    totalPrice: number,
}

interface initialStateBillType {
    bills: billType[],
    status: posibleStatus,
    error: string | null
}

const initialState: initialStateBillType = {
    bills: [],
    status: posibleStatus.IDLE,
    error: null,
}

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //GET
        builder.addCase(getAllBills.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(getAllBills.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.bills = action.payload
        })
        builder.addCase(getAllBills.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while fetching"
            state.bills = []
        })
        //POST
        builder.addCase(postBill.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(postBill.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.bills.push(action.payload)
        })
        builder.addCase(postBill.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while creating the bill"
        })
    }
})


export type { billType }
export type { initialStateBillType }
export default billSlice.reducer

export const selectBillsState = () => (state: RootState) => state.bill.bills
export const selectBillsStatus = () => (state: RootState) => state.bill.status
export const selectBillsFetchError = () => (state: RootState) => state.bill.error