import React from "react";
import { Gauge } from "@ant-design/plots";
import styles from '../../css/Char/GaugeCharTemplate.module.css'

export default function GaugeCharTemplate(props) {
  const data =props.data
  const config = {
    animation: false,
    percent: data.value / (data.max - data.min),
    radius: 1,
    innerRadius: 0.9,
    startAngle: (Math.PI / 180) * 135,
    endAngle: (Math.PI / 180) * 45,
    range: {
      color: [
        "l(0) 0:#316ff1 0.2#38a3e1 0.3:#38a3e1 0.6#3dc8d4 0.8#41e3cc 1:#43f1c7",
        "#143686",
      ],
      width: 12,
    },
    gaugeStyle: {
      // fill: "red",
      fillOpacity: 1,
      stroke: "#191f2e",
      lineWidth: 1,
    },
    axis: {
      label: {
        formatter(v) {
          return "";
        },
      },
      tickLine: {
        alignTick: true,
        length: 24,
        style: {
          stroke: "#1adaeb",
          lineWidth: 1,
          lineDash: [8, 8],
          cursor: "pointer",
        },
      },
      subTickLine: {
        count: 12,
        length: 24,
        style: {
          fill: "red",
          lineWidth: 1,
          lineDash: [8, 8],
          strokeOpacity: 0.9,
          cursor: "pointer",
        },
      },
    },
    indicator: {
      pointer: null,
      pin: null,
    },
    statistic: {
      title: {
        offsetY: -40,
        style: {
          fontSize: 15,
          // fontSize: 20,
          color: "#13a2b3",
        },
        formatter: () => data.value.toFixed(2) + data.unit,
      },
      content: {
        offsetY: -20,
        style: {
          fontSize: "15px",
          lineHeight: "20px",
          color: "white",
        },
        formatter: () => data.title,
      },
    },
  };
  return (
    <div className={styles.main} >
      <Gauge {...config} />
      <div className={styles.bottom}>
        <span>{data.min.toFixed(0)}{data.unit}</span>
        <span>{data.max.toFixed(0)}{data.unit}</span>
      </div>
    </div>

  )
}
