import React from 'react';

const HomePage = () => {
  return (
    <div className='text-white font-poppins' >
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold p-2 '>
        Welcome to Technoskill 1.0 Employee Database Management
        </p>
        <h1 className='md:text-5xl animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-white font-boldmd:text-3xl sm:text-5xl text-4xl font-bold md:py-6'>
        Manage your Workforce Now!!!
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-2xl sm:text-4xl text-xl font-bold py-4'>
          A robust and user-friendly employee database management system designed to streamline your HR processes
          </p>
        </div>
        <button className='bg-violet-500 hover:bg-violet-600 active:bg-violet-700 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Check Below</button>
      </div>
    </div>
  );
};

export default HomePage;