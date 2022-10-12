import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../axiosInstance";
import SaleDetaiilsList from "../components/SaleDetaiilsList";
import SalePagination from "../components/SalePagination";
import { downloadCSVFile, getAllSalesItem } from "../service/ReportApiCalls";
import { isAuthenticated } from "../utils/auth";

const SaleDetails = () => {
  const [itemsDetails, setItemsDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [productPerPage] = useState(10);

  const inputEl = useRef("");

  const getSaleDetails = async () => {
    let response = await getAllSalesItem();

    if (response.status === 200) {
      console.log(response.data);
      setItemsDetails(response.data);
    }
  };

  useEffect(() => {
    getSaleDetails();
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = itemsDetails.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(itemsDetails);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = itemsDetails.slice(
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

  const downloadCsv = () => {
    axiosInstance
      .get("downloadcsv/", {
        headers: { Authorization: `Bearer ${isAuthenticated()}` },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.download = "file_to_import.csv";
        // link.setAttribute("download", "file_to_import.csv");
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <>
      <div className="min-h-screen w-full relative lg:ml-56 pb-36 md:pb-24">
        <main>
          <div className="pt-4 px-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    All Sales
                  </h3>
                </div>
                <div className="flex flex-wrap space-x-4">
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
                      ref={inputEl}
                      value={itemsDetails?.searchTerm}
                      placeholder="search..."
                      onChange={getSearchTerm}
                    />
                  </div>
                  <button className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2 ">
                    Download csv
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <SaleDetaiilsList
                        details={
                          searchTerm.length < 1 ? currentProduct : searchResults
                        }
                      />
                      <div className="flex items-center justify-center mt-4">
                        <SalePagination
                          productPerPage={productPerPage}
                          totalProduct={itemsDetails.length}
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
          </div>
        </main>
      </div>
    </>
  );
};

export default SaleDetails;
