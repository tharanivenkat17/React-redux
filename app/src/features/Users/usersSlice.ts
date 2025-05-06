import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersState {
    data: User[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
    admin : boolean
}

const initialState: UsersState = {
    data: [],
    status: 'idle',
    error: null,
    admin : false,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await axios.get('http://localhost:5123/users');
        return response.data;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAdmin: (state, action) =>{
            state.admin = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export const {setAdmin} =  usersSlice.actions;
export default usersSlice.reducer