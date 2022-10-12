import React, { useEffect, useState } from "react";
import { ReactComponent as PlusIcon } from "../assets/plusicon.svg";
import Modal from "../components/Modal";
import { toast, ToastContainer } from "react-toastify";
import { getProduct } from "../service/ProductApi";
import "react-toastify/dist/ReactToastify.css";
import "../components/Loading.css";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [items, setItemData] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5);

  // const myStyle = {
  //   width: "3.75em",
  //   transformOrigin: "center",
  //   animation: "rotate 2s linear infinite",
  // };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  let getAllProduct = async () => {
    let response = await getProduct();

    if (response.status === 200) {
      setItemData(response.data);
      setTimeout(() => setisLoading(false), 2000);
    } else {
      toast.error("Something Went wrong ", {
        className: "error-toast",
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginateFront = () => {
    setCurrentPage(currentPage + 1);
  };
  const paginateBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="min-h-screen w-full relative lg:ml-56 pb-36 md:pb-24  ">
        <ToastContainer />
        <main>
          <div className="pt-4 px-4">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
              <Modal close={closeModal} open={isOpen} />
              <div className="mb-4 flex items-center justify-between border-b py-2">
                <div>
                  <h3 className="text-xl font-bold text-sky-900 mb-2">
                    Products List
                  </h3>
                </div>
                <div className="flex space-x-4">
                  <Link to="/product-upload">
                    <p className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2 active:bg-sky-200 cursor-pointer ">
                      import csv
                    </p>
                  </Link>
                  <button
                    className="text-sm font-medium text-white hover:bg-sky-800 rounded-lg px-4 py-2 bg-sky-900 flex"
                    onClick={openModal}
                  >
                    <span>
                      <PlusIcon />
                    </span>
                    <span>New</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      {!isLoading ? (
                        <>
                          <ProductList items={currentProduct} />
                          <div className="flex items-center justify-center mt-4">
                            <Pagination
                              productPerPage={productPerPage}
                              totalProduct={items.length}
                              paginateBack={paginateBack}
                              paginateFront={paginateFront}
                              currentPage={currentPage}
                              paginate={paginate}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="items-center justify-center flex w-full ">
                          <svg
                            className="svg-icon text-center animate-spin w-14 h-14 stroke-cyan-500 "
                            viewBox="25 25 50 50"
                          >
                            <circle
                              className="circular duration-700"
                              fill="None"
                              stroke="CurrentColor"
                              strokeDasharray={(1, 200)}
                              strokeDashoffset={0}
                              strokeLinecap="round"
                              cx={50}
                              cy={50}
                              r={20}
                            ></circle>
                          </svg>
                        </div>
                      )}
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

export default ProductPage;
