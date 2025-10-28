import React from "react";
import Button from "../components/Button";

import * as Icon from "lucide-react";

const SavedAddress = () => {
  const addresses = [1,2,3,4];
  return (
    <div className="h-fit w-full mt-10 p-10 ">
      <div className="flex justify-between px-28">
        {/* Page Name */}
        <h1 className="text-3xl font-bold ">Saved Address</h1>

        {/* Add new Button */}
        <div>
          <Button className={"bg-blue-600 w-32 flex justify-center items-center gap-2"}>
            <Icon.Plus />
            <p>Add New</p>
          </Button>
        </div>
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] gap-y-20 mt-10">
        {/* Address Card */}
        {addresses?.length > 0 ? (
          addresses.map((data, index) => (
            <div className="bg-white w-96 h-64 shadow-boxShadowBorder rounded-lg p-5 place-self-center flex flex-col justify-between">
              {/* address */}
              <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-xl">Dilip Vishwakarma</h3>
                <p>
                  John Smith, 123, MG Road, Indiranagar, Bangalore 560038,
                  Karnataka, India
                </p>
                <p>
                  Phone No.: <span>7715956755</span>
                </p>
              </div>

              {/* action button */}
              <div className="w-full flex gap-2">
                <Button className={"bg-red-500 w-1/2"}>Delete</Button>
                <Button className={"bg-blue-500 w-1/2"}>Edit</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="h-96 w-[100rem] flex justify-center items-center borde">
            <p>No Addresse are there</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAddress;
