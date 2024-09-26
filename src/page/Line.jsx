import { Button, Card, Select } from "antd";
import { useEffect, useState } from "react";
import styles from "../css/Line/Line.module.css";
import CardTitle from "../components/Common/CardTitle";
import FaultAlarm from "../components/FaultAlarm";
import LifePrediction from "../components/LifePrediction";
import StatusAlert from "../components/StatusAlert";
import RealTimeTable from "../components/RealTimeTable";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import lineApiController from "../api/lineApi";
import commonApiController from "../api/common";
import classNames from "classnames";
import ChildSystemStatus from "../components/Line/ChildSystemStatus";

import ColumnCharTemplate from "../components/Chars/ColumnCharTemplate";

function Line() {
  const [carStatus, setCarStatus] = useState();

  const [faultAlarmList, setFaultAlarmList] = useState(null);
  const [statusAlertList, setStatusAlertList] = useState(null);
  const [lifePredictionList, setLifePredictionList] = useState(null);

  const [charFaultList, setCharFaultList] = useState([]);
  const [charAlarmList, setCharAlarmList] = useState([]);

  const [alarmParam, setAlarmParam] = useState({
    type: 2,
    lastMonth: 6,
  });
  const [faultParam, setFaultParam] = useState({
    type: 3,
    lastMonth: 6,
  });

  const timer = useSelector((state) => state.timer.timer);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData1() {
      const result = await lineApiController.CarHealthNumApi();
      if (result?.data) setCarStatus(result.data);
    }
    async function getData3(id) {
      const result = await commonApiController.FaultAlarmListApi(id);
      if (result?.data) setFaultAlarmList(result.data);
    }
    async function getData4(id) {
      const result = await commonApiController.StatusAlertListApi(id);
      if (result?.data) setStatusAlertList(result.data);
    }
    async function getData5(id) {
      const result = await commonApiController.LifePredictionListApi(id);
      if (result?.data) setLifePredictionList(result.data);
    }
    getData1();
    getData3(0);
    getData4(0);
    getData5(0);
  }, [timer]);

  useEffect(() => {
    async function getData6(data) {
      const result = await lineApiController.FaultAralmListByMonthApi(data);
      if (result?.data) setCharFaultList(result.data);
    }
    async function getData7(data) {
      const result = await lineApiController.FaultAralmListByMonthApi(data);
      if (result?.data) setCharAlarmList(result.data);
    }

    getData6(faultParam);
    getData7(alarmParam);
  }, [alarmParam, faultParam]);

  // 样式
  const cardHeadStyle = {
    height: "3.5vh",
    padding: "0 0.5vw",
    borderBottom: "1px solid #404447",
    overflow: "hidden",
  };
  const cardBodyStyle = { padding: "0" };

  return (
    <div className={styles.main}>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="车辆状态列表" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
        >
          <RealTimeTable className={styles.RealTimeTable} />
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="子系统设备状态" />}
          // bodyStyle={cardBodyStyle}
          bodyStyle={{padding:'0',height:'55vh',display:'flex',justifyContent:'center',alignItems:'center'}}
          headStyle={cardHeadStyle}
        >
          <ChildSystemStatus {...carStatus}/>
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="车辆故障信息" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
          extra={
            <Button
              type="text"
              block
              style={{
                width: "3.5vw",
                height: "3.5vh",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/list")}
            >
              更多
            </Button>
          }
        >
          <FaultAlarm data={faultAlarmList} tableHeight={21} hideChar={true} />
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="车辆预警信息" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
          extra={
            <Button
              type="text"
              block
              style={{
                width: "3.5vw",
                height: "3.5vh",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/list")}
            >
              更多
            </Button>
          }
        >
          <StatusAlert
            data={statusAlertList}
            tableHeight={21}
            hideChar={true}
          />
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="故障分布统计" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Select
              value={faultParam.lastMonth}
              style={{ width: "5vw", height: 24 }}
              onChange={(value) => {
                setFaultParam({ ...faultParam, lastMonth: value });
              }}
              options={[
                { value: 1, label: "近一月" },
                { value: 3, label: "近三月" },
                { value: 6, label: "近六月" },
              ]}
              dropdownStyle={{
                backgroundColor: "#060a2d",
                borderRadius: 0,
                border: "1px solid #517992",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.columnChar}>
              <ColumnCharTemplate data={charFaultList} />
            </div>
          </div>
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="预警分布统计" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Select
              value={alarmParam.lastMonth}
              style={{ width: "5vw", height: 24 }}
              onChange={(value) => {
                setAlarmParam({ ...alarmParam, lastMonth: value });
              }}
              options={[
                { value: 1, label: "近一月" },
                { value: 3, label: "近三月" },
                { value: 6, label: "近六月" },
              ]}
              dropdownStyle={{
                backgroundColor: "#060a2d",
                borderRadius: 0,
                border: "1px solid #517992",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.columnChar}>
              <ColumnCharTemplate data={charAlarmList} />
            </div>
          </div>
        </Card>
      </div>
      <div className={classNames(styles.divItem, "")}>
        <Card
          title={<CardTitle title="寿命预测信息" />}
          bodyStyle={cardBodyStyle}
          headStyle={cardHeadStyle}
        >
          <LifePrediction data={lifePredictionList} tableHeight={30} />
        </Card>
      </div>
    </div>
  );
}

export default Line;
