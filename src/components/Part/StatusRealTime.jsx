import { Card } from "antd";
// import dayjs from "dayjs";
import styles from "../../css/Part/StatusRealTime.module.css";
import img from "../../assets/Part/ktimg.png";
import imgRun from "../../assets/Part/ktimg.gif";

import CardTitle from "../Common/CardTitle";


export default function StatusRealTime(props) {
  const statusData = props.statusData;

  // 样式
  const cardHeadStyle = {
    height: "3.5vh",
    padding:'0 0.5vw',
    borderBottom:'1px solid #404447',
  };
  const cardBodyStyle = {
    padding: "1px 0 0 0 ",
    height: "36vh",
    width: "100%",
  };

  let details = [];
  // 背景改图方案
  let backSty = {
    backgroundImage: `url(${img})`,
  };

  // img 方案
  // let imageSrc = img;

  if (statusData) {
    // 背景改图方案
    if (statusData.state) backSty.backgroundImage = "url(" + imgRun + ")";

    // img 方案
    // if (statusData.state) imageSrc = imgRun;

    for (let i = 0; i < statusData.data.length; i++) {
      const ele = statusData.data[i];
      details.push(
        ele ? (
          <span
            key={i}
            style={{ top: ele.position.top, left: ele.position.left }}
          >
            {ele.name}:{ele.value}
            {ele.unit}
          </span>
        ) : null
      );
    }
  }
  return (
    <div className={styles.main}>
      <Card
        title={<CardTitle title="空调实时信息" />}
        bodyStyle={cardBodyStyle}
        headStyle={cardHeadStyle}
        // extra={dayjs().format("YYYY-MM-DD mm HH:mm:ss")}
        extra={statusData?.lastTime}
      >
        <div className={styles.imgDiv} style={backSty}>
          {/* <div className={styles.imgDiv}>
          <img src={imageSrc} alt="" className={styles.img} /> */}
          <div className={styles.detail}>{details}</div>
        </div>
      </Card>
    </div>
  );
}
