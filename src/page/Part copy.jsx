import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import styles from "../css/Part/Part.module.css";
import SelectCarPart from "../components/Common/SelectCarPart";
import Train from "../components/Common/Train";
import SearchParamDecode from "../components/Common/SearchParamDecode";
import CarriageStatusTop from "../components/Part/CarriageStatusTop";
import CardTitle from "../components/Common/CardTitle";
import FaultTableRealTime from "../components/Part/FaultTableRealTime";
import AlertTableRealTime from "../components/Part/AlertTableRealTime";

import partApiController from "../api/part";
import commonApiController from "../api/common";

import StatusRealTime from "../components/Part/StatusRealTime";
import KeyIndicators from "../components/Part/KeyIndicators";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Part = () => {
  const [searchParams, setSearchParams] = useState(null);

  const [faultAlarmTableData, setFaultAlarmTableData] = useState(null);
  const [statuAlertTableData, setStatusAlertTableData] = useState(null);
  const [keyIndicatorsData, setKeyIndicatorsData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [trainColorData, setTrainColorData] = useState([]);

  const navigate = useNavigate();
  const selectDataStore = useSelector((state) => state.carList.selectData);
  const timer = useSelector((state) => state.timer.timer);
  useEffect(() => {
    async function getData1(id) {
      const result = await partApiController.FaultAlarmListByCarriageApi(id);
      if (result?.data) setFaultAlarmTableData(result.data);
    }
    async function getData2(id) {
      const result = await partApiController.StatusAlertListByCarriageApi(id);
      if (result?.data) setStatusAlertTableData(result.data);
    }
    async function getData3(id) {
      const result = await partApiController.KTPartDataRealTimeByCarriageApi(
        id
      );
      if (result?.data) {
        setStatusData(result.data);
        setKeyIndicatorsData({ jz1: result.data.jz1, jz2: result.data.jz2 });
      }
    }
    async function getData6(id) {
      const result = await commonApiController.CarColorListApi(id);
      if (result?.data) setTrainColorData(result.data);
    }

    if (selectDataStore.carriageId) {
      getData1(selectDataStore.carriageId);
      getData2(selectDataStore.carriageId);
      getData3(selectDataStore.carName + selectDataStore.carriageName);

      getData6(selectDataStore.carId);
    }
  }, [selectDataStore, timer]);

  function jumpPart(carriage) {
    navigate(`/Part?car=${selectDataStore.carName}&part=${carriage}`);
  }

  // 样式
  const cardHeadStyle = {
    height: "3.5vh",
    padding:'0 0.5vw',
    borderBottom:'1px solid #404447',
  };
  const cardBodyStyle = {
    padding: "1px 0 0 0 ",
    height: "29vh",
    // border: "1px solid red",
  };
  const cardBodyStyleLeft = {
    padding: "1px 0 0 0 ",
    // height: "29vh",
  };

  return (
    <>
      <Row className={styles.topOutset}>
        <Col>
          <div className={styles.topInside}>
            <Row className={styles.top}>
              <Col>
                <div className={styles.Select}>
                  <SelectCarPart searchParams={searchParams} page="part" />
                </div>
              </Col>
            </Row>
            <Row className={styles.train} align="middle">
              <Col span={22} offset={1}>
                <Train
                  showName="true"
                  jumpPart={jumpPart}
                  trainColorData={trainColorData}
                />
              </Col>
            </Row>
            <Row className={styles.trainStatus} align="middle">
              <Col span={22} offset={1} style={{ height: "100%" }}>
                <CarriageStatusTop
                  carriageId={
                    selectDataStore.carName + selectDataStore.carriageName
                  }
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className={styles.content}>
        <Col span={8}>
          <div className={styles.bottomLeft}>
            <Card
              title={<CardTitle title="故障告警" />}
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
              <FaultTableRealTime data={faultAlarmTableData} tableHeight={24} />
            </Card>
            <Card
              title={<CardTitle title="状态预警" />}
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
              <AlertTableRealTime data={statuAlertTableData} tableHeight={24} />
            </Card>
          </div>
        </Col>
        <Col span={16}>
          <div className={styles.bottomright}>
            <div className={styles.bottomrightImg}>
              <StatusRealTime statusData={statusData} />
            </div>
            <div className={styles.bottomrightKeyData}>
              <Card
                title={<CardTitle title="关键指标数据(机组一)" />}
                bodyStyle={cardBodyStyleLeft}
                headStyle={cardHeadStyle}
                style={{
                  flex: "1 1 auto",
                  border: "solid 1px #404447",
                  marginRight: "5px",
                }}
              >
                {keyIndicatorsData ? (
                  <KeyIndicators data={keyIndicatorsData.jz1} />
                ) : null}
              </Card>
              <Card
                title={<CardTitle title="关键指标数据(机组二)" />}
                bodyStyle={cardBodyStyleLeft}
                headStyle={cardHeadStyle}
                style={{ flex: "1 1 auto", border: "solid 1px #404447" }}
              >
                {keyIndicatorsData ? (
                  <KeyIndicators data={keyIndicatorsData.jz2} />
                ) : null}
              </Card>
            </div>
          </div>
        </Col>
      </Row>

      <SearchParamDecode setSearchParams={setSearchParams} />
    </>
  );
};

export default Part;
