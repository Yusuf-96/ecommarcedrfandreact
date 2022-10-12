import React, { useEffect, useState } from "react";
import { getAllExpenses } from "../service/ReportApiCalls";

const Icome = () => {
  const [expense, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, []);

  let getExpenses = async () => {
    let response = await getAllExpenses();

    if (response.status === 200) {
      setExpenses(response.data);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <div className="w-full bg-white rounded-lg shadow-md border-t-4 border-green-600 px-4 py-6  flex flex-col ">
        <div className="flex items-center justify-between   text-left">
          <span className="items-center justify-center">
            <p className="text-xl text-green-400 font-bold ">Revenue</p>
            {expense ? (
              <p className="text-2xl text-gray-800 font-bold ">
                Tsh {expense.revenue}
              </p>
            ) : (
              <p className="text-2xl text-gray-800 font-bold "> Tsh 0</p>
            )}
            <p className="text-sm text-gray-400 font-bold ">
              2.7% Since last Month
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-md border-t-4 border-rose-600 px-4 py-6  flex flex-col ">
        <div className="flex items-center justify-between   text-left">
          <span className="items-center justify-center">
            <p className="text-xl text-green-400 font-bold ">Sales</p>
            {expense ? (
              <p className="text-2xl text-gray-800 font-bold ">
                Tsh {expense.sales_item}
              </p>
            ) : (
              <p className="text-2xl text-gray-800 font-bold ">Tsh 0</p>
            )}

            <p className="text-sm text-gray-400 font-bold ">
              2.7% Since last Month
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
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-md px-4 py-6 border-t-4 border-fuchsia-800  flex flex-col ">
        <div className="flex items-center justify-between   text-left">
          <span className="items-center justify-center">
            <p className="text-xl text-green-400 font-bold ">Purchase</p>
            {expense ? (
              <p className="text-2xl text-gray-800 font-bold ">
                Tsh {expense.purchase_item}{" "}
              </p>
            ) : (
              <p className="text-2xl text-gray-800 font-bold ">Tsh 0</p>
            )}

            <p className="text-sm text-gray-400 font-bold ">
              2.7% Since last Month
            </p>
          </span>
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-activity"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 12h4l3 8l4 -16l3 8h4"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Icome;
