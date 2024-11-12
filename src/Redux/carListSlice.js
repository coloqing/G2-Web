import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commonApiController from "../api/common";
import lineApi from "../api/lineApi";

export const carListSlice = createSlice({
  name: "carList",
  initialState: {
    carList: [],
    mark:[],
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
      // state.mark = action.payload;
      state.carriageList = action.payload[0].carriageList;
      state.selectData = {
        carName: action.payload[0].carName,
        carId: action.payload[0].id,
        carriageName: action.payload[0].carriageList[0].name,
        carriageId: action.payload[0].carriageList[0].id,
      };
    })
    .addCase(_getCarLists.fulfilled, (state, action) => {
      state.mark = action.payload; // 假设action.payload中有mark属性
      // 其他状态更新逻辑...
    });
  },
});

export const _getCarList = createAsyncThunk(
  "carList/_getCarList",
  async (extraInfo, { dispatch, getState }) => {
    const response = await commonApiController.CarCarriageListApi();
    // console.log('列车下拉框2',response.data);
    return response.data;
  }
);
export const _getCarLists = createAsyncThunk(
  "carList/_getCarLists",
  async (extraInfo, { dispatch, getState }) => {
    const response = await lineApi.RealTimeInfoLineLevelApi();
    // console.log('列车下拉sdas框2',response.data);
    return response.data;
  }
);
export const { setSelectData, setCarriageList } = carListSlice.actions;
export default carListSlice.reducer;
