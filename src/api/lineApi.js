import service from "./request";

/**
 * 线网级页面-当前空调状态-实时信息
 * @returns
 */
const RealTimeInfoLineLevelApi = function () {
  return service({
    url: "/api/Line/RealTimeInfoLineLevel",
    method: "GET",
  });
};

/**
 * 线网级页面-当前空调状态-三个圆圈
 * @returns
 */
const RealTimeStatusLineLevelApi = function () {
  return service({
    url: "/api/Line/RealTimeStatusLineLevel",
    method: "GET",
  });
};

/**
 * FaultAlarmChar
 * @returns
 */
const FaultAlarmCharApi = function () {
  return service({
    url: "/FaultAlarmChar",
    method: "GET",
  });
};
/**
 * StatusAlertChar
 * @returns
 */
const StatusAlertCharApi = function () {
  return service({
    url: "/StatusAlertChar",
    method: "GET",
  });
};
/**
 * LifePredictionChar
 * @returns
 */
const LifePredictionCharApi = function () {
  return service({
    url: "/LifePredictionChar",
    method: "GET",
  });
};

const FaultAralmListByMonthApi = function (data) {
  return service({
    url: "/api/Line/FaultAralmListByMonth",
    method: "GET",
    params: {
      ...data
    },
  });
};


const CarHealthNumApi = function () {
  return service({
    url: "/api/Line/CarHealthNum",
    method: "GET",
  });
};


const apiController = {
  RealTimeInfoLineLevelApi,
  RealTimeStatusLineLevelApi,

  FaultAlarmCharApi,
  StatusAlertCharApi,
  LifePredictionCharApi,

  CarHealthNumApi,
  FaultAralmListByMonthApi,
};

export default apiController;
