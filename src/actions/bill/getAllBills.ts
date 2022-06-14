import { createAsyncThunk } from "@reduxjs/toolkit";
import { billType } from "../../features/BillSlice";

const getAllBillsUrl = 'https://raulhwstore.herokuapp.com/api/v1/bills/'

export const getAllBills = createAsyncThunk('getAllBills', async () => {
    const response = await fetch(getAllBillsUrl)
    return (await response.json() as billType[])
})