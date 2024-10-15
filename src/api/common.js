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

const UpdateLifePredictionApi = function (ids) {
  return service({
    url: "/api/Common/UpdateLifePrediction",
    method: "GET",
    params: {
      ids,
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

const apiController = {
  CarCarriageListApi,

  FaultAlertNumTodayApi,
  UpdateLifePredictionApi,
  FaultAlarmListApi,
  StatusAlertListApi,
  LifePredictionListApi,
  CharDataApi,
  CarColorListApi,
};

export default apiController;
