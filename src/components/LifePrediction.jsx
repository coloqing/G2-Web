// import { useEffect, useState } from "react";
import stylesPublic from "../css/Common/ThreeBlock.module.css";

import MyTable from "./Common/MyTable";
import ProgressBar from "../components/Common/ProgressBar";
// import LineCharTemplate from "./Chars/LineCharTemplate";
// import commonApiController from "../api/common";
import { Link } from "react-router-dom";

export default function LifePrediction(props) {
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
  const data = props.data ? props.data : [];
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
  ];
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
}
