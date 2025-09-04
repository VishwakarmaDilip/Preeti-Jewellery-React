import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import Button from "../components/Button";

const Order = () => {
  const { register, handleSubmit, reset } = useForm();

  const [select, setSelect] = useState(0.7);
  return (
    <div className="h-fit w-full mt-8 p-10 flex flex-col items-center gap-6">
      <h1 className="self-start text-3xl font-bold">My Orders</h1>

      {/* main body */}
      <div>
        {/* filter box */}
        <div className="flex gap-6">
          {/* order type */}
          <div className="flex w-[30rem] justify-between items-center bg-gray-300 relative px-11 h-[3rem] rounded-3xl cursor-pointer">
            <p
              className={`z-20 ${select === 0.7 ? "font-semibold" : ""}`}
              onClick={() => setSelect(0.7)}
            >
              All orders
            </p>
            <p
              className={`z-20 ${select === 10.5 ? "font-semibold" : ""}`}
              onClick={() => setSelect(10.5)}
            >
              Arriving
            </p>
            <p
              className={`z-20 ${select === 20.5 ? "font-semibold" : ""}`}
              onClick={() => setSelect(20.5)}
            >
              Cancelled
            </p>
            <div
              className={`absolute bg-white w-[9rem] h-[2rem] z-10 rounded-3xl left-[${select}rem] transition-all`}
            ></div>
          </div>

          {/* date filter */}
          <form action="">
            <div className="relative">
              <select>
                <option value="">Select Date</option>
                <option value="thisMonth">This Month</option>
                <option value="LastMonth">Last Month</option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute pointer-events-none"
              />
            </div>
            <div>
              <Button>Apply</Button>
              <Button>Reset</Button>
            </div>
          </form>
        </div>

        {/* order page */}
        <div></div>
      </div>
    </div>
  );
};

export default Order;
