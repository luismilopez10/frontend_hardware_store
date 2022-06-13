import { createAsyncThunk } from "@reduxjs/toolkit";
import { inventoryProductType } from '../../features/InventoryProductSlice'

const deleteProductUrl = 'https://raulhwstore.herokuapp.com/api/v1/products/'

export const deleteProduct = createAsyncThunk('deleteProduct', async (id: string) => {
    const response = await fetch(`${deleteProductUrl}${id}`, {
        method: 'DELETE'
    })

    return { deleted: response.ok, productId: id }
})