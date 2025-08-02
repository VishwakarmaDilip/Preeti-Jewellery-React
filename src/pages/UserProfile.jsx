import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { getUser } from "../features/Usfull reducers/ApiCalls";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false)
  const [editMode2, setEdit2Mode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      gender: "NA",
      email: "",
      mobile: "",
    },
  });

//   Fetch User
  useEffect(() => {
    dispatch(getUser());
  }, [submitting, editMode2]);

  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName || "",
        gender: userData.gender || "NA",
        email: userData.email || "",
        mobile: userData.mobile || "",
      });
    }
  }, [userData, reset]);

  const avatarUrl = userData?.avatar || "../../public/Image/userIcon.png";

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/users/updateAccount`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status < 299) {
        toast.success("Profile Updated Successfully");
        setEditMode(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("Failed to update profile:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setEditMode(false);
    reset({
      fullName: userData?.fullName || "",
      gender: userData?.gender || "NA",
      email: userData?.email || "",
      mobile: userData?.mobile || "",
    });
  };

  if (!userData) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="mt-8 p-10">
      {/* Overlay for EditEmailAndImage modal */}
      <div
        className={`${
          editMode2 ? "block" : "hidden"
        } absolute top-0 opacity-60 w-screen h-screen bg-black z-20`}
      ></div>

      <div className="px-4 pt-2">
        {/* <EditEmailAndImage
          editMode={editMode2}
          click={() => setEdit2Mode(false)}
          email={userData?.email}
          setEditMode={() => setEditMode()}
          setEdit2Mode={() => setEdit2Mode()}
          avatarUrl={avatarUrl}
        /> */}

        {/* <h1 className="font-extrabold text-3xl">Profile</h1> */}
        <div className="px-6 py-1 flex flex-col gap-4">
          <h2 className="text-4xl md:text-3xl font-bold">
            Welcome, {userData?.fullName}
          </h2>

          <div
            className={`relative flex items-center px-1 py-4 gap-3  w-fit`}
          >
            <div className="h-24 w-24 rounded-full bg-white outline outline-1 flex items-center justify-center overflow-hidden">
              <img src={avatarUrl} alt="User" className="h-full" />
            </div>
            <Button
              onClick={() => setEdit2Mode(!editMode2)}
              textColor={true}
              className={`bg-buttonColor hover:shadow-boxShadow active:bg-clickColor w-16 absolute bottom-[0.5rem] text-xs left-[1.3rem] py-[0.3rem] px-[0.5rem] ${
                editMode ? "block" : "hidden"
              }`}
            >
              Edit
            </Button>
            <div>
              <h3 className="font-semibold text-2xl">{userData?.username}</h3>
              <p className="text-sm text-gray-600">{userData?.email}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-16"
          >
            <div className="grid grid-cols-2 gap-4 gap-y-20 mt-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label>Full Name</label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full Name is required" }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className={`h-12 ml-2 ${
                        editMode ? "bg-white" : "bg-inputBG"
                      }`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-2">
                <label>Gender</label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      className={`h-12 ml-2 ${
                        editMode ? "bg-white" : "bg-inputBG"
                      }`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Age */}
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      className={`h-12 ml-2 ${
                        editMode ? "bg-white" : "bg-inputBG"
                      }`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-2">
                <label>Mobile</label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="tel"
                      className={`h-12 ml-2 ${
                        editMode ? "bg-white" : "bg-inputBG"
                      }`}
                      disabled={!editMode}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="place-self-end flex gap-5">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-black font-bold hover:shadow-boxShadow hover:bg-buttonColor active:bg-clickColor outline outline-1 py-2 px-4 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <Button textColor={true} type="submit" disabled={submitting} className={"bg-buttonColor text-black font-bold hover:shadow-boxShadow active:bg-clickColor outline outline-1 py-2 px-4 rounded-lg transition"}>
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  textColor={true}
                  className="w-48 bg-buttonColor text-black font-bold hover:shadow-boxShadow active:bg-clickColor"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
