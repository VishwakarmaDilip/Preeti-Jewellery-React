import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import toast from "react-hot-toast";
import { useNavigate,NavLink } from "react-router-dom";
import { checkUserAuth, getUser } from "../features/Usfull reducers/ApiCalls";
import { useDispatch, useSelector } from "react-redux";

const UserActionBox = ({ onClose }) => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = async () => {
    onClose();
    try {
      const response = await fetch(`https://api.devbydilip.cloud/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.status < 300)
        navigate("/"), toast.success("Logged Out Successfully");
      dispatch(checkUserAuth())
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
      dispatch(getUser())
    
  }, []);
  
  return (
    <div className=" absolute z-30 bg-white flex flex-col top-0 -right-36 p-2 w-72 border shadow-md rounded-md">
      {/* top Bar or user Name and close section */}
      <div className="flex justify-between border-b-2 p-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="border border-black flex justify-center items-center rounded-full h-8 w-8">
            {/* <img src="" alt="" /> */}
            <Icon.User />
          </div>
          <h1 className="font-bold">{user?.fullName}</h1>
        </div>

        <div>
          <button className="p-1 hover:bg-gray-100" onClick={onClose}>
            <Icon.X />
          </button>
        </div>
      </div>

      {/* User Action Buttons */}
      <div className="flex flex-col my-5">
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <NavLink to={"/userProfile"} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.User />
            </div>
            <p>Edit Profile</p>
          </NavLink>
          <Icon.ChevronRight />
        </button>
        <NavLink to={"/wishList"} className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.Heart />
            </div>
            <p>Wish List</p>
          </div>
          <Icon.ChevronRight />
        </NavLink>
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.Key />
            </div>
            <p>Change Password</p>
          </div>
          <Icon.ChevronRight />
        </button>
        <NavLink to={"/savedAddress"} className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.MapPin />
            </div>
            <p>Saved Address</p>
          </div>
          <Icon.ChevronRight />
        </NavLink>
        <NavLink to={"/orders"} className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.Package />
            </div>
            <p>Orders</p>
          </div>
          <Icon.ChevronRight />
        </NavLink>
      </div>

      {/* Log Out */}
      <div className="flex flex-col pt-2 border-t-2">
        <button
          onClick={() => handleLogout()}
          className="flex justify-between p-2 hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <Icon.LogOut />
            <p className="font-semibold">Logout</p>
          </div>
          <Icon.ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default UserActionBox;
