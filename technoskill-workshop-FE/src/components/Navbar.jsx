import { useLocation, useNavigate } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (title, id) => {
    navigate(`/${id}`, { state: { active: title } });
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="technoskill" className="w-[200px] h-[64px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              location.pathname === `/${nav.id}` || (location.state && location.state.active === nav.title) ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => handleNavigation(nav.title, nav.id)}
          >
            {nav.title === "Register" || nav.id === "register" ? (
              <span
                className={`px-4 py-2 rounded-full ${
                  location.pathname === `/${nav.id}` || (location.state && location.state.active === nav.title)
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 text-dimWhite"
                }`}
              >
                {nav.title}
              </span>
            ) : (
              nav.title
            )}
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  location.pathname === `/${nav.id}` || (location.state && location.state.active === nav.title) ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => handleNavigation(nav.title, nav.id)}
              >
                {nav.title === "Register" || nav.id === "register" ? (
                  <span
                    className={`px-4 py-2 rounded-full ${
                      location.pathname === `/${nav.id}` || (location.state && location.state.active === nav.title)
                        ? "bg-purple-700 text-white"
                        : "bg-purple-500 text-dimWhite"
                    }`}
                  >
                    {nav.title}
                  </span>
                ) : (
                  nav.title
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
