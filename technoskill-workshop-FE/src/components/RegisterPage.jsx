import React from "react";
import { useNavigate } from "react-router-dom";
import registrasi from '../assets/registrasi.png'; 

const RegisterPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
          <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
            <div
              className="hidden md:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage: `url(${registrasi})`,
                backgroundSize: 'cover',
              }}
            ></div>
            <div className="w-full p-8 lg:w-1/2 font-poppins">
              <p className="text-xl text-gray-200 text-center">Let's Create A New Account!</p>
              <div className="mt-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                  type="email"
                  required
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Username
                  </label>
                </div>
                <input
                  className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                  type="text"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                  type="password"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                </div>
                <input
                  className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
                  type="password"
                />
              </div>
              <div className="mt-8">
                <button className="bg-purple-600 text-gray-200 font-bold py-2 px-4 w-full rounded hover:bg-purple-700">
                  Register
                </button>
              </div>
              <div className="mt-4 flex items-center w-full text-center">
                <span className="text-xs text-gray-400 capitalize text-center w-full cursor-pointer" onClick={() => navigate("/login")}>
                  Already have an account?
                  <span className="text-blue-400"> Login</span>
                </span>
              </div>
            </div>
          </div>
        </div>
    );
};

export default RegisterPage;
