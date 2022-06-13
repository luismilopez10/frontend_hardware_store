import { createAsyncThunk } from "@reduxjs/toolkit";
import { inventoryProductType } from '../../features/InventoryProductSlice'

const deleteProductUrl = 'https://raulhwstore.herokuapp.com/api/v1/products/'

export const deleteProduct = createAsyncThunk('deleteProduct', async (product: inventoryProductType) => {
    const response = await fetch(`${deleteProductUrl}/${product.id}`, {
        method: 'DELETE'
    })

    return { deleted: response.ok, productId: product.id }
})