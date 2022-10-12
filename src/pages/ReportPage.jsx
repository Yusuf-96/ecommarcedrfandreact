import React, { useEffect, useRef, useState } from "react";
import PaginationReport from "../components/PaginationReport";
import ReportList from "../components/ReportList";
import { getAllReport } from "../service/ReportApiCalls";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportPerPage] = useState(5);

  const inputEl = useRef("");

  useEffect(() => {
    getReport();
  }, [loading]);

  let getReport = async () => {
    let response = await getAllReport();
    
    if (response.status === 200) {
      setReports(response.data);
    }
    setTimeout(() => setLoading(false), 3000);
    
  };

  // const searchHandler = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  //   if (searchTerm !== "") {
  //     const newReportList = reports.filter((report) => {
  //       return Object.values(report)
  //         .join("")
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());
  //     });
  //     setSearchResults(newReportList);
  //   } else {
  //     setSearchResults(reports);
  //   }
  // };

  // const getSearchTerm = () => {
  //   searchHandler(inputEl.current.value);
  // };

  return (
    <div className="min-h-screen w-full relative lg:ml-56 pb-36 md:pb-24">
      <main>
        <div className="pt-4 px-4">
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 xl:p-8 mt-4 mb-4 ">
            <div className="mb-4 flex items-center justify-between border-b py-2">
              <div>
                <h3 className="text-xl font-bold text-sky-900 mb-2">
                  Report List
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
                    placeholder="search..."
                  />
                </div>

                <button className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2 ">
                  Download csv
                </button>
                {/* <button className="text-sm font-medium text-white hover:bg-sky-800 rounded-lg px-4 py-2 bg-sky-900 flex">
                  <span></span>
                  <span>New</span>
                </button> */}
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="overflow-x-auto rounded-lg">
                <div className="align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden sm:rounded-lg">
                    {loading ? (
                      <div className="items-center justify-center flex w-full h-full">
                        <svg
                          className="svg-icon text-center text-green-600 w-10 h-10 animate-spin"
                          viewBox="25 25 50 50"
                        >
                          <circle
                            className="circular "
                            fill="None"
                            stroke="CurrentColor"
                            strokeWidth={2}
                            strokeDasharray={(1, 200)}
                            strokeDashoffset={0}
                            strokeLinecap="round"
                            cx={50}
                            cy={50}
                            r={20}
                          ></circle>
                        </svg>
                      </div>
                    ) : (
                      <>
                        <ReportList reports={reports} />
                        <div className="flex p-2 items-center justify-center">
                          <PaginationReport />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportPage;
