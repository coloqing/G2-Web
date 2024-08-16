import React from 'react'

import styles from "../../css//Part/CarriageStatus.module.css";
import GaugeCharTemplate from "../../components/Chars/GaugeCharTemplate";
import Fan from "./Fan";
import VerticalProgressBar from "../Part/VerticalProgressBar";


export default function CarriageStatus(props) {
  const statueData = props.data;
  let gaugeNum = statueData?.gauges?.length ?? 0;
  let fanNum = statueData?.gauges?.length ?? 0;
  let verticalProgressBarNum = statueData?.gauges?.length ?? 0;

  const gaugeCharMainSty = {
    zoom: props.scale,
  };
  const gaugeCharSty = {
  };

  let FanTemplates = [];
  let GaugeCharTemplates = [];
  let VerticalProgressBarTemplates = [];

  for (let i = 0; i < fanNum; i++) {
    let element = statueData?.fan?.[i];
    if (element)
      FanTemplates.push(
        <div className={styles.gaugeChar} key={i} style={gaugeCharSty}>
          <Fan {...element} />
        </div>
      );
  }
  for (let i = 0; i < gaugeNum; i++) {
    let element = statueData?.gauges?.[i];
    if (element)
      GaugeCharTemplates.push(
        <div className={styles.gaugeChar} key={i} style={gaugeCharSty}>
          <GaugeCharTemplate data={{ ...element }} />
        </div>
      );
  }

  for (let i = 0; i < verticalProgressBarNum; i++) {
    let element = statueData?.verticalProgressBar?.[i];
    if (element)
      VerticalProgressBarTemplates.push(
        <div className={styles.verticalBar} key={i} style={gaugeCharSty}>
          <VerticalProgressBar data={{ ...element }} />
        </div>
      );
  }

  return (
    <div className={styles.main} style={gaugeCharMainSty}>
      {FanTemplates}
      {GaugeCharTemplates}
      {VerticalProgressBarTemplates}
    </div>
  )
}
