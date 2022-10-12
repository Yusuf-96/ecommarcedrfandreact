import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

const ShopPage = () => {
  const [shop, setShop] = useState([]);
  useEffect(() => {
    getShop();
  }, []);

  let getShop = async () => {
    let response = await axiosInstance.get("shop/", {
      headers: { Authorization: `Bearer ${isAuthenticated()}` },
    });

    if (response.status === 200) {
      setShop(response.data);
    }
  };

  return (
    <div className="min-h-screen w-full relative lg:ml-56 ">
      <main>
        <div className="pt-4 px-4">
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
            <div className="mb-4 flex items-center justify-between border-b py-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Shop List
                </h3>
              </div>
              <div className="flex">
                <p className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">
                  View all
                </p>
                <button className="text-sm font-medium text-white hover:bg-sky-800 rounded-lg p-2 px-4 py-2 bg-sky-900 flex">
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {shop.map((shop, index) => (
                <div
                  className="w-full bg-white rounded-lg shadow-md px-4   flex flex-col "
                  key={index}
                >
                  <div className="flex items-center justify-between   text-left py-8">
                    <span className="items-center justify-center py-4">
                      <p className="text-sm text-green-400 font-bold ">
                        {shop.shop_name}
                      </p>
                      <p className="text-base text-gray-800 font-bold "></p>
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
