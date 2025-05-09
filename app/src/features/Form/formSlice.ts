import { createSlice } from "@reduxjs/toolkit"
import { FormData } from "../../types/Form";

type FieldKey = keyof FormData;

const initialState: FormData = {
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
                state[field] = value as FormData[FieldKey]; 
            },
        resetField: () => initialState
    }
})

export const { updateField, resetField } = formSlice.actions;
export default formSlice.reducer;