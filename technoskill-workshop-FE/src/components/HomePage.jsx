import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';

const HomePage = () => {
  const [email, setEmail] = useState(null);
  const employeeTableRef = useRef(null);
  const signInSectionRef = useRef(null); 

  useEffect(() => {
    const storedEmail = localStorage.getItem('ActiveEmail');
    setEmail(storedEmail);
  }, []);

  const handleCheckBelowClick = () => {
    if (email) {
      employeeTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      signInSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='text-white font-poppins'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold p-2'>
          Welcome to Technoskill 1.0 Employee Database Management
        </p>
        <h1 className='md:text-5xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-white sm:text-5xl text-4xl font-bold md:py-6'>
          Manage your Workforce Now!!!
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-2xl sm:text-4xl text-xl font-bold py-4'>
            A <span className='bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent'>robust</span> and <span className='bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent'>user-friendly</span> employee database management system designed to streamline your HR processes
          </p>
        </div>
        <button 
          onClick={handleCheckBelowClick} 
          className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          Check Below
        </button>
      </div>

      {email ? (
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

      <footer className = 'text-center py-4'>
        <p className='text-gray-500 text-sm'>
          Developed by Daffa Sayra Firdaus, Alexander Christian, and Adrian Dika Darmawan
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
