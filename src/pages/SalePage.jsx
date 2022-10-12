import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../axiosInstance";
import CartItems from "../components/CartItems";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import { isAuthenticated } from "../utils/auth";

const SalePage = () => {
  const [items, setItemData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setisLoading] = useState(true)
  const [productPerPage] = useState(4);

  const inputEl = useRef("");

  useEffect(() => {
    getProduct();
  }, [loading]);

  let getProduct = async () => {
    let response = await axiosInstance.get("product/", {
      headers: { Authorization: `Bearer ${isAuthenticated()}` },
    });

    if (response.status === 200) {
      setItemData(response.data);
    }
    setTimeout(() => setisLoading(false), 3000);

  };
  const addToCart = (code) => {
    let response = axiosInstance.post(
      "cart/",
      { code },
      {
        headers: {
          Authorization: `Bearer ${isAuthenticated()}`,
        },
      }
    );
    window.location.reload();
  };

  const filterProducts = items.filter((item) => {
    if (searchTerm !== "") {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descriptions.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items;
  });

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const filterProducts = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  //   if (searchTerm !== "") {
  //     const newProduct = items.filter((item) => {
  //       return Object.values(item)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());
  //     });
  //     setSearchResults(newProduct);
  //   } else {
  //     setSearchResults(items);
  //   }
  // };

  // const getSearchTerm = () => {
  //   filterProducts(inputEl.current.value);
  // };x

  return (
    <div className="w-full relative lg:ml-56 pb-36 md:pb-24 ">
      <main>
        <div className="pt-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 mt-4 mb-4   gap-4 ">
            <div className="col-span-3 md:col-span-6 lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-50 flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-600 font-bold tracking-wide">
                  Sale Product
                </h2>
                <div className="flex bg-gray-50 items-center p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    className="bg-gray-50 outline-none ml-1 block "
                    type="text"
                    placeholder="search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg overflow-y-auto">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow sm:rounded-lg">
                      <table className="w-full divide-y-2 divide-gray-200 ">
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
                              Item Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Description
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
                              Selling Price
                            </th>

                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {currentProduct.length > 0 ? (
                            currentProduct.map((items, index) => (
                              <tr
                                key={index}
                                className="odd:bg-white even:bg-slate-100"
                              >
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                  <span className="font-semibold">{`${
                                    index + 1
                                  }`}</span>
                                </td>

                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 border-gray-200 border-b">
                                  <span className="font-semibold">
                                    {items.name}
                                  </span>
                                </td>
                                <td className="p-4  text-sm font-normal text-gray-500 border-gray-200 border-b">
                                  {items.descriptions}
                                </td>

                                <td className="p-4  border-b border-gray-200 text-sm">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 items-center justify-start">
                                      <span
                                        className={
                                          items.is_active
                                            ? "bg-green-300 rounded-full px-2 py-1 text-sm text-center"
                                            : "bg-red-400  rounded-full px-4 py-1 text-sm text-center text-neutral-600"
                                        }
                                      >
                                        {items.is_active ? "Available" : "Sold"}
                                      </span>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-gray-200 border-b">
                                  {items.selling_price}
                                </td>

                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900  flex">
                                  <button
                                    className="bg-gray-800 text-white px-4 py-1 tracking-wider text-sm rounded"
                                    onClick={() => addToCart(items.code)}
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="p-4 whitespace-nowrap  items-center justify-center text-sm font-semibold text-gray-900 border-gray-200">
                                No Item Match
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <Pagination
                          productPerPage={productPerPage}
                          totalProduct={items.length}
                          paginateBack={paginateBack}
                          paginateFront={paginateFront}
                          currentPage={currentPage}
                          paginate={paginate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 md:col-span-6 col-span-3 bg-white py-5 px-4  rounded-lg shadow-md border border-gray-50 flex flex-col space-y-5 ">
              <CartItems />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalePage;
