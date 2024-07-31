import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-white"
          style={{
            backgroundImage: `url(https://www.pngall.com/wp-content/uploads/15/Login-PNG-Cutout.png)`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back! Please Fill the Credentials Below</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
            />
          </div>
          <div className="mt-8">
            <button className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-900">
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700" onClick={() => navigate("/register")}> Sign Up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;