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
    products: billInCurrentOrderType[],
    totalPrice: number,
}

interface initialStateBillType {
    bills: billType[],
    billInCurrentOrder: billType,
    status: posibleStatus,
    error: string | null
}

interface billInCurrentOrderType {
    "id": string,
    "name": string,
    "price": number,
    "amount": number
  }

const initialState: initialStateBillType = {
    bills: [],
    billInCurrentOrder: {
        id: "",
        date: "",
        clientName: "",
        employeeName: "",
        products: [],
        totalPrice: 0,
    },
    status: posibleStatus.IDLE,
    error: null,
}

const billSlice = createSlice({
    name: "bill",
    initialState,
    reducers: {
        editBill: (state: initialStateBillType, action: PayloadAction<billType>) => {
            state.billInCurrentOrder.id = action.payload.id;
            state.billInCurrentOrder.date = action.payload.date;
            state.billInCurrentOrder.clientName = action.payload.clientName;
            state.billInCurrentOrder.employeeName = action.payload.employeeName;

            const payloadProduct = action.payload.products[0];

            const found = state.billInCurrentOrder.products.find(product => product?.id === payloadProduct.id);

            if (found) {
                // const updated = {
                //     ...found,
                //     amount: found.amount + payloadProduct.amount
                // }
                state.billInCurrentOrder.products= state.billInCurrentOrder.products.map(product => product.id === payloadProduct.id ? payloadProduct : product);            
            }else {
                state.billInCurrentOrder.products.push(payloadProduct);
            }

            state.billInCurrentOrder.totalPrice = action.payload.totalPrice;
        },
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
export type { billInCurrentOrderType }
export default billSlice.reducer

export const selectBillsState = () => (state: RootState) => state.bill.bills
export const selectBillsStatus = () => (state: RootState) => state.bill.status
export const selectBillsFetchError = () => (state: RootState) => state.bill.error

export const {editBill} = billSlice.actions;