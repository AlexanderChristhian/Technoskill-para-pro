import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import mobile from '../assets/mobile.png';
import authService from '../services/authService';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const employeeTableRef = useRef(null);
  const signInSectionRef = useRef(null); 

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleCheckBelowClick = () => {
    if (isAuthenticated) {
      employeeTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      signInSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='text-white font-poppins'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex items-center flex-col justify-center'>
        <p className='bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold p-2 text-base md:text-lg'>
          Welcome to Technoskill 1.0 Employee Database Management
        </p>
        <div className='flex flex-col items-center'>
          <div className='hidden md:block'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl md:animate-typing text-center md:overflow-hidden md:whitespace-nowrap md:border-r-4 border-r-white md:pr-5 font-bold md:py-6'>
              Manage your Workforce Now!!!
            </h1>
          </div>
          <div className='md:hidden mt-4 mb-4'> 
            <img 
              src={mobile} 
              alt="Mobile Icon" 
              className="w-20 h-20 float-animation"
            />
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <p className='text-lg sm:text-xl md:text-2xl font-bold py-4'>
            A <span className='bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent'>robust</span> and <span className='bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent'>user-friendly</span> employee database management system designed to streamline your HR processes
          </p>
        </div>
        <button 
          onClick={handleCheckBelowClick} 
          className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          Check Below
        </button>
      </div>

      {isAuthenticated ? (
        <div ref={employeeTableRef}>
          <EmployeeTable />
        </div>
      ) : (
        <div ref={signInSectionRef} className='text-center py-6'>
          <p className='text-lg'>
            <span className='text-white'>
              <Link to="/login" className='text-purple-500 hover:underline'>
                Sign In
              </Link>
              <span> now to gain access to full features!</span>
            </span>
          </p>
        </div>
      )}

      <footer className='text-center py-4'>
        <p className='text-gray-500 text-sm'>
          Developed by Daffa Sayra Firdaus, Alexander Christian, and Adrian Dika Darmawan
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
