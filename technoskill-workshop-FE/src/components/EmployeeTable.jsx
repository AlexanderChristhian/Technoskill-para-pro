import React from 'react';

const EmployeeTable = () => {
  const employees = [
    {
      id: '1',
      name: 'John Doe',
      division: 'Engineering',
      salary: 'IDR 25,000,000',
      addresses: '123 Main St, Jakarta',
    },
    {
      id: '2',
      name: 'Jane Smith',
      division: 'Marketing',
      salary: 'IDR 22,000,000',
      addresses: '456 Elm St, Bandung',
    },
    {
      id: '3',
      name: 'Emily Johnson',
      division: 'Design',
      salary: 'IDR 20,000,000',
      addresses: '789 Oak St, Surabaya',
    },
  ];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-lg mx-auto">
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
          {employees.map((employee, index) => (
            <tr
              key={index}
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                index % 2 === 0 ? '' : 'bg-gray-100'
              }`}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {employee.id}
              </td>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
