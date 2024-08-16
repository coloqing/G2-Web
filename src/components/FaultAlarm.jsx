import { useEffect, useState } from "react";
import stylesPublic from "../css/Common/ThreeBlock.module.css";
import MyTable from "./Common/MyTable";
import { Tooltip } from "antd";
import GradeTag from "../components/Common/GradeTag";
import LineCharTemplate from "./Chars/LineCharTemplate";
import { Link } from "react-router-dom";
import commonApiController from "../api/common";
// import { useSelector } from "react-redux";

export default function FaultAlarm(props) {
  const [data, setData] = useState([]);
  const [charData, setCharData] = useState({});
  const [charParam, setcharParam] = useState({
    xdid: 0,
    dateTime: "",
    cxh: "",
  });
  const [clickRow, setClickRow] = useState(0);
  useEffect(() => {
    async function getData1(param) {
      const result = await commonApiController.CharDataApi(param);
      if (result?.data) setCharData(result?.data);
    }
    if (data.length && charParam.xdid) {
      getData1(charParam);
    }
  }, [charParam, data]);

  useEffect(() => {
    const data = props.data || [];
    setData(data);
    if (data && data.length && !clickRow) {
      const newParam = {
        xdid: data[0].xdid,
        dateTime: data[0].dateTime,
        cxh: data[0].cxh,
      };
      setcharParam(newParam);
      setClickRow(data[0].id);
    }
  }, [props.data, clickRow]);

  const columns = [
    {
      title: "车箱",
      dataIndex: "cxh",
      key: "cxh",
      width: "3.2vw",
      ellipsis: true,
      render: (cxh, row) => (
        <Link
          style={{ color: "white", textDecoration: "underLine" }}
          to={`/Part?car=${row.lch}&part=${row.cxh}`}
        >
          {cxh}
        </Link>
      ),
      align: "center",
    },
    {
      title: "故障名称",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      // width: "8vw",
      align: "center",
    },
    {
      title: "故障时间",
      dataIndex: "dateTime",
      key: "dateTime",
      ellipsis: true,
      width: "7.5vw",
      align: "center",
    },
    {
      title: "等级",
      dataIndex: "grade",
      key: "grade",
      width: "3vw",
      render: (grade) => <GradeTag>{grade}</GradeTag>,
      ellipsis: true,
      align: "center",
    },
    {
      title: "解决建议",
      dataIndex: "solution",
      key: "solution",
      ellipsis: {
        showTitle: false,
      },
      width: "3vw",
      align: "center",
      render: (solution) => (
        <Tooltip placement="topLeft" title={solution}>
          {solution}
        </Tooltip>
      ),
    },
  ];
  function changeRowIndex(row) {
    const newParam = {
      xdid: row.xdid,
      dateTime: row.dateTime,
      cxh: row.cxh,
    };

    paint(newParam);
  }
  let paint = antiShake((...args) => {
    setcharParam(...args);
  });

  function antiShake(fn, delayed = 300) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delayed);
    };
  }

  return (
    <>
      <div
        className={stylesPublic.cardContextTop}
        style={{ height: props.tableHeight + 4 + "vh" }}
      >
        <MyTable
          data={data}
          columns={columns}
          height={props.tableHeight + "vh"}
          changeRowIndex={changeRowIndex}
          clickRow={clickRow}
          setClickRow={setClickRow}
        />
      </div>
      {props.hideChar === true ? null : (
        <div className={stylesPublic.cardContextBottom}>
          <div className={stylesPublic.line}>
            {charData?.type === "line" ? (
              <LineCharTemplate data={{ ...charData }} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
