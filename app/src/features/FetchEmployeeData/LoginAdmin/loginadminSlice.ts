import { createSlice } from '@reduxjs/toolkit'

interface LoginState {
    email: string;
    password: string;
    error: string;
}

type LoginKey = keyof LoginState;

const initialState: LoginState = {
    email: '',
    password: '',
    error: '',
}

const loginadminSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateLogin:
            (state, action: { payload: { field: LoginKey, value: string } }) => {
                const { field, value } = action.payload;
                state[field] = value as LoginState[LoginKey];
            },
        resetLogin: () => initialState
    },
})

export const { updateLogin, resetLogin } = loginadminSlice.actions;
export default loginadminSlice.reducer;