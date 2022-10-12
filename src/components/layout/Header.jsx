import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import UserDropdown from "../UserDropdown";

const Header = ({toggle}) => {
  const auth = isAuthenticated();

  return (
    <nav className="w-full bg-green-400 fixed top-0 z-40">
      <div className="flex items-center h-20 justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section className="flex items-center text-white space-x-2">
          <span className="font-bold text-xl outline-none rounded-lg">
            ISMS
          </span>
        </section>
        <section className="flex  items-center justify-center">
          <ul className="flex space-x-4">
            {auth ? (
              <li className="md:flex hidden space-x-2">
                <UserDropdown />
              </li>
            ) : (
              <li className="md:flex text-white text-lg  tracking-wider font-semibold">
                <span>Login</span>
              </li>
            )}
          </ul>
          <button
            className="flex md:hidden hover:bg-gray-100 p-2 rounded-full transition-all focus:ring focus:ring-purple-500 focus:ring-opacity-25 active:bg-gray-200 outline-none text-white hover:text-green-500"
            id="toggleSidebarMobile"
            aria-expanded="true"
            aria-controls="sidebar" onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {/* <svg
              id="toggleSidebarMobileClose"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 hidden"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg> */}
          </button>
        </section>
      </div>
    </nav>
  );
};

export default Header;
