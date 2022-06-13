import { createAsyncThunk } from "@reduxjs/toolkit";
import { inventoryProductType } from '../../features/InventoryProductSlice'

const postProductUrl = 'https://raulhwstore.herokuapp.com/api/v1/products/'

export const postProduct = createAsyncThunk('postProduct', async (product: inventoryProductType) => {
    const response = await fetch(postProductUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(product),
    })
    return (await response.json()) as inventoryProductType;
})