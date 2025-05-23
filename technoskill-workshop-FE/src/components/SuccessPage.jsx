import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './transisi.css'; 

export default function SuccessPage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full p-8 transition-transform duration-1000 ${fadeIn ? 'transform scale-100' : 'transform scale-95'}`}>
        <div className="flex justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-16 h-16 text-green-500"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              stroke="currentColor" 
              strokeWidth="2" 
              d="M9 12l2 2 4-4" 
            />
          </svg>
        </div>
        <p className="text-xl text-gray-200 text-center font-poppins">Employee added successfully!</p>
        <div className="mt-8 flex justify-center">
          <Link to="/add-employee" className="bg-purple-600 text-gray-200 font-bold font-poppins py-2 px-4 rounded hover:bg-purple-700">
            Add Another Employee
          </Link>
        </div>
      </div>
    </div>
  );
}
