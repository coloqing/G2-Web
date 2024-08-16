import React from "react";

import { Line } from "@ant-design/plots";

function LineCharTemplate(props) {
  const data = props.data.data;
  const xF = props.data.field.x ? props.data.field.x : "";
  const yF = props.data.field.y ? props.data.field.y : "";
  const s = {
    // fill: "green",
    fillOpacity: 0.5,
    stroke: "#409ffd",
    lineWidth: 2,
    // lineDash: [4, 5],
    // lineOpacity: 0.1,
    opacity: 1,
    // strokeOpacity: 1,
    // shadowColor: "red",
    // shadowBlur: 10,
    // shadowOffsetX: 5,
    // shadowOffsetY: 5,
    cursor: "pointer",
  };

  const config = {
    animation: false,
    data,
    xField: xF,
    yField: yF,
    lineStyle: s,
    // width:200,
    // height:400,
    autoFit: true,
    // color: "red",
    xAxis: {
      
      label: {
        style: {
          fill: "white",
          opacity: 1,
          fontSize: 11,
        },
        // rotate: true
      },
    },
    yAxis: {
      // min:null,
      label: {
        formatter: (v) => {
          return v + "";
        },
        style: {
          fill: "white",
          stroke: 0,
          // lineWidth:30
          fontSize: 13,
          //   textAlign:'start'
        },
      },
      grid: {
        line: {
          style: {
            stroke: "#172b68",
            lineWidth: 1,
            opacity: 1,
            strokeOpacity: 1,
            cursor: "pointer",
          },
        },
      },
    },
    // label: {
    //   style: {
    //     fill: "red",
    //     stroke: 0,
    //     fontSize: 5,
    //   },
    // },
  };

  return <Line {...config} />;
}

export default LineCharTemplate;
