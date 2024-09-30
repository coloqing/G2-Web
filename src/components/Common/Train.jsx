import styles from "../../css/Common/Train.module.css";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";
import classNames from "classnames";
import imgLeft from "../../assets/6A/left.png";
import imgRight from "../../assets/6A/right.png";
import imgHead from "../../assets/6A/head.png";
import imgTail from "../../assets/6A/tail.png";
import { useSelector, useDispatch } from "react-redux";
import { _getCarList } from "../../Redux/carListSlice";
import React from 'react';
import { useLocation } from 'react-router-dom';
export default function Train(props) {
  const showName = props.showName ?? null;
  const hideBack = props.hideBack ?? false;
  const trainColorData = props.trainColorData;
  const [width] = useWindowSizeD();
  const dispatch = useDispatch();

  const carListStore = useSelector((state) => state.carList.carList);
  const carriageListStore = useSelector((state) => state.carList.carriageList);
  if (!carListStore.length) dispatch(_getCarList());

  const trainNum = carriageListStore.length === 0 ? 6 : carriageListStore.length; //车厢数量

  const imageNum = trainNum * 2 + 2; //包含车头车尾
  const imagePF = trainNum * 2 * 3 + 2; //车厢图片宽度是3倍车头尾
  const height = (((width / 24) * 22) / imagePF / 500) * 800; //按照图片比例根据宽度调整宽度

  const trainImage = [];
  // ali 获取当前路由part
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const part = searchParams.get('part');
  // 当前选中的车厢
  let carriage 
  // console.log('当前选中的part', part);
  if (part === 'A1') {
    carriage = 1
  }else if(part === 'B1'){
    carriage = 3
  }else if(part === 'C1'){
    carriage = 5
  }else if(part === 'C2'){
    carriage = 7
  }else if(part === 'B2'){
    carriage = 9
  }else if(part === 'A2'){
    carriage = 11
  }
  // 边框样式
  const border_le = {
    border:'2px solid #0253fb',
    borderRight:'0px'
  };
  const border_ri = {
    border:'2px solid #0253fb',
    borderLeft:'0px'
  };

  for (let i = 0; i < imageNum; i++) {
    let warning = null;
    let imageUrl = i % 2 === 0 ? imgRight : imgLeft;
    if (i === 0) imageUrl = imgHead;
    if (i === imageNum - 1) imageUrl = imgTail;

    if (i !== 0 && i !== imageNum - 1) {
      let warningClassName = styles.carBase;
      if (!hideBack) {
        let color = 'green';
        let index = Math.floor((i - 1) / 2);
        color = trainColorData?.[index]?.color
        warningClassName += classNames(" ", styles.animation, styles[color]);

      }
      warning = <div className={warningClassName}></div>;
    }
    trainImage.push(
      <div
        key={i}
        className={styles.trainHead}
        style={{
          backgroundImage: `url(${imageUrl})`,
          width:
            i === 0 || i === imageNum - 1
              ? `${100 / imagePF}%`
              : `${(100 / imagePF) * 3}%`,
          height: `${height}px`,
          cursor: "pointer",
          ...((carriage === i || carriage === i-1)) && (i % 2 !== 0) ? border_le:{},
          ...((carriage === i || carriage === i-1)) && (i % 2 === 0) ? border_ri:{}
        }} 
        
        onClick={() =>
          i === 0 || i === imageNum - 1 ? null : onDoubleClick(i)
        }
      >
        {warning}
      </div>
    );
  }

  const trainName = [];
  for (let i = 0; i <= trainNum; i++) {
    trainName.push(
      <div
        key={i}
        style={{
          textAlign: "center",
          color: "#1adaeb",
          width:
            i === 0 || i === imageNum - 1
              ? `${100 / imagePF}%`
              : `${(100 / imagePF) * 3 * 2}%`,
          cursor: "pointer",
        }}
        onClick={() =>
          i === 0
            ? null
            : onClickHandle(carriageListStore?.[i - 1]?.name.padStart(2, "0"))
        }
      >
        {i !== 0 ? carriageListStore?.[i - 1]?.name.padStart(2, "0") : ""}
      </div>
    );
  }
  function onClickHandle(carriage) {
    if (props.jumpPart) props.jumpPart(carriage);
  }
  function onDoubleClick(i) {
    let index = Math.floor((i + 1) / 2) - 1;
    if (props.jumpPart) props.jumpPart(carriageListStore?.[index].name);
  }
  return (
    <div>
      <div className="flex">{trainImage}</div>
      {showName ? (
        <div className="flex" style={{ marginTop: "1vh" }}>
          {trainName}
        </div>
      ) : null}
    </div>
  );
}
<style>



</style>