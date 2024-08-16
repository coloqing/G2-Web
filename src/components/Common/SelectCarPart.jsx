// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Select } from "antd";
import {
  _getCarList,
  setSelectData,
  setCarriageList,
} from "../../Redux/carListSlice";
import { useNavigate } from "react-router-dom";

export default function SelectCarPart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const searchParams = props.searchParams;

  const carListStore = useSelector((state) => state.carList.carList);
  const carriageListStore = useSelector((state) => state.carList.carriageList);
  const selectDataStore = useSelector((state) => state.carList.selectData);
  if (!carListStore.length) dispatch(_getCarList());


  /**
   * car 下拉
   * @param {} value
   * @param {*} options
   */
  const onCarChange = (value, options) => {
    const selectCarItem = carListStore.find((item) => {
      return item.id === value;
    });

    dispatch(setCarriageList(selectCarItem.carriageList));

    let newSelectData = { ...selectDataStore };
    newSelectData.carName = options.label;
    newSelectData.carId = value;
    newSelectData.carriageName = selectCarItem.carriageList[0].name;
    newSelectData.carriageId = selectCarItem.carriageList[0].id;
    dispatch(setSelectData(newSelectData));

    if (props.page === "car") navigate("/car?car=" + newSelectData.carName);
    if (props.page === "part")
      navigate(
        "/Part?car=" +
          newSelectData.carName +
          "&part=" +
          newSelectData.carriageName
      );
  };

  /**
   * onCarriageChange 车厢号变化
   * @param {*} value
   */
  const onCarriageChange = (value, options) => {
    let newSelectData = { ...selectDataStore };
    newSelectData.carriageName = options.label;
    newSelectData.carriageId = value;
    dispatch(setSelectData(newSelectData));
    navigate(
      "/Part?car=" +
        newSelectData.carName +
        "&part=" +
        newSelectData.carriageName
    );
  };

  function back() {
    if (props.page === "part") navigate("/car?car=" + selectDataStore.carName);
    if (props.page === "car") navigate("/line");
  }

  const selectStyle = {
    backgroundColor: "#060a2d",
    borderRadius: 0,
    border: "1px solid #517992",
  };
  const carriageHtml = (
    <>
      车厢
      <Select
        value={selectDataStore.carriageId}
        style={{ width: 120 }}
        onChange={onCarriageChange}
        options={carriageListStore.map((ele) => ({
          label: ele.name,
          value: ele.id,
        }))}
        dropdownStyle={selectStyle}
      />
    </>
  );

  return (
    <Space
      wrap
      style={{
        color: "white",
        fontSize: "0.885vw",
        position: "relative",
        // border: "1px solid #517992",
        width: "97vw",
      }}
    >
      列车号
      <Select
        value={selectDataStore.carId}
        style={{
          width: 120,
        }}
        onChange={onCarChange}
        options={carListStore.map((element) => ({
          label: element.carName,
          value: element.id,
        }))}
        dropdownStyle={selectStyle}
      />
      {props.hideCarriage ? null : carriageHtml}
      <div
        style={{
          position: "absolute",
          right: "0",
          top: 10,
          cursor: "pointer",
        }}
        onClick={back}
      >
        返回
      </div>
    </Space>
  );
}
