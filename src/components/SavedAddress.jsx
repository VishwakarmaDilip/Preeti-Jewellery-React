import React from "react";
import Button from "./Button";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllAddress,
  pinCodeServiceCheckAllAddress,
} from "../features/Usfull reducers/ApiCalls";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SavedAddress = ({ setShowSavedAddress }) => {
  const addresses = useSelector((state) => state.user.allAddresses) || [];
  const pincodeServiceData = useSelector(
    (state) => state.user.allAddressesPinCheck
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    dispatch(getAllAddress());
  }, []);

  let disableContuniue;
  disableContuniue = watch("address") ? false : true;
  if (
    pincodeServiceData?.serviceability === ("Temporary Unserviceable" || false)
  ) {
    disableContuniue = true;
  }

  const checkClick = watch("address");

  const submit = (data) => {
    navigate(`/checkout/payment/${data.address}`);
    setShowSavedAddress(false);
  };

  return (
    <div className="bg-white pt-4 px-4 w-[50rem] h-fit space-y-2 ">
      <div className="flex items-center justify-between cursor-pointer">
        <h2 className="font-semibold text-2xl">Saved Address</h2>
        <Icon.X onClick={() => setShowSavedAddress(false)} />
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <div className="h-[28rem] overflow-auto  cursor-pointer flex flex-col justify-between">
          <div className="h-full ">
            {Array.isArray(addresses) &&
              addresses?.map((data, index) => (
                <div key={index} className="p-4 border-b flex gap-2">
                  <div className="pt-[0.1rem]">
                    <input
                      type="radio"
                      className="cursor-pointer"
                      value={data?._id}
                      id={data?._id}
                      onClick={() => {
                        dispatch(pinCodeServiceCheckAllAddress(data?.pinCode));
                      }}
                      {...register("address")}
                    />
                  </div>
                  <label
                    className="flex flex-col gap-2 cursor-pointer"
                    htmlFor={data?._id}
                  >
                    <h3 className="font-semibold">
                      {data?.firstName} {data?.lastName}
                    </h3>
                    <p>
                      {data?.address}, {data?.city} - {data?.pinCode},{" "}
                      {data?.state}
                    </p>
                    <p>{data?.mobile}</p>
                    <div>
                      {data?._id === checkClick &&
                        pincodeServiceData?.serviceability ==
                          "Temporary Unserviceable" && (
                          <p className="text-red-500 text-sm mt-1">
                            {pincodeServiceData?.serviceability}
                          </p>
                        )}
                      {data?._id === checkClick &&
                        pincodeServiceData?.serviceability == false && (
                          <p className="text-red-500 text-sm mt-1">
                            Service Not Available
                          </p>
                        )}
                      {data?._id === checkClick &&
                        pincodeServiceData?.serviceability == true && (
                          <p className="text-green-500 text-sm mt-1">
                            Service Available
                          </p>
                        )}
                    </div>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div className=" flex flex-row-reverse items-center p-4">
          <Button
            textColor={true}
            disabled={disableContuniue}
            className={
              "bg-buttonColor hover:shadow-boxShadow active:bg-clickColor"
            }
          >
            Contunue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SavedAddress;
