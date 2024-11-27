import React from 'react'

import styles from "../../css//Part/CarriageStatus.module.css";
import GaugeCharTemplate from "../../components/Chars/GaugeCharTemplate";
import Fan from "./Fan";
import VerticalProgressBar from "../Part/VerticalProgressBar";


export default function CarriageStatus(props) {
  const statueData = props.data;
  const statueType = {statueType:props.type};
  if(statueType.statueType === '2'){
    var gaugeNum = statueData?.gauges2?.length ?? 0;
    var fanNum = statueData?.gauges2?.length ?? 0;
    var verticalProgressBarNum = statueData?.gauges2?.length ?? 0;
  }else{
    var gaugeNum = statueData?.gauges?.length ?? 0;
    var fanNum = statueData?.gauges?.length ?? 0;
    var verticalProgressBarNum = statueData?.gauges?.length ?? 0;
  }



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
          <Fan {...element} {...statueType}  />
        </div>
      );
  }
  for (let i = 0; i < gaugeNum; i++) {
    // let element = statueData?.gauges?.[i];
    let element
    if(statueType.statueType === '2'){
      element = statueData?.gauges2?.[i];
    }else{
      element = statueData?.gauges?.[i];
    }
    if (element)
      GaugeCharTemplates.push(
        <div className={styles.gaugeChar} key={i} style={gaugeCharSty}>
          <GaugeCharTemplate data={{ ...element }}/>
        </div>
      );
  }

  for (let i = 0; i < verticalProgressBarNum; i++) {
    // let element = statueData?.verticalProgressBar?.[i];
    let element
    if(statueType.statueType === '2'){
      element = statueData?.verticalProgressBar2?.[i];
    }else{
      element = statueData?.verticalProgressBar?.[i];
    }
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
