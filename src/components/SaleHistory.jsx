import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import { isAuthenticated } from "../utils/auth";

const SaleHistory = () => {
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5);

  let getSalesProduct = async () => {
    let response = await axiosInstance.get("sale-items/", {
      headers: { Authorization: `Bearer ${isAuthenticated()}` },
    });
    setSales(response.data);
  };

  useEffect(() => {
    getSalesProduct();
  }, []);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = sales.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getTime = (sales) => {
    return new Date(sales.sales_date).toDateString();
  };
  return (
    <>
      {currentProduct && currentProduct.length > 0 ? (
        currentProduct.map((sales, index) => (
          <li
            className="py-3 flex justify-between text-sm text-gray-500 font-semibold"
            key={index}
          >
            <p className="px-4 font-semibold">Today</p>
            <p className="px-4 text-gray-600">{sales.user.user_name}</p>
            <p className="px-4 tracking-wider">{sales.amount}</p>
            <p className="px-4 text-blue-600">{getTime(sales)}</p>
          </li>
        ))
      ) : (
        <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
          <p className="px-4 font-semibold">No sales made</p>
        </li>
      )}
    </>
  );
};

export default SaleHistory;
