import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  sendToWhatsapp,
} from "../features/Add To List/listFunctionSlice";
import { NavLink } from "react-router-dom";

const BodyWishlist = () => {
  const allList = useSelector((state) => state.addToList.list);
  const dispatch = useDispatch();

  const listValue = allList.reduce((accum, currProd) => {
    return accum + currProd.price;
  }, 0);

  const tax = 20;

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };
  const handleSend = () => {
    dispatch(sendToWhatsapp(tax));
  };

  return (
    <div>
      {allList.length > 0 ? (
        <div className=" min-h-screen flex flex-col items-center gap-8">
          {/* wish Container */}
          <div className=" w-4/5 h-fit bg-backgroundColor2 p-6 flex justify-center items-center flex-col ">
            {allList.map((currProd) => {
              const { id, name, price, image } = currProd;

              return (
                <div key={id} className=" w-full ">
                  {/* Wish product container */}
                  <div className=" w-full my-4 flex justify-between items-center">
                    {/* product detail */}
                    <NavLink
                      to={`/products/${name}`}
                      target="_blank"
                      className=" grid grid-cols-2 grid-rows-2 xs:flex items-center justify-between text-[2rem] w-[25rem]"
                    >
                      <div className=" h-20 row-[1/3] ">
                        <img
                          src={image}
                          loading="lazy"
                          className=" h-full"
                          alt={name}
                        />
                      </div>
                      <p className=" text-[1rem] xs:text-[2rem] self-end xs:self-center">{name}</p>
                      <p className=" text-[0.8rem] xs:text-[2rem] self-start">₹{price}</p>
                    </NavLink>
                    <button
                      className=" w-36 h-8 xs:h-12 font-semibold bg-buttonColor text-textColor1 text-[0.7rem] xs:text-[1rem] rounded-lg border border-black hover:shadow-boxShadow active:bg-clickColor"
                      onClick={() => handleRemove(id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <section className="w-4/5 flex justify-end my-4">
            <div className="border-[0.5px] border-black bg-backgroundColor2 w-full xs:w-60 h-[17rem] p-4 flex flex-col justify-between">
              <p className="text-center text-[2rem] font-normal">Summary</p>
              <div className="flex justify-between">
                <p>Sub total:</p>
                <p className=" text-textColor1 font-semibold">₹{listValue}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p className=" text-textColor1 font-semibold">₹{tax}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Final Total:</p>
                <p className=" text-textColor1 font-semibold">
                  ₹{listValue + tax}
                </p>
              </div>
              <button
                className=" cursor-pointer text-[1.1rem] font-extrabold h-[1.8rem]  bg-buttonColor rounded-[0.4rem] border-2 border-black hover:shadow-boxShadow active:bg-clickColor"
                onClick={() => handleSend()}
              >
                Send List
              </button>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className=" w-4/5 h-[68vh] xs:h-[80vh] bg-backgroundColor2 flex justify-center items-center mb-[7vh]">
            <p>No Items in List.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyWishlist;
