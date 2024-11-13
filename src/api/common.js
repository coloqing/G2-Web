import service from "./request";

/**
 * 获取下啦列表
 * @returns
 */
const CarCarriageListApi = function () {
  return service({
    url: "/api/Common/CarCarriageList",
    method: "GET",
  });
};

/**
 * 今日预警/报警空调数量
 * @returns
 */
const FaultAlertNumTodayApi = function (carId) {
  return service({
    url: "/api/Common/FaultAlertNumToday",
    method: "GET",
    params: {
      carId,
    },
  });
};

/**
 * FaultAlarmList
 * @returns
 */
const FaultAlarmListApi = function (carId) {
  return service({
    url: "/api/Common/FaultAlarmList",
    method: "GET",
    params: {
      carId,
    },
  });
};
/**
 * StatusAlertList
 * @returns
 */
const StatusAlertListApi = function (carId) {
  return service({
    url: "/api/Common/StatusAlertList",
    method: "GET",
    params: {
      carId,
    },
  });
};
/**
 * LifePredictionList
 * @returns
 */
const LifePredictionListApi = function (carId) {
  return service({
    url: "/api/Common/LifePredictionList",
    method: "GET",
    params: {
      carId,
    },
  });
};

const LifePredictionPageListApi = function (carId, pageIndex, pageSize) {
  return service({
    url: "/api/Common/LifePredictionPageList",
    method: "GET",
    params: {
      carId,
      pageIndex,
      pageSize,
    },
  });
};

const UpdateLifePredictionApi = function (ids,value) {
  return service({
    url: "/api/Common/UpdateLifePrediction",
    method: "GET",
    params: {
      ids: ids,
      servicelife:value,
    },
  });
};

const CharDataApi = function (data) {
  return service({
    url: "/api/Common/CharData",
    method: "GET",
    params: {
      ...data,
    },
  });
};
const CarColorListApi = function (carId) {
  return service({
    url: "/api/Common/CarColorList",
    method: "GET",
    params: {
      carId,
    },
  });
};

const FaultToExcelApi = function (id, cxh) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", window.MyConfig.baseUrl + "/api/List/FaultToExcel?id=" + id);
  xhr.responseType = "blob";
  xhr.onload = function () {
    let blob = this.response;
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    let fileName = "故障预警导出-" + cxh + ".xlsx";
    a.download = fileName;
    a.click();
  };
  xhr.send();
};

const DataToExcel = function (search, lch, cxh) {
  if (lch === "全部") lch = "";
  if (cxh === "全部") cxh = "";
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    window.MyConfig.baseUrl +
      "/api/List/FaultDataToExcel?lch=" +
      lch +
      "&cxh=" +
      cxh +
      "&startTime=" +
      search.dateStart +
      "&endTime=" +
      search.dateEnd
  );
  xhr.responseType = "blob";
  xhr.onload = function () {
    let blob = this.response;
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    let fileName = "故障预警导出-" + lch + ".xlsx";
    a.download = fileName;
    a.click();
  };
  xhr.send();
};

const RealTimeDataToExcel = function (search) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    window.MyConfig.baseUrl +
      "/api/List/DataToExcel?lch=" +
      search.lch +
      "&cxh=" +
      search.cxh +
      "&startTime=" +
      search.startTime +
      "&endTime=" +
      search.endTime +
      "&pageIndex=1" +
      "&pageSize=300000"
  );
  xhr.responseType = "blob";
  xhr.onload = function () {
    let blob = this.response;
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    let fileName = "实时数据导出-" + search.lch + ".xlsx";
    a.download = fileName;
    a.click();
  };
  xhr.send();
};

const apiController = {
  CarCarriageListApi,
  FaultToExcelApi,
  FaultAlertNumTodayApi,
  UpdateLifePredictionApi,
  FaultAlarmListApi,
  StatusAlertListApi,
  LifePredictionListApi,
  CharDataApi,
  CarColorListApi,
  DataToExcel,
  LifePredictionPageListApi,
  RealTimeDataToExcel,
};

export default apiController;
