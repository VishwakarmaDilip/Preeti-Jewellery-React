import React from "react";
import * as Icon from "react-feather";

const ProductDetail = ({ setProductDetail, productDetail, product }) => {
  return (
    <div
      className={`h-fit w-full bg-white flex flex-col gap-6 p-4 z-10 rounded-2xl shadow-boxShadow top-72 left-0 ${
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
          <span>{product.productName}</span>
        </p>
        <p>
          <span className="font-semibold">Net Quantity</span> : <span>{product.quantity}</span>
        </p>
        <p>
          <span className="font-semibold">PID</span> : <span>{product.productId}</span>{" "}
        </p>
        <p>
          <span className="font-semibold">Product Description</span> :{" "}
          <span>
            {product.description}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
