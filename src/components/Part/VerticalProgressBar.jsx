import React from "react";
import styles from "../../css/Part/VerticalProgressBar.module.css";

export default function VerticalProgressBar(props) {
  const data = props.data;

  const bar = Math.floor((data.value / (data.max - data.min)) * 9);

  const vps = [];

  for (let i = 0; i < 9; i++) {
    let sty = {
      width: `${100 - 8 * i}%`,
    };
    if (i >= 9 - bar)
      sty.background = "linear-gradient(to right,#31a7f2,#43f0c8)";
    else sty.background = "#143686";
    vps.push(<div className={styles.vp} key={i} style={sty}></div>);
  }

  let titleLeft = [];
  const cha = (data.max - data.min) / 3;
  titleLeft.push(
    <span key={1}>
      {data.max}
      {data.unit}
    </span>
  );
  titleLeft.push(
    <span key={2}>
      {Math.floor(data.max - cha)}
      {data.unit}
    </span>
  );
  titleLeft.push(
    <span key={3}>
      {Math.floor(data.max - 2*cha)}
      {data.unit}
    </span>
  );

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.left}>{titleLeft}</div>
        <div className={styles.right}>{vps}</div>
      </div>
      <div className={styles.bottom}>
        <span className={data.value > 1800 ? styles.color : ''} >
          {data.title} 
          {data.value}
          {data.unit}
        </span>
      </div>
    </div>
  );
}
