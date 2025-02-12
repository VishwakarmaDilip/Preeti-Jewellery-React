import React from "react";
import products from "../assets/api/product.json";
import { useDispatch } from "react-redux";
import { addToList } from "../features/Add To List/listFunctionSlice.js";

const BodyProducts = () => {
  const dispatch = useDispatch();

  const handleAddToList = (id, name, price, image) => {
    dispatch(addToList({ id, name, price, image }));
  };
  return (
    // product main body
    <div className=" w-full h-fit mb-8 flex justify-center">
      {/* product container */}
      <div className=" w-4/5 h-fit grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 gap-y-6 ">
        {products &&
          products.map((currProd) => {
            const { id, name, price, image } = currProd;

            return (
              // product card
              <div className=" bg-white p-4 rounded-2xl shadow-boxShadow flex flex-col gap-[0.8] h-[25rem] w-60 place-self-center justify-center" key={id}>
                {/* image box */}
                <div className=" w-full h-1/2">
                  <img src={image} alt={name} loading="lazy" className=" w-full" />
                </div>

                {/* product detail */}
                <div className=" h-1/2 flex flex-col justify-evenly">
                  <h1 className=" text-[2.5rem]">{name}</h1>
                  <div className=" flex gap-[1.3rem]">
                    <p className="">₹{price}</p>
                    <p className=" font-light line-through">₹{price * 3}</p>
                  </div>
                </div>
                <button
                  className=" bg-buttonColor h-10 rounded-lg cursor-pointer hover:shadow-boxShadow active:bg-clickColor"
                  onClick={() => handleAddToList(id, name, price, image)}
                >
                  Add to wishlist
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BodyProducts;
