import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import ProgressChart from "../DashboardComponents/ProgressChart";
import StudentOverview from "../DashboardComponents/StudentOverview";
import NavbarDashboard from "../NavbarDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../../../context/Loaders/ToastContext";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

// Extracted OrderItemsModal Component
const OrderItemsModal = ({ orderId, onClose }) => {
  const [viewItems, setViewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Order/GetOrderItems/${orderId}`
        );
        const itemsData = Array.isArray(response.data.data?.order?.orderItems?.$values)
          ? response.data.data.order.orderItems.$values
          : [];
        setViewItems(itemsData);
      } catch (error) {
        console.error(error);
        setViewItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderItems();
    }
  }, [orderId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
      <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg min-h-96 w-full lg:w-1/2 relative">
        <IoMdCloseCircle
          className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-lg font-bold text-gray-800 mb-2">Order Items</h2>
        <p className="text-[16px] text-gray-500 mb-2">Below are the items for this order.</p>

        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto rounded-lg shadow-md text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                  <th className="px-4 py-2 text-left">Item Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Unit</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {viewItems.length > 0 ? (
                  viewItems.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-blue-50" : "bg-green-50"}
                    >
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">{item.description}</td>
                      <td className="px-4 py-2">{item.unit}</td>
                      <td className="px-4 py-2">{item.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const Orders = () => {
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
    useToast();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [openEditMenuId, setOpenEditMenuId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [ordersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://proprints.tranquility.org.ng/api/Order/GetAllOrders"
        );
        setOrders(response.data.$values);
      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.responseMessage || "An error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle click outside the edit menu
  const handleClickOutside = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenEditMenuId(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Toggle edit menu for a specific row
  const toggleEditMenu = (orderId) => {
    setOpenEditMenuId((prevId) => (prevId === orderId ? null : orderId));
  };

  // Handle search functionality
  const findOrderByClientName = useMemo(() => {
    if (!searchQuery) return orders;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return orders.filter((order) =>
      order.clientName.toLowerCase().includes(lowerCaseQuery)
    );
  }, [orders, searchQuery]);

  // Pagination logic
  const iLastOrder = currentPage * ordersPerPage;
  const iFirstOrder = iLastOrder - ordersPerPage;
  const currentOrder = findOrderByClientName.slice(iFirstOrder, iLastOrder);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(findOrderByClientName.length / ordersPerPage); i++) {
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
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search order by client's name"
                    className="border border-gray-300 focus:border-primary outline-none rounded-md px-4 py-2 w-full sm:w-auto lg:w-[350px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
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
                    }`}
                  >
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
                    }`}
                  >
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
              {currentOrder.length > 0 ? (
                currentOrder.map((order, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                    } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b transition-colors`}
                  >
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
                      }`}
                    >
                      {order.paymentStatus}
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <HiOutlineDotsHorizontal
                          className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                          onClick={() => toggleEditMenu(order.orderId)}
                        />
                        {openEditMenuId === order.orderId && (
                          <div
                            ref={menuRef}
                            className="shadow-lg px-2 py-2 rounded-lg border absolute right-8 top-4 bg-white text-[14px] text-left grid gap-4 w-[150px] z-50"
                          >
                            <p
                              className="cursor-pointer hover:bg-blue-500 hover:text-white py-2 px-2 rounded transition-colors"
                              onClick={() => {
                                setOrderId(order.orderId);
                                setViewOrderModal(true);
                              }}
                            >
                              View order Items
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-4 py-2 text-center text-gray-500 whitespace-nowrap h-40"
                  >
                    <div className="flex justify-center">
                      {isLoading ? <SpinnerLoader /> : message || "No Order found"}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewOrderModal && (
        <OrderItemsModal
          orderId={orderId}
          onClose={() => setViewOrderModal(false)}
        />
      )}
    </div>
  );
};

export default Orders;