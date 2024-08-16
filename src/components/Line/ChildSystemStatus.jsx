import React from "react";
import styles from "../../css/Line/ChildSystemStatus.module.css";
import { Row, Col } from "antd";
import NumberBlock from "../Common/NumberBlock";

export default function ChildSystemStatus(props) {
  return (
    <div className={styles.main}>
      <div className={styles.top}></div>
      <div className={styles.bottom}>
        {/* 底部三个数量+ */}
        <Row>
          <Col span={22} offset={1}>
            <Row justify="space-around" align={"center"}>
              <Col span={7} align="center">
                <NumberBlock
                  TextColor={"#9aca43"}
                  number={props.normal ?? 0}
                  title="健康车辆数量"
                  unit=""
                />
              </Col>
              <Col span={7} align="center">
                <NumberBlock
                  TextColor={"#f02828"}
                  number={props.fault ?? 0}
                  title="故障车辆数量"
                  unit=""
                />
              </Col>
              <Col span={7} align="center">
                <NumberBlock
                  TextColor={"#e7932c"}
                  number={props.alarm ?? 0}
                  title="预警车辆数量"
                  unit=""
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
