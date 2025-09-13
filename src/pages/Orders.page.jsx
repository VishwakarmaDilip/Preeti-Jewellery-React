import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";

const Orders = () => {
  const { register, handleSubmit, reset } = useForm();
  const [select, setSelect] = useState(0.7);

  const testArray = [1, 2];
  const testArray2 = [1, 2, 3];
  return (
    <div className="h-fit w-full mt-8 p-10 flex flex-col items-center gap-6">
      <h1 className="self-start text-3xl font-bold">My Orders</h1>

      {/* main body */}
      <div>
        {/* filter box */}
        <div className="lg:flex gap-6">
          {/* order type */}
          <div className="flex w-[40rem] justify-between items-center bg-gray-300 relative px-11 h-[3rem] rounded-3xl cursor-pointer">
            <p
              className={`z-20 ${select === 0.7 ? "font-semibold" : ""}`}
              onClick={() => setSelect(0.7)}
            >
              All orders
            </p>
            <p
              className={`z-20 ${select === 10.5 ? "font-semibold" : ""}`}
              onClick={() => setSelect(15.5)}
            >
              Arriving
            </p>
            <p
              className={`z-20 ${select === 20.5 ? "font-semibold" : ""}`}
              onClick={() => setSelect(30.5)}
            >
              Cancelled
            </p>
            <div
              className={`absolute bg-white w-[9rem] h-[2rem] z-10 rounded-3xl transition-all`}
              style={{ left: `${select}rem` }}
            ></div>
          </div>

          {/* date filter */}
          <form className="bg-white w-[40rem] h-[3rem] flex rounded-3xl px-3 justify-between">
            <div className="relative flex items-center">
              <select className="appearance-none bg-gray-300 rounded-3xl w-64 pl-3 h-[2rem]">
                <option value="" className="bg-white">
                  Select Date
                </option>
                <option value="thisMonth" className="bg-white">
                  This Month
                </option>
                <option value="LastMonth" className="bg-white">
                  Last Month
                </option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 pointer-events-none"
              />
            </div>
            <div className="flex items-center gap-5">
              <Button className="bg-green-500 h-[2rem] w-28 flex items-center justify-center">
                Apply
              </Button>
              <Button className="bg-red-500 h-[2rem] w-28 flex items-center justify-center">
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* orders */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(40rem,1fr))] gap-5 mt-5">
          {testArray.map((data, index) => (
            <div>
              <div key={index} className="bg-white p-3 rounded-t-lg">
                {/* card head */}
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Order Id</p>
                    <p className="text-xl font-bold">123456</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="shadow-boxShadowBorder rounded-full
                   px-3"
                    >
                      Estimated Arrival : 06 September 2025
                    </div>
                    <div className="text-green-400 font-bold bg-green-100 px-4 rounded-full">
                      Shipping
                    </div>
                  </div>
                </div>

                {/* card body */}
                <div className="shadow-boxShadowBorder rounded-lg p-3 flex justify-between flex-wrap gap-5 h-40 overflow-auto mt-2">
                  {testArray2.map((data, index) => (
                    <div key={index} className="flex w-52 gap-2 items-center">
                      <div className="bg-gray-400 w-24 h-24 rounded-lg"></div>
                      <div className="flex flex-col h-full justify-evenly">
                        <p>Product Name</p>
                        <p>$499</p>
                        <p>Qty : 2</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* card footer */}
              <div className="bg-gray-200 rounded-b-lg flex justify-between items-center px-4 py-2">
                <div className="flex gap-1">
                  <p className="font-semibold">$998</p>
                  <p>(2 Items)</p>
                </div>
                <NavLink
                  to={`/orders/${1234}`}
                  className="bg-black text-white flex justify-center items-center p-2 rounded-full w-20 text-sm"
                >
                  Details
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
