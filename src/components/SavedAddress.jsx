import React from "react";
import Button from "./Button";
import * as Icon from "react-feather";

const SavedAddress = ({setShowSavedAddress}) => {
  const testArray = [1, 2, 3];

  return (
    <div className="bg-white p-4 w-[50rem] h-fit space-y-2">
      <div className="flex items-center justify-between cursor-pointer">
        <h2 className="font-semibold text-2xl">Saved Address</h2>
        <Icon.X onClick={()=> setShowSavedAddress(false)}/>
      </div>

      <div className="h-[28rem] overflow-y-auto cursor-pointer">
        {testArray.map((item, index) => (
          <div key={index} className="p-4 border-b flex gap-4">
            <div className="pt-[0.1rem]">
              <input type="radio" className="cursor-pointer" name="address" id={item} />
            </div>
            <label className="flex flex-col gap-2 cursor-pointer" htmlFor={item}>
              <h3>Dinesh Yadav</h3>
              <p>
                Noor E Jahan - I CHS Ltd, Thakur Raghuraj Sing Marg, Near Patel
                wadi, Kurla (W), Mumbai – 400070.
              </p>
              <p>9985456985</p>
            </label>
          </div>
        ))}
      </div>

      <div className=" flex flex-row-reverse items-center pt-3">
        <Button className={"bg-buttonColor"}>Contunue</Button>
      </div>
    </div>
  );
};

export default SavedAddress;
