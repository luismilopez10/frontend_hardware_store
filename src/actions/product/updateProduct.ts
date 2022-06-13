import { createAsyncThunk } from "@reduxjs/toolkit";
import { inventoryProductType } from '../../features/InventoryProductSlice'

const updateProductUrl = 'https://raulhwstore.herokuapp.com/api/v1/products/'

export const updateProduct = createAsyncThunk('updateProduct', async (product: InventoryProductType) => {
    const response = await fetch(updateProductUrl, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(product),
    })
    return (await response.json()) as inventoryProductType;
})