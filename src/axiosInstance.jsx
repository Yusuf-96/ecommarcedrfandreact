import axios from "axios";
import { Logout, refreshAccessToken, isAuthenticated } from "./utils/auth";

// const baseURL = "https://isms-apps.herokuapp.com/api/";
const baseURL = "https://127.0.0.1:8000/api/";

export const axiosInstance = axios.create({
  baseURL: baseURL,
});

const handleRefreshQueue = async () => {
  try {
    const data = await refreshAccessToken();
    return new Promise((resolve, reject) => {
      if (data) {
        resolve("CALL_ORIGINAL_REQUEST");
      } else {
        reject(Logout());
      }
    });
  } catch (err) {
    return err;
  }
};

axiosInstance.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const origianlRequest = error.config;

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized" &&
      !origianlRequest._retry
    ) {
      console.log("TOKEN REFRESH REQUIRED");
      origianlRequest._retry = true;
      return handleRefreshQueue()
        .then(() => {
          origianlRequest.headers[
            "Authorization"
          ] = `Bearer ${isAuthenticated()}`;
          return axiosInstance.request(origianlRequest);
        })
        .catch((err) => {
          Logout(() => {
            window.location.href = "/#/login";
          });
        });
    }
    return error;
  }
);
