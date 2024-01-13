import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: { logs: [] },
  reducers: {
    logReport: (State, action) => {
      State.logs.push(action.payload);
    },
  },
});

export const { logReport } = reportSlice.actions;
export default reportSlice.reducer;
