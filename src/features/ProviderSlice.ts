import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProviders } from "../actions/provider/getAllProviders";
import { postProvider } from "../actions/provider/postProvider";
import { RootState } from "../app/store";
import { posibleStatus } from "./posibleStatus";

type providerType = {
    id: string,
    name: string,
    passport: string,
}

interface initialStateProviderType {
    providers: providerType[],
    status: posibleStatus,
    error: string | null
}

const initialState: initialStateProviderType = {
    providers: [],
    status: posibleStatus.IDLE,
    error: null,
}

const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //GET
        builder.addCase(getAllProviders.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(getAllProviders.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.providers = action.payload
        })
        builder.addCase(getAllProviders.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while fetching"
            state.providers = []
        })
        //POST
        builder.addCase(postProvider.pending, (state, action) => {
            state.status = posibleStatus.PENDING
        })
        builder.addCase(postProvider.fulfilled, (state, action) => {
            state.status = posibleStatus.COMPLETED
            state.providers.push(action.payload)
        })
        builder.addCase(postProvider.rejected, (state, action) => {
            state.status = posibleStatus.FAILED
            state.error = "Something went wrong while creating the provider"
        })
    }
})


export type { providerType }
export type { initialStateProviderType }
export default providerSlice.reducer

export const selectProvidersState = () => (state: RootState) => state.provider.providers
export const selectProvidersStatus = () => (state: RootState) => state.provider.status
export const selectProvidersFetchError = () => (state: RootState) => state.provider.error