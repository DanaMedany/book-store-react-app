import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    creator: "Dana",
    isLoggedIn: false,
  },
  reducers: {
    loginInOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { loginInOut } = authSlice.actions;
export default authSlice.reducer;
