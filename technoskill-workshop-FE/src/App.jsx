import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./style";
import HomePage from "./components/HomePage";
import AddEmployeePage from "./components/AddEmployeePage";
import EmployeeDetails from "./components/AddEmployeePage";
import RegisterPage from "./components/RegisterPage";
import MyInfoPage from "./components/MyInfoPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";

const App = () => (
  <div className="bg-gradient-to-br from-slate-900 to-zinc-900 overflow-hidden">

    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/add-employee" element={<AddEmployeePage />} />

        <Route path="/my-info" element={<MyInfoPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
      </div>
    </div>
  </div>

);



export default App;
