import { Space } from "antd";
import React from "react";

export default function ProgressBar(props) {
  let styOut = {
    height: "1.2vh",
    width: "5vw",
    float: "left",
    borderTopRightRadius: "0.5vh",
    borderBottomRightRadius: "0.5vh",
    backgroundColor: "#143686",
    overflow: "hidden",
  };
  let ma = -props?.percent * 100 + "%";
  let styInside = {
    ...styOut,
    // marginLeft: ma, .
    transform: `translateX(${ma})`,
    background: "linear-gradient(to right, #3275f0, #42eec8)",
  };
  return (
    <Space>
      <div style={{ float: "left" }}>{props?.data}</div>
      <div style={styOut}>
        <div style={styInside}></div>
      </div>
    </Space>
  );
}
