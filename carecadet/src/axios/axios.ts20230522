import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { logoutButton } from "../Redux/ProviderRedux/LoginSlice";

import { store } from "../Redux/Store";
import { accessTokentest } from "../Redux/ProviderRedux/LoginSlice";
import { adminAccessTokentest } from "../Redux/Admin/adminLogin";
// http://210.18.155.251:5003  http://localhost:5200
export const baseURL="http://210.18.155.251:5003"

export const axiosPrivate = axios.create({

  baseURL:baseURL
});


axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const tokenData = store.getState();
    // console.log(store1)
    config.headers = config.headers || {};
    config.headers["authorization"] = tokenData.providerAuth.login.token;
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  }
);

axiosPrivate.interceptors.response.use(
  (res) => {
    console.log(res, "checkkkk");
    return res;
  },
  (error) => {
    console.log(error.response, "errrr");
    return new Promise((resolve) => {
      const originalRequest = error.config;
      console.log("checkkk");
      const refreshToken = store.getState().providerAuth.login.token;
      if (error.response && error.response.status === 401 && refreshToken) {
        console.log("res");
        originalRequest._retry = true;

        // body: formBody
        const response = axios
          .post(`${baseURL}/user/access`, { token: refreshToken })
          .then((res) => {
            console.log(res, "ccccc");
            return res;
          })
          .then((res) => {
            store.dispatch(accessTokentest(res.data.accessToken));
            console.log(res.data.accessToken, "access");
            // alert(JSON.stringify(store.getState().auth.login.token))
            originalRequest.headers.authorization = res.data.accessToken;
            console.log(originalRequest, "original");
            return axios(originalRequest);
          })
          .catch((e) => {
            return Promise.reject(e);
          });
        resolve(response);
      }

      if (error.response) {
        throw error.response.data;
      }

      return Promise.reject(error);
    });
  }
  // if (err.response.statusText === "Unauthorized") {
  //   store.dispatch(logoutButton());

  //   window.location.pathname = "/login";
  //   toast.error("test");
  //}
  //   if (err.response) {
  //     return Promise.reject(err.response.data);
  //   }

  //   if (err.request) {
  //     return Promise.reject(err.request);
  //   }

  //   return Promise.reject(err.message);
);

export const adminAxiosPrivate = axios.create({
  // baseURL: "http://210.18.155.251:5003",
  baseURL:baseURL
});

adminAxiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const tokenData = store.getState();
    console.log(tokenData.adminAuth.adminLogin.token,"admintoken")
    config.headers = config.headers || {};
    config.headers["authorization"] = tokenData.adminAuth.adminLogin.token;
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  }
);

adminAxiosPrivate.interceptors.response.use(
  (res) => {
    console.log(res, "checkkkk");
    return res;
  },
  (error) => {
    console.log(error.response, "errrr");
    return new Promise((resolve) => {
      const originalRequest = error.config;
      console.log("checkkk");
      const refreshToken = store.getState().adminAuth.adminLogin.token;
      if (error.response && error.response.status === 401 && refreshToken) {
        console.log("res");
        originalRequest._retry = true;

        // body: formBody
        const response = axios
          .post(`${baseURL}/user/access`, { token: refreshToken })
          .then((res) => {
            console.log(res, "ccccc");
            return res;
          })
          .then((res) => {
            store.dispatch(adminAccessTokentest(res.data.accessToken));
            console.log(res.data.accessToken, "access");
            // alert(JSON.stringify(store.getState().auth.login.token))
            originalRequest.headers.authorization = res.data.accessToken;
            console.log(originalRequest, "original");
            return axios(originalRequest);
          })
          .catch((e) => {
            return Promise.reject(e);
          });
        resolve(response);
      }

      if (error.response) {
        throw error.response.data;
      }

      return Promise.reject(error);
    });
  }
  // if (err.response.statusText === "Unauthorized") {
  //   store.dispatch(logoutButton());

  //   window.location.pathname = "/login";
  //   toast.error("test");
  //}
  //   if (err.response) {
  //     return Promise.reject(err.response.data);
  //   }

  //   if (err.request) {
  //     return Promise.reject(err.request);
  //   }

  //   return Promise.reject(err.message);
);