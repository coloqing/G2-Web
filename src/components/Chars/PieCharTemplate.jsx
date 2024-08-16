import React from "react";
import { Pie } from "@ant-design/plots";

export default function PieCharTemplate(props) {
  const data = props.data ?? [];
  const config = {
    animation: false,
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.6,
    label: {
      type: "outer",
      content: "{name} {percentage}",
      style: {
        fill: "white",
        opacity: 1,
        fontSize: 15,
      },
    },
    legend: false,
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
}
