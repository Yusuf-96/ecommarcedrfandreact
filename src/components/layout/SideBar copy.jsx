import React from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticated, Logout } from "../../utils/auth";

const SideBar = ({ isOpen, toggle }) => {
  return (
    <>
      <aside
        id="sidebar"
        className={
          isOpen
            ? "fixed w-56   lg:flex  z-20 min-h-screen   top-0 left-0 pt-16  transition-transform   duration-700 ease-in-out shadow-md"
            : "fixed w-56 hidden  lg:flex"
        }
      >
        <div className=" relative flex-1 h-screen   border-r  bg-white border-gray-200 pt-0">
          <div className="flex flex-col pt-5 pb-4">
            <div className=" px-3  divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavLink
                    to="/"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-home w-5 h-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Dashboard</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/shop"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-gray-400 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4 "
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Shop</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        />
                      </svg>
                    </span>

                    <span className="text-sm font-medium">Category</span>

                    {/* <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                      5
                    </span> */}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4 "
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/salepoint"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-report-money w-5 h-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                        <rect x="9" y="3" width="6" height="4" rx="2"></rect>
                        <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                        <path d="M12 17v1m0 -8v1"></path>
                      </svg>
                    </span>

                    <span className="text-sm font-medium">Point of Sale</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/report"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4 "
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-report h-5 w-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path>
                        <path d="M18 14v4h4"></path>
                        <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path>
                        <rect x="8" y="3" width="6" height="4" rx="2"></rect>
                        <circle cx="18" cy="18" r="4"></circle>
                        <path d="M8 11h4"></path>
                        <path d="M8 15h3"></path>
                      </svg>
                    </span>

                    <span className="text-sm font-medium">Report</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>

                    <span className="text-sm font-medium">User</span>
                  </NavLink>
                </li>
                <li>
                  <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">Role</span>
                  </p>
                </li>

                <li>
                  <button
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4 w-full"
                    onClick={() => Logout()}
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-log-out"></i>
                    </span>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div
          className={
            isOpen
              ? "bg-gray-900 opacity-50   inset-0  transition duration-300 ease-in-out"
              : ""
          }
          id="sidebarBackdrop"
        ></div>{" "} */}
      </aside>
    </>
  );
};

export default SideBar;
