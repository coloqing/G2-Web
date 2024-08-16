import React from "react";

export default function GradeTag(props) {
  let name = props.children;
  let sty = {
    paddingRight: "0.2vw",
    paddingLeft: "0.2vw",
    color: "white",
    textAlign: "center",
    backgroundColor: "#278fba",
  };
  if (name === "严重") sty.backgroundColor = "#ba3527";
  if (name === "中等") sty.backgroundColor = "#7a5f0d";

  return <div style={sty}>{name}</div>;
}
