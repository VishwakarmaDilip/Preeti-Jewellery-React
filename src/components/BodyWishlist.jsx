import React from "react";
import { useSelector } from "react-redux";

const BodyWishlist = () => {
  const allList = useSelector((state) => state.addToList.list);

  const listValue = allList.reduce((accum , currProd) => {
    return accum + currProd.price
  },0)

  const tax = 20


  return (
    <div>
      {allList ? (
        <div className=" min-h-screen flex flex-col items-center gap-8">
          {/* wish Container */}
          <div className=" w-4/5 h-fit bg-backgroundColor2 p-6 flex justify-center items-center flex-col " >
            {allList.map((currProd) => {
              const { id, name, price, image } = currProd;

              return (
                <div key={id} className=" w-full ">
                    {/* Wish product container */}
                  <div className=" w-full my-4 flex justify-between items-center">
                    <div className=" flex items-center justify-between text-[2rem] w-[25rem]">
                      <div className=" h-20">
                        <img
                          src={image}
                          className=" h-full"
                          alt={name}
                        />
                      </div>
                      <p >{name}</p>
                      <p >₹{price}</p>
                    </div>
                    <button className=" w-36 h-12 font-semibold bg-buttonColor text-textColor1 rounded-lg hover:shadow-boxShadow active:bg-clickColor">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <section className="w-4/5 flex justify-end my-4">
            <div className="border-[0.5px] border-black bg-backgroundColor2 w-60 h-[17rem] p-4 flex flex-col justify-between">
              <p className="text-center text-[2rem] font-normal">Summary</p>
              <div className="flex justify-between">
                <p>Sub total:</p>
                <p className=" text-textColor1 font-semibold">{listValue}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p className=" text-textColor1 font-semibold">{tax}</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p>Final Total:</p>
                <p className=" text-textColor1 font-semibold">{listValue + tax}</p>
              </div>
              <button className=" cursor-pointer text-[1.1rem] font-[550] h-[1.8rem] bg-buttonColor rounded-[0.4rem] hover:shadow-boxShadow active:bg-clickColor">Send List</button>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <p>No List</p>
        </div>
      )}
    </div>
  );
};

export default BodyWishlist;
