import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InventoryProductType = {
    id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    providerId: string,
    minimumAmount: number,
    maximumAmount: number,
}

interface InventoryProductState {
    products: InventoryProductType[],
}

const initialState: InventoryProductState = {
    products: [
        {
            id: "wd18r4a32s",
            name: "Tornillo",
            description: "Tornillo negro 8x1",
            stock: 20,
            price: 300,
            providerId: "a91da65s4",
            minimumAmount: 10,
            maximumAmount: 200,
        },
        {
            id: "aw6d1a6s5",
            name: "Destornillador",
            description: "Destornillador negro de estrella y es muy binito y colorido, llévelo en promo de 1x3",
            stock: 12,
            price: 8450,
            providerId: "a91da65s4",
            minimumAmount: 3,
            maximumAmount: 30,
        },
    ],
}

export const inventoryProductSlice = createSlice({
    name: "inventoryProducts",
    initialState,
    reducers: {
        addProductToInventory: (state, action: PayloadAction<InventoryProductType>) => {
            state.products.push(action.payload)
        }
    }
});

export type { InventoryProductType }

export const { addProductToInventory } = inventoryProductSlice.actions;

export default inventoryProductSlice.reducer;