import { isAuthenticated } from "../utils/auth";
import { axiosInstance } from "../axiosInstance";

export const getProduct = () => {
  return axiosInstance.get("product/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const productDelete = (code) => {
  return axiosInstance.delete(`product/detail/${code}/`, {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};
