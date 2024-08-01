import { useState } from "react";
import axios from 'axios';
import ngumpulImage from '../assets/ngumpul.png'; 

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:8000/employee/add', {
        name,
        division,
        salary,
      });

      if(response.status !== 201) throw new Error("Add employee failed");

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
    <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
      <div
        className="hidden md:block lg:w-1/2 bg-cover"
        style={{
          backgroundImage: `url(${ngumpulImage})`,
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="w-full p-8 lg:w-1/2 font-poppins">
        <p className="text-xl text-gray-200 text-center">Add A New Employee Details Here</p>
        <div className="mt-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
            type="text"
            required
          />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Division
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
              Salary (IDR)
            </label>
          </div>
          <input
            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
            type="number"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Address
            </label>
          </div>
          <input
            className="text-gray-200 border border-gray-600 rounded py-2 px-4 block w-full bg-gray-800 focus:outline-2 focus:outline-blue-500"
            type="text"
          />
        </div>
        <div className="mt-8">
          <button className="bg-purple-600 text-gray-200 font-bold py-2 px-4 w-full rounded hover:bg-purple-700">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
