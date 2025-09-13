import React from "react";
import * as Icon from "lucide-react";

const ShowOrder = () => {
  const testArray = [1, 2, 3];
  return (
    <div className="mt-16 p-5 px-32">
      <div className="bg-white p-4 rounded-md">
        {/* page head */}
        <div className="">
          <div className="flex justify-between items-center">
            {/* ID */}
            <h1 className="text-3xl font-bold">
              Order ID :
              <span> {123456}</span>
            </h1>

            {/* invoice and trackOrder */}
            <div className="flex gap-6">
              {/* Invoice */}
              <div className="flex items-center justify-center gap-2 shadow-boxShadowBorder2 rounded-lg w-28 h-10">
                <Icon.FileText />
                <p>Invoice</p>
              </div>

              {/* Track Order */}
              <div className="flex items-center justify-center w-36 h-10 bg-blue-500 text-white rounded-lg gap-2">
                <p>Track Order</p>
                <Icon.LocateFixed />
              </div>
            </div>
          </div>

          {/* order date and arrival estimation */}
          <div className="flex px-3 py-2 border-b-2">
            <div className="flex gap-2">
              <p className="text-gray-400 font-semibold">Order Date :</p>
              <p className="border-r-2 border-black pr-2 mr-2">12 Jan, 2025</p>
            </div>
            <div className="flex gap-1 font-semibold text-green-500">
              <Icon.Truck />
              <p>Estimated Delivery :</p>
              <p>{"15 Jan, 2025"}</p>
            </div>
          </div>
        </div>

        {/* page body : order detail*/}
        <div className="py-4 px-10">
          {testArray.map((data, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              {/* image and detail */}
              <div className="flex items-center gap-2">
                <div className="w-20 h-20 bg-gray-400"></div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">Product Name</p>
                  <p className="text-gray-400">Other Details</p>
                </div>
              </div>

              {/* price and qty */}
              <div className="flex flex-col items-end">
                <p className="text-xl">₹499.00</p>
                <p className="text-gray-400">
                  Qty: <span>2</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* orders other details */}
        <div>
          <div className="border-t-2 border-b-2 flex justify-between px-6 py-4">
            {/* Payment Type */}
            <div>
              <h3 className="text-lg font-semibold">Payment</h3>
              <p className="pl-2">COD</p>
            </div>

            {/* Order Summary */}
            <div className="w-52">
              <h3 className="font-semibold text-lg">Order Summary</h3>
              <div className="pl-2">
                <div className="flex justify-between text-lg">
                  <p>Subtotal</p>
                  <p>₹{2994.0}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Delivery</p>
                  <p>₹{99.0}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Tax</p>
                  <p>₹{598.0}</p>
                </div>
                <div className="flex justify-between border-t-2 border-dashed mt-2 pt-2 text-lg">
                  <p>Total</p>
                  <p>₹{3691.0}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between px-6 py-4">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold">Delivery</h3>
              <p className="pl-2">
                John Smith, 123, MG Road, Indiranagar, Bangalore 560038,
                Karnataka, India
              </p>
            </div>
            <div className="w-52">
              <h3 className="text-lg font-semibold">Need Help?</h3>
              <p className="pl-2">Exchange And Return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrder;
