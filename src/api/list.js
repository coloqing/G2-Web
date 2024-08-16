

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


const apiController = {
    FaultAlarmStatusAlertPageListApi,

};

export default apiController;
