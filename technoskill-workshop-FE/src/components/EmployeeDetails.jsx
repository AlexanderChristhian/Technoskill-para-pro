import React, { useState } from "react";
import employeeIcon from "../assets/employee.svg";

export default function EmployeeDetails() {
  const [name, setName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
      <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-2xl w-full">
        <div className="hidden md:block bg-cover" style={{ backgroundImage: `url(https://source.unsplash.com/1L71sPT5XKc)`, backgroundSize: 'cover' }}></div>
        <div className="w-full p-8 font-poppins text-gray-200">
          <div className="flex items-center justify-center w-full lg:pt-0">
            <img src={employeeIcon} className="rounded-full shadow-xl h-48 w-48 bg-cover bg-center" alt="Profile Icon" />
          </div>
          <h1 className="text-3xl font-bold pt-8 text-center">{name || "Employee Name"}</h1>
          <div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-purple-600 opacity-25"></div>
          <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
            <i className="fas fa-building h-4 text-purple-600 pr-4"></i>
            Division: <span className="pl-2">Software Engineer</span>
          </p>
          <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
            <i className="fas fa-dollar-sign h-4 text-purple-600 pr-4"></i>
            Salary : <span className="pl-2">12,000,000</span>
          </p>
          <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
            <i className="fas fa-map-marker-alt h-4 text-purple-600 pr-4"></i>
            Address: <span className="pl-2">123 Main Street, New York</span>
          </p>
        </div>
      </div>
    </div>
  );
}
