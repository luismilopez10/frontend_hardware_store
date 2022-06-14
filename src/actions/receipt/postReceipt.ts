import { createAsyncThunk } from "@reduxjs/toolkit";
import { receiptType } from '../../features/ReceiptSlice'

const postReceiptUrl = 'https://raulhwstore.herokuapp.com/api/v1/receipts/'

export const postReceipt = createAsyncThunk('postReceipt', async (receipt: receiptType) => {
    const response = await fetch(postReceiptUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(receipt),
    })
    return (await response.json()) as receiptType;
})