import { Route, Routes, Navigate } from "react-router-dom";
import Line from "./page/Line";
import PartLifeList from "./page/PartLifeList";
import Car from "./page/Car";
import Part from "./page/Part";
import List from "./page/List";
import Data from "./page/Data";
import "./App.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

import LineDemo from "./components/Demo/LineDemo";
import PieDemo from "./components/Demo/PieDemo";
import GaugeDemo from "./components/Demo/GaugeDemo";
import WinSizeDemo from "./components/Demo/WinSizeDemo";
import TestDemo from "./components/Demo/TestDemo";
import ColumnDemo from "./components/Demo/ColumnDemo";

import Error from "./page/Error";

import { setTime } from "./Redux/timerSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  console.log("渲染app");
  setInterval(() => {
    dispatch(setTime(Date()));
  }, 5000);
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          colorText: "white",
          Card: {
            colorBgContainer: "#191f2e",
            // headerFontSize:'1.6vw',
            borderRadiusLG: 0,
            colorTextHeading: "#ffffff",
            // colorBorderSecondary:'#050b2c',
            colorText: "#ffffff",
            lineWidth: 0,
            headerHeight: "2vh",
            fontSize: "1vw",
          },
          Table: {
            colorBgContainer: "#191f2e",
            colorText: "#ffffffe6",
            // colorTextHeading: "#15b4c7",
            // colorTextHeading: "#ffffffe6",
            colorTextHeading: "#ffffffe6",
            headerSplitColor: "#191f2e",
            fontSize: "0.95vw",
            headerBg: "#191f2e",
            borderColor: "#191f2e",
            rowHoverBg: "#045c84",
          },
          Tooltip: {
            colorText: "#ffffff",
          },
          Pagination: {
            colorBgContainer: "#045c84",
            colorPrimary: "white",
            colorText: "white",
            fontSizeSM: "1.1vw",
            // fontSize: "4vw",
            fontSizeLG: "3vw",
            fontSizeXL: "2vw",
            // fontSizeIcon:'1.1vw',
            colorTextDisabled: "white",
          },
          Select: {
            // colorBgContainer: "#050b2c",
            borderRadius: "0",
            colorBorder: "#517992",
            colorText: "#1adaeb",
            //   fontSize:'0.885vw',
            selectorBg: "#191f2e",
          },
          Radio: {
            borderRadius: 0,
            // buttonBg: "white",
            buttonBg: "#191f2e",
            buttonSolidCheckedBg: "#143686",
            buttonSolidCheckedHoverBg: "#143686",
            colorBorder: "#517992",
            controlHeight: 24,
          },
          Button: {
            borderRadius: 2,
            contentFontSize: "0.8vw",
            primaryColor: "white",
            colorText: "#03b0ff",
          },
          DatePicker: {
            borderRadiusOuter: "0",
            borderRadiusLG: "0",
            colorBgContainer: "#191f2e",
            borderRadius: "0",
            colorBorder: "#517992",
            colorText: "#1adaeb",
            //   fontSize:'0.885vw',
            // selectorBg: "#050b2c",
            colorTextDisabled: "white",

            // cellActiveWithRangeBg:'red',
            // hoverBorderColor:'red',
            colorBgElevated: "#191f2e",
            colorLink: "white",
            colorLinkActive: "red",
            colorLinkHover: "#15b4c7",
            // colorPrimary:'green',
            // colorText:'#15b4c7',
            // colorTextDescription:'white',
            // colorTextDisabled: 'white',
            colorTextHeading: "white",
            // colorTextLightSolid : 'red',
            // borderColor:'red',
            colorTextPlaceholder: "#15b4c7",
            colorTextQuaternary: "white",
            // colorTextTertiary:'red',
            // colorWarning:'red',
            // colorWarningHover:'red',
            // colorWarningOutline:'red',
            colorSplit: "#517992",
            // cellRangeBorderColor:'red',
            // lineType:'solid',
            // lineWidth:'5'
            colorIcon: "white",
            colorIconHover: "#15b4c7",
          },
        },
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/Line" element={<Line />} />
          <Route path="/Car" element={<Car />} />
          <Route path="/Part" element={<Part />} />
          <Route path="/List" element={<List />} />
          <Route path="/Data" element={<Data />} />
          <Route path="/PartLifeList" element={<PartLifeList />} />

          <Route path="/LineDemo" element={<LineDemo />} />
          <Route path="/PieDemo" element={<PieDemo />} />
          <Route path="/GaugeDemo" element={<GaugeDemo />} />
          <Route path="/WinSizeDemo" element={<WinSizeDemo />} />
          <Route path="/TestDemo" element={<TestDemo />} />
          <Route path="/ColumnDemo" element={<ColumnDemo />} />

          <Route path="/" element={<Line />} />
          {/* <Route path="/" element={<Navigate to="/Line" replace={true} />} /> */}

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
