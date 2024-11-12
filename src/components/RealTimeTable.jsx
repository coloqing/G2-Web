import { useEffect, useState } from "react";
import styles from "../css/RealTimeTable.module.css";
import lineApiController from "../api/lineApi";
import MyTable from "./Common/MyTable";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
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
      // console.log('获取车辆状态列表', result);
      if (result?.data) {
        // 使用 sort 方法排序数组
        result.data.sort((a, b) => {
          // 如果 a.mainLine 是 '正线'，则返回 -1，表示 a 应该排在 b 前面
          // 如果 b.mainLine 是 '正线'，则返回 1，表示 b 应该排在 a 前面
          // 如果两者都不是 '正线'，则返回 0，表示它们的顺序不变（但实际上，你可以根据需要进一步定义排序逻辑）
          if (a.mainLine === '正线') return -1;
          if (b.mainLine === '正线') return 1;
          // 可选的：如果你想要进一步排序非'正线'的元素，可以在这里添加逻辑
          return 0; // 默认情况，不改变顺序（或者根据其他属性排序）
        });
        setData(result?.data);
      }
    }
    getData();
  }, [timer]);

  const columns = [
    {
      title: "车号",
      dataIndex: "lch",
      key: "lch",
      align: 'center',
    },
    {
      title: "设备状态",
      dataIndex: "mainLine",
      key: "mainLine",
      render: (mainLine) => (
        <MainLineTag>{mainLine}</MainLineTag>
      ),
      align: 'center',
    },
    {
      title: "预警",
      dataIndex: "alert",
      key: "alert",
      align: 'center',
    },
    {
      title: "故障",
      dataIndex: "fault",
      key: "fault",
      align: 'center',
    },
    {
      title: "操作",
      dataIndex: "lch",
      render: (lch) => <Link style={{color:'#2186cf'}} to={`/car?car=${lch}`}>详情</Link>,
      align: 'center',
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
