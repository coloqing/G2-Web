import { useEffect, useState } from "react";
import styles from "../css/RealTimeTable.module.css";
import lineApiController from "../api/lineApi";
import MyTable from "./Common/MyTable";
import { Link, useNavigate } from "react-router-dom";

import {  useSelector } from "react-redux";
import MainLineTag from "./Common/MainLineTag";
export default function RealTimeTable() {
  const navigate = useNavigate();
  // 故障告警 FaultAlarm
  // 寿命预测 LifePrediction
  // 状态预警 StatusAlert
  const [data, setData] = useState([]);
  const timer = useSelector((state) => state.timer.timer);
  useEffect(() => {
    async function getData() {
      const result = await lineApiController.RealTimeInfoLineLevelApi();
      if (result?.data)
        setData(result?.data);
    }
    getData();
  }, [timer]);

  const columns = [
    {
      title: "车号",
      dataIndex: "lch",
      key: "lch",
      align:'center',
    },
    {
      title: "状态",
      dataIndex: "mainLine",
      key: "mainLine",
      render: (mainLine) =>(
        <MainLineTag>{mainLine}</MainLineTag>
      ),
      align:'center',
    },
    {
      title: "预警",
      dataIndex: "alert",
      key: "alert",
      align:'center',
    },
    {
      title: "故障",
      dataIndex: "fault",
      key: "fault",
      align:'center',
    },
    {
      title: "操作",
      dataIndex: "lch",
      render: (lch) => <Link to={`/car?car=${lch}`}>详情</Link>,
      align:'center',
    },

  ];

  function doubleClick(row) {
    navigate("/car?car=" + row.lch);
  }

  return (
    <div className={styles.content}>
      <MyTable
        data={data}
        columns={columns}
        height={"50vh"}
        disableClick={true}
        doubleClick={doubleClick}
      />
    </div>
  );
}
