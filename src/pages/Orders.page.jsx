import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import Button from "../components/Button";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/Usfull reducers/ApiCalls";

const Orders = () => {
  const allorders = useSelector((state) => state.order.allOrders);
  const pageInfo = useSelector((state) => state.order.pageInfo);

  const [orderStatus, setOrderStatus] = useState("");
  const [select, setSelect] = useState(0.7);
  const [pageNumber, setPageNumber] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const page = pageNumber;

    const query = { startDate, endDate, orderStatus, page };

    dispatch(fetchAllOrders(query));
  }, [orderStatus, pageNumber]);

  return (
    <div className="h-fit w-full mt-8 p-10 flex flex-col items-center gap-6">
      <h1 className="self-start text-3xl font-bold">My Orders</h1>

      {/* main body */}
      <div>
        {/* filter box */}
        <div className="lg:flex gap-6">
          {/* order type */}
          <div className="flex w-[40rem] justify-between items-center bg-gray-300 relative px-11 h-[3rem] rounded-3xl cursor-pointer">
            <p
              className={`z-20 ${select === 0.7 ? "font-semibold" : ""}`}
              onClick={() => {
                setSelect(0.7);
                setOrderStatus("");
              }}
            >
              All orders
            </p>
            <p
              className={`z-20 ${select === 15.5 ? "font-semibold" : ""}`}
              onClick={() => {
                setSelect(15.5);
                setOrderStatus("Shipping");
              }}
            >
              Arriving
            </p>
            <p
              className={`z-20 ${select === 30.5 ? "font-semibold" : ""}`}
              onClick={() => {
                setSelect(30.5);
                setOrderStatus("Cancelled");
              }}
            >
              Cancelled
            </p>
            <div
              className={`absolute bg-white w-[9rem] h-[2rem] z-10 rounded-3xl transition-all`}
              style={{ left: `${select}rem` }}
            ></div>
          </div>

          {/* date filter */}
          <form className="bg-white w-[40rem] h-[3rem] flex rounded-3xl px-3 justify-between">
            <div className="relative flex items-center">
              <select className="appearance-none bg-gray-300 rounded-3xl w-64 pl-3 h-[2rem]">
                <option value="" className="bg-white">
                  Select Date
                </option>
                <option value="thisMonth" className="bg-white">
                  This Month
                </option>
                <option value="LastMonth" className="bg-white">
                  Last Month
                </option>
              </select>
              <Icon.Triangle
                fill=""
                size={12}
                className="rotate-180 absolute right-3 pointer-events-none"
              />
            </div>
            <div className="flex items-center gap-5">
              <Button className="bg-green-500 h-[2rem] w-28 flex items-center justify-center">
                Apply
              </Button>
              <Button className="bg-red-500 h-[2rem] w-28 flex items-center justify-center">
                Reset
              </Button>
            </div>
          </form>
        </div>

        {/* orders */}
        <div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(40rem,1fr))] gap-5 mt-5">
            {allorders?.map((order) => (
              <div key={order._id}>
                <div className="bg-white p-3 rounded-t-lg">
                  {/* card head */}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Order Id</p>
                      <p className="text-xl font-bold">{order?.orderId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="shadow-boxShadowBorder rounded-full
                   px-3"
                      >
                        Estimated Arrival : {order?.delivery}
                      </div>
                      {order?.status != "Cancelled" ? (
                        <div className="text-green-400 font-bold bg-green-100 px-4 rounded-full">
                          {order?.status}
                        </div>
                      ) : (
                        <div className="text-red-400 font-bold bg-red-100 px-4 rounded-full">
                          {order?.status}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* card body */}
                  <div className="shadow-boxShadowBorder rounded-lg p-3 flex justify-between flex-wrap gap-5 h-40 overflow-auto mt-2">
                    {order?.products?.map((item) => (
                      <div
                        key={item._id}
                        className="flex w-52 gap-2 items-center"
                      >
                        <div className="bg-gray-400 w-24 h-24 rounded-lg">
                          <img
                            className="overflow-hidden h-full w-full"
                            src={item?.product?.image[0]}
                            alt="productImg"
                          />
                        </div>
                        <div className="flex flex-col h-full justify-evenly">
                          <p>{item?.product?.productName}</p>
                          <p>₹{item?.product?.price}</p>
                          <p>Qty : {item?.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* card footer */}
                <div className="bg-gray-200 rounded-b-lg flex justify-between items-center px-4 py-2">
                  <div className="flex gap-1">
                    <p className="font-semibold">₹{order?.netAmount}</p>
                    <p>({order?.products?.length} Items)</p>
                  </div>
                  <NavLink
                    to={`/orders/${order?._id}`}
                    className="bg-black text-white flex justify-center items-center p-2 rounded-full w-20 text-sm"
                  >
                    Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>

          {allorders?.length > 0 && (
            <div className="bg-gray-200 mt-5 px-6 py-3 flex items-center justify-between text-sm font-medium">
              {/* Left: Showing results info */}
              <p className="text-gray-700">
                Showing page{" "}
                <span className="text-gray-900">{pageInfo?.page}</span> of{" "}
                <span className="text-gray-900">{pageInfo?.totalPages}</span>{" "}
                pages (
                <span className="text-gray-900">{pageInfo?.totalOrders}</span>{" "}
                Orders)
              </p>

              {/* Right: Prev / Next buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPageNumber(pageInfo.page - 1);
                  }}
                  disabled={pageInfo.page === 1}
                  className={`px-3 py-1 rounded ${
                    pageInfo.page === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setPageNumber(pageInfo.page + 1);
                  }}
                  disabled={pageInfo.page === pageInfo.totalPages}
                  className={`px-3 py-1 rounded ${
                    pageInfo.page === pageInfo.totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
