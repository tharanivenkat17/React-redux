import { createSlice } from "@reduxjs/toolkit";

interface TodoState {
    id: number;
    text: string;
    complete: boolean;
}

const initialState: TodoState[] = [];

let idCounter = 0;

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: ++idCounter, text: action.payload, complete: false });
        },
        toggleTodo: (state, action) => {
            const todo = state.find(t => t.id === action.payload);
            if (todo) todo.complete = !todo.complete;
        },
        removeTodo: (state, action) => {
            return state.filter(t => t.id !== action.payload);
        }
    }
})

export const { addTodo, toggleTodo, removeTodo } =todoSlice.actions;
export default todoSlice.reducer;