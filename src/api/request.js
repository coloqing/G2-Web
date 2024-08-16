import axios from "axios";
// import { useNavigate } from "react-router-dom";

const service = axios.create({
  baseURL: window.MyConfig.baseUrl,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    // console.log(config);
    return config;
  },
  (error) => {
    console.error(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // const navigate = useNavigate();

    // console.log(response);
    if (response.status === 200) {
      if (response.data.status === true) return response.data;
      else {
        console.error(response.data.message);
      }
    } else if (response.status === 401) {
      alert("调转登录页");
      // navigate("/Login");
    } else {
      alert(response.status);
    }
  },
  (error) => {
    // console.error(error);
  }
);

export default service;
