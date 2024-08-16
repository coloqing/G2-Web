import React from "react";
import { Col, Row } from "antd";
// import dayjs from "dayjs";
import styles from "../../css/Common/FaultAlertNumToday.module.css";
import NumberBlock from "../Common/NumberBlock";

export default function FaultAlertNumToday(props) {
  return (
    <div>
      {/* 顶部时间 */}
      <Row align={"center"}>
        <Col className={styles.ContextTop} align="center">
          {/* {`时间: ${dayjs().year()}年${dayjs().month() + 1}月${dayjs().date()}日`} */}
        </Col>
      </Row>
      {/* 中间 */}
      <Row className={styles.ContextMiddle}>
        <Col span={8}>
          {/* 三个左侧数量 */}
          <Row align="center" className={styles.threeMidNum}>
            <Col>
              <Row align={"middle"}>
                <Col>
                  <div className={styles.yellow}></div>
                </Col>
                <Col>
                  <div className={styles.word}>提示{props.warning?.tips}个</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row align="center" className={styles.threeMidNum}>
            <Col>
              <Row align={"middle"}>
                <Col>
                  <div className={styles.yellow}></div>
                </Col>
                <Col>
                  <div className={styles.word}>
                    预警{props.warning?.alert}个
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row align="center" className={styles.threeMidNum}>
            <Col>
              <Row align={"middle"}>
                <Col>
                  <div className={styles.yellow}></div>
                </Col>
                <Col>
                  <div className={styles.word}>
                    报警{props.warning?.fault}个
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        {/* 最中间大字 */}
        <Col span={8}>
          <Row align="center">
            <Col span={24} className={styles.problem} align="center">
              <span>{props.airConditioning?.problem} </span>
            </Col>
            <Col span={24} align="center">
              <div className={styles.line}></div>
            </Col>
            <Col span={24} className={styles.total} align="center">
              {props.airConditioning?.total}{" "}
            </Col>
          </Row>
        </Col>
      </Row>
      {/* 底部三个数量+ */}
      <Row justify="space-around" align={"center"}>
        <Col span={7} align="center">
          <NumberBlock
            color={"#02ce0d"}
            number={props.airConditioning?.health}
            title="健康期空调数量"
            unit="个"
          />
        </Col>
        <Col span={7} align="center">
          <NumberBlock
            color={"#ff9e14"}
            number={props.airConditioning?.subHealth}
            title="亚健康期空调数量"
            unit="个"
          />
        </Col>
        <Col span={7} align="center">
          <NumberBlock
            color={"#f5170a"}
            number={props.airConditioning?.fault}
            title="故障期空调数量"
            unit="个"
          />
        </Col>
      </Row>
    </div>
  );
}
