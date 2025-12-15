import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  getAddress,
  pinCodeServiceCheck,
  updateAddress,
} from "../features/Usfull reducers/ApiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setRefresh } from "../features/Usfull reducers/user";

const ShowAddress = () => {
  const pincodeServiceData = useSelector((state) => state.user.pinCodeService);
  const address = useSelector((state) => state.user.address);
  const [searchParams, setSearchParams] = useSearchParams("");
  const address_id = searchParams.get("address_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      landmark: "",
      pinCode: "",
      city: "",
      state: "",
      mobile: "",
    },
  });

  const pinCode = watch("pinCode");

  useEffect(() => {
    if (address_id) {
      dispatch(getAddress(address_id));
    }
  }, [address_id]);

  useEffect(() => {
    if (address && address_id) {
      reset({
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        address: address.address || "",
        landmark: address.landmark || "",
        pinCode: address.pinCode?.toString() || "",
        city: address.city || "",
        state: address.state || "",
        mobile: address.mobile?.toString() || "",
      });
    }
  }, [address, address_id, reset]);

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

  const submit = (data) => {
    if (address_id) {
      const updateData = {data,address_id}
      dispatch(updateAddress(updateData));
      navigate("/savedAddress");
    } else {
      dispatch(createAddress(data));
      navigate("/savedAddress");
    }
  };

  return (
    <div className="w-full h-fit mt-5 xs:mt-10 xs:p-10 mb-5">
      {/* Page Name */}
      <div className="text-xl xs:text-3xl font-bold px-5 xs:px-28">
        {address_id ? <h1>Edit Address</h1> : <h1>Add Address</h1>}
      </div>

      {/* Main Body */}
      <div className="bg-white p-2 xs:p-5 mx-5 xs:mx-28 mt-5">
        <form
          action=""
          className="grid grid-cols-2 gap-6 "
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <Input
              placeholder={"First Name"}
              bgColor={"White"}
              className={"border border-black w-full"}
              {...register("firstName", { required: "First Name is Required" })}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
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
          </div>

          <div>
            <Input
              placeholder={"City"}
              bgColor={"White"}
              className={"border border-black w-full"}
              {...register("city", { required: "City is Required" })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
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

          <div className="flex justify-end">
            {address_id ? (
              <Button
                className={
                  "bg-theamColor2 hover:shadow-boxShadow active:bg-theamColor"
                }
              >
                Update Address
              </Button>
            ) : (
              <Button
                className={
                  "bg-theamColor2 hover:shadow-boxShadow active:bg-theamColor"
                }
              >
                Add Address
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowAddress;
