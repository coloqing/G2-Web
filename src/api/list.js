import service from "./request";

/**
 *
 * @returns
 */
const FaultAlarmStatusAlertPageListApi = function (info) {
  return service({
    url: "/api/List/FaultAlarmStatusAlertPageList",
    method: "GET",
    params: {
      ...info,
    },
  });
};

const RealTimeDataPageListApi = function (info) {
  return service({
    url: "/api/List/RealTimeData",
    method: "GET",
    params: {
      ...info,
    },
  });
};

const apiController = {
  FaultAlarmStatusAlertPageListApi,
  RealTimeDataPageListApi,
};

export default apiController;
