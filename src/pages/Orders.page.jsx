import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import Button from "../components/Button";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/Usfull reducers/ApiCalls";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";

const Orders = () => {
  const allorders = useSelector((state) => state.order.allOrders);
  const pageInfo = useSelector((state) => state.order.pageInfo);

  console.log(typeof allorders);

  const [orderStatus, setOrderStatus] = useState("");
  const [select, setSelect] = useState(0.7);
  const [pageNumber, setPageNumber] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customDates, setCustomDates] = useState([]);
  const [filter, setFilter] = useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    const page = pageNumber;
    const query = { startDate, endDate, orderStatus, page };

    dispatch(fetchAllOrders(query));
  }, [orderStatus, pageNumber, startDate, endDate]);

  useEffect(() => {
    let [start = "", end = ""] = customDates;

    if (start != "" && end != "") {
      const dateOne = new Date(start);
      const dateTwo = new Date(end);

      dateOne.setHours(0, 0, 0, 0);
      dateTwo.setHours(23, 59, 0, 0);

      setStartDate(dateOne.getTime());
      setEndDate(dateTwo.getTime());
    }
  }, [customDates]);

  const disabledDate = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf("day");
  };

  const quickDate = (timeSpan) => {
    switch (timeSpan) {
      case "thisMonth":
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        setStartDate(firstDay.getTime());
        setEndDate(lastDay.getTime());

        break;

      case "lastMonth":
        const Year = new Date().getFullYear();
        const Month = new Date().getMonth();

        const dayFirst = new Date(Year, Month - 1, 1);
        const dayLast = new Date(Year, Month, 0);

        console.log();
        ({ dayFirst, dayLast });

        setStartDate(dayFirst.getTime());
        setEndDate(dayLast.getTime());

        break;

      default:
        break;
    }
  };

  const toggleFilterBox = () => {
    setFilter((pre) => !pre);
  };

  return (
    <div className="min-h-screen w-full mt-4 xs:mt-20 px-4 sm:px-8 flex flex-col items-center gap-6 overflow-x-hidden">
      <h1 className="self-start text-xl xs:text-3xl font-bold">My Orders</h1>

      {/* main body */}
      <div className="flex flex-col justify-center items-center w-full xs:w-[70rem]">
        {/* filter box */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center">
          {/* order type */}
          <div className="flex w-full max-w-md md:max-w-xl justify-between items-center bg-gray-300 relative px-5 xs:px-11 h-[3rem] rounded-3xl cursor-pointer">
            <p
              className={`z-10 ${select === 0.7 ? "font-semibold" : ""}`}
              onClick={() => {
                setSelect(0.7);
                setOrderStatus("");
              }}
            >
              All orders
            </p>
            <p
              className={`z-10 ${select === 13 ? "font-semibold" : ""}`}
              onClick={() => {
                if (screen.width < 500) {
                  setSelect(8.2);
                } else {
                  setSelect(13);
                }

                setOrderStatus("Shipping");
              }}
            >
              Arriving
            </p>
            <p
              className={`z-10 ${select === 25.5 ? "font-semibold" : ""}`}
              onClick={() => {
                if (screen.width < 500) {
                  setSelect(16);
                } else {
                  setSelect(25.5);
                }
                setOrderStatus("Cancelled");
              }}
            >
              Cancelled
            </p>
            <div
              className={`absolute bg-white w-[6rem] xs:w-[9rem] h-[2rem] rounded-3xl transition-all`}
              style={{ left: `${select}rem` }}
            ></div>
          </div>

          {/* date filter */}
          <form
            className={`bg-white w-[21rem] xs:w-full max-w-md md:max-w-xl h-fit xs:h-[3rem] flex gap-6 xs:gap-0 rounded-3xl py-4 xs:py-0 px-3 xs:justify-between fixed xs:static bottom-20 flex-col xs:flex-row shadow-boxShadowBorder2 xs:shadow-none transition-all ease-in-out z-10 ${
              filter ? "left-[3rem]" : "left-[25rem]"
            } `}
          >
            <div className="flex justify-between items-center xs:pl-5">
              <h3 className="text-xl font-semibold pr-2">Filter</h3>
              {screen.width < 500 && (
                <Icon.X size={20} onClick={() => toggleFilterBox()} />
              )}
            </div>
            <div className="flex flex-col-reverse xs:flex-row xs:items-center gap-2">
              {watch("selectDate") == "custom" && (
                <DatePicker.RangePicker
                  className="h-4/6"
                  placement="bottomRight"
                  popupClassName="custom-calendar-popup"
                  disabledDate={disabledDate}
                  onChange={(dates) => {
                    if (!dates) {
                      setCustomDates([]); // reset if cleared
                      return;
                    }

                    const formatted = dates.map((d) => (d ? d.toDate() : null));

                    setCustomDates(formatted);
                  }}
                />
              )}
              <div className="relative flex xs:flex-row xs:items-center gap-3 xs:gap-2 max-w-fit">
                <select
                  className="appearance-none bg-gray-300 rounded-3xl w-56 pl-3 h-[2rem] relative z-0"
                  {...register("selectDate", {
                    onChange: (e) => quickDate(e.target.value),
                  })}
                >
                  <option value="" className="bg-white">
                    Select Date
                  </option>
                  <option value="thisMonth" className="bg-white">
                    This Month
                  </option>
                  <option value="lastMonth" className="bg-white">
                    Last Month
                  </option>
                  <option value="custom" className="bg-white">
                    Custom
                  </option>
                </select>

                <Icon.Triangle
                  fill=""
                  size={12}
                  className="rotate-180 absolute bottom-2 right-3 pointer-events-none"
                />
              </div>
            </div>
          </form>

          {screen.width < 500 && (
            <div
              className="fixed bg-white p-2 shadow-boxShadowBorder2 rounded-full bottom-20 right-5 z-10"
              onClick={() => toggleFilterBox()}
            >
              <Icon.Filter />
            </div>
          )}
        </div>

        {/* orders */}
        <div className="xs:w-full">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xs:grid-cols-[repeat(auto-fit,minmax(30rem,1fr))] gap-5 mt-5">
            {allorders?.map((order) => (
              <div key={order._id}>
                <div className="bg-white p-3 rounded-t-lg ">
                  {/* card head */}
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Order Id</p>
                      <p className="text-xl font-bold">{order?.orderId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="shadow-boxShadowBorder rounded-full
                   px-3 hidden xs:block"
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
                            src={item?.product?.image?.[0]}
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
                <div className="bg-gray-200 rounded-b-lg flex justify-between items-center px-4 py-2 ">
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
              <p className="text-gray-700 text-xs xs:text-base">
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
