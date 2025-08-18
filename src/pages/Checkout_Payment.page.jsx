import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import * as Icons from "react-feather";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import SavedAddress from "../components/SavedAddress";

const Checkout_Payment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showSavedAddress, setShowSavedAddress] = React.useState(false);
  const location = useLocation();
  const deliveryData = location.state;

  const cart = [1, 2, 3];

  if (showSavedAddress) {
    document.body.style.overflow = "hidden";
  }

  const selectedPamentMethod = watch("payment");

  return (
    <div className="my-4 space-y-8 relative">
      <div
        className={` ${
          showSavedAddress ? "fixed" : "hidden"
        } inset-0  bg-[#0000007d] flex items-center justify-center`}
      >
        <SavedAddress setShowSavedAddress={setShowSavedAddress} />
      </div>
      <div className="w-[50rem] p-2 rounded-md bg-white h-fit m-auto">
        {/* checkout progress bar */}
        <div className="flex items-center justify-center w-full">
          <div className="h-8 w-8 rounded-full bg-yellow-300"></div>
          <div className="w-4/5 h-[0.1rem] bg-yellow-300"></div>
          <div className="h-8 w-8 rounded-full bg-yellow-300"></div>
        </div>
        <div className=" flex justify-between px-8 font-semibold">
          <p>Address</p>
          <p>Payment</p>
        </div>
      </div>

      <div className="px-14 flex w-full justify-between">
        <div className="w-[68%] h-fit p-3 flex flex-col gap-6">
          <div className="bg-white p-3 rounded-md">
            <div className=" space-y-2">
              <h2 className="font-semibold text-lg">
                Delivering to {deliveryData?.name} {deliveryData?.lastName}
              </h2>
              <p>
                {deliveryData?.address}, {deliveryData?.city} -{" "}
                {deliveryData?.pinCode}, {deliveryData?.state}
              </p>
              <p>{deliveryData.mobile}</p>
            </div>

            <div className="text-blue-500 font-semibold flex flex-row-reverse">
              <span>Change</span>
            </div>
          </div>

          <div className="bg-white p-3 rounded-md">
            <h1 className="font-bold text-xl">Payment</h1>
            <form className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2 ">
                <input
                  type="radio"
                  className="mt-1 cursor-pointer"
                  id="pod"
                  value={"pod"}
                  {...register("payment")}
                />
                <label htmlFor="pod" className="cursor-pointer">
                  Pay On Delivery
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="poo"
                  className="mt-1 cursor-pointer"
                  value={"online"}
                  {...register("payment")}
                />
                <label htmlFor="poo" className="cursor-pointer">
                  Pay Online
                </label>
              </div>
            </form>

            <div className="flex flex-row-reverse">
              {selectedPamentMethod === undefined ? (
                <Button className={"bg-buttonColor"}>Choose Method</Button>
              ) : selectedPamentMethod === "pod" ? (
                <Button className={"bg-buttonColor"}>Place Order</Button>
              ) : (
                <Button className={"bg-buttonColor"}>Proceed To Pay</Button>
              )}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white w-[30%] h-fit p-3 rounded-md">
          <h2 className="text-2xl font-bold mb-3">Order Summary</h2>
          <div className="flex flex-col gap-4 px-3">
            {cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center  font-semibold"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-28 rounded-md overflow-hidden">
                      <img src="../../public/Image/bracelet.jpeg" alt="" />
                    </div>
                    <div>
                      <p>Item One</p>
                      <p>
                        Qty : <span>4</span>
                      </p>
                    </div>
                  </div>
                  <div>$499.00</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 mt-4 pt-1 px-2 border-t-2  font-semibold">
            <div className="flex justify-between">
              <p>Subtotal : </p>
              <p>$1,497.00</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee :</p>
              <p>$99.00</p>
            </div>
          </div>

          <div className="flex flex-col mt-2 pt-2 px-2 border-t-2  font-semibold">
            <div className="flex justify-between">
              <p>Total to pay : </p>
              <p>$1696.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout_Payment;
