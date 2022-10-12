import React from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "../../utils/auth";
import { SidebarData } from "./SidebarData";

const SideBar = ({ isOpen, toggle }) => {
  return (
    <>
      <aside
        id="sidebar"
        className={
          isOpen
            ? "fixed w-56   lg:flex  z-20 min-h-screen   top-0 left-0 pt-16  transition-transform   duration-700 ease-in-out shadow-md"
            : "fixed w-56 hidden z-20 lg:flex"
        }
      >
        <div className=" relative flex-1 h-screen   border-r  bg-white border-gray-200 pt-0">
          <div className="flex flex-col pt-5 pb-4">
            <div className=" px-3  divide-y space-y-1">
              <ul className="space-y-2 pb-32">
                {SidebarData.map((side, index) => (
                  <li key={index}>
                    <NavLink
                      to={side.path}
                      className={({ isActive }) =>
                        isActive
                          ? "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 border-l-4 border-green-500 bg-neutral-100"
                          : "flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4"
                      }
                    >
                      <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                        {side.icon}
                      </span>
                      <span className="text-sm font-medium">{side.title}</span>
                    </NavLink>
                  </li>
                ))}

                <li>
                  <button
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500  active:bg-neutral-100 hover:bg-neutral-100 active:border-l-4 active:border-green-500 hover:border-green-500 hover:border-l-4 w-full"
                    onClick={() => Logout()}
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 rotate-180">
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
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
