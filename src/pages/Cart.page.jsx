import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartApiCall,
  handleRemoveFromCart,
  handleUpdateCartProduct,
} from "../features/Usfull reducers/ApiCalls";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const myCart = useSelector((state) => state.cart.myCart);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const cartState = useSelector((state) => state.cart.cartChanged);
  const loading = useSelector((state) => state.cart.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartApiCall());
  }, [cartState]);

  const handleRemove = async (productId) => {
    dispatch(handleRemoveFromCart(productId));
  };

  const handleQuantityOfProduct = (productId, quantity) => {
    dispatch(handleUpdateCartProduct({ productId, quantity }));
  };

  // console.log("productsInCart", productsInCart);

  return (
    <div className="h-fit w-full mt-8 p-10 flex flex-col items-center gap-6">
      {/* page heading */}
      <h1 className="font-bold text-3xl self-start">My Cart</h1>

      {/* main body */}
      <div className="flex w-full gap-5">
        {/* cart body */}
        <div className=" bg-white rounded-lg w-9/12">
          {/* heading box */}
          <div>
            <ul className="grid grid-cols-7 p-2 pl-5 border-b border-gray-200 font-semibold">
              <li>Item</li>
              <li className="col-start-4 text-center">Price</li>
              <li className="text-center">Quantity</li>
              <li className="text-center">Total</li>
            </ul>
          </div>

          {/* product list */}
          <div>
            {productsInCart.length > 0 ? (
              productsInCart.map((item, index) => (
                <ul
                  className="grid grid-cols-7 p-2 pl-5 border-b border-gray-200 items-center text-lg min-h-[145px]"
                  key={index}
                >
                  <li className=" flex gap-3 col-start-1 col-end-4 items-center ">
                    <NavLink
                      to={`/products/${item?._id}`}
                      className="w-28 overflow-hidden rounded-md"
                    >
                      <img src={item?.image[0]} alt="" />
                    </NavLink>
                    <div>
                      <p className="font-bold text-2xl">{item?.productName}</p>
                      <p className="text-gray-400 text-sm">In stock</p>
                    </div>
                  </li>
                  <li className="col-start-4 text-center">₹{item.price}</li>
                  <li className="flex justify-center h-fit items-center">
                    <div
                      className={`flex border border-black justify-between items-center px-2 w-24 text-gray-400`}
                    >
                      <button
                        onClick={() =>
                          handleQuantityOfProduct(item._id, item.quantity - 1)
                        }
                        disabled={loading}
                        className={`${
                          loading ? " cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        -
                      </button>
                      <p className="text-black">{item.quantity}</p>
                      <button
                        onClick={() =>
                          handleQuantityOfProduct(item._id, item.quantity + 1)
                        }
                        disabled={loading}
                        className={`${
                          loading ? " cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </li>
                  <li className="text-center">
                    <p>₹{item.totalAmount}</p>
                  </li>
                  <li className="text-center text-red-600">
                    <button onClick={() => handleRemove(item?._id)}>
                      Remove
                    </button>
                  </li>
                </ul>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-[204.8px]">
                <p>Cart is Empty...!</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart summary */}
        <div className="bg-white w-3/12 h-fit p-3 rounded-md">
          <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between">
              <p>
                Subtotal (
                {productsInCart.length > 0 ? productsInCart.length : 0} Item
                {productsInCart.length > 1 ? "s" : ""})
              </p>
              <p>
                ₹
                {productsInCart.length > 0
                  ? Number(myCart?.cartValue).toLocaleString("hi-IN")
                  : 0}
              </p>
            </div>

            <hr />
          </div>
          <NavLink to={"/checkout"}>
            <button className="mt-5 bg-buttonColor w-full font-semibold rounded-lg h-8 hover:shadow-boxShadow active:bg-clickColor">
              Proceed To Checkout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Cart;
