import React from "react";
import styles from "../../css/Common/CardTitle.module.css";
import { Col, Row } from "antd";

export default function CardTitle(props) {
  return (
    <Row>
      {/* <Col span={1}>
        <div className={styles.left} />
      </Col> */}
      <Col span={20}>
        <div className={styles.center}>{props.title}</div>
        {/* {props.num ? <div className={styles.right}>{props.num > 99 ? '99+' : props.num}</div> : null} */}
      </Col>
    </Row>
  );
}
