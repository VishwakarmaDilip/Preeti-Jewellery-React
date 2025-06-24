import React, { useState } from "react";
import products from "../assets/api/product.json";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  removeItem,
} from "../features/Add To List/listFunctionSlice.js";
import { NavLink } from "react-router-dom";
import { Heart } from "react-feather";

const Products = () => {
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
    <div className=" w-full h-fit mb-8 mt-20 flex flex-col items-center gap-8">
      {/* search bar */}
      <div className=" w-4/5 h-10 flex items-center justify-center xs:justify-start xs:pl-7">
        <input
          type="text"
          placeholder="Search..."
          className=" w-72 h-10 border border-black rounded-lg px-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* product container */}
      {/* <div className=" w-4/5 h-fit place-items-center grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4 gap-y-6 "> */}
      <div className=" w-[85%] xs:w-[75%] h-fit grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-7 xs:flex xs:flex-wrap xs:gap-14 ">
        {products && filteredProducts.length > 0 ? (
          filteredProducts.map((currProd) => {
            const { id, name, price, image } = currProd;

            return (
              // product card
              <div
                className=" bg-white p-4 rounded-2xl shadow-boxShadow flex flex-col gap-6 h-72 xs:h-[25rem] w-40 xs:w-60 relative"
                key={id}
              >
                <Heart
                  fill={
                    !allList.some((currProd) => currProd.id === id)
                      ? "none"
                      : "red"
                  }
                  className=" absolute top-52 right-7 cursor-pointer"
                  onClick={
                    !allList.some((currProd) => currProd.id === id)
                      ? () => handleAddToList(id, name, price, image)
                      : () => handleRemove(id)
                  }
                />
                <div className={"w-full h-full"}>
                  {/* image box */}
                  <NavLink to={`/products/${name}`} className=" w-full h-[60%] flex justify-center rounded-md overflow-hidden">
                    <img
                      src={image}
                      alt={name}
                      loading="lazy"
                      className="h-full"
                    />
                  </NavLink>

                  {/* product detail */}
                  <div className=" h-1/2 flex flex-col justify-evenly">
                    <h1 className=" text-[1.5rem] xs:text-[2.5rem]">{name}</h1>
                    <div className=" flex items-center gap-[1.3rem]">
                      <p className=" text-[1rem] xs:text-2xl">₹{price}</p>
                      <p className=" text-[1rem] xs:text-2xl font-light line-through">
                        ₹{price * 3}
                      </p>
                    </div>
                  </div>
                </div>
                {!allList.some((currProd) => currProd.id === id) ? (
                  <button
                    className=" bg-buttonColor h-10 rounded-lg cursor-pointer border border-black hover:shadow-boxShadow active:bg-clickColor"
                    onClick={() => handleAddToList(id, name, price, image)}
                  >
                    Add to Cart
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

export default Products;
