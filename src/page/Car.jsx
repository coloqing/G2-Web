import { useState, useEffect,useRef } from "react";
import styles from "../css/Car/Car.module.css";
import { Row, Button, Col, Card, Radio, Select, Modal, Form, Input } from "antd";

import Train from "../components/Common/Train";
import SelectCarPart from "../components/Common/SelectCarPart";
import CardTitle from "../components/Common/CardTitle";
import FaultAlertNumToday from "../components/Common/FaultAlertNumToday";
import FaultAlarm from "../components/FaultAlarm";
import LifePrediction from "../components/LifePrediction";
import StatusAlert from "../components/StatusAlert";
import PieCharTemplate from "../components/Chars/PieCharTemplate";
import SearchParamDecode from "../components/Common/SearchParamDecode";

import commonApiController from "../api/common";
import carApiController from "../api/car";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Car() {
  const navigate = useNavigate();
  // 右侧三框
  const [faultAlarmList, setFaultAlarmList] = useState(null);
  const [statusAlertList, setStatusAlertList] = useState(null);
  const [lifePredictionList, setLifePredictionList] = useState(null);

  const [faulrAlertToday, setFaulrAlertToday] = useState({});

  const [faultAlarmPieData, setFaultAlarmPieData] = useState({});

  const [pieType, setPieType] = useState("warning");
  const [pieTypeTime, setPieTypeTime] = useState("1");

  const [searchParams, setSearchParams] = useState(null);

  const [trainColorData, setTrainColorData] = useState([]);

  // console.log("searchParams", searchParams);
  const selectDataStore = useSelector((state) => state.carList.selectData);
  const timer = useSelector((state) => state.timer.timer);

  useEffect(() => {
    async function getData2(id) {
      const result = await commonApiController.FaultAlertNumTodayApi(id);
      if (result?.data) setFaulrAlertToday(result.data);
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
    async function getData6(id) {
      const result = await commonApiController.CarColorListApi(id);
      if (result?.data) setTrainColorData(result.data);
    }

    if (selectDataStore.carId) {
      getData2(selectDataStore.carId);
      getData3(selectDataStore.carId);
      getData4(selectDataStore.carId);
      getData5(selectDataStore.carId);
      getData6(selectDataStore.carId);
    }
  }, [selectDataStore.carId, timer]);

  useEffect(() => {
    async function getData6(carId, pTime) {
      const result = await carApiController.FaultAlarmTypePieDateTodayApi(
        carId,
        pTime
      );
      setFaultAlarmPieData(result?.data ?? {});
    }
    if (selectDataStore.carId) getData6(selectDataStore.carId, pieTypeTime);
  }, [selectDataStore.carId, pieTypeTime, timer]);

  // 样式
  const cardHeadStyle = {
    height: "3.5vh",
    padding: '0 0.5vw',
    borderBottom: '1px solid #404447',
  };
  const select = {
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    zIndex: 99999, 
    color: '#ffffe6'
  };
  const cardBodyStyle = { padding: "1px 0px 0px 0px" };

  function jumpPart(carriage) {
    navigate(`/Part?car=${selectDataStore.carName}&part=${carriage}`);
  }
  const [showTextBox, setShowTextBox] = useState(false);


// -=====================
    // 选中的车厢
    const childRef = useRef();
    const [resetId, setResetId] = useState(0); // 存储选中的车厢 ID
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制第一个模态框
    const [isDoubleConfirmVisible, setDoubleConfirmVisible] = useState(false); // 控制二次确认模态框
    const [consumedLifespan, setConsumedLifespan] = useState(''); // 存储输入的寿命消耗值
    const [form] = Form.useForm(); // 创建表单实例
    const handleResetClick = (id) => {
      setConsumedLifespan('')
      form.resetFields();    
      setResetId(id)
      setIsModalVisible(true); // 显示确认弹出框
    };
  
    const handleDoubleConfirmReset = async () => {
      setDoubleConfirmVisible(false); // 关闭二次确认弹框
      if (childRef.current) {
        // console.log(childRef.current);
        childRef.current.resetLifeVal(resetId, consumedLifespan); // 调用子组件的方法
      }
    };
  
    const handleCancelReset = () => {
      setIsModalVisible(false); // 关闭第一个弹出框
    };
  
    const handleDoubleCancelReset = async () => {
      setDoubleConfirmVisible(false); // 关闭二次确认弹框
    };
    // useEffect(() => {
    //   if (isModalVisible) {
    //     const input = document.getElementById("first-input");
    //     if (input) {
    //       input.focus();
    //     }
    //   }
    // }, [isModalVisible]);
  
    // -=------------------


 
  // const handleButtonClick = () => {
  //   setShowTextBox(true);
  // };
 
  // const handleCloseClick = () => {
  //   setShowTextBox(false);
  // };
  return (
    <>
 {/* <div>
      <button onClick={handleButtonClick}>显示文本框</button>
      {showTextBox && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <input type="text" />
          <button onClick={handleCloseClick}>关闭文本框</button>
        </div>
      )}
    </div> */}
      <Row className={styles.topOutset}>
        <Col>
          <div className={styles.topInside}>
            <Row className={styles.top}>
              <Col>
                <div className={styles.Select}>
                  <SelectCarPart
                    hideCarriage={true}
                    searchParams={searchParams}
                    page="car"
                  />
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
          </div>
        </Col>
      </Row>
      <Row className={styles.content}>
        <Col span={6}>
          <div className={styles.borderLine}>
            <Card
              title={<CardTitle title="今日预警报警/空调数量" />}
              bodyStyle={cardBodyStyle}
              headStyle={cardHeadStyle}
            >
              <div className={styles.ktTodayWarningNum}>
                <FaultAlertNumToday {...faulrAlertToday} />
              </div>
            </Card>
            <Card
              title={<CardTitle title="预警/报警类型" />}
              bodyStyle={cardBodyStyle}
              headStyle={cardHeadStyle}
            >
              <div style={{ height: "39.5vh" }}>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <Select
                    value={pieTypeTime}
                    style={{ width: "8vw", height: 24 }}
                    onChange={(value) => {
                      setPieTypeTime(value);
                    }}
                    options={[
                      { value: "1", label: "近一月" },
                      { value: "3", label: "近三月" },
                      { value: "6", label: "近六月" },
                    ]}
                    dropdownStyle={{
                      backgroundColor: "#060a2d",
                      borderRadius: 0,
                      border: "1px solid #517992",
                    }}
                  />
                  <Radio.Group
                    value={pieType}
                    buttonStyle="solid"
                    onChange={(e) => {
                      setPieType(e.target.value);
                    }}
                  >
                    <Radio.Button value="warning">预警类型</Radio.Button>
                    <Radio.Button value="alarm">报警类型</Radio.Button>
                  </Radio.Group>
                </div>
                <div style={{ height: "95%" }}>
                  <PieCharTemplate data={faultAlarmPieData[pieType]} />
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.borderLine}>
            <Card
              title={<CardTitle title="故障告警" num={100} />}
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
              <FaultAlarm data={faultAlarmList} tableHeight={71} />
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.borderLine}>
            <Card
              title={<CardTitle title="状态预警" num={10} />}
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
              <StatusAlert data={statusAlertList} tableHeight={71} />
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className={styles.borderLine}>
            <Card
              title={<CardTitle title="寿命预测" num={20} />}
              bodyStyle={cardBodyStyle}
              headStyle={cardHeadStyle}
            >
              <LifePrediction ref={childRef} onReset={handleResetClick} data={lifePredictionList} tableHeight={71} />
            </Card>
          </div>
        </Col>
      </Row>

      <SearchParamDecode setSearchParams={setSearchParams} />
      <div>
        <Modal
          title="寿命重置"
          open={isModalVisible}
          onOk={() => {
            form.validateFields()
              .then(values => {
                setConsumedLifespan(values.consumedLifespan);
                setDoubleConfirmVisible(true); // 显示二次确认弹框
                const inputElement = document.getElementById('first-input');
                if (inputElement) {
                  inputElement.blur();
                }
              
                setIsModalVisible(false);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
          onCancel={handleCancelReset}
          okText="确认"
          cancelText="取消"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="consumedLifespan"
              label="已消耗寿命"
              rules={[{ required: true, message: '请输入已消耗寿命' }]} // 设置为必填
            >
              <Input
                id="first-input"
                value={consumedLifespan}
                onChange={(e) => setConsumedLifespan(e.target.value)} // 更新输入值
                placeholder={consumedLifespan + "请输入已消耗寿命"} // 输入框提示
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 二次确认模态框 */}
        <Modal
          title="请再确认是否进行寿命重置"
          open={isDoubleConfirmVisible}
          onOk={handleDoubleConfirmReset}
          onCancel={() => setDoubleConfirmVisible(false)} // 关闭二次确认模态框
          okText="确认"
          cancelText="取消"
        //  className="custom-modal"
        >
          <p>你确定要重置车号为 {resetId} 的部件已消耗寿命为 {consumedLifespan} 吗？</p>
        </Modal>
      </div>
    </>
  );
}

export default Car;
