import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popUpReducer from "./slices/popUpSlice";
import userReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup : popUpReducer,
        user: userReducer,
        book: bookReducer,
        borrow: borrowReducer,
    },
})