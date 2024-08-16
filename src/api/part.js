import service from "./request";

/**
 * 部件页面 - 实时故障告警
 * @returns
 */
const FaultAlarmListByCarriageApi = function (id) {
  return service({
    url: "/api/Part/FaultAlarmListByCarriage",
    method: "GET",
    params: {
      carriageId: id,
    },
  });
};

/**
 * 部件页面 - 实时状态预警
 * @returns
 */
const StatusAlertListByCarriageApi = function (id) {
  return service({
    url: "/api/Part/StatusAlertListByCarriage",
    method: "GET",
    params: {
      carriageId: id,
    },
  });
};

/**
 * 部件页面 - 实时状态
 * @returns
 */
const PartStatusByCarriageApi = function (device_code) {
  return service({
    url: "/api/Part/PartStatusByCarriage",
    params: {
      device_code
    },
    method: "GET",
  });
};

/**
 * 部件页面 - 实时数据图片显示
 * @returns
 */
const KTPartDataRealTimeByCarriageApi = function (device_code) {
  return service({
    url: "/api/Part/KTPartDataRealTimeByCarriage",
    params: {
      device_code
    },
    method: "GET",
  });
};

const apiController = {
  FaultAlarmListByCarriageApi,
  StatusAlertListByCarriageApi,
  PartStatusByCarriageApi,
  KTPartDataRealTimeByCarriageApi,
};

export default apiController;
