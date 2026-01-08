import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import SavedAddress from "../components/SavedAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  cartApiCall,
  createOrder,
  getAddress,
  getTAT,
} from "../features/Usfull reducers/ApiCalls";
import { toggleCartChanged } from "../features/Usfull reducers/cart";
import toast from "react-hot-toast";

const Checkout_Payment = () => {
  const { register, watch } = useForm();

  const [showSavedAddress, setShowSavedAddress] = React.useState(false);
  const location = useLocation();
  const addressId = useParams();
  const deliveryData =
    location.state || useSelector((state) => state.user.address);
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart.myCart);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const estimatedDelivery = useSelector((state) => state.user.TAT);
  const deleveryCharge = 99;

  useEffect(() => {
    dispatch(cartApiCall());
  }, []);

  useEffect(() => {
    if (addressId.addressId !== "98654512") {
      dispatch(getAddress(addressId.addressId));
    }
  }, [addressId]);

  useEffect(() => {
    if (deliveryData) {
      dispatch(getTAT(deliveryData?.pinCode));
    }
  }, [deliveryData]);

  useEffect(() => {
    if (showSavedAddress) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSavedAddress]);

  const selectedPamentMethod = watch("payment") || null;

  const placeOrder = async (
    deliveryData,
    cartId,
    paymentType = "COD",
    delivery = estimatedDelivery
  ) => {
    try {
      const result = await dispatch(
        createOrder({ deliveryData, cartId, addressId, paymentType, delivery })
      ).unwrap();

      toast.success("Order Placed Successfully");

      setTimeout(() => {
        window.open(`http://192.168.0.104:5173/orders/${result}`,"_blank");
        window.close();
      },500)

    } catch (error) {
      console.log("Failed:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="my-4 space-y-8 relative">
      <div
        className={` ${
          showSavedAddress ? "fixed" : "hidden"
        } inset-0  bg-[#0000007d] flex items-center justify-center`}
      >
        <SavedAddress setShowSavedAddress={setShowSavedAddress} />
      </div>
      <div className="hidden xs:block w-[50rem] p-2 rounded-md bg-white h-fit m-auto">
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

      <div className="px-5 xs:px-14 flex flex-col-reverse xs:flex-row w-full justify-between gap-10 xs:gap-0">
        <div className="xs:w-[68%] h-fit xs:p-3 flex flex-col gap-6">
          <div className="bg-white p-3 rounded-md">
            <div className=" space-y-2">
              <div className="flex flex-col-reverse xs:flex-row justify-between gap-5 xs:gap-0">
                <h2 className="font-semibold text-lg">
                  Delivering to{" "}
                  <span>
                    {deliveryData?.firstName} {deliveryData?.lastName}
                  </span>
                </h2>
                <p className="text-green-500 font-semibold text-sm xs:text-base">
                  Estimated Delevery : {estimatedDelivery}
                </p>
              </div>
              <p>
                {deliveryData?.address}, {deliveryData?.city} -{" "}
                {deliveryData?.pinCode}, {deliveryData?.state}
              </p>
              <p>{deliveryData?.mobile}</p>
            </div>

            <div
              className="text-blue-500 font-semibold flex flex-row-reverse cursor-pointer"
              onClick={() => setShowSavedAddress(true)}
            >
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
                  id="cod"
                  value={"cod"}
                  {...register("payment")}
                />
                <label htmlFor="cod" className="cursor-pointer">
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
              {selectedPamentMethod === null ? (
                <Button
                  textColor={true}
                  disabled={true}
                  className={"bg-buttonColor font-semibold"}
                >
                  Choose Method
                </Button>
              ) : selectedPamentMethod === "cod" ? (
                <Button
                  onClick={() => placeOrder(deliveryData, myCart._id)}
                  textColor={true}
                  className={
                    "bg-buttonColor font-semibold hover:shadow-boxShadow active:bg-clickColor "
                  }
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  textColor={true}
                  className={
                    "bg-buttonColor font-semibold hover:shadow-boxShadow active:bg-clickColor "
                  }
                >
                  Proceed To Pay
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white xs:w-[30%] h-fit p-3 rounded-md">
          <h2 className="text-2xl font-bold mb-3">Order Summary</h2>
          <div className="flex flex-col gap-4 px-3">
            {productsInCart?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center  font-semibold"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-28 h-fit rounded-md overflow-hidden">
                      <img src={item?.image[0]} alt="" />
                    </div>
                    <div>
                      <p>{item?.productName}</p>
                      <p>
                        Qty : <span>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                  <div>₹{item.price}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 mt-4 pt-1 px-2 border-t-2  font-semibold">
            <div className="flex justify-between">
              <p>Subtotal : </p>
              <p>
                ₹
                {productsInCart.length > 0
                  ? (myCart?.cartValue).toLocaleString("hi-IN")
                  : 0}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee :</p>
              <p>₹{deleveryCharge}</p>
            </div>
          </div>

          <div className="flex flex-col mt-2 pt-2 px-2 border-t-2  font-semibold">
            <div className="flex justify-between">
              <p>Total to pay : </p>
              <p>
                ₹{(myCart?.cartValue + deleveryCharge).toLocaleString("hi-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout_Payment;
