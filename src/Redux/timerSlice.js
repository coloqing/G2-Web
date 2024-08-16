import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timer: "",
  },
  reducers: {
    setTime: (state, action) => {
      state.timer = action.payload;
    },
    
  },
});
export const { setTime } = timerSlice.actions;
export default timerSlice.reducer;
