import { createAsyncThunk } from "@reduxjs/toolkit";
import { providerType } from '../../features/ProviderSlice'

const getAllProviderUrl = 'https://raulhwstore.herokuapp.com/api/v1/providers/'

export const getAllProviders = createAsyncThunk('getAllProviders', async () => {
    const response = await fetch(getAllProviderUrl)
    return (await response.json() as providerType[])
})