import React from "react";
import styles from "../../css/Part/KeyIndicators.module.css";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";

import PropertyBox from "./PropertyBox";
import CarriageStatus from "./CarriageStatus";

export default function KeyIndicators(props) {
  const data = props.data;
  const statueData = data?._char;

  let gaugeNum = statueData?.gauges?.length ?? 0;
  let fanNum = statueData?.gauges?.length ?? 0;
  let verticalProgressBarNum = statueData?.gauges?.length ?? 0;

  const [widthD, heightD] = useWindowSizeD();
  // const widthYs =
  //   ((widthD / 3) * 2 * 2) / (gaugeNum + fanNum + verticalProgressBarNum);
  // const heightYs = heightD * 0.11;
  const widthYs =
    ((widthD / 24) * 22) / (gaugeNum + fanNum + verticalProgressBarNum);
  const heightYs = heightD * 0.17;
  let scale = 1;
  let size = 190;

  if (widthYs < size || heightYs < size)
    scale = (widthYs > heightYs ? heightYs : widthYs) / size;

  // console.log(`宽度${widthYs},高度${heightYs} 变形${scale}`); styles.gaugeChar

  return (
    <div>
      <div className={styles.keyIndicatorsTop}>
        {/* <CarriageStatus data={statueData}/> */}
        <CarriageStatus data={statueData} scale={scale} />
      </div>
      <div className={styles.keyIndicatorsBottom} style={{ marginTop: "30px" }}>
        <span />
        <PropertyBox data={data?.attributes[0]} />
        <span />
        <PropertyBox data={data?.attributes[1]} />
        <span />
        <span />
        <PropertyBox data={data?.attributes[2]} />
        <span />
        <PropertyBox data={data?.attributes[3]} />
        <span />
      </div>
    </div>
  );
}
