import React, { useEffect, useState } from "react";
import { getAllTopSelling } from "../service/ReportApiCalls";

const TopSelling = () => {
  const [topselling, setTopSelling] = useState([]);

  const getTopSelling = async () => {
    let response = await getAllTopSelling();

    if (response.status === 200) {
      setTopSelling(response.data);
    }
  };

  useEffect(() => {
    getTopSelling();
  }, []);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Top Selling 
          </h3>
          {/* <span className="text-base font-normal text-gray-500">
                  This is a list of latest transactions
                </span> */}
        </div>
        <div className="flex-shrink-0">
          <p className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2">
            View all
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {topselling.map((selling, index) => (
          <div
            className="w-full bg-neutral-50 rounded-lg shadow-md px-4 py-2  flex flex-col "
            key={index}
          >
            <div className="block items-center  text-left space-y-2">
              <div className="rounded bg-gray-200 w-full h-28">
                <span>
                  <img src={selling.image} alt="items" className="object-cover h-full w-full " />
                </span>
              </div>
              <div className=" w-full">
                <span className="items-center justify-center py-4">
                  <p className="text-sm text-green-400 font-medium ">
                    {selling.name}
                  </p>
                  <p className="text-sm text-gray-800 font-bold ">
                    Quantity {selling.sum_of_item}
                  </p>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
