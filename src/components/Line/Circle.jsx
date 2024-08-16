import { useRef } from "react";
import styles from "../../css//Line/Circle.module.css";

export default function Circle(props) {
  const mainDivRef = useRef();
  // useEffect(() => {
    // console.log("mainDivRef", mainDivRef.current.clientWidth);
  // });
  const st = {
    border: "0.3vw solid " + props.color,
    color: props.color,
  };

  return (
    <div className={styles.main} ref={mainDivRef} style={st}>
      <div className={styles.mainInside}>
        <div className={styles.mainInsideNum}>{props.num}</div>
        <div className={styles.mainInsideName}>{props.name}</div>
      </div>
    </div>
  );
}
