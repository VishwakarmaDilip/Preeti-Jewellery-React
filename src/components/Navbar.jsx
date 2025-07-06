import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, User } from "react-feather";
import { useSelector } from "react-redux";

const Navbar = () => {
  const allList = useSelector((state) => state.addToList.list);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/cart/getCart`,
          {
            credentials: "include",
          }
        );

        const responseData = await response.json();
        // console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    // fetchCart()
  });

  const productsInList = allList.length;

  return (
    <nav className=" bg-navBag2 xs:bg-navBag flex absolute h-[40px] w-4/5 items-center justify-between px-4 rounded-[2rem] top-5 xs:px-4 z-10">
      {/* logo */}
      <div className=" text-theamColor font-[800] text-[0.8rem] xs:text-[1rem]">
        Preeti Jewellery
      </div>

      {/* main nav */}
      <ul className=" flex justify-between w-full xs:w-[25rem] uppercase z-[1000] fixed xs:relative bg-backgroundColor3 xs:bg-transparent left-0 bottom-0 h-16 xs:h-fit py-4 px-8 xs:p-0 text-[0.74rem] xs:text-[1rem] shadow-boxShadow2 xs:shadow-none items-center font-bold xs:font-normal">
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
      {false ? (
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
              <ShoppingCart className=" h-[1.2rem] xs:h-[1.5rem] " />
              <sup className=" absolute top-0 -right-[4px] xs:-right-[10px] font-extrabold text-[0.5rem] xs:text-[0.8rem]">
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
      ) : (
        <ul className="flex justify-between items-center w-16 xs:w-32">
          <li className="group">
            <NavLink
            to="/login"
            className={"text-textColor1 font-semibold hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
            }
          >
            Log In
          </NavLink>
          </li>
          <span className="font-extrabold">/</span>
          <li className="group">
            <NavLink
              to="/user"
              className={"text-textColor1 font-semibold hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
              }
            >
              Register
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
