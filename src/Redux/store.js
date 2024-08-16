import { configureStore } from "@reduxjs/toolkit";
import carListReducer from "./carListSlice";
import timerReducer from "./timerSlice";

export default configureStore({
  reducer: {
    carList: carListReducer,
    timer:timerReducer,
  },
});
