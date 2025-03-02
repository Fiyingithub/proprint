import React, { useEffect, useState, useRef } from "react";
import ProgressChart from "../DashboardComponents/ProgressChart";
import StudentOverview from "../DashboardComponents/StudentOverview";
import NavbarDashboard from "../NavbarDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../../context/Loaders/ToastContext";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaRegUser } from "react-icons/fa6";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { PiIdentificationBadgeThin } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";


const Orders = () => {
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
    useToast();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  console.log("MENUREF", menuRef);
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenEditMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://proprints.tranquility.org.ng/api/Order/GetAllOrders"
        );
        setOrders(response.data.$values);
        console.log(response.data.$values);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        if (error.response) {
          setMessage(error.response.data.responseMessage);
        } else {
          setMessage(`${error.message}, check your internet connection`);
        }
        setIsLoading(false);
      }
    };
    fetchClient();
  }, [trigger]);

  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const toggleEditMenu = (item) => {
    setOpenEditMenu(!openEditMenu);
    setOrderId(item);
  };

  const handleView = (id) => {
    navigate(`/admin/client/${id}`, { state: id });
  };

  const findClientByName = (orders, searchQuery) => {
    if (!searchQuery) return;
    const lowerCaseQuery = searchQuery.toLowerCase();

    const result = orders.filter((client) =>
      client.clientName.toLowerCase().includes(lowerCaseQuery)
    );
    return result || null;
  };

  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [clientData, setClientData] = useState({
    clientName: "",
    businessName: "",
    address: "",
    orderDate: "",
    clientId: "",
  });
  const addExistingMember = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post(
        "https://proprints.tranquility.org.ng/api/Order/CreateOrder",
        clientData
      );
      notifySuccess(res.responseMessage);
      console.log(res);
      stopWaitingLoader();
      setCreateOrderModal(false);
      setTrigger(true);
    } catch (error) {
      console.error(error);
      notifyError(error.response.data.responseMessage || "An error occurred");
      stopWaitingLoader();
    }
  };

  const [ordersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const iLastOrder = currentPage * ordersPerPage;
  const iFirstOrder = iLastOrder - ordersPerPage;
  const currentOrder = orders.slice(iFirstOrder, iLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <NavbarDashboard />
      <div className="flex flex-col lg:flex-row items-center px-6 lg:px-20 bg-gray-900">
        <div className="w-full lg:w-3/4">
          <StudentOverview />
        </div>
        <div className="w-full lg:w-1/4">
          <ProgressChart />
        </div>
      </div>

      <div className="container mb-10 mx-auto p-2">
        <div className="">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
            <h2 className="text-2xl font-medium mb-4 text-start">Orders</h2>

            <div className="gap-8 flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
              <button
                className="bg-gray-800 text-white hover:bg-gray-800/85 transition-all duration-300 px-4 py-2 rounded w-[150px] md:w-full"
                onClick={() => setCreateOrderModal(true)}>
                Create Order
              </button>

              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search order by client's name"
                    className="border border-gray-300 focus:border-primary outline-none rounded-md px-4 py-2 w-full sm:w-auto lg:w-[350px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-gray-800 text-white hover:bg-gray-800/85 transition-all duration-300 px-4 py-2 rounded w-[150px] md:w-[100px]">
                    Search
                  </button>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center bg-gray-800 py-2 px-2 text-white gap-2 rounded-md w-[200px]">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-100"
                    }`}>
                    <FaAngleLeft className="text-2xl" />
                  </button>
                  <span className="font-medium">
                    Page {currentPage} of {pageNumbers.length}
                  </span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className={`${
                      currentPage === pageNumbers.length
                        ? "opacity-20 cursor-not-allowed"
                        : "opacity-100"
                    }`}>
                    <FaAngleRight className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto p-1 pb-24">
          <table className="min-w-full table-auto rounded-lg shadow-md text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                <th className="px-4 py-4 text-left">S/N</th>
                <th className="px-2 py-4 text-left">Client Name</th>
                <th className="px-2 py-4 text-left">Business Name</th>
                <th className="px-2 py-4 text-left">Business Address</th>
                <th className="px-2 py-4 text-left">Order Date</th>
                <th className="px-2 py-4 text-left">Order Status</th>
                <th className="px-2 py-4 text-left">Payment Status</th>
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filteredMembers = searchQuery
                  ? findClientByName(orders, searchQuery) || []
                  : currentOrder;

                return filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((order, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                      } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b transition-colors`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{order.clientName}</td>
                      <td className="px-2 py-2">{order.businessName}</td>
                      <td className="px-2 py-2">{order.address}</td>
                      <td className="px-2 py-2">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-2 whitespace-wrap">
                        {order.orderStatus}
                      </td>
                      <td
                        className={`px-2 py-2 ${
                          order.paymentStatus === "Unpaid"
                            ? "text-red-500 font-semibold"
                            : "font-semibold"
                        }`}>
                        {order.paymentStatus}
                      </td>
                      <td className="px-4 py-2">
                        <div className="relative">
                          <HiOutlineDotsHorizontal
                            className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                            onClick={() => toggleEditMenu(order.orderId)}
                          />
                          {orderId === order.orderId && openEditMenu ? (
                            <div
                              ref={menuRef}
                              className="shadow-lg px-2 py-4 rounded-lg border absolute right-8 top-4 bg-white text-[14px] text-left grid gap-4 w-[150px] z-50">
                              <p
                                className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                                onClick={() => handleView(order.orderId)}>
                                View
                              </p>
                              <p className="cursor-pointer hover:bg-green-500 hover:text-white py-1 px-2 rounded transition-colors">
                                Edit
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-center text-gray-500 whitespace-nowrap h-40">
                      <div className="flex justify-center">
                        {isLoading ? (
                          <SpinnerLoader />
                        ) : (
                          "No Order found" || message
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {createOrderModal && (
        <div>
          <div className="fixed inset-0 z-30 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-800/80">
            <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
              <IoMdCloseCircle
                className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                onClick={() => setCreateOrderModal(false)}
              />
              <h2 className="text-lg font-bold text-gray-600 mb-4">
                Create New Order
              </h2>

              <form
                action="submit"
                onSubmit={addExistingMember}
                className="w-[100%] space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <PiIdentificationBadgeThin />
                      <label htmlFor="clientName">Business Address</label>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="clientId"
                      name="clientId"
                      required
                      placeholder="Client's Id"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          clientId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <FaRegUser />
                      <label htmlFor="clientName">Client's fullname</label>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="clientName"
                      name="clientName"
                      required
                      placeholder="Client's fullname"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          clientName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <LuBriefcaseBusiness />
                      <label htmlFor="clientName">Business name</label>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="Business Name"
                      name="Business Name"
                      required
                      placeholder="Business name"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          businessName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <MdOutlineAddHome />
                      <label htmlFor="clientName">Business Address</label>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="businessAddress"
                      name="businessAddress"
                      required
                      placeholder="Business address"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <BsCalendar2Date />
                      <label htmlFor="clientName">Order Date</label>
                    </div>
                    <input
                      type="date"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="date"
                      name="date"
                      required
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          orderDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white">
                  Create order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
