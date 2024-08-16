import service from "./request";

/**
 * 列车页面 饼形图数据
 * @returns
 */
const FaultAlarmTypePieDateTodayApi = function (carId, lastMon) {
  return service({
    url: "/api/Car/FaultAlarmTypePieDateToday",
    method: "GET",
    params: {
      carId,
      lastMon,
    },
  });
};

const apiController = {
  FaultAlarmTypePieDateTodayApi,
};

export default apiController;
