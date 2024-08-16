// import { useState } from "react";
import styles from "../../css/Common/Table.module.css";
import { Table, ConfigProvider } from "antd";

export default function MyTable(props) {
  let clickRow = props.clickRow ?? 0;
  const setClickRow =
    props.setClickRow ??
    ((obj) => {
      clickRow = obj;
    });
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center", color: "white",fontSize:"1vw" }}>
      {/* <p>暂无数据</p> */}
    </div>
  );

  if (props.columns) {
    return (
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <Table
          className={styles.table}
          columns={props.columns}
          dataSource={props.data}
          key={props.data?.id}
          size="small"
          pagination={false}
          scroll={{
            y: props.height,
          }}
          onRow={(record, index) => {
            return {
              onClick: (event) => {
                if (record.id) setClickRow(record.id);
                if (props.changeRowIndex) props.changeRowIndex(record);
              },
              onDoubleClick: (event) => {
                if (props.doubleClick) {
                  props.doubleClick(record);
                }
              },
              onContextMenu: (event) => {},
              onMouseEnter: (event) => {},
              onMouseLeave: (event) => {},
            };
          }}
          rowClassName={(record, index) => {
            if (record.id === clickRow && !props.disableClick)
              return styles.tableClickBackgroudColor;
            if (index % 2 === 1) return styles.tableBackgroudColor;
          }}
        />
      </ConfigProvider>
    );
  }
  return <></>;
}
