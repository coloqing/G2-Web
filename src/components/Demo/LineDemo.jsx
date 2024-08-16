import React from "react";
import { Line } from "@ant-design/plots";

function LineDemo() {
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];
  const s = {
    // fill: "green",
    fillOpacity: 0.5,
    stroke: "red",
    lineWidth: 5,
    // lineDash: [4, 5],
    // lineOpacity: 0.1,
    opacity: 1,
    strokeOpacity: 1,
    shadowColor: "red",
    // shadowBlur: 10,
    // shadowOffsetX: 5,
    // shadowOffsetY: 5,
    cursor: "pointer",
  };

  const config = {
    data,
    xField: "year",
    yField: "value",
    lineStyle: s,
    // width:200,
    // height:400,
    autoFit: true,
    padding: [40, 200, 40, 200],
    // 自定义折线颜色
    color: "red",
    // 更改辅助数据点大小及样式
    // point: {
    //   size: 5,
    //   shape: "diamond",
    //   style: {
    //     // stroke: "#0ff",
    //     lineWidth: 2,
    //     fillOpacity: 0.6,
    //   },
    // },
    xAxis: {
      label: {
        style: {
          fill: "red",
          opacity: 0.6,
          fontSize: 24,
        },
        // rotate: true
      },
      title: {
        text: "中文标题",
        position: "center",
        style: {
          // fill: 'red',
          // fillOpacity: 1,
          // stroke: 'black',
          // lineWidth: 2,
          // lineDash: [4, 5],
          // strokeOpacity: 1,
          // shadowColor: 'black',
          // shadowBlur: 10,
          // shadowOffsetX: 5,
          // shadowOffsetY: 5,
          cursor: "pointer",
          fontSize: 18,
        },
      },

      legend: {
        layout: "horizontal",
        position: "right",
      },
    },
    yAxis: {
      nice:true,
      // min: -20,
      // max: 20,
      // 格式化 y 轴标签加单位，自定义 labal 样式
      label: {
        formatter: (v) => {
          return v + "k";
        },
        style: {
          // fill: 'red',
          stroke: 0,
          // lineWidth:30
          // fontSize: 20,
          // textAlign:'start'
        },
      },
      grid: {
        line: {
          style: {
            stroke: "black",
            lineWidth: 1,
            // lineDash: [4, 5],
            opacity: 1,
            strokeOpacity: 1,
            // shadowColor: 'black',
            // shadowBlur: 10,
            // shadowOffsetX: 5,
            // shadowOffsetY: 5,
            cursor: "pointer",
          },
        },
      },
    },
    // 添加label
    label: {
      style: {
        fill: "red",
        stroke: 0,
        // lineWidth:30
        fontSize: 40,
        // textAlign:'start'
      },
    },
    legend: {
      
    },
    meta: {
      // value: {
      //   max: 2000,
      //   min: -1000,
      // },
      year: {
        formatter: (val) => `${val} 月`,
      },
    },
    // 添加辅助文本、辅助线
    // annotations: [
    //   {
    //     type: "text",
    //     position: ["min", "median"],
    //     content: "辅助标记",
    //     offsetY: -4,
    //     style: {
    //       textBaseline: "bottom",
    //     },
    //   },
    //   {
    //     type: "line",
    //     start: ["min", "median"],
    //     end: ["max", "median"],
    //     style: {
    //       stroke: "red",
    //       lineDash: [2, 2],
    //     },
    //   },
    // ],
  };

  return <Line {...config} />;
}

export default LineDemo;
