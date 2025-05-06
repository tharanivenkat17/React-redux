import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/Counter/counterSlice";
import usersReducer from "../features/Users/usersSlice";
import formReducer from "../features/Form/formSlice";
import fetchUserDataReducer from "../features/FetchEmployeeData/fetchdataSlice";
import loginadminReducer from "../features/FetchEmployeeData/LoginAdmin/loginadminSlice";

export const store = configureStore({
    reducer : {
        counter : counterReducer,
        users : usersReducer,
        form : formReducer,
        fetchUserData: fetchUserDataReducer,
        login : loginadminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;