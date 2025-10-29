import React, { useEffect } from "react";
import Button from "../components/Button";
import * as Icon from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddress } from "../features/Usfull reducers/ApiCalls";
import { NavLink } from "react-router-dom";

const SavedAddress = () => {
  const addresses = useSelector((state) => state.user.allAddresses);
  const refresh = useSelector((state) => state.user.refresh)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAddress());
    console.log("chala");
  }, [refresh]);

  return (
    <div className="h-fit w-full mt-10 p-10 ">
      <div className="flex justify-between px-28">
        {/* Page Name */}
        <h1 className="text-3xl font-bold ">Saved Address</h1>

        {/* Add new Button */}
        <NavLink to={"/address"}>
          <Button
            className={
              "bg-blue-600 hover:shadow-boxShadow active:bg-blue-700 w-32 flex justify-center items-center gap-2"
            }
          >
            <Icon.Plus />
            <p>Add New</p>
          </Button>
        </NavLink>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] gap-y-20 mt-10">
        {/* Address Card */}
        {addresses?.length > 0 ? (
          addresses.map((data) => (
            <div
              key={data._id}
              className="bg-white w-96 h-64 shadow-boxShadowBorder rounded-lg p-5 place-self-center flex flex-col justify-between"
            >
              {/* address */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-xl">
                  <span>{data.firstName}</span> <span>{data.lastName}</span>
                </h3>
                <p>
                  <span>{data.address}</span>
                  {", "}
                  <span>{data.city}</span> <span>{data.pinCode}</span>{" "}
                  <span>{data.state}</span>
                </p>
                <p>
                  Phone No.: <span>{data.mobile}</span>
                </p>
              </div>

              {/* action button */}
              <div className="w-full flex gap-2">
                <Button
                  className={
                    "bg-red-500 w-1/2 hover:shadow-boxShadow active:bg-red-700 "
                  }
                >
                  Delete
                </Button>
                <NavLink to={`/address?address_id=${data._id}`} className={"w-1/2"}>
                  <Button
                    className={
                      "bg-blue-500 w-full hover:shadow-boxShadow active:bg-blue-700"
                    }
                  >
                    Edit
                  </Button>
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <div className="h-96 w-[100rem] flex justify-center items-center borde">
            <p>No Addresses are there</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAddress;
