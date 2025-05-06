import { createSlice } from "@reduxjs/toolkit"

interface FormState {
    name: string;
    email: string;
    employeeID: number | string;
    branch: string;
    designation: string, 
    error: string
}

type FieldKey = keyof FormState;

const initialState: FormState = {
    name: '',
    email: '',
    employeeID: '',
    branch: '',
    designation: '',
    error: '',
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateField:
            (state, action: { payload: { field: FieldKey, value: string | number } } ) => {
                const { field, value } = action.payload;
                state[field] = value as FormState[FieldKey]; 
            },
        resetField: () => initialState
    }
})

export const { updateField, resetField } = formSlice.actions;
export default formSlice.reducer;