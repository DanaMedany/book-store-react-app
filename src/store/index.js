import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import authReducer from "./authSlice";
import reportReducer from "./reportSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    report: reportReducer,
  },
});

export default store;
