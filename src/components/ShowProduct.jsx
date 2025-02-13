import React from "react";
import { useParams } from "react-router-dom";
import products from "../assets/api/product.json";
import { Info } from "react-feather";
import PriceDetail from "./PriceDetail";

const ShowProduct = () => {
  const { name } = useParams();
  const allProducts = products;

  const product = allProducts.filter((currProd) => currProd.name === name);

  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div className=" w-4/5 h-full flex items-center justify-center gap-8">
        {/* image box */}
        <div className=" w-[50%] h-[80%] bg-white p-4 rounded-2xl shadow-boxShadow">
          <img
            src={product[0].image}
            alt={product[0].name}
            className=" object-contain h-full mx-auto rounded-2xl"
          />
        </div>
        {/* product details */}
        <div className=" w-[30%] h-[80%] flex flex-col gap-8 bg-white p-4 rounded-2xl shadow-boxShadow">
            <h1 className=" text-2xl text-gray-500 font-bold">
              {product[0].name}
            </h1>
          <div className=" space-y-1">
            <p className=" text-3xl relative w-fit pr">
              ₹{product[0].price}
              <Info className=" absolute top-2 -right-6 h-4 cursor-pointer peer" />
              <PriceDetail price={product[0].price}/>
            </p>
            <p className=" bg-[#F8F8FF] w-fit text-xs p-1 px-2 rounded-2xl">Free Delivery</p>
          </div>

          {/* size */}
          <div className=" space-y-2">
            <p className=" text-xl font-bold">Size</p>
            <div className=" flex gap-4">
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">S</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">M</button>
              <button className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">L</button>
              <button  className=" w-10 h-10 bg-[#F8F8FF] rounded-lg">XL</button>
            </div>
          </div>
          
          {/* Product detail */}
          <div className=" space-y-2">
            <h2 className=" text-2xl font-extrabold">Product Detail</h2>
            <div>
            <p>Product Name: {product[0].name}</p>
            <p>Net Quantity: {product[0].quantity}</p>
            <p>PID: {product[0].id}</p>
            </div>
          </div>

          {/* action button */}
          <div className=" flex flex-wrap justify-center gap-4 w-full">
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">Buy Now</button>
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">Add to Cart</button>
            <button className=" w-36 h-12 border border-black bg-buttonColor rounded-2xl hover:shadow-boxShadow active:bg-clickColor font-semibold">Add to wishlist</button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default ShowProduct;
