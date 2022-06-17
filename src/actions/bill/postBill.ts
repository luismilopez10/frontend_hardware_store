import { createAsyncThunk } from "@reduxjs/toolkit";
import { billType } from "../../features/BillSlice";

const postBillUrl = 'https://raulhwstore.herokuapp.com/api/v1/bills/'

export const postBill = createAsyncThunk('postBill', async (bill: billType) => {
    const response = await fetch(postBillUrl, {        
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(bill),
    })
    return (await response.json()) as billType;
})