import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

export const getAllUser = () => {
  return axiosInstance.get("accounts/user/", {
    headers: { Authorization: `Bearer ${isAuthenticated()}` },
  });
};
