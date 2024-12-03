import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, Space, DatePicker, Select, Pagination } from "antd";
import listApiController from "../api/list";
import GradeTag from "../components/Common/GradeTag";
import { Link } from "react-router-dom";
import MyTable from "../components/Common/MyTable";
import commonApiController from "../api/common";
import { _getCarList } from "../Redux/carListSlice";
import styles from "../css/List/List.module.css";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Button } from "antd";

export default function Data() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    lcid: 0,
    cxid: 0,
    lch: "",
    cxh: "",
    startTime: "",
    endTime: "",
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
      setCarList(
        [{ id: 0, carName: "全部", carriageList: [] }].concat(carListStore)
      );
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
    setCarriageList(
      [{ id: 0, name: "全部" }].concat(selectCarItem.carriageList)
    );
    let newsearch = { ...search };
    newsearch.lcid = value;
    newsearch.lch = selectCarItem.carName;
    setSearch(newsearch);
  };

  /**
   * onCarriageChange 车厢号变化
   * @param {*} value
   */
  const onCarriageChange = (value, options) => {
    let newsearch = { ...search };
    newsearch.cxid = value;

    newsearch.cxh = options.label;
    if (options.label === "全部") newsearch.cxh = 0;
    setSearch(newsearch);
  };

  function back() {
    window.history.back();
  }
  // const timer = useSelector((state) => state.timer.timer);
  useEffect(() => {
    async function getData1(search) {
      const result = await listApiController.RealTimeDataPageListApi(search);

      if (result?.rows) {
        setData(result.rows);
        setTotal(result.total);
      }
    }
    if (search) {
      getData1(search);
    }
  }, [search]);

  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
      width: "5vw",
      render: (key, row, index) => index + 1,
    },
    {
      title: "源设备号",
      dataIndex: "ysbh",
      key: "ysbh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "宿设备号",
      dataIndex: "ssbh",
      key: "ssbh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "报文类型",
      dataIndex: "bwlx",
      key: "bwlx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "列车号",
      dataIndex: "lch",
      key: "lch",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "车厢号",
      dataIndex: "cxh",
      key: "cxh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "设备编码",
      dataIndex: "device_code",
      key: "device_code",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "HVAC生命信号H",
      dataIndex: "hvacsmxhh",
      key: "hvacsmxhh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "HVAC生命信号L",
      dataIndex: "hvacsmxhl",
      key: "hvacsmxhl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "软件版本",
      dataIndex: "software_version",
      key: "software_version",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1目标温度",
      dataIndex: "jz1mbwd",
      key: "jz1mbwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2目标温度",
      dataIndex: "jz2mbwd",
      key: "jz2mbwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1送回风温度",
      dataIndex: "jz1shfwd",
      key: "jz1shfwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风温度",
      dataIndex: "jz1xfwd",
      key: "jz1xfwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回送风温度1",
      dataIndex: "jz1hsfwd1",
      key: "jz1hsfwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回送风温度2",
      dataIndex: "jz1hsfwd2",
      key: "jz1hsfwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回风温度",
      dataIndex: "jz2shfwd",
      key: "jz2shfwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风温度",
      dataIndex: "jz2xfwd",
      key: "jz2xfwd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2送风温度1",
      dataIndex: "jz2hsfwd1",
      key: "jz2hsfwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2送风温度2",
      dataIndex: "jz2hsfwd2",
      key: "jz2hsfwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝温度1",
      dataIndex: "jz1lnwd1",
      key: "jz1lnwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝温度2",
      dataIndex: "jz1lnwd2",
      key: "jz1lnwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1排气温度1",
      dataIndex: "jz1pqwd1",
      key: "jz1pqwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1排气温度2",
      dataIndex: "jz1pqwd2",
      key: "jz1pqwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1吸气温度1",
      dataIndex: "jz1xqwd1",
      key: "jz1xqwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1吸气温度2",
      dataIndex: "jz1xqwd2",
      key: "jz1xqwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝温度1",
      dataIndex: "jz2lnwd1",
      key: "jz2lnwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝温度2",
      dataIndex: "jz2lnwd2",
      key: "jz2lnwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2排气温度1",
      dataIndex: "jz2pqwd1",
      key: "jz2pqwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2排气温度2",
      dataIndex: "jz2pqwd2",
      key: "jz2pqwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2吸气温度1",
      dataIndex: "jz2xqwd1",
      key: "jz2xqwd1",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2吸气温度2",
      dataIndex: "jz2xqwd2",
      key: "jz2xqwd2",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1湿度值",
      dataIndex: "jz1sdz",
      key: "jz1sdz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1CO2值",
      dataIndex: "jz1co2z",
      key: "jz1co2z",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2湿度值",
      dataIndex: "jz2sdz",
      key: "jz2sdz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2CO2值",
      dataIndex: "jz2co2z",
      key: "jz2co2z",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1高压压力值",
      dataIndex: "jz1zlxt1gyylz",
      key: "jz1zlxt1gyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1低压压力值",
      dataIndex: "jz1zlxt1dyylz",
      key: "jz1zlxt1dyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2高压压力值",
      dataIndex: "jz1zlxt2gyylz",
      key: "jz1zlxt2gyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2低压压力值",
      dataIndex: "jz1zlxt2dyylz",
      key: "jz1zlxt2dyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1高压压力值",
      dataIndex: "jz2zlxt1gyylz",
      key: "jz2zlxt1gyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1低压压力值",
      dataIndex: "jz2zlxt1dyylz",
      key: "jz2zlxt1dyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2高压压力值",
      dataIndex: "jz2zlxt2gyylz",
      key: "jz2zlxt2gyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2低压压力值",
      dataIndex: "jz2zlxt2dyylz",
      key: "jz2zlxt2dyylz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1功耗信息",
      dataIndex: "jz1ghxx",
      key: "jz1ghxx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2功耗信息",
      dataIndex: "jz2ghxx",
      key: "jz2ghxx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机1电流",
      dataIndex: "jz1zffj1dl",
      key: "jz1zffj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机2电流",
      dataIndex: "jz1zffj2dl",
      key: "jz1zffj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1电流",
      dataIndex: "jz1lnfj1dl",
      key: "jz1lnfj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2电流",
      dataIndex: "jz1lnfj2dl",
      key: "jz1lnfj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1电流",
      dataIndex: "jz1ysj1dl",
      key: "jz1ysj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2电流",
      dataIndex: "jz1ysj2dl",
      key: "jz1ysj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机1电流",
      dataIndex: "jz2zffj1dl",
      key: "jz2zffj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机2电流",
      dataIndex: "jz2zffj2dl",
      key: "jz2zffj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1电流",
      dataIndex: "jz2lnfj1dl",
      key: "jz2lnfj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2电流",
      dataIndex: "jz2lnfj2dl",
      key: "jz2lnfj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1电流",
      dataIndex: "jz2ysj1dl",
      key: "jz2ysj1dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2电流",
      dataIndex: "jz2ysj2dl",
      key: "jz2ysj2dl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1电压",
      dataIndex: "jz1ysj1dy",
      key: "jz1ysj1dy",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2电压",
      dataIndex: "jz1ysj2dy",
      key: "jz1ysj2dy",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1电压",
      dataIndex: "jz2ysj1dy",
      key: "jz2ysj1dy",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2电压",
      dataIndex: "jz2ysj2dy",
      key: "jz2ysj2dy",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1频率",
      dataIndex: "jz1ysj1pl",
      key: "jz1ysj1pl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2频率",
      dataIndex: "jz1ysj2pl",
      key: "jz1ysj2pl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1频率",
      dataIndex: "jz2ysj1pl",
      key: "jz2ysj1pl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2频率",
      dataIndex: "jz2ysj2pl",
      key: "jz2ysj2pl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压差值",
      dataIndex: "jz1ycz",
      key: "jz1ycz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压差值",
      dataIndex: "jz2ycz",
      key: "jz2ycz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风阀1开度",
      dataIndex: "jz1xff1kd",
      key: "jz1xff1kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风阀2开度",
      dataIndex: "jz1xff2kd",
      key: "jz1xff2kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回风阀1开度",
      dataIndex: "jz1hff1kd",
      key: "jz1hff1kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回风阀2开度",
      dataIndex: "jz1hff2kd",
      key: "jz1hff2kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风阀1开度",
      dataIndex: "jz2xff1kd",
      key: "jz2xff1kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风阀2开度",
      dataIndex: "jz2xff2kd",
      key: "jz2xff2kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回风阀1开度",
      dataIndex: "jz2hff1kd",
      key: "jz2hff1kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回风阀2开度",
      dataIndex: "jz2hff2kd",
      key: "jz2hff2kd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1紫外线灯运行",
      dataIndex: "jz1zwxdyx",
      key: "jz1zwxdyx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2紫外线灯运行",
      dataIndex: "jz2zwxdyx",
      key: "jz2zwxdyx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1空气净化器运行",
      dataIndex: "jz1kqjhqyx",
      key: "jz1kqjhqyx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2空气净化器运行",
      dataIndex: "jz2kqjhqyx",
      key: "jz2kqjhqyx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2低压开关压力故障",
      dataIndex: "jz2zlxt2dykgylgz",
      key: "jz2zlxt2dykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1低压开关压力故障",
      dataIndex: "jz2zlxt1dykgylgz",
      key: "jz2zlxt1dykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2低压开关压力故障",
      dataIndex: "jz1zlxt2dykgylgz",
      key: "jz1zlxt2dykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1低压开关压力故障",
      dataIndex: "jz1zlxt1dykgylgz",
      key: "jz1zlxt1dykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2低压传感器故障",
      dataIndex: "jz2zlxt2dycgqgz",
      key: "jz2zlxt2dycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1低压传感器故障",
      dataIndex: "jz2zlxt1dycgqgz",
      key: "jz2zlxt1dycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2低压传感器故障",
      dataIndex: "jz1zlxt2dycgqgz",
      key: "jz1zlxt2dycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1低压传感器故障",
      dataIndex: "jz1zlxt1dycgqgz",
      key: "jz1zlxt1dycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1空气净化器故障",
      dataIndex: "jz1kqjhqgz",
      key: "jz1kqjhqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压差传感器故障",
      dataIndex: "jz1yccgqgz",
      key: "jz1yccgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2空气净化器故障",
      dataIndex: "jz2kqjhqgz",
      key: "jz2kqjhqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压差传器故障",
      dataIndex: "jz2ygcgqgz",
      key: "jz2ygcgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2高压开关压力故障",
      dataIndex: "jz2zlxt2gykgylgz",
      key: "jz2zlxt2gykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1高压开关压力故障",
      dataIndex: "jz2zlxt1gykgylgz",
      key: "jz2zlxt1gykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2高压开关压力故障",
      dataIndex: "jz1zlxt2gykgylgz",
      key: "jz1zlxt2gykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1高压开关压力故障",
      dataIndex: "jz1zlxt1gykgylgz",
      key: "jz1zlxt1gykgylgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2高压传感器故障",
      dataIndex: "jz2zlxt2gycgqgz",
      key: "jz2zlxt2gycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1高压传感器故障",
      dataIndex: "jz2zlxt1gycgqgz",
      key: "jz2zlxt1gycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2高压传感器故障",
      dataIndex: "jz1zlxt2gycgqgz",
      key: "jz1zlxt2gycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1高压传感器故障",
      dataIndex: "jz1zlxt1gycgqgz",
      key: "jz1zlxt1gycgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回送风温度传感器1故障",
      dataIndex: "jz2hsfwdcgq1gz",
      key: "jz2hsfwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2送回风温度传感器故障",
      dataIndex: "jz2shfwdcgqgz",
      key: "jz2shfwdcgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回送风温度传感器1故障",
      dataIndex: "jz1hsfwdcgq1gz",
      key: "jz1hsfwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1送回风温度传感器故障",
      dataIndex: "jz1shfwdcgqgz",
      key: "jz1shfwdcgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1紫外线灯2故障",
      dataIndex: "jz1zwxd2gz",
      key: "jz1zwxd2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1紫外线灯1故障",
      dataIndex: "jz1zwxd1gz",
      key: "jz1zwxd1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2紫外线灯2故障",
      dataIndex: "jz2zwxd2gz",
      key: "jz2zwxd2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2紫外线灯1故障",
      dataIndex: "jz2zwxd1gz",
      key: "jz2zwxd1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1吸气温度传感器2故障",
      dataIndex: "jz1xqwdcgq2gz",
      key: "jz1xqwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1吸气温度传感器1故障",
      dataIndex: "jz1xqwdcgq1gz",
      key: "jz1xqwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2吸气温度传感器2故障",
      dataIndex: "jz2xqwdcgq2gz",
      key: "jz2xqwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2吸气温度传感器1故障",
      dataIndex: "jz2xqwdcgq1gz",
      key: "jz2xqwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1排气温度传感器2故障",
      dataIndex: "jz1pqwdcgq2gz",
      key: "jz1pqwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1排气温度传感器1故障",
      dataIndex: "jz1pqwdcgq1gz",
      key: "jz1pqwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2排气温度传感器2故障",
      dataIndex: "jz2pqwdcgq2gz",
      key: "jz2pqwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2排气温度传感器1故障",
      dataIndex: "jz2pqwdcgq1gz",
      key: "jz2pqwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝温度传感器2故障",
      dataIndex: "jz1lnwdcgq2gz",
      key: "jz1lnwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝温度传感器1故障",
      dataIndex: "jz1lnwdcgq1gz",
      key: "jz1lnwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝温度传感器2故障",
      dataIndex: "jz2lnwdcgq2gz",
      key: "jz2lnwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝温度传感器1故障",
      dataIndex: "jz2lnwdcgq1gz",
      key: "jz2lnwdcgq1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1变频器2硬线故障",
      dataIndex: "jz1bpq2yxgz",
      key: "jz1bpq2yxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1变频器1硬线故障",
      dataIndex: "jz1bpq1yxgz",
      key: "jz1bpq1yxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2变频器2硬线故障",
      dataIndex: "jz2bpq2yxgz",
      key: "jz2bpq2yxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2变频器1硬线故障",
      dataIndex: "jz2bpq1yxgz",
      key: "jz2bpq1yxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1紧急通风接触器故障",
      dataIndex: "jz1jjtfjcqgz",
      key: "jz1jjtfjcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2紧急通风接触器故障",
      dataIndex: "jz2jjtfjcqgz",
      key: "jz2jjtfjcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1正常通风接触器故障",
      dataIndex: "jz1zctfjcqgz",
      key: "jz1zctfjcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2正常通风接触器故障",
      dataIndex: "jz2zctfjcqgz",
      key: "jz2zctfjcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2接触器故障",
      dataIndex: "jz1lnfj2jcqgz",
      key: "jz1lnfj2jcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1接触器故障",
      dataIndex: "jz1lnfj1jcqgz",
      key: "jz1lnfj1jcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2接触器故障",
      dataIndex: "jz2lnfj2jcqgz",
      key: "jz2lnfj2jcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1接触器故障",
      dataIndex: "jz2lnfj1jcqgz",
      key: "jz2lnfj1jcqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2接触器故障",
      dataIndex: "jz1ysj2cqgz",
      key: "jz1ysj2cqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1接触器故障",
      dataIndex: "jz1ysj1cqgz",
      key: "jz1ysj1cqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2接触器故障",
      dataIndex: "jz2ysj2cqgz",
      key: "jz2ysj2cqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1接触器故障",
      dataIndex: "jz2ysj1cqgz",
      key: "jz2ysj1cqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1电子膨胀阀2通讯故障",
      dataIndex: "jz1dzpzf2txgz",
      key: "jz1dzpzf2txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1电子膨胀阀1通讯故障",
      dataIndex: "jz1dzpzf1txgz",
      key: "jz1dzpzf1txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2电子膨胀阀2通讯故障",
      dataIndex: "jz2dzpzf2txgz",
      key: "jz2dzpzf2txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2电子膨胀阀1通讯故障",
      dataIndex: "jz2dzpzf1txgz",
      key: "jz2dzpzf1txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1采集模块模块通讯故障",
      dataIndex: "jz1cjmktxgz",
      key: "jz1cjmktxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2采集模块模块通讯故障",
      dataIndex: "jz2cjmktxgz",
      key: "jz2cjmktxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1空气质量模块通讯故障",
      dataIndex: "jz1kqzlmktxgz",
      key: "jz1kqzlmktxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2空气质量模块通讯故障",
      dataIndex: "jz2kqzlmktxgz",
      key: "jz2kqzlmktxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1变频器2通讯故障",
      dataIndex: "jz1bpq2txgz",
      key: "jz1bpq2txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1变频器1通讯故障",
      dataIndex: "jz1bpq1txgz",
      key: "jz1bpq1txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2变频器2通讯故障",
      dataIndex: "jz2bpq2txgz",
      key: "jz2bpq2txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2变频器1通讯故障",
      dataIndex: "jz2bpq1txgz",
      key: "jz2bpq1txgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1三相检测故障",
      dataIndex: "jz1sxjcgz",
      key: "jz1sxjcgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2三相检测故障",
      dataIndex: "jz2sxjcgz",
      key: "jz2sxjcgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "电流采集模块通讯故障181-1",
      dataIndex: "dlcjmktxgz",
      key: "dlcjmktxgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1排气温度保护故障",
      dataIndex: "jz2ysj1pqwdbhgz",
      key: "jz2ysj1pqwdbhgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1排气温度保护故障",
      dataIndex: "jz1ysj1pqwdbhgz",
      key: "jz1ysj1pqwdbhgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回送风温度传感器2故障",
      dataIndex: "jz2hsfwdcgq2gz",
      key: "jz2hsfwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风温度传感器故障",
      dataIndex: "jz2xfwdcgqgz",
      key: "jz2xfwdcgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1送风温度传感器2故障",
      dataIndex: "jz1hsfwdcgq2gz",
      key: "jz1hsfwdcgq2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风温度传感器故障",
      dataIndex: "jz1xfwdcgqgz",
      key: "jz1xfwdcgqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2排气温度保护故障",
      dataIndex: "jz2ysj2pqwdbhgz",
      key: "jz2ysj2pqwdbhgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2排气温度保护故障",
      dataIndex: "jz1ysj2pqwdbhgz",
      key: "jz1ysj2pqwdbhgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风电动风阀2故障",
      dataIndex: "jz2xfddff2gz",
      key: "jz2xfddff2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回风电动风阀1故障",
      dataIndex: "jz1hfddff1gz",
      key: "jz1hfddff1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1回风电动风阀2故障",
      dataIndex: "jz1hfddff2gz",
      key: "jz1hfddff2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风电动风阀2故障",
      dataIndex: "jz1xfddff2gz",
      key: "jz1xfddff2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回风电动风阀1故障",
      dataIndex: "jz2hfddff1gz",
      key: "jz2hfddff1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2新风电动风阀1故障",
      dataIndex: "jz2xfddff1gz",
      key: "jz2xfddff1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1新风电动风阀1故障",
      dataIndex: "jz1xfddff1gz",
      key: "jz1xfddff1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2主断路器断开",
      dataIndex: "jz2zdlqdk",
      key: "jz2zdlqdk",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1主断路器断开",
      dataIndex: "jz1zdlqdk",
      key: "jz1zdlqdk",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2回风电动风阀2故障",
      dataIndex: "jz2hfddff2gz",
      key: "jz2hfddff2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "空调紧急逆变器故障",
      dataIndex: "ktjjnbqgz",
      key: "ktjjnbqgz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "紧急通风逆变器运行信号",
      dataIndex: "jjtfnbqyxxh",
      key: "jjtfnbqyxxh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2旁通电磁阀运行",
      dataIndex: "jz2zlxt2ptdcf",
      key: "jz2zlxt2ptdcf",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1旁通电磁阀运行",
      dataIndex: "jz2zlxt1ptdcf",
      key: "jz2zlxt1ptdcf",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2旁通电磁阀运行",
      dataIndex: "jz1zlxt2ptdcf",
      key: "jz1zlxt2ptdcf",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1旁通电磁阀运行",
      dataIndex: "jz1zlxt1ptdcf",
      key: "jz1zlxt1ptdcf",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统2泄漏预警",
      dataIndex: "jz2zlxt2xlyj",
      key: "jz2zlxt2xlyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2制冷系统1泄漏预警",
      dataIndex: "jz2zlxt1xlyj",
      key: "jz2zlxt1xlyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统2泄漏预警",
      dataIndex: "jz1zlxt2xlyj",
      key: "jz1zlxt2xlyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1制冷系统1泄漏预警",
      dataIndex: "jz1zlxt1xlyj",
      key: "jz1zlxt1xlyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2滤网脏堵预警",
      dataIndex: "jz2lwzdyj",
      key: "jz2lwzdyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1滤网脏堵预警",
      dataIndex: "jz1lwzdyj",
      key: "jz1lwzdyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2故障预警",
      dataIndex: "jz2lnfj2gzyj",
      key: "jz2lnfj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1故障预警",
      dataIndex: "jz2lnfj1gzyj",
      key: "jz2lnfj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2故障预警",
      dataIndex: "jz1lnfj2gzyj",
      key: "jz1lnfj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1故障预警",
      dataIndex: "jz1lnfj1gzyj",
      key: "jz1lnfj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机2故障预警",
      dataIndex: "jz2zffj2gzyj",
      key: "jz2zffj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机1故障预警",
      dataIndex: "jz2zffj1gzyj",
      key: "jz2zffj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机2故障预警",
      dataIndex: "jz1zffj2gzyj",
      key: "jz1zffj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机1故障预警",
      dataIndex: "jz1zffj1gzyj",
      key: "jz1zffj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2寿命预警",
      dataIndex: "jz2ysj2smyj",
      key: "jz2ysj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1寿命预警",
      dataIndex: "jz2ysj1smyj",
      key: "jz2ysj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2寿命预警",
      dataIndex: "jz1ysj2smyj",
      key: "jz1ysj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1寿命预警",
      dataIndex: "jz1ysj1smyj",
      key: "jz1ysj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2故障预警",
      dataIndex: "jz2ysj2gzyj",
      key: "jz2ysj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1故障预警",
      dataIndex: "jz2ysj1gzyj",
      key: "jz2ysj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2故障预警",
      dataIndex: "jz1ysj2gzyj",
      key: "jz1ysj2gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1故障预警",
      dataIndex: "jz1ysj1gzyj",
      key: "jz1ysj1gzyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1寿命预警",
      dataIndex: "jz1lnfj1smyj",
      key: "jz1lnfj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2寿命预警",
      dataIndex: "jz1lnfj2smyj",
      key: "jz1lnfj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1寿命预警",
      dataIndex: "jz2lnfj1smyj",
      key: "jz2lnfj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2寿命预警",
      dataIndex: "jz2lnfj2smyj",
      key: "jz2lnfj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机1寿命预警",
      dataIndex: "jz1zffj1smyj",
      key: "jz1zffj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机2寿命预警",
      dataIndex: "jz1zffj2smyj",
      key: "jz1zffj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机1寿命预警",
      dataIndex: "jz2zffj1smyj",
      key: "jz2zffj1smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机2寿命预警",
      dataIndex: "jz2zffj2smyj",
      key: "jz2zffj2smyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "车内空气质量预警",
      dataIndex: "cnkqzlyj",
      key: "cnkqzlyj",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2过载",
      dataIndex: "jz1lnfj2gz",
      key: "jz1lnfj2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1过载",
      dataIndex: "jz1lnfj1gz",
      key: "jz1lnfj1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机2过载",
      dataIndex: "jz1zffj2gz",
      key: "jz1zffj2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机1过载",
      dataIndex: "jz1zffj1gz",
      key: "jz1zffj1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2过载",
      dataIndex: "jz2lnfj2gz",
      key: "jz2lnfj2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1过载",
      dataIndex: "jz2lnfj1gz",
      key: "jz2lnfj1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机2过载",
      dataIndex: "jz2zffj2gz",
      key: "jz2zffj2gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机1过载",
      dataIndex: "jz2zffj1gz",
      key: "jz2zffj1gz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机2运行",
      dataIndex: "jz1ysj2yx",
      key: "jz1ysj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1压缩机1运行",
      dataIndex: "jz1ysj1yx",
      key: "jz1ysj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机2运行",
      dataIndex: "jz1lnfj2yx",
      key: "jz1lnfj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1冷凝风机1运行",
      dataIndex: "jz1lnfj1yx",
      key: "jz1lnfj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机2运行",
      dataIndex: "jz1zffj2yx",
      key: "jz1zffj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1蒸发风机1运行",
      dataIndex: "jz1zffj1yx",
      key: "jz1zffj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机2运行",
      dataIndex: "jz2ysj2yx",
      key: "jz2ysj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2压缩机1运行",
      dataIndex: "jz2ysj1yx",
      key: "jz2ysj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机2运行",
      dataIndex: "jz2lnfj2yx",
      key: "jz2lnfj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2冷凝风机1运行",
      dataIndex: "jz2lnfj1yx",
      key: "jz2lnfj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机2运行",
      dataIndex: "jz2zffj2yx",
      key: "jz2zffj2yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2蒸发风机1运行",
      dataIndex: "jz2zffj1yx",
      key: "jz2zffj1yx",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1控制模式",
      dataIndex: "jz1kzms",
      key: "jz1kzms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组1工作模式",
      dataIndex: "jz1gzms",
      key: "jz1gzms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2控制模式",
      dataIndex: "jz2kzms",
      key: "jz2kzms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "机组2工作模式",
      dataIndex: "jz2gzms",
      key: "jz2gzms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "tcmS:生命信号",
      dataIndex: "tcmSsmxh",
      key: "tcmSsmxh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "tcmS:本车载荷",
      dataIndex: "tcmSbczh",
      key: "tcmSbczh",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "tcmS:列车速度",
      dataIndex: "tcmSlcsd",
      key: "tcmSlcsd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:测试模式",
      dataIndex: "tcmScwshims",
      key: "tcmScwshims",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:除湿模式",
      dataIndex: "tcmSchushims",
      key: "tcmSchushims",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:通风模式",
      dataIndex: "tcmStfms",
      key: "tcmStfms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS :UIC模式",
      dataIndex: "tcmSuicms",
      key: "tcmSuicms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:除菌模式",
      dataIndex: "tcmScjms",
      key: "tcmScjms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:火灾模式",
      dataIndex: "tcmShzms",
      key: "tcmShzms",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:关闭预冷",
      dataIndex: "tcmSgbyl",
      key: "tcmSgbyl",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:空调减载",
      dataIndex: "tcmSktjc",
      key: "tcmSktjc",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS :允许空调机组2压缩机启动",
      dataIndex: "tcmSyxktjz2ysjqd",
      key: "tcmSyxktjz2ysjqd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS :允许空调机组1压缩机启动",
      dataIndex: "tcmSyxktjz1ysjqd",
      key: "tcmSyxktjz1ysjqd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:+2K",
      dataIndex: "tcmSz2k",
      key: "tcmSz2k",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:+1K",
      dataIndex: "tcmSz1k",
      key: "tcmSz1k",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: -1K",
      dataIndex: "tcmSf1k",
      key: "tcmSf1k",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: -2K",
      dataIndex: "tcmSf2k",
      key: "tcmSf2k",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:空调关",
      dataIndex: "tcmSktoff",
      key: "tcmSktoff",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:空调开",
      dataIndex: "tcmSkton",
      key: "tcmSkton",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS:室内火灾",
      dataIndex: "tcmSsnhz",
      key: "tcmSsnhz",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: 27℃",
      dataIndex: "tcmS27d",
      key: "tcmS27d",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: 25℃",
      dataIndex: "tcmS25d",
      key: "tcmS25d",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: 23℃",
      dataIndex: "tcmS23d",
      key: "tcmS23d",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: 21℃",
      dataIndex: "tcmS21d",
      key: "tcmS21d",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: " tcmS: 19℃",
      dataIndex: "tcmS19d",
      key: "tcmS19d",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "数据长度",
      dataIndex: "sjcd",
      key: "sjcd",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "线路ID",
      dataIndex: "xlid",
      key: "xlid",
      width: "6vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "年月日时分秒.毫秒",
      dataIndex: "rq",
      key: "rq",
      width: "15vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "年月日时分秒.毫秒",
      dataIndex: "rqDateTime",
      key: "rqDateTime",
      width: "15vw",
      ellipsis: true,
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      width: "15vw",
      ellipsis: true,
      align: "center",
    },
  ];

  function download() {
    let newSearch = { ...search };

    listApiController.RealTimeDataPageListApi(search).then((result) => {
      if (result?.rows) {
        if (result.records > 300000) {
          alert("导出数据条数上限为300000，请筛选数据后重试。");
        }

        alert(
          "导出 " + result.records + " 条数据，最长可能需要几分钟，请耐心等待。"
        );
        commonApiController.RealTimeDataToExcel(newSearch);
      }
    });
  }

  const dateChanged = (date, dateString) => {
    let newSearch = { ...search };

    if (isSameDay(dateString[0], dateString[1])) {
      newSearch.startTime = dateString[0];
      newSearch.endTime = dateString[1];
      setSearch(newSearch);
    } else {
      alert("只能查询同一天的数据");
    }
  };

  function isSameDay(date1, date2) {
    // 将输入转换为 Date 对象
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // 检查年、月和日是否相同
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

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
            value={search.lcid}
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
            value={search.cxid}
            style={{ width: 120 }}
            onChange={onCarriageChange}
            options={carriageList.map((ele) => ({
              label: ele.name,
              value: ele.id,
            }))}
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
            showTime
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
          <MyTable data={data} columns={columns} height={"80vh"} />
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
