import React from "react";

const PriceDetail = (price) => {
  return (
    <div className=" hidden bg-white p-4 rounded-2xl shadow-boxShadow flex-col gap-6 h-[25rem] w-80 absolute top-6 left-0 peer-hover:flex hover:flex">
      <h1 className=" text-2xl font-bold">Price Details</h1>
      <div className=" h-1/2 flex flex-col justify-evenly">
        <div className=" text-lg flex justify-between">
          <p>Maximum Retail Price (MRP)</p>
          <p>₹{price.price * 3}</p>
        </div>

        <div className=" text-lg flex justify-between">
          <p>Product Price</p>
          <p>₹{price.price}</p>
        </div>

        <hr />
        <div className=" text-lg font-semibold flex justify-between">
          <p>Final Price</p>
          <p>₹{price.price}</p>
        </div>
      </div>
      <div className=" space-y-2 text-sm font-light">
        <p>MRP is inclusive of all taxes</p>
        <p>
          This product has an MRP (Maximum Retail Price) set by the supplier.As
          per govt. guidelines, we recommend that you do not sell the product at
          higher price than MRP.
        </p>
      </div>
    </div>
  );
};

export default PriceDetail;
