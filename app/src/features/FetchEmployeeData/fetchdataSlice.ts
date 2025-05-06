import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    employeeID: string | number;
    branch: string;
    designation: string;
}

interface UsersState {
    data: User[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}

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