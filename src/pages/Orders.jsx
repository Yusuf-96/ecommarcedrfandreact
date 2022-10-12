import React, { useEffect, useState } from "react";
import { categoryApiCall } from "../service/ReportApiCalls";

const Orders = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  let getCategories = async () => {
    let response = await categoryApiCall();

    if (response.status === 200) {
      setCategories(response.data);
    }
  };
  return (
    <>
      <div className="min-h-screen w-full relative lg:ml-56  pb-36">
        <main>
          <div className="pt-4 px-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    Categories
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
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              SN
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              category Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date & Time
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {categories.map((category, index) => (
                            <tr key={index}>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                <span className="font-semibold">
                                  {`${index + 1}`}
                                </span>
                              </td>

                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                <span className="font-semibold">{category.category_name}</span>
                              </td>

                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                <span className="font-semibold">{new Date(category.created_at).toLocaleDateString()}</span>
                              </td>

                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                <span className="font-semibold">status</span>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                <span className="font-semibold">amouat</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Orders;
