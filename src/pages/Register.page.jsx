import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import * as Icon from "react-feather";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify(data),
        }
      );

      console.log("chala");
      

      if (response.status < 299) {
        toast.success("User Registered Succsessfully");

        setTimeout(() => {
          toast.success("Login With Email Or Username", { duration: 4000 });
        }, 2000);
        reset();
        navigate("/login");
      }

      switch (response.status) {
        case 406:
          toast.error("All Fields Required");
          break;

        case 409:
          toast.error("User with Email or Username Already Exist..!!");
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Register:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="">
        <h1 className="font-bold text-4xl text-[#967203]">Preety Jewellery</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 w-full flex flex-col gap-6"
        >
          <div className="space-y-3">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Name is required" })}
              placeholder="Enter Your Name..."
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              {...register("username", { required: "Username is required" })}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email Address"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="relative space-y-3">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                {...register("password", { required: "Password is required" })}
                className="w-full bg-white h-11 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#967203] focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <Icon.Eye size={20} />
                ) : (
                  <Icon.EyeOff size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className={`${
              submitting
                ? "bg-buttonColor"
                : "bg-buttonColor2 hover:bg-hoverColor active:bg-clickColor2"
            } text-white  transition-all duration-200 mt-2`}
            disabled={submitting}
          >
            {submitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <NavLink to="/logIn" className="text-blue-600 hover:underline">
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
