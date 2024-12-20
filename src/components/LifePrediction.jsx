// import { useEffect, useState } from "react";
import React, { forwardRef, useImperativeHandle } from 'react';
import stylesPublic from "../css/Common/ThreeBlock.module.css";

import MyTable from "./Common/MyTable";
import ProgressBar from "../components/Common/ProgressBar";
// import LineCharTemplate from "./Chars/LineCharTemplate";
import commonApiController from "../api/common";
import { Link } from "react-router-dom";
import { Button } from "antd";
// import { handleResetClick } from "../page/Line";

// export default function LifePrediction(props,ref) {
  const LifePrediction =  forwardRef((props, ref) => {
    // 暴露的方法
    useImperativeHandle(ref, () => ({
      resetLifeVal,
    }));
  // const [charData, setCharData] = useState({});
  // const [charParam, setcharParam] = useState({ xdid: "", dateTime: "" ,cxh:'' });
  // useEffect(() => {
  //   async function getData1(param) {
  //     const result = await commonApiController.CharDataApi(param);
  //     setCharData(result?.data);
  //   }
  //   if (charParam.xdid) getData1(charParam);
  // }, [charParam,timer]);
  // console.log('寿命预测信息', props);
  var data = props.data ? props.data : [];
  const columns = [
    {
      title: "车厢",
      dataIndex: "cxh",
      key: "cxh",
      width: "3.2vw",
      ellipsis: true,
      render: (cxh, row) => {
        // // 假设row中有一个status属性，用于决定颜色  
        // let textColor = 'white'; // 默认颜色  
        // if (row.sbid < 500) {
        //   textColor = 'green'; // 激活状态为绿色  
        // } else if (row.sbid > 500) {
        //   textColor = 'grey'; // 非激活状态为灰色  
        // }
        return (
          <Link
            style={{ color: "white", textDecoration: "underLine" }}
            to={`/Part?car=${row.lch}&part=${row.cxh}`}
          >
            {cxh}
          </Link>
        )
      },
      align: 'center',
    },
    {
      title: "位置",
      dataIndex: "componentPosition",
      key: "componentPosition",
      width: "3vw",
      ellipsis: true,
      align: 'center',
    },
    {
      title: "部件名称",
      dataIndex: "componentName",
      key: "componentName",
      width: "6vw",
      ellipsis: true,
      align: 'center',
    },
    {
      title: "已耗寿命(h)",
      dataIndex: "usedLifespan",
      key: "usedLifespan",
      ellipsis: true,
      width: "3vw",
      align: 'center',
    },
    {
      title: "剩余寿命(h)",
      dataIndex: "leaveLifespan",
      key: "leaveLifespan",
      ellipsis: true,
      render: (text, record, index) => (
        <ProgressBar
          percent={
            record.usedLifespan / (record.usedLifespan + record.leaveLifespan)
          }
          data={record.leaveLifespan}
        />
      ),
      align: 'center',
    },
    {
      title: "操作",
      ellipsis: true,
      render: (text, record, index) => (
        <Button
          type="text"
          block
          style={{
            width: "3.5vw",
            height: "3.5vh",
            fontWeight: "bold",
          }}
          // onClick={() => resetLifeVal(record.id)}
          onClick={() => props.onReset(record.id)}
        >
          重置
        </Button>
      ),
      align: 'center',
    },
  ];

  async function resetLifeVal(id,value) {
    // console.log("重置寿命", id,value);
    
    await commonApiController.UpdateLifePredictionApi(id,value);

    await getData5(0)
  }

  async function getData5(id) {
    const result = await commonApiController.LifePredictionListApi(id);
    data = result.data
  }

  function changeRowIndex(row) {

  }

  return (
    <>
      <div
        className={stylesPublic.cardContextTop}
        style={{ height: props.tableHeight + 4 + "vh" }}
      >
        <MyTable
          data={data}
          columns={columns}
          height={props.tableHeight + "vh"}
          changeRowIndex={changeRowIndex}
          onReset={resetLifeVal}
        />

      </div>

      {/* <div className={stylesPublic.cardContextBottom}>
        <div className={stylesPublic.line}>
          {charData?.type === "line" ? (
            <LineCharTemplate data={{ ...charData }} />
          ) : null}
        </div>
      </div> */}
    </>
  );
})
// 确保导出组件
export default LifePrediction;