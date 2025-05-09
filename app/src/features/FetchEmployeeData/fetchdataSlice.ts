import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersState } from "../../types/FetchEmployeeData";

const initialState: UsersState = {
    data: [],
    status: 'idle',
    error: null,
};

export const fetchData = createAsyncThunk(
    'fetchdata/fetchData',
    async () => {
        const response = await axios.get('http://localhost:5123/employeeData');
        return response.data;
    }
)

const fetchUserData = createSlice({
    name: 'fetchdata',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export default fetchUserData.reducer