import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./style";
import HomePage from "./components/HomePage";
import AddEmployeePage from "./components/AddEmployeePage";
import EmployeeDetails from "./components/AddEmployeePage";
import MyInfoPage from "./components/MyInfoPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="bg-gradient-to-br from-slate-900 to-zinc-900 overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <HomePage />
      </div>
    </div>
    
  </div>
);



export default App;
