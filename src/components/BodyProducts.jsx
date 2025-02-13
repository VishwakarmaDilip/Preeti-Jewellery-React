import React, { useState } from "react";
import products from "../assets/api/product.json";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  removeItem,
} from "../features/Add To List/listFunctionSlice.js";
import { NavLink } from "react-router-dom";

const BodyProducts = () => {
  const allList = useSelector((state) => state.addToList.list);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredProducts = products.filter((currProd) => {
    return currProd.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddToList = (id, name, price, image) => {
    dispatch(addToList({ id, name, price, image }));
  };
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    // product main body
    <div className=" w-full h-fit mb-8 flex flex-col items-center gap-8">
      {/* search bar */}
      <div className=" w-4/5 h-10 flex items-center gap-4 pl-7">
        <input
          type="text"
          placeholder="Search..."
          className=" w-72 h-10 border border-black rounded-lg px-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* product container */}
      {/* <div className=" w-4/5 h-fit place-items-center grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 gap-y-6 "> */}
      <div className=" w-[75%] h-fit flex flex-wrap gap-14 gap-y-6 ">
        {products && filteredProducts.length > 0 ? (
          filteredProducts.map((currProd) => {
            const { id, name, price, image } = currProd;

            return (
              // product card
              <div
                className=" bg-white p-4 rounded-2xl shadow-boxShadow flex flex-col gap-6 h-[25rem] w-60"
                key={id}
              >
                <NavLink to={`/products/${name}`} target="_blank">
                {/* image box */}
                <div className=" w-full h-[60%] overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      className=" w-full h-full"
                    />
                </div>

                {/* product detail */}
                <div className=" h-1/2 flex flex-col justify-evenly">
                  <h1 className=" text-[2.5rem]">{name}</h1>
                  <div className=" flex gap-[1.3rem]">
                    <p className=" text-2xl">₹{price}</p>
                    <p className=" text-2xl font-light line-through">
                      ₹{price * 3}
                    </p>
                  </div>
                </div>
                </NavLink>
                {!allList.some((currProd) => currProd.id === id) ? (
                  <button
                    className=" bg-buttonColor h-10 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                    onClick={() => handleAddToList(id, name, price, image)}
                  >
                    Add to wishlist
                  </button>
                ) : (
                  <button
                    className=" bg-buttonColor h-10 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                    onClick={() => handleRemove(id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className=" w-full h-[50vh] flex justify-center items-center bg-white">
            <h1 className=" text-3xl text-center w-4/5">
              No product found with this name.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyProducts;
