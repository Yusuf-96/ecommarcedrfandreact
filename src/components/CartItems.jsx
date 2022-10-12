import React, { useEffect, useState } from "react";
import { ReactComponent as DeleteIcon } from "../assets/deleteicon.svg";
import { ReactComponent as PlusIcon } from "../assets/plusicon.svg";
import { ReactComponent as MinusIcon } from "../assets/minusicon.svg";
import { useParams, useNavigate } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";
import { ErrorMessage } from "./message/message";

const CartItems = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { code } = useParams();

  useEffect(() => {
    axiosInstance
      .get("order/", {
        headers: {
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      })
      .then((res) => setOrder(res.data));
  }, []);

  const deleteOrderItem = (code) => {
    axiosInstance
      .delete(`order/${code}/delete/`, {
        code,
        headers: {
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      })
      .then(() => window.location.reload());
  };

  const addToCart = (code) => {
    axiosInstance
      .post(
        "cart/",
        { code },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated()}`,
          },
        }
      )
      .then(() => window.location.reload());
  };
  const removeFromCart = (code) => {
    axiosInstance
      .post(
        "order/",
        { code },
        {
          headers: {
            Authorization: `Bearer ${isAuthenticated()}`,
          },
        }
      )
      .then(() => window.location.reload());
  };

  const saleProduct = () => {
    if (orders.items.length !== 0) {
      axiosInstance
        .post(
          "sale-items/",
          {},
          {
            headers: {
              Authorization: `Bearer ${isAuthenticated()}`,
            },
          }
        )
        .then(() => navigate("/"));
    }
    ErrorMessage();
  };
  return (
    <div className="">
      <ToastContainer />
      <h1 className="text-sm text-gray-600 font-bold tracking-wide">
        Cart Items
      </h1>
      {/* <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2  border-gray-900"></div>
      </div> */}
      {orders.items && orders.items.length > 0 ? (
        orders.items.map((orderItem, index) => (
          <div className="items-center border-t " key={index}>
            <div className="flex justify-between items-center mt-4 ">
              <div className="flex items-center">
                <img
                  src={orderItem.item.image}
                  className="rounded-full h-8 w-8 object-cover "
                  alt="product"
                />
                <div className="flex flex-col ml-3">
                  <span className="md:text-md font-medium lg:text-md text-xs">
                    {orderItem.item.name}
                  </span>
                  <span className="text-xs font-light text-gray-400">
                    #41551
                  </span>
                </div>
              </div>
              <div className="flex justify-center p-2 items-center">
                <div className="pr-8 inline-flex space-x-4">
                  <span className="cursor-pointer">
                    <MinusIcon
                      onClick={() => removeFromCart(orderItem.item.code)}
                    />
                  </span>
                  <span className="font-semibold">{orderItem.quantity}</span>
                  <span className="cursor-pointer">
                    <PlusIcon onClick={() => addToCart(orderItem.item.code)} />
                  </span>
                </div>
                <div className="pr-8 ">
                  <span className="text-xs font-medium">
                    {orderItem.item.selling_price}
                  </span>
                </div>
                <div className="cursor-pointer">
                  <DeleteIcon onClick={() => deleteOrderItem(orderItem.code)} />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-2 text-sm border-t">
          <span> No Order Placed</span>
        </div>
      )}
      <div className="py-4 pt-24">
        <div className=" p-5 bg-gray-800 rounded overflow-visible">
          <span className="text-xl font-medium text-gray-100 block pb-4 border-b  ">
            Summary
          </span>

          <div className="flex justify-between items-center pt-3">
            <label className="text-xs text-gray-400 ">Profit:</label>
            <span className="text-white text-sm"> Tsh 0 </span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <label className="text-xs text-gray-400 ">Discount</label>
            <span className="text-white text-sm"> Tsh 0 </span>
          </div>

          <div className="flex justify-between  pt-3 border-t">
            <div className="text-base uppercase text-gray-400 ">
              Total Price
            </div>

            <span className="text-white">{orders.total}</span>
          </div>

          <div className=" mt-16">
            <button
              className="h-12 w-full bg-green-400 rounded focus:outline-none text-white hover:bg-green-500 cursor-pointer"
              onClick={() => saleProduct()}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
