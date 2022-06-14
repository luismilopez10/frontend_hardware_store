import { createAsyncThunk } from "@reduxjs/toolkit";
import { receiptType } from '../../features/ReceiptSlice'

const getAllReceiptsUrl = 'https://raulhwstore.herokuapp.com/api/v1/receipts/'

export const getAllReceipts = createAsyncThunk('getAllReceipts', async () => {
    const response = await fetch(getAllReceiptsUrl)
    return (await response.json() as receiptType[])
})