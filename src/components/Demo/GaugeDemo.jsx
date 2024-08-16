import React  from "react";
import { Gauge } from "@ant-design/plots";

export default function GaugeDemo() {
  const config = {
    percent: 0.5,
    // type: "meter",
    // meter: {
    //   steps: 200,
    //   stepRatio: 0.5,
    //   tickCount: 100
    // },
    radius: 1,
    innerRadius: 0.9,
    startAngle: (Math.PI / 180) * 135,
    endAngle: (Math.PI / 180) * 45,
    range: {
      //   ticks: [0, 1 / 4, 2 / 4, 3 / 4, 1],
      //   color: ["#F4664A", "#FAAD14", "red"],
      color: ["l(0) 0:#316ff1 0.2#38a3e1 0.3:#38a3e1 0.6#3dc8d4 0.8#41e3cc 1:#43f1c7",'#143686'],
      width: 12,
    },
    gaugeStyle: {
      // fill: "red",
      fillOpacity: 1,
      stroke: "#191f2e",
      lineWidth: 1,
    //   strokeOpacity: 0.7,
      shadowColor: "black",
    //   shadowBlur: 10,
    //   shadowOffsetX: 5,
    //   shadowOffsetY: 5,
    //   cursor: "pointer",
    },
    axis: {
      label: {
        formatter(v) {
          return ""; // Number(v) * 100;
        },
      },
      tickLine: {
        alignTick: true,
        // alignTick:false,
        length: 24,
        style: {
            // fill: "red",
            //   fillOpacity: 0.5,
              stroke: "#1adaeb",
            lineWidth: 1,
            lineDash: [8, 8],
            // strokeOpacity: 0.7,
            //   shadowColor: "black",
            //   shadowBlur: 10,
            //   shadowOffsetX: 5,
            //   shadowOffsetY: 5,
            cursor: "pointer",
          },
      },
      subTickLine: {
        count: 15,
        length: 24,
        style: {
          fill: "red",
          //   fillOpacity: 0.5,
          //   stroke: "black",
          lineWidth: 1,
          lineDash: [8, 8],
          strokeOpacity: 0.5,
          //   shadowColor: "black",
          //   shadowBlur: 10,
          //   shadowOffsetX: 5,
          //   shadowOffsetY: 5,
          cursor: "pointer",
        },
      },
    },
    indicator: {
      pointer: null,
      pin: null,
      // pointer: {
      //   style: {
      //     stroke: "green",
      //   },
      // },
      // pin: {
      //   style: {
      //     stroke: "blue",
      //   },
      // },
    },
    statistic: {
      title: {
        offsetY: -40,
        style: {
          fontSize: 20,
          color: "#4B535E",
        },
        formatter: () => "22℃",
      },
      content: {
        offsetY: -20,
        style: {
          fontSize: '15px',
          lineHeight: "20px",
          color: "#4B535E",
        },
        formatter: () => "加载进度",
      },
    },
  };
  return (
    <Gauge
      {...config}
      style={{
        // backgroundColor: "white",
        border: "1px solid red",
        height: "150px",
        width: "150px",
      }}
    />
  );
}
