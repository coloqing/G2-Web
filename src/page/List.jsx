import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Space, DatePicker, Select, Pagination } from "antd";
import listApiController from "../api/list";
import GradeTag from "../components/Common/GradeTag";
import { Link } from "react-router-dom";
import MyTable from "../components/Common/MyTable";
import commonApiController from "../api/common";
import {_getCarList,} from "../Redux/carListSlice";
import styles from "../css/List/List.module.css";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
// import "dayjs/locale/zh-cn";

export default function List(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    type: 0,
    carId: 0,
    carriageId: 0,
    dateStart: "",
    dateEnd: "",
    pageIndex: 1,
    pageSize: 20,
  });
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;

  const [carriageList, setCarriageList] = useState([{ id: 0, name: "全部" }]);
  const [carList, setCarList] = useState([{ id: 0, name: "全部" }]);

  const carListStore = useSelector((state) => state.carList.carList);
  if (!carListStore.length) dispatch(_getCarList());

  useEffect(() => {
    if (carListStore.length) {
      setCarList([{ id: 0, carName: "全部",carriageList:[] }].concat(carListStore))
    }
  }, [carListStore]);

  /**
   * car 下拉
   * @param {} value
   * @param {*} options
   */
  const onCarChange = (value, options) => {
    const selectCarItem = carList.find((item) => {
      return item.id === value;
    });
    setCarriageList([{ id: 0, name: "全部" }].concat(selectCarItem.carriageList));
    let newsearch = { ...search };
    newsearch.carId = value;
    setSearch(newsearch);
  };

  /**
   * onCarriageChange 车厢号变化
   * @param {*} value
   */
  const onCarriageChange = (value, options) => {
    let newsearch = { ...search };
    newsearch.carriageId = value;
    setSearch(newsearch);
  };

  function back() {
    window.history.back();
  }
  const timer = useSelector((state) => state.timer.timer);
  useEffect(() => {
    async function getData1(search) {
      const result = await listApiController.FaultAlarmStatusAlertPageListApi(
        search
      );
      if (result?.rows) {
        setData(result.rows);
        setTotal(result.total);
      }
    }
    if (search) {
      getData1(search);
    }
  }, [search, timer]);

  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: "3vw",
      render: (key, row, index) => index + 1,
    },
    {
      title: "车厢",
      dataIndex: "cxh",
      key: "cxh",
      width: "5vw",
      ellipsis: true,
      render: (cxh, row) => (
        <Link
          style={{ color: "white", textDecoration: "underLine" }}
          to={`/Part?car=${row.lch}&part=${row.cxh}`}
        >
          {cxh}
        </Link>
      ),
      align:'center',
    },
    {
      title: "故障名称",
      dataIndex: "name",
      key: "name",
      width: "15vw",
      ellipsis: true,
      align:'center',
    },
    {
      title: "故障时间",
      dataIndex: "dateTime",
      key: "dateTime",
      ellipsis: true,
      width: "15vw",
      align:'center',
    },
    {
      title: "等级",
      dataIndex: "grade",
      key: "grade",
      width: "10vw",
      render: (grade) => <GradeTag>{grade}</GradeTag>,
      ellipsis: true,
      align:'center',
    },
    {
      title: "解决建议",
      dataIndex: "solution",
      key: "solution",
      ellipsis: {
        showTitle: false,
      },
      render: (solution) => (
        <Tooltip placement="topLeft" title={solution}>
          {solution}
        </Tooltip>
      ),
      align:'center',
    },
    {
      title: "操作",
      ellipsis: true,
      render: (text, record, index) =>{ 
        if(record.type === '3')
        return <Button
              type="text"
              block
              style={{
                width: "4vw",
                height: "3.5vh",
                fontWeight: "bold",
              }}
              onClick={() => download10(record.id,record.cxh)}
            >
              下载日志
            </Button>
        },
      align: 'center',
    },
  ];

  function download10 (id,cxh) {
    commonApiController.FaultToExcelApi(id,cxh);
  };

  function download () {
    let newSearch = { ...search };
    let clist = { ...carList}; 
    let crlist = { ...carriageList}; 
    let lch = Object.values(clist).find(x=>x.id ===  newSearch.carId).carName;
    let cxh = Object.values(crlist).find(x=>x.id ===  newSearch.carriageId).name;
    commonApiController.DataToExcel(newSearch,lch,cxh);
  };

  const dateChanged = (date, dateString) => {
    let newSearch = { ...search };
    newSearch.dateStart = dateString[0];
    newSearch.dateEnd = dateString[1];
    setSearch(newSearch);
  };
  const typeChanged = (val) => {
    let newSearch = { ...search };
    newSearch.type = val;
    setSearch(newSearch);
  };
  const paginationChange = (page, pageSize) => {
    let newSearch = { ...search };
    newSearch.pageIndex = page;
    newSearch.pageSize = pageSize;
    setSearch(newSearch);
  };

  const selectStyle = {
    backgroundColor: "#060a2d",
    borderRadius: 0,
    border: "1px solid #517992",
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <Space
          wrap
          style={{
            color: "white",
            fontSize: "0.885vw",
            position: "relative",
            // border: "1px solid #517992",
            width: "97vw",
          }}
        >
          列车号
          <Select
            value={search.carId}
            style={{
              width: 120,
            }}
            onChange={onCarChange}
            options={carList.map((element) => ({
              label: element.carName,
              value: element.id,
            }))}
            dropdownStyle={selectStyle}
          />
          车厢
          <Select
            value={search.carriageId}
            style={{ width: 120 }}
            onChange={onCarriageChange}
            options={carriageList.map((ele) => ({
              label: ele.name,
              value: ele.id,
            }))}
            dropdownStyle={selectStyle}
          />
          类型
          <Select
            value={search.type}
            style={{ width: 120 }}
            onChange={typeChanged}
            options={[
              { value: 0, label: "全部" },
              { value: 2, label: "告警" },
              { value: 3, label: "报警" },
            ]}
            dropdownStyle={selectStyle}
          />
          时间
          <RangePicker
            locale={locale}
            showToday="true"
            style={
              {
                // backgroundColor: "red",
                // border: "1px solid red",
              }
            }
            popupStyle={{
              // backgroundColor: "red",
              // color: "red !important",
              border: "2px solid #517992",
              padding: 0,
            }}
            onChange={dateChanged}
            class={styles.picker}
          />
           <Button
              type="text"
              block
              style={{
                width: "4vw",
                height: "3.5vh",
                fontWeight: "bold",
              }}
              onClick={() => download()}
            >
              导出
            </Button>
            <Button
              type="text"
              block
              style={{
                width: "4vw",
                height: "3.5vh",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/data")}
            >
              筛选数据导出
            </Button>
          <div
            style={{
              position: "absolute",
              right: "0",
              top: 10,
              cursor: "pointer",
            }}
            onClick={back}
          >
            返回
          </div>
        </Space>
      </div>
      <div className={styles.bottom}>
        <div className={styles.table}>
          <MyTable
            data={data}
            columns={columns}
            // height={"20vh"}
          />
        </div>
        <div className={styles.pagin}>
          <Pagination
            showSizeChanger
            showQuickJumper
            current={search.pageIndex}
            total={total}
            pageSize={search.pageSize}
            onChange={paginationChange}
          />
        </div>
      </div>
    </div>
  );
}
