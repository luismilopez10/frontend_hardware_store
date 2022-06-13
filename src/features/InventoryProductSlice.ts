import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteProduct } from "../actions/product/deleteProduct";
import { getAllProducts } from "../actions/product/getAllProducts";
import { postProduct } from "../actions/product/postProduct";
import { updateProduct } from "../actions/product/updateProduct";
import { RootState } from "../app/store";
import { posibleStatus } from "./posibleStatus";

type inventoryProductType = {
    id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    providerId: string,
    minimumAmount: number,
    maximumAmount: number,
}

type editInventoryProductType = {
    id: string,
    name: string,
    description: string,
    price: number,
    providerId: string,
    minimumAmount: number,
    maximumAmount: number,
}

interface initialStateInventoryProductType {
    products: inventoryProductType[],
    editProduct: editInventoryProductType,
    status: posibleStatus,
    error: string | null
}

const initialState: initialStateInventoryProductType = {
    products: [],
    editProduct: {
        id: "",
        name: "",
        description: "",
        price: 0,
        providerId: "",
        minimumAmount: 0,
        maximumAmount: 0,},
    status: posibleStatus.IDLE,
    error: null,
}

const inventoryProductSlice = createSlice({
    name: "inventoryProduct",
    initialState,
    reducers: {
        editProduct: (state: initialStateInventoryProductType, action: PayloadAction<editInventoryProductType>) => {
            state.editProduct.id = action.payload.id
            state.editProduct.name = action.payload.name
            state.editProduct.description = action.payload.description
            state.editProduct.price = action.payload.price
            state.editProduct.providerId = action.payload.providerId
            state.editProduct.minimumAmount = action.payload.minimumAmount
            state.editProduct.maximumAmount = action.payload.maximumAmount
        }
    },
    extraReducers: (builder) => {
        //GET
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.products = action.payload
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while fetching"
            state.products = []
        })
        //POST
        builder.addCase(postProduct.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(postProduct.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.products.push(action.payload)
        })
        builder.addCase(postProduct.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while creating a product"
        })
        //PUT
        builder.addCase(updateProduct.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            let productUpdated = state.products.filter(product => product.id === action.payload.id)[0];
            let positionProductUpdated = state.products.indexOf(productUpdated)
            state.products[positionProductUpdated] = action.payload
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while creating a product"
        })
        //DELETE
        builder.addCase(deleteProduct.pending, (state) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            if (action.payload.deleted) {
                state.products = state.products.filter((product) => product.id !== action.payload.productId)
            }
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while deleting the product"
        })
    }
})


export type { inventoryProductType }
export type { initialStateInventoryProductType }
export default inventoryProductSlice.reducer

export const selectInventoryProductsState = () => (state: RootState) => state.inventoryProduct.products
export const selectInventoryProductsStatus = () => (state: RootState) => state.inventoryProduct.status
export const selectInventoryProductsFetchError = () => (state: RootState) => state.inventoryProduct.error
export const {editProduct} = inventoryProductSlice.actions;