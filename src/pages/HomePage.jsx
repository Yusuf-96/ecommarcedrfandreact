import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUser } from "../service/UserApi";
import { Link } from "react-router-dom";

import SaleHistory from "../components/SaleHistory";
import Icome from "../components/Icome";
import ChartUi from "../components/ChartUi";
import { getAllCategories } from "../service/ReportApiCalls";
import TopSelling from "../components/TopSelling";

const HomePage = () => {
  const [shop, setShop] = useState([]);
  const [items, setItemData] = useState([]);
  const [category, setCategory] = useState([]);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    getShop();
    getProduct();
    getUsers();
    getCategory();
  }, []);

  let getUsers = async () => {
    const response = await getAllUser();
    if (response.status === 200) {
      setuserData(response.data);
    }
  };
  let getCategory = async () => {
    const response = await getAllCategories();
    if (response.status === 200) {
      setCategory(response.data);
    }
  };

  let getShop = async () => {
    let response = await axiosInstance.get("shop/", {
      headers: {
        Authorization: `Bearer ${isAuthenticated()}`,
      },
    });

    if (response.status === 200) {
      setShop(response.data);
    }
  };

  let getProduct = async () => {
    let response = await axiosInstance.get("product/", {
      headers: {
        Authorization: `Bearer ${isAuthenticated()}`,
      },
    });

    setItemData(response.data);
  };

  return (
    <div className="overflow-y-auto h-full w-full relative lg:ml-56 lg:pb-24 pb-32">
      <main>
        <div className="pt-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full bg-white rounded-lg shadow-md px-4 py-2  flex flex-col ">
              <div className="flex items-center justify-between   text-left">
                <span className="items-center justify-center py-4">
                  <p className="text-sm text-green-400 font-bold ">
                    Total Items
                  </p>
                  <p className="text-base text-gray-800 font-bold ">
                    {items.length}
                  </p>
                </span>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md px-4 py-2  flex flex-col ">
              <div className="flex items-center justify-between   text-left">
                <span className="items-center justify-center py-4">
                  <p className="text-sm text-green-400 font-bold ">
                    Total Shop
                  </p>
                  <p className="text-base text-gray-800 font-bold ">
                    {shop.length}
                  </p>
                </span>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md px-4 py-2  flex flex-col ">
              <div className="flex items-center justify-between   text-left">
                <span className="items-center justify-center py-4">
                  <p className="text-sm text-green-400 font-bold ">User</p>
                  <p className="text-base text-gray-800 font-bold ">
                    {userData.length}
                  </p>
                </span>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md px-4 py-2  flex flex-col ">
              <div className="flex items-center justify-between   text-left">
                <span className="items-center justify-center py-4">
                  <p className="text-sm text-green-400 font-bold ">
                    Total Category
                  </p>
                  <p className="text-base text-gray-800 font-bold ">
                    {category.length}
                  </p>
                </span>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-4 ">
            <div className="grid grid-cols-1 md:grid-cols-5  px-0  gap-4 ">
              <div className="lg:col-span-2 md:col-span-6 col-span-3 bg-white py-6 px-4  rounded-lg shadow-md border border-gray-50 flex flex-col space-y-4 ">
                <h1>Sales History</h1>

                <div className="bg-white shadow-lg mx-auto  w-full">
                  <ChartUi />
                </div>
              </div>
              <div className="col-span-3 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-50 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                    Latest Sales
                  </h2>
                  <Link
                    to="/all-salles"
                    className="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300"
                  >
                    More
                  </Link>
                </div>
                <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                  <SaleHistory />
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Icome />
          </div>

          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4">
            <TopSelling />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
