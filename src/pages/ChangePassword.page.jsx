import React, { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import * as Icon from "lucide-react";
import Button from "../components/Button";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const togglePasswordVisibilityOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };
  const togglePasswordVisibilityNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const valueOld = watch("oldPassword");
  const valueNew = watch("newPassword");

  const isEmptyOld = valueOld === "" || valueOld === undefined ? true : false;
  const isEmptyNew = valueNew === "" || valueNew === undefined ? true : false;

  let value;
  if (isEmptyOld || isEmptyNew) {
    value = true;
  } else {
    value = false;
  }

  console.log({ valueOld, valueNew, isEmptyOld, isEmptyNew });

  return (
    <div className="mt-2 p-2 xs:p-20 pb-10 xs:mt-20 h-fit">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <div className="p-4 xs:px-20">
        <form className="shadow-boxShadowBorder rounded-lg pt-2 pl-4 pr-4 pb-4 flex flex-col gap-5">
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="">Old Password</label>
            <Input
              type={showPasswordOld ? "text" : "password"}
              placeholder={"Enter your old password"}
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
              bgColor={"white"}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}

            <button
              type="button"
              onClick={togglePasswordVisibilityOld}
              className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-500"
            >
              {showPasswordOld ? (
                <Icon.Eye size={20} className="cursor-pointer" />
              ) : (
                <Icon.EyeOff size={20} className="cursor-pointer" />
              )}
            </button>
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="">New Password</label>
            <Input
              type={showPasswordNew ? "text" : "password"}
              placeholder={"Enter your new password"}
              {...register("newPassword", {
                required: "New Password is required",
              })}
              bgColor={"white"}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}

            <button
              type="button"
              onClick={togglePasswordVisibilityNew}
              className="absolute inset-y-0 top-8 right-3 flex items-center text-gray-500"
            >
              {showPasswordNew ? (
                <Icon.Eye size={20} className="cursor-pointer" />
              ) : (
                <Icon.EyeOff size={20} className="cursor-pointer" />
              )}
            </button>
          </div>

          <div className="self-center mt-2">
            <Button
              type={"submit"}
              disabled={value}
              className={`${value ? "cursor-not-allowed bg-gray-300" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"} text-white  transition-all duration-200`}
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
