import React from "react";

import img0 from "../../assets/6A/0.png";
import img1 from "../../assets/6A/1.png";

export default function TestDemo() {
  console.log(img0);
  console.log(img1);
  return <div>
    <img src={img0} alt="" />
    <img src={img1} alt="" />
  </div>;
}
