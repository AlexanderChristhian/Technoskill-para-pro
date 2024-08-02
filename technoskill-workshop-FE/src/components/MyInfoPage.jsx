import React, { useState, useEffect } from "react";
import axios from "axios";
import employeeIcon from "../assets/employee.svg";
import './transisi.css'; 

export default function MyInfoPage() {
  const [profile, setProfile] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      const email = localStorage.getItem('ActiveEmail');
      if (email) {
        try {
          const response = await axios.get(`http://localhost:8000/manager/profile?email=${email}`);
          setProfile(response.data);
        } catch (error) {
          console.error("Failed to fetch profile", error);
          setError("Failed to fetch profile information.");
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No active email found");
        setError("No active email found.");
        setLoading(false);
      }
    };

    fetchProfile();
    setFadeIn(true);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br from-slate-900 to-zinc-900 flex items-center justify-center transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex flex-col items-center justify-center w-full max-w-sm lg:max-w-2xl bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-1000 ${fadeIn ? 'transform scale-100' : 'transform scale-95'}`}>
        <div className="flex flex-col items-center w-full p-6 md:p-8 font-poppins text-gray-200">
          <div className="text-center font-medium text-xl text-purple-400 mb-4">
              User Profile
            </div>
          <div className="flex flex-col items-center justify-center w-full lg:pt-0">
            <img src={employeeIcon} className="rounded-full shadow-xl h-32 w-32 md:h-48 md:w-48 bg-cover bg-center" alt="Profile Icon" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold pt-4 md:pt-8 text-center">{profile.username || "Your Name"}</h1>
          <div className="mx-auto lg:mx-0 w-full pt-2 md:pt-3 border-b-2 border-purple-600 opacity-25"></div>
          <p className="pt-2 font-bold text-gray-200 text-sm md:text-base flex items-center justify-start md:justify-center">
            <svg className="h-4 fill-current text-purple-600 pr-2 md:pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12 12.713L1.864 6.43A2 2 0 0 1 3.25 4h17.5a2 2 0 0 1 1.386 2.43L12 12.713zM3 9.29l8.553 5.206a1 1 0 0 0 .894 0L21 9.291V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.29z"/>
            </svg>
            Email : <span className="font-normal ml-2">{profile.email || "Placeholder@email.com"}</span>
          </p>
          <p className="pt-2 font-bold text-gray-200 text-sm md:text-base flex items-center justify-start md:justify-center">
            <svg className="h-4 fill-current text-purple-600 pr-2 md:pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12 2a5 5 0 0 0-5 5v2H6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-1V7a5 5 0 0 0-5-5zm3 7H9V7a3 3 0 0 1 6 0v2zm-4 5v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0z"/>
            </svg>
            Password : 
            <span className="font-normal ml-2">
              {passwordVisible ? profile.password : '**********'}
            </span>
            <button 
              onClick={togglePasswordVisibility}
              className="ml-2 text-blue-400 underline"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </p>
          <p className="pt-4 md:pt-8 text-xs md:text-sm text-center">
            You are currently a registered user on this page, being a user will allow you to add a new employee details to the database of this website.
          </p>
        </div>
      </div>
    </div>
  );
}
