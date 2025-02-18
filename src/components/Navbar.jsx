import React from "react";
import {NavLink } from "react-router-dom";
import { Heart, User } from "react-feather";
import { useSelector } from "react-redux";

const Navbar = () => {
  const allList = useSelector((state) => state.addToList.list);

  const productsInList = allList.length;

  return (
    <nav className=" bg-navBag2 xs:bg-navBag flex absolute h-[40px] w-4/5 items-center justify-between px-4 rounded-[2rem] top-5 xs:px-4">
      {/* logo */}
      <div className=" text-theamColor font-[800] text-[0.8rem] xs:text-[1rem]">Preeti Jewellery</div>

      {/* main nav */}
      <ul className=" flex justify-between w-full xs:w-[25rem] uppercase z-[1000] fixed xs:relative bg-backgroundColor3 xs:bg-transparent left-0 bottom-0 h-16 xs:h-fit py-4 px-8 xs:p-0 text-[0.90rem] xs:text-base shadow-boxShadow2 xs:shadow-none items-center font-bold xs:font-normal">
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
      <ul className="flex justify-between items-center w-16 xs:w-20">
        <li className="group">
          <NavLink
            to="/wishList"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            <Heart className=" h-[1.2rem] xs:h-[1.5rem] " />
            <sup className=" absolute top-0 -right-[4px] xs:-right-[7px] font-extrabold text-[0.5rem] xs:text-[0.8rem]">
              {productsInList}
            </sup>
            {/* whish count */}
          </NavLink>
        </li>
        <li className="group">
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive
                ? " text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                : "text-textColor1 hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            <User className=" h-[1.3rem] xs:h-[1.5rem]" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
