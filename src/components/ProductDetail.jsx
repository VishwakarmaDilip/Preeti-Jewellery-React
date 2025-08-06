import React from "react";
import * as Icon from "react-feather";

const ProductDetail = ({ setProductDetail, productDetail }) => {
  return (
    <div
      className={`h-1/2 w-full bg-white flex flex-col justify-between p-4 z-10 rounded-2xl shadow-boxShadow top-72 left-0 ${
        productDetail ? "absolute" : "hidden"
      } `}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Product Detail</h2>
        <Icon.X
          className="cursor-pointer"
          onClick={() => setProductDetail(false)}
        />
      </div>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Product Name</span> :{" "}
          <span>Khopa</span>
        </p>
        <p>
          <span className="font-semibold">Net Quantity</span> : <span>50</span>
        </p>
        <p>
          <span className="font-semibold">PID</span> : <span>000040</span>{" "}
        </p>
        <p>
          <span className="font-semibold">Product Description</span> :{" "}
          <span>
            Elegant handcrafted Khopa, perfect for traditional occasions. Made
            with premium materials for lasting shine and durability.
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
