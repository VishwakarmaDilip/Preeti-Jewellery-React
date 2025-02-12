import React from "react";
import { useParams } from "react-router-dom";
import products from "../assets/api/product.json";

const ShowProduct = () => {
  const { name } = useParams();
  const allProducts = products;

  const product = allProducts.filter((currProd) => currProd.name === name);

  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div className=" w-4/5 h-full flex items-center justify-center gap-8">
        {/* image box */}
        <div className=" w-[40%] h-[60%] overflow-hidden">
          <img src={product[0].image} alt={product[0].name} className=" h-full w-full"/>
        </div>
        {/* product details */}
        <div className=" w-[50%] h-[80%] flex flex-col gap-4 bg-white">
            <h1>{product[0].name}</h1>
            <p>{product[0].price}</p>
            <p>Free Delivery</p>
            <div className="">
                <h2>Product Detail</h2>
                <p>Product Name: {product[0].name}</p>
                <p>Net Quantity: {product[0].quantity}</p>
                <p>PID: {product[0].id}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
