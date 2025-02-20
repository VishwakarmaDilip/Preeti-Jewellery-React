import React from "react";
import { useParams } from "react-router-dom";
import products from "../assets/api/product.json";
import { Info } from "react-feather";
import PriceDetail from "./PriceDetail";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeItem } from "../features/Add To List/listFunctionSlice.js";

const ShowProduct = () => {
  const allList = useSelector((state) => state.addToList.list)
  const param = useParams();
  const allProducts = products;
  const dispatch = useDispatch();

  const product = allProducts.filter(
    (currProd) => currProd.name === param.name
  );
  const { id, name, price, image, quantity } = product[0];

  const handleWishlist = (id, name, price, image) => {
    dispatch(addToList({ id, name, price, image}));
  };
  const removeFromWL = (id) => {
    dispatch(removeItem(id));
  }

  return (
    <div className="mt-[5vh] xs:mt-0 mb-[8vh] xs:mb-0 w-full h-fit xs:h-screen flex items-center justify-center">
      <div className=" w-[90%] xs:w-4/5 h-full flex flex-col xs:flex-row items-center justify-center gap-8">
        {/* image box */}
        <div className=" w-full xs:w-[50%] h-[80%] bg-white p-4 rounded-2xl shadow-boxShadow">
          <img
            src={image}
            alt={name}
            className=" object-contain h-full mx-auto rounded-2xl"
          />
        </div>
        {/* product details */}
        <div className=" w-full xs:w-[30%] h-[80%] flex flex-col gap-8 bg-white p-4 rounded-2xl shadow-boxShadow">
          <h1 className=" text-2xl text-gray-500 font-bold">{name}</h1>
          <div className=" space-y-1">
            <div className=" text-3xl relative w-fit pr">
              ₹{price}
              <Info className=" absolute top-2 -right-6 h-4 cursor-pointer peer" />
              <PriceDetail price={price} />
            </div>
            <p className=" bg-[#F8F8FF] w-fit text-xs p-1 px-2 rounded-2xl">
              Free Delivery
            </p>
          </div>

          {/* size */}
          <div className=" space-y-2">
            <p className=" text-xl font-bold">Size</p>
            <div className=" flex gap-4">
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">S</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">M</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">L</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">XL</button>
            </div>
          </div>

          {/* Product detail */}
          <div className=" space-y-2">
            <h2 className=" text-2xl font-extrabold">Product Detail</h2>
            <div>
              <p>Product Name: {name}</p>
              <p>Net Quantity: {quantity}</p>
              <p>PID: {id}</p>
            </div>
          </div>

          {/* action button */}
          <div className=" flex flex-wrap justify-center gap-4 w-full">
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">
              Buy Now
            </button>
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">
              Add to Cart
            </button>
            {
              !allList.find((currProd) => currProd.id === id) ?(
                <button
              className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
              onClick={() => handleWishlist(id, name, price, image)}
            >
              Add to wishlist
            </button>
              ):(
                <button
              className=" w-44 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold"
              onClick={() => removeFromWL(id)}
            >
              Remove from wishlist
            </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
