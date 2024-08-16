import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  _getCarList,
  setSelectData,
  setCarriageList,
} from "../../Redux/carListSlice";

export default function SearchParamDecode(props) {
  const [param, setParam] = useState(null);
  const [searchParams] = useSearchParams();
  const setSearchParams = props.setSearchParams;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const carListStore = useSelector((state) => state.carList.carList);
  // const carriageListStore = useSelector((state) => state.carList.carriageList);
  const selectDataStore = useSelector((state) => state.carList.selectData);
  if (!carListStore.length) dispatch(_getCarList());

  useEffect(() => {
    const newParams = new URLSearchParams(
      [...searchParams].map(([key, value]) => [key.toLowerCase(), value])
    );
    const line = newParams.get("line");
    const car = newParams.get("car");
    const part = newParams.get("part");
    const user = newParams.get("user");
    const password = newParams.get("password");
    setParam({
      line,
      car,
      part,
      user,
      password,
    });
    if (car === "0000") navigate("/Line");

    let searchCarriageList = null;
    if (carListStore.length) {
      if (car && car.length) {
        const searchCar = carListStore.find((item) => {
          return item.carName.slice(-2) === car.slice(-2);
        });
        if (searchCar) {
          searchCarriageList = searchCar.carriageList;
          dispatch(setCarriageList(searchCarriageList));
          let newSelectData = { ...selectDataStore };
          newSelectData.carName = searchCar.carName;
          newSelectData.carId = searchCar.id;

          if (part && part.length) {
            const search = searchCarriageList.find((item) => {
              return part.endsWith(item.name);
            });
            if (search) {
              newSelectData.carriageName = search.name;
              newSelectData.carriageId = search.id;
            }
          } else {
            newSelectData.carriageName = searchCar.carriageList[0].name;
            newSelectData.carriageId = searchCar.carriageList[0].id;
          }
          dispatch(setSelectData(newSelectData));
        }
      }
    }
  }, [searchParams, carListStore]);

  // console.log("参数触发 SearchParam", param);

  useEffect(() => {
    if (setSearchParams && param) setSearchParams({ ...param });
  }, [param, setSearchParams]);

  return <></>;
}
