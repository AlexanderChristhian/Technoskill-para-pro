import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleHomePage = async () => {
    try {
      const response = await axios.post("http://localhost:8000/employee/get");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to fetch employees');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleHomePage();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-lg mx-auto mb-12">
      <header className="text-center my-6">
        <h2 className="text-2xl text-gray-900 dark:text-white">
          Recently Added Employees
        </h2>
      </header>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View Details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr
              key={employee.id}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                index % 2 === 0 ? '' : 'bg-gray-100'
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.id}
              </td>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/employee-details/${employee.id}`}
                  className="font-medium text-purple-600 dark:text-purple-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
