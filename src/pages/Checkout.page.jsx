import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Icons from "react-feather";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import Button from "../components/Button";
import SavedAddress from "../components/SavedAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  cartApiCall,
  createAddress,
  pinCodeServiceCheck,
} from "../features/Usfull reducers/ApiCalls";

const Checkout = () => {
  const [showSavedAddress, setShowSavedAddress] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cart.myCart);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const pincodeServiceData = useSelector((state) => state.user.pinCodeService);
  const deleveryCharge = 99;
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pinCode: "",
    },
  });

  const saveAddress = watch("saveAddress");
  const pinCode = watch("pinCode");

  useEffect(() => {
    dispatch(cartApiCall());
  }, []);

  useEffect(() => {
    if (pinCode.length === 6) {
      const timeout = setTimeout(() => {
        dispatch(pinCodeServiceCheck(pinCode));
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setValue("city", "");
      setValue("state", "");
    }
  }, [pinCode]);

  useEffect(() => {
    if (pincodeServiceData?.city) {
      setValue("city", pincodeServiceData.city, { shouldValidate: true });
    }
    if (pincodeServiceData?.state) {
      setValue("state", pincodeServiceData.state, { shouldValidate: true });
    }
  }, [pincodeServiceData, setValue]);

  if (showSavedAddress) {
    document.body.style.overflow = "hidden";
  }

  const disable = pincodeServiceData.serviceability === true ? false : true

  const submit = (data) => {
    if (saveAddress) {
      dispatch(createAddress(data));
    }
    navigate(`/checkout/payment/${98654512}`, { state: data });
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
      <div className="w-[50rem] p-2 rounded-md bg-white h-fit m-auto">
        {/* checkout progress bar */}
        <div className="flex items-center justify-center w-full">
          <div className="h-8 w-8 rounded-full bg-yellow-300"></div>
          <div className="w-4/5 h-[0.1rem] bg-gradient-to-r from-yellow-300 to-gray-300"></div>
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        </div>
        <div className=" flex justify-between px-8 font-semibold">
          <p>Address</p>
          <p className="text-gray-300">Payment</p>
        </div>
      </div>

      <div className="px-14 flex w-full justify-between">
        <div className="w-[68%] h-fit bg-white p-3">
          <h1 className="font-bold text-3xl self-start">Shipping Address</h1>

          <div className="py-5 px-8 space-y-4">
            <div
              onClick={() => setShowSavedAddress(true)}
              className="flex items-center text-blue-600 w-fit cursor-pointer"
            >
              <span>Saved Address</span>
              <Icons.ChevronRight size={20} />
            </div>

            <form
              className="grid grid-cols-2 gap-6"
              onSubmit={handleSubmit(submit)}
            >
              <div>
                <Input
                  placeholder={"First Name"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("firstName", { required: "First Name is Required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder={"Last Name"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("lastName", {
                    required: "Last Name is Required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <Input
                  placeholder={"Address"}
                  type={"text"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("address", { required: "Address is Required" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder={"Landmark (Optional)"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("landmark")}
                />
              </div>

              <div>
                <Controller
                  name="pinCode"
                  control={control}
                  rules={{
                    required: "PIN CODE is Required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "PIN CODE must be 6 digits",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder={"Pin Code"}
                      type={"text"}
                      bgColor={"White"}
                      maxLength={6}
                      className={"border border-black w-full"}
                      {...field}
                    />
                  )}
                />
                {errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pinCode.message}
                  </p>
                )}
                {pincodeServiceData?.serviceability ===
                  "Temporary Unserviceable" && (
                  <p className={`text-red-500 text-sm mt-1 ${pinCode.length === 6 ? "block" : "hidden"} `}>
                    {pincodeServiceData?.serviceability}
                  </p>
                )}
                {pincodeServiceData?.serviceability === false && (
                  <p className={`text-red-500 text-sm mt-1 ${pinCode.length === 6 ? "block" : "hidden"} `}>
                    Service Not Available
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder={"City"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("city", { required: "City is Required" })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder={"State"}
                  bgColor={"White"}
                  className={"border border-black w-full"}
                  {...register("state", { required: "State is Required" })}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder={"Mobile"}
                  type={"tel"}
                  bgColor={"White"}
                  maxLength={10}
                  className={"border border-black w-full"}
                  {...register("mobile", {
                    required: "Mobile is Required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be 10 digits",
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="row-start-6 col-span-2 flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="saveAddr"
                    value={true}
                    className="cursor-pointer"
                    {...register("saveAddress")}
                  />
                  <label htmlFor="saveAddr" className="cursor-pointer">
                    Save This Address
                  </label>
                </div>
                <NavLink></NavLink>
                <Button
                  textColor={true}
                  disabled={disable}
                  className={
                    "bg-buttonColor hover:shadow-boxShadow active:bg-clickColor "
                  }
                >
                  Contunue
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white w-[30%] h-fit p-3 rounded-md">
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

export default Checkout;
