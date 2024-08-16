import React from "react";
import styles from "../../css/Common/NumberBlock.module.css";

export default function NumberBlock(props) {
  return (
    <div>
      <div
        className={styles.title}
        style={
          props.TextColor
            ? {
                color: props.TextColor,
              }
            : null
        }
      >
        {props.title}
      </div>
      <div
        className={styles.number}
        style={
            props.color
              ? {
                  color: props.color,
                }
              : null
          }
      >
        {props.number}{props.unit}
      </div>
    </div>
  );
}
