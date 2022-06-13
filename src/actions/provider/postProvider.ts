import { createAsyncThunk } from "@reduxjs/toolkit";
import { providerType } from '../../features/ProviderSlice'

const postProviderUrl = 'https://raulhwstore.herokuapp.com/api/v1/providers/'

export const postProvider = createAsyncThunk('postProvider', async (provider: providerType) => {
    const response = await fetch(postProviderUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(provider),
    })
    return (await response.json()) as providerType;
})