import React from "react";
import white from "../../assets/Part/Fan/gklx-white.gif";
import blue from "../../assets/Part/Fan/gklx-blue.gif";

export default function Fan(props) {
  return (
    <div
      style={{
        // border: "1px solid red",
        marginTop: "15px",
        marginLeft: "0px",
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}
    >
      {props.run ? (
        <img src={blue} alt="" width={"100px"} height={"100px"} />
      ) : (
        <img src={white} alt="" width={"100px"} height={"100px"} />
      )}
      <div
        style={{
          color: "white",
          fontSize:'1vw',
        }}
      >
        {props.title}
      </div>
    </div>
  );
}
