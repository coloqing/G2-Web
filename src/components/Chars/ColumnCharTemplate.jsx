import React from 'react'
import { Column } from "@ant-design/plots";

export default function ColumnCharTemplate(props) {
  const data=props.data || []

  const config = {
    animation: false,
    autoFit: true,
    data,
    xField: "name",
    yField: "value",
    seriesField: "type",
    isGroup: true,
    columnStyle: {
      // radius: [20, 20, 0, 0],
    },
  };

  return (
       <Column {...config} />
  )
}
