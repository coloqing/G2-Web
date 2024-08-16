import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commonApiController from "../api/common";

export const carListSlice = createSlice({
  name: "carList",
  initialState: {
    carList: [],
    carriageList: [],
    selectData: {},
  },
  reducers: {
    setSelectData: (state, action) => {
      state.selectData = action.payload;
    },
    setCarriageList: (state, action) => {
      state.carriageList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(_getCarList.fulfilled, (state, action) => {
      state.carList = action.payload;
      state.carriageList = action.payload[0].carriageList;
      state.selectData = {
        carName: action.payload[0].carName,
        carId: action.payload[0].id,
        carriageName: action.payload[0].carriageList[0].name,
        carriageId: action.payload[0].carriageList[0].id,
      };
    });
  },
});

export const _getCarList = createAsyncThunk(
  "carList/_getCarList",
  async (extraInfo, { dispatch, getState }) => {
    const response = await commonApiController.CarCarriageListApi();
    return response.data;
  }
);
export const { setSelectData, setCarriageList } = carListSlice.actions;
export default carListSlice.reducer;
