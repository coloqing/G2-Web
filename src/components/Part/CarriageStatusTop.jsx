import { useState, useEffect } from "react";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";

import { useSelector } from "react-redux";
import partApiController from "../../api/part";
import CarriageStatus from "./CarriageStatus";

export default function CarriageStatusTop(props) {
  const carriageId = props.carriageId;
  const [statueData, setStatusData] = useState(null);
  const timer = useSelector((state) => state.timer.timer);
  useEffect(() => {
    async function getData1(id) {
      const result = await partApiController.PartStatusByCarriageApi(id);
      if (result?.data) setStatusData(result.data);
    }
    if (carriageId) {
      getData1(carriageId);
    }
  }, [carriageId, timer]);

  let gaugeNum = statueData?.gauges?.length ?? 0;
  let fanNum = statueData?.gauges?.length ?? 0;
  let verticalProgressBarNum = statueData?.gauges?.length ?? 0;

  const [widthD, heightD] = useWindowSizeD();
  const widthYs =
    ((widthD / 24) * 22) / (gaugeNum + fanNum + verticalProgressBarNum);
  const heightYs = heightD * 0.17;
  let scale = 1;
  let size = 190;
  if (widthYs < size || heightYs < size)
    scale = (widthYs > heightYs ? heightYs : widthYs) / size;

  return <CarriageStatus data={statueData} scale={scale}/>;
}
