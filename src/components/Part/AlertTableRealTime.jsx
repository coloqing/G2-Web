import MyTable from "../Common/MyTable";
import { Tooltip } from "antd";
import GradeTag from "../Common/GradeTag";

export default function AlertTableRealTime(props) {
  const data = props.data ? props.data : null;
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: "3vw",
      render: (key, row, index) => index + 1,
      align:'center',
    },
    {
      title: "预警描述",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      // width: "8vw",
      align:'center',
    },
    {
      title: "发生时间",
      dataIndex: "dateTime",
      key: "dateTime",
      ellipsis: true,
      width: "6.5vw",
      align:'center',
    },
    {
      title: "等级",
      dataIndex: "grade",
      key: "grade",
      width: "3vw",
      render: (grade) => <GradeTag>{grade}</GradeTag>,
      ellipsis: true,
      align:'center',
    },
    {
      title: "司机解决建议",
      dataIndex: "driverSolution",
      key: "driverSolution",
      ellipsis: {
        showTitle: false,
      },
      width: "5vw",
      render: (driverSolution) => (
        <Tooltip placement="topLeft" title={driverSolution}>
          {driverSolution}
        </Tooltip>
      ),
      align:'center',
    },
    {
      title: "回库检修建议",
      dataIndex: "storeroomSolution",
      key: "storeroomSolution",
      ellipsis: {
        showTitle: false,
      },
      align:'center',
      width: "5vw",
      render: (storeroomSolution) => (
        <Tooltip placement="topLeft" title={storeroomSolution}>
          {storeroomSolution}
        </Tooltip>
      ),
    },
  ];
  function changeRowIndex(row) {
    // console.log("AlertTableRealTime", row);
  }

  return (
    <>
      <div
        style={{
          height: props.tableHeight + 4 + "vh",
          // border: "1px solid red",
        }}
      >
        <MyTable
          data={data}
          columns={columns}
          height={props.tableHeight + "vh"}
          changeRowIndex={changeRowIndex}
        />
      </div>
    </>
  );
}
