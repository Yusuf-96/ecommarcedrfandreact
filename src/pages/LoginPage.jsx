import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, authenticate } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const initialData = Object.freeze({
    phone: "",
    password: "",
  });
  const [loginData, setLoginData] = useState(initialData);

  const { phone, password } = loginData;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData });

    login(loginData)
      .then((resp) => {
        // let data = resp;
        if (resp.status == 200) {
          localStorage.setItem("authTokens", JSON.stringify(resp.data));
          // authenticate(data);
          setLoginData({
            ...loginData,
          });
          navigate("/");
          window.location.reload();
        } else {
          setLoginData({ ...loginData });
        }
        // console.log(data.data)
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-white lg:w-4/12 md:w-6/12 w-10/12 mx-auto lg:mt-12 md:mt-48 mt-8 mb-12   shadow-md ">
      <div className="py-6 px-8 rounded-xl">
        <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="my-5 text-sm">
            <label className="block text-black">Phone Number</label>
            <input
              type="text"
              className="rounded-sm px-4 py-3 peer mt-3 focus:outline-none bg-gray-100 w-full focus:ring-2 focus:ring-green-600"
              placeholder="E.g. 06xxxxxxxx"
              name="phone"
              value={loginData.phone || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-5 text-sm">
            <label className="block text-black">Password</label>
            <input
              type="password"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full focus:ring-2 focus:ring-green-600"
              placeholder="Password"
              name="password"
              value={loginData.password || ""}
              onChange={handleChange}
            />

            <div className="flex justify-end mt-2 text-sm text-gray-600 hover:text-gray-800">
              <p className="hover:text-black">Forget Password</p>
            </div>
          </div>
          <button
            className="block text-center text-white bg-green-400 p-3 duration-300 rounded-sm hover:bg-green-500 w-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-5 flex items-center  justify-center">
          <span>Don't have an account ? </span>
          <p className="text-md text-slate-600 font-semibold underline ml-2 hover:text-slate-800">
            Contact Owner
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
