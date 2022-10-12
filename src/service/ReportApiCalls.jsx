import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

export const getAllReport = () => {
  return axiosInstance.get("report/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const getAllExpenses = () => {
  return axiosInstance.get("expenses/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};
export const getAllSalesItem = () => {
  return axiosInstance.get("all-sales/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const getAllCategories = () => {
  return axiosInstance.get("category/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const getAllTopSelling = () => {
  return axiosInstance.get("top-selling/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const categoryApiCall = () => {
  return axiosInstance.get("category/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const uploadCSVFile = () => {
  return axiosInstance.post("csv-import/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};

export const downloadCSVFile = () => {
  return axiosInstance.get("downloadcsv/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};
