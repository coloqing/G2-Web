import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Select } from "antd";
import {
  _getCarList,
  setSelectData,
  setCarriageList,
  _getCarLists,
} from "../../Redux/carListSlice";
// import lineStore from "../api/lineApi";
import { useNavigate } from "react-router-dom";

export default function SelectCarPart(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const searchParams = props.searchParams;

  const carListStore = useSelector((state) => state.carList.carList);
  const markStore = useSelector((state) => state.carList.mark);
  const carriageListStore = useSelector((state) => state.carList.carriageList);
  const selectDataStore = useSelector((state) => state.carList.selectData);
  // console.log('carListStore:', carListStore);
  // if (!carListStore.length) dispatch(_getCarList());
  // if (!markStore.length) dispatch(_getCarLists());
  useEffect(() => {
    if (!carListStore.length) {
      dispatch(_getCarList());
    }
    if (!markStore.length) {
      dispatch(_getCarLists());
    }
  }, [carListStore.length, markStore.length, dispatch]);

  const arr=[];
  // 检查 markStore 和 carListStore 中的匹配
  if (markStore.length > 0 && carListStore.length > 0 && arr.length === 0) {
    markStore.forEach(markItem => {
      carListStore.forEach(carItem => {
        if (markItem.lch === carItem.carName) {
          // 如果条件匹配，创建对象并添加到 arr 数组中
          arr.push({
            carName: carItem.carName,
            id: carItem.id,
            mainLine: markItem.mainLine || '', // 假设 markItem 中有 mainLine 属性
            carriageList:carItem.carriageList
          });
        }
        arr.sort((a, b) => {
          if (a.mainLine === '离线' && b.mainLine !== '离线') {
            return 1; // a 在 b 后面
          } else if (a.mainLine !== '离线' && b.mainLine === '离线') {
            return -1; // a 在 b 前面
          }
          return 0; // 保持原来的顺序
        });

      });
    });
    // console.log('符合条件的对象数组:', arr);
  }

  /**
   * car 下拉
   * @param {} value
   * @param {*} options
   */
  const onCarChange = (value, options) => {
    let tmp = options.label.props.children;
    // console.log(value, options);
    options = {label:tmp,value:value}
    // console.log(value, options);
    
    const selectCarItem = arr.find((item) => {
      return item.id === value;
    });
    // console.log('区分数组',arr, options.label,selectCarItem.carriageList);

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
        options={arr.map((element) => ({
          label: (
            <span style={{ color: element.mainLine === '离线' ? 'rgb(125, 136, 163)' : 'rgb(65, 167, 81)' }}>
              {element.carName}
            </span>
          ),
          value: element.id,
        }))}
        // options={arr.map((element) => ({
        //   label: element.carName,
        //   value: element.id,
        // }))}
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
