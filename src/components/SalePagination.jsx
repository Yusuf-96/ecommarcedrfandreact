import React from 'react';

const SalePagination = ({
  productPerPage,
  totalProduct,
  paginateFront,
  paginateBack,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="">
      <div>
        <p className="text-sm text-gray-400  space-x-px">
          Showing{" "}
          <span className="font-medium">
            {currentPage * productPerPage - (productPerPage - 1)}{" "}
          </span>
          to
          <span className="font-medium">
            {" "}
            {currentPage * productPerPage - (productPerPage - 1)}{" "}
          </span>
          of
          <span className="font-medium"> {totalProduct} </span> results{" "}
        </p>
      </div>

      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm space-x-px"
          aria-label="Pagination"
        >
          <button
            className={`${
              currentPage === 1
                ? "disabled shadow-none pointer-events-none border px-2 py-2 text-gray-400  rounded-l-md border-gray-300 bg-white"
                : "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
            }`}
            onClick={() => {
              paginateBack();
            }}
          >
            Previous
          </button>
          <div>
            <ul className="flex pl-0 rounded list-none flex-wrap">
              <li>
                {pageNumbers.map((number, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      paginate(number);
                    }}
                    className={
                      currentPage === number
                        ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    }
                  >
                    {" "}
                    {number}
                  </button>
                ))}
              </li>
            </ul>
          </div>
          <button
            className={`${
              currentPage !== 1
                ? "disabled shadow-none pointer-events-none border px-2 py-2 text-gray-400  rounded-l-md border-gray-300 bg-white"
                : "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50"
            }`}
            onClick={() => {
              paginateFront();
            }}
          >
            next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SalePagination;
