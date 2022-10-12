import axios from "axios";
import { axiosInstance } from "../axiosInstance";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

export const login = (user) => {
  const formData = new FormData();
  for (const name in user) {
    formData.append(name, user[name]);
    // formData.append(password);
  }

  return axiosInstance.post("accounts/token/", formData);
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("authTokens", JSON.stringify(data));
    // localStorage.setItem("refresh", JSON.stringify(data.refresh));
    next();
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (authTokens) {
    return authTokens.access;
  } else {
    return false;
  }
};

export const Logout = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("authTokens");
    window.location.href = "/#/login";
  }
  window.location.reload();
};

export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem("authTokens");
  if (refreshToken) {
    const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
    const now = Math.ceil(Date.now() / 1000);
    if (tokenParts.exp > now) {
      return axios
        .post("http://127.0.0.1:8000/api/accounts/token/refresh/", {
          refresh: refreshToken.refresh,
        })
        .then((resp) => {
          localStorage.setItem("authTokens", JSON.stringify(resp.data));
          return resp.data;
        })
        .catch((err) => {
          return false;
        });
    }
  }
};
