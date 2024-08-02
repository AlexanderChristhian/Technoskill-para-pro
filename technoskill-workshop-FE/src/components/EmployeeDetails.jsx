import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import employeeIcon from '../assets/employee.svg';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details');
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
      <button
        onClick={() => navigate(-1)} 
        className="mt-4 font-poppins font-medium text-purple-600 hover:text-purple-400 transition-colors duration-200"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>

      {employee && (
        <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-2xl w-full relative mt-6">
          <div className="hidden md:block bg-cover" style={{ backgroundImage: `url(https://source.unsplash.com/1L71sPT5XKc)`, backgroundSize: 'cover' }}></div>
          <div className="w-full p-8 font-poppins text-gray-200">
            <div className="flex flex-col items-center justify-center w-full lg:pt-4">
              <div className="text-center text-xl font-medium text-purple-400 mb-4">
                Employee Details
              </div>
              <img src={employeeIcon} className="rounded-full shadow-xl h-48 w-48 bg-cover bg-center" alt="Profile Icon" />
            </div>
            <h1 className="text-3xl font-bold pt-8 text-center">{employee.name}</h1>
            <div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-purple-600 opacity-25"></div>
            <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
              <i className="fas fa-building h-4 text-purple-600 pr-4"></i>
              Division: <span className="pl-2 font-normal">{employee.division}</span>
            </p>
            <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
              <i className="fas fa-dollar-sign h-4 text-purple-600 pr-4"></i>
              Salary: <span className="pl-2 font-normal">Rp {employee.salary}</span>
            </p>
            <p className="pt-2 font-bold text-gray-200 text-base lg:text-sm flex items-center justify-center">
              <i className="fas fa-map-marker-alt h-4 text-purple-600 pr-4"></i>
              Address: <span className="pl-2 font-normal">{employee.address}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
    <div className="flex bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-2xl w-full relative">
      <div className="w-full p-8 font-poppins text-gray-200">
        <div className="animate-pulse">
          <div className="h-48 w-48 bg-gray-700 rounded-full mb-4 mx-auto"></div>
          <div className="bg-gray-700 h-8 w-3/4 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded mb-4"></div>
          <div className="bg-gray-700 h-6 w-1/2 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeeDetails;
