import React from "react";
// import "./Loading.css";
const Loading = () => {
  // const myStyle = {
  //   width: "3.75em",
  //   transformOrigin: "center",
  //   animation: "rotate 2s linear infinite",
  // };

  return (
    <>
      <div className="items-center justify-center flex w-full h-full bg-gray-200 z-40  top-0 left-0 fixed ">
        <svg
          className="svg-icon text-center w-10 h-10 animate-spin"
          viewBox="25 25 50 50"
        >
          <circle
            className="circular"
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
    </>
  );
};

export default Loading;
