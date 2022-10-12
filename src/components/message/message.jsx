import React from "react";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorMessage = () => {
  return toast.error("Please Add item to cart!", {
    className: "success-toast",
    position: toast.POSITION.TOP_RIGHT,
  });
};
