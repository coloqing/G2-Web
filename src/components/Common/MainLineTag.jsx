import React from "react";

export default function MainLineTag(props) {
  let name = props.children;
  let sty = {
    paddingRight: "0.2vw",
    paddingLeft: "0.2vw",
    color: "white",
    textAlign: "center",
    backgroundColor: "#2d3341",
    borderRadius: "0.8vw",
  };
  if (name === "正线") {
    sty.backgroundColor = "#0f3116";
    sty.color = "#41a751";
  }
  if (name === "离线") {
    sty.backgroundColor = "#2d3341";
    sty.color = "#7d88a3";
  }

  return <div style={sty}>{name}</div>;
}
