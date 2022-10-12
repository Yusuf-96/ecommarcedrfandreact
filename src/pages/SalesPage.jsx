import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

const SalesPage = ({ history }) => {
  const [items, setItemData] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  let getProduct = async () => {
    let response = await axiosInstance.get("product/", {
      headers: { Authorization: `Bearer ${isAuthenticated()}` },
    });

    setItemData(response.data);
  };
  const addToCart = (code) => {
    axiosInstance.post(
      "cart/",
      { code },
      {
        headers: {
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      }
    );
  };
  return (
    <div className=" w-full relative lg:ml-56 pb-36 md:pb-24">
      <main>
        <div className="pt-4 px-4">
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
            <div className="flex justify-between px-2 border-b py-2">
              <div className="inline-flex space-x-2 ">
                <h1 className="text-xl font-semibold tracking-wide">
                  Sale Items
                </h1>
              </div>
            </div>
            {items.name}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6  py-4">
              {items.map((items, index) => (
                <div
                  className="relative  bg-white shadow-md rounded-md p-2 mx-1 my-3 cursor-pointer"
                  key={index}
                >
                  <div className="overflow-x-hidden rounded-md relative">
                    <img
                      className="h-40 rounded-2xl w-full object-cover"
                      src={items.image}
                      alt="product"
                    />

                    <p className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                      {items.categories}
                    </p>
                  </div>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-0">
                        {items.name}
                      </p>
                      <p className="text-md text-gray-800 mt-0">
                        Tsh {items.selling_price}
                      </p>
                    </div>
                    <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                      <button
                        className="bg-gray-800 text-white px-4 py-1 tracking-wide text-base rounded"
                        onClick={() => addToCart(items.code)}
                      >
                        Add
                      </button>
                    </div>
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

export default SalesPage;
