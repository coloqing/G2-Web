import React from "react";
import { useWindowSize } from "@react-hook/window-size/throttled";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";
// import useScrollPosition from "@react-hook/window-scroll";

export default function WinSizeDemo() {

  const [width, height] = useWindowSize({ fps: 60 });
  const [widthD, heightD] = useWindowSizeD();
  
  // const sizes = useWinSize();

  return (
    <div
      style={{
        color: "white",
        width: "80%",
        border: "1px solid red",
        height:'100vh'
      }}
    >
      {/* <h1>
      页面size：{sizes.width} * {sizes.height}
    </h1> */}

      <h1>Scroll and resize me</h1>
      <div
        style={{
          position: "fixed",
          top: 72,
          left: 0,
          right: 0,
          margin: "auto",
        }}
      >
        {/* <div>scrollY: {scrollY}</div> */}
        <hr />
        <div>width (throttled): {width}</div>
        <div>height (throttled): {height}</div>
        <hr />
        <div>width (debounced): {widthD}</div>
        <div>height (debounced): {heightD}</div>
      </div>
    </div>
  );
}
