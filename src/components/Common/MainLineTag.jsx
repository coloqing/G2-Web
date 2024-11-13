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
    // sty.color = "#41a751";
    sty.color = "#60ae46";
  }
  else if (name === "库内") {
    sty.backgroundColor = "#0f3116";
    sty.color = "#41a751";
  }
  else if (name === "离线") {
    sty.backgroundColor = "#2d3341";
    // sty.color = "#7d88a3";
    sty.color = "#c0c0c0";
  }

  return <div style={sty}>{name}</div>;
}
