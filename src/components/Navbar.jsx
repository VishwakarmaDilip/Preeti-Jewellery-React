import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, User } from "react-feather";

const Navbar = () => {
  return (
    <nav className=" bg-navBag flex absolute h-[40px] w-4/5 items-center justify-between px-8 rounded-[2rem] top-5">
      {/* logo */}
      <div className=" text-theamColor font-[800]">Preeti Jewellery</div>

      {/* main nav */}
      <ul className=" flex justify-between w-[25rem] uppercase">
        <li className="group">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            Products
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/aboutUs"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            About Us
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/contactUs"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      {/* User part */}
      <ul className="flex justify-between items-center w-20">
        <li className="group">
          <NavLink
            to="wishList.html"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            <Heart className="text-[1.5rem]" />
            <sup className=" absolute top-0 right-[-7px] font-extrabold">0</sup> {/* whish count */} 
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="*"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            <User />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
