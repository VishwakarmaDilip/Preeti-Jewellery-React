import React, { useEffect, useState } from "react";
import * as Icon from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cartApiCall, getUser } from "../features/Usfull reducers/ApiCalls";
import { NavLink } from "react-router-dom";
import UserActionBox from "./UserActionBox";

const UserBarMBL = () => {
  const user = useSelector((state) => state.user.user);
  const cartState = useSelector((state) => state.cart.cartChanged);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    dispatch(cartApiCall());
  }, [cartState]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="bg-backgroundColor h-14 p-2 px-4 flex items-center justify-between shadow-boxShadowBorder2">
      <div>
        {token && (
          <div onClick={toggleMenu} className="flex items-center gap-2">
            {/* user Icon */}
            <div className="border border-black flex justify-center items-center rounded-full h-8 w-8">
              <Icon.User />
            </div>

            {/* User Name */}
            <div className="font-bold">
              <h2>{user?.fullName || "User"}</h2>
            </div>
          </div>
        )}
      </div>
      <div>
        {token ? (
          // left box
          <div className="relative pr-1">
            <NavLink
              to={"/cart"}
              className={({ isActive }) => (isActive ? "text-theamColor2" : "")}
            >
              <Icon.ShoppingCart />
              <sup className=" absolute top-0 -right-[4px] xs:-right-[10px] font-extrabold text-[0.8rem] xs:text-[0.8rem]">
                {productsInCart?.length || 0}
              </sup>
            </NavLink>
          </div>
        ) : (
          <ul className="flex justify-between items-center w-32">
            <li className="group">
              <NavLink
                to="/login"
                className={
                  "text-textColor1 font-semibold hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                }
              >
                Log In
              </NavLink>
            </li>
            <span className="font-extrabold">/</span>
            <li className="group">
              <NavLink
                to="/register"
                className={
                  "text-textColor1 font-semibold hover:text-theamColor2 relative after:absolute after:bottom-[-0.2rem] after:left-0 after:w-0 after:border-b-[0.1rem] after:border-theamColor2 after:transition-all after:duration-[0.3s] after:ease-linear after:group-hover:w-full"
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      {isMenuOpen && (
        <div>
          <UserActionBox onClose={toggleMenu} />
        </div>
      )}
    </div>
  );
};

export default UserBarMBL;
