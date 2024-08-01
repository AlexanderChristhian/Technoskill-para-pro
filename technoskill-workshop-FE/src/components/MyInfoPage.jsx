import React, { useState } from "react";
import employeeIcon from "../assets/employee.svg";

export default function MyInfoPage() {
  const [name, setName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
      <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm w-full">
        <div className="hidden md:block bg-cover" style={{ backgroundImage: `url(https://source.unsplash.com/1L71sPT5XKc)`, backgroundSize: 'cover' }}></div>
        <div className="w-full p-6 md:p-8 font-poppins text-gray-200">
          <div className="flex items-center justify-center w-full lg:pt-0">
            <img src={employeeIcon} className="rounded-full shadow-xl h-32 w-32 md:h-48 md:w-48 bg-cover bg-center" alt="Profile Icon" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold pt-4 md:pt-8 text-center">{name || "Your Name"}</h1>
          <div className="mx-auto lg:mx-0 w-full pt-2 md:pt-3 border-b-2 border-purple-600 opacity-25"></div>
          <p className="pt-2 font-bold text-gray-200 text-sm md:text-base flex items-center justify-start md:justify-center">
            <svg className="h-4 fill-current text-purple-600 pr-2 md:pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12 12.713L1.864 6.43A2 2 0 0 1 3.25 4h17.5a2 2 0 0 1 1.386 2.43L12 12.713zM3 9.29l8.553 5.206a1 1 0 0 0 .894 0L21 9.291V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.29z"/>
            </svg>
            Email : <span className="font-normal ml-2">Placeholder@email.com</span>
          </p>
          <p className="pt-2 font-bold text-gray-200 text-sm md:text-base flex items-center justify-start md:justify-center">
            <svg className="h-4 fill-current text-purple-600 pr-2 md:pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12 2a5 5 0 0 0-5 5v2H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-1V7a5 5 0 0 0-5-5zm3 7H9V7a3 3 0 0 1 6 0v2zm-4 5v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0z"/>
            </svg>
            Password : <span className="font-normal ml-2">**********</span>
          </p>
          <p className="pt-4 md:pt-8 text-xs md:text-sm text-center">
            You are currently a registered user on this page, being a user will allow you to add a new employee details to the database of this website.
          </p>
        </div>
      </div>
    </div>
  );
}
