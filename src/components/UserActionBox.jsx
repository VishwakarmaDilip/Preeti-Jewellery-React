import React from "react";
import * as Icon from "react-feather";

const UserActionBox = ({onClose}) => {
  return (
    <div className=" absolute z-10 bg-white flex flex-col top-0 -right-36 p-2 w-72 border shadow-md rounded-md">
      {/* top Bar or user Name and close section */}
      <div className="flex justify-between border-b-2 p-2 pb-3">
        <div className="flex items-center gap-2">
          <div className="border border-black flex justify-center items-center rounded-full h-8 w-8">
            {/* <img src="" alt="" /> */}
            <Icon.User />
          </div>
          <h1 className="font-bold">User</h1>
        </div>

        <div>
          <button
            className="p-1 hover:bg-gray-100"
            onClick={onClose}
          >
            <Icon.X />
          </button>
        </div>
      </div>

      {/* User Action Buttons */}
      <div className="flex flex-col my-5">
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.User />
            </div>
            <p>Edit Profile</p>
          </div>
          <Icon.ChevronRight />
        </button>
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.Heart />
            </div>
            <p>Wish List</p>
          </div>
          <Icon.ChevronRight />
        </button>
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.Key />
            </div>
            <p>Change Password</p>
          </div>
          <Icon.ChevronRight />
        </button>
        <button className="flex justify-between p-2 hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Icon.MapPin />
            </div>
            <p>Saved Address</p>
          </div>
          <Icon.ChevronRight />
        </button>
      </div>

      {/* Log Out */}
      <div className="flex flex-col pt-2 border-t-2">
        <button className="flex justify-between p-2 hover:bg-gray-100">
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
