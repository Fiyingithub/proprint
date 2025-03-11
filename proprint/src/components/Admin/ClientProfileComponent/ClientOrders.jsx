import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import { useToast } from "../../../context/Loaders/ToastContext";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";

const ClientOrders = ({ clientId }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [addOrderItem, setAddOrderItem] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [viewItems, setViewItems] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false); // Payment modal state
  const [paymentData, setPaymentData] = useState({
    paymentMode: "",
    amount: 0,
    paymentDate: "",
    paymentDescription: "",
    orderId: orderId,
    clientId: clientId,
  });



  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
    useToast();

  // Fetch client orders
  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Order/GetClientById/${clientId}`
        );
        const ordersData = Array.isArray(response.data.data?.$values)
          ? response.data.data.$values
          : [];
        setOrders(ordersData);
        setIsLoading(false);
      } catch (error) {
        setMessage(
          error.response?.data?.responseMessage || "An error occurred"
        );
        setIsLoading(false);
      }
    };
    if (clientId) fetchClient();
  }, [clientId, trigger]);

  const [clientData, setClientData] = useState({
    clientName: "",
    businessName: "",
    address: "",
    orderDate: "",
    clientId: clientId,
  });

  const addExistingMember = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post(
        "https://proprints.tranquility.org.ng/api/Order/CreateOrder",
        clientData
      );
      if (res.status === 200) {
        notifySuccess("Order Created Successfully");
        setCreateOrderModal(false);
        setTrigger((prev) => !prev); // Toggle trigger to refetch orders
      }
      stopWaitingLoader();
    } catch (error) {
      console.error(error);
      if (error) {
        notifyError(error.response.data.responseMessage || "An error occurred");
      }
      stopWaitingLoader();
    }
  };

  const [orderItems, setOrderItems] = useState({
    itemName: "",
    description: "",
    unit: "",
    price: "",
    orderId: orderId,
  });

  // Update orderItems when orderId changes
  useEffect(() => {
    setOrderItems((prev) => ({
      ...prev,
      orderId: orderId,
    }));
  }, [orderId]);

  const addOrderItemHandler = async (e) => {
    e.preventDefault();
    startWaitingLoader();


    try {
      const res = await axios.post(
        "https://proprints.tranquility.org.ng/api/Order/AddOrderItem",
        orderItems
      );
      if (res.data.status === true) {
        notifySuccess(res.data.responseMessage);
        setAddOrderItem(false);
        setTrigger((prev) => !prev); // Toggle trigger to refetch orders
      }
      stopWaitingLoader();
    } catch (error) {
      console.error(error);
      if (error) {
        notifyError(error.response.data.responseMessage || "An error occurred");
      }
      stopWaitingLoader();
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post(
        "https://proprints.tranquility.org.ng/api/Payment/MakePayment",
        paymentData
      );

      console.log("PAYMENT RES",res)
      if (res) {
        notifySuccess("Payment Successful");
        setPaymentModal(false);
        setTrigger((prev) => !prev); // Refresh data
      }
      stopWaitingLoader();
    } catch (error) {
      console.error(error);
      notifyError(error.response?.data?.responseMessage || "Payment Failed");
      stopWaitingLoader();
    }
  };

  // Open payment modal and set orderId
  const handlePaymentModal = (orderId) => {
    setPaymentData((prev) => ({
      ...prev,
      orderId: orderId,
      amount: totalPrice, // Set amount to the total price of the order
    }));
    setViewOrderModal(false)
    setPaymentModal(true);
  };

  // Format price
  const formatPrice = (amt) =>
    amt
      ? amt
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0.00";

  // Fetch order items for viewing
  useEffect(() => {
    const viewOrderItem = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Order/GetOrderItems/${orderId}`
        );
        const itemsData = Array.isArray(
          response.data.data?.order?.orderItems?.$values
        )
          ? response.data.data.order.orderItems.$values
          : [];
        setViewItems(itemsData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setMessage(
          error.response?.data?.responseMessage || "An error occurred"
        );
        setViewItems([]); // Set to empty array on error
        setIsLoading(false);
      }
    };

    if (orderId) {
      viewOrderItem(); // Fetch items when orderId changes
    }
  }, [orderId, trigger]);

  const handleAddOrderItem = (orderId) => {
    setAddOrderItem(true);
    setOrderId(orderId);
  };

  const handleClientOrder = () => {
    setCreateOrderModal(true);
  };

  const handleViewOrderItem = (orderId) => {
    setOrderId(orderId);
    setViewOrderModal(true);
  };

  const totalPrice = viewItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  return (
    <div className="w-full">
      {/* Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg min-h-96 w-full lg:w-1/2 relative">
            <IoMdCloseCircle
              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
              onClick={() => setPaymentModal(false)}
            />
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Make Payment
            </h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="paymentMode">Payment Mode</label>
                  <select
                    id="paymentMode"
                    name="paymentMode"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentMode: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    readOnly
                    value={paymentData.amount}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        amount: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="paymentDate">Payment Date</label>
                  <input
                    type="date"
                    id="paymentDate"
                    name="paymentDate"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    value={paymentData.paymentDate}
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="paymentDescription">Description</label>
                  <input
                    type="text"
                    id="paymentDescription"
                    name="paymentDescription"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    placeholder="Payment description"
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        paymentDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white w-full"
              >
                Submit Payment
              </button>
            </form>
          </div>
        </div>
      )}

      <div>
        <button className="px-8 py-2 bg-gray-800/80 rounded-md mt-4">
          <Link to="/admin/clients">
            <div className="flex items-center gap-1 text-sm text-white hover:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <span>Back</span>
            </div>
          </Link>
        </button>
      </div>
      <div className="m-6 md:m-0 md:mt-4 p-4 shadow-md rounded-md bg-white">
        <button
          onClick={handleClientOrder}
          className="bg-gray-800 px-4 py-2 text-white rounded-md cursor-pointer"
        >
          Create client order
        </button>
      </div>

      {/* Create Order Modal */}
      {createOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
            <IoMdCloseCircle
              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
              onClick={() => setCreateOrderModal(false)}
            />
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Create New Order
            </h2>
            <p className="text-[16px] text-gray-500">
              Kindly ensure you input the correct details.
            </p>
            <form
              action="submit"
              onSubmit={addExistingMember}
              className="w-[100%] space-y-4 mt-10"
            >
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
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
                className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white"
              >
                Create order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Client Orders Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Client Orders</h2>
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
                <th className="px-2 py-4 text-left">Order Item</th>
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
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
                    <td className="px-4 py-2">
                      <div className="relative">
                        <p
                          className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                          onClick={() => handleAddOrderItem(order.orderId)}
                        >
                          Add Order Item
                        </p>
                      </div>

                      {addOrderItem && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
                          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
                            <IoMdCloseCircle
                              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                              onClick={() => setAddOrderItem(false)}
                            />
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                              Add Order Item
                            </h2>
                            <form
                              action="submit"
                              onSubmit={addOrderItemHandler}
                              className="w-[100%] space-y-4 mt-10"
                            >
                              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-1">
                                    <FaRegUser />
                                    <label htmlFor="itemName">Item name</label>
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                                    id="itemName"
                                    name="itemName"
                                    required
                                    placeholder="Item name"
                                    onChange={(e) =>
                                      setOrderItems({
                                        ...orderItems,
                                        itemName: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-1">
                                    <LuBriefcaseBusiness />
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                                    id="description"
                                    name="description"
                                    required
                                    placeholder="description"
                                    onChange={(e) =>
                                      setOrderItems({
                                        ...orderItems,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-1">
                                    <MdOutlineAddHome />
                                    <label htmlFor="unit">Unit</label>
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                                    id="unit"
                                    name="unit"
                                    required
                                    placeholder="Unit"
                                    onChange={(e) =>
                                      setOrderItems({
                                        ...orderItems,
                                        unit: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-1">
                                    <BsCalendar2Date />
                                    <label htmlFor="price">Price</label>
                                  </div>
                                  <input
                                    type="text"
                                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                                    id="price"
                                    name="price"
                                    required
                                    onChange={(e) =>
                                      setOrderItems({
                                        ...orderItems,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white"
                              >
                                Add Item
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <p
                          className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                          onClick={() => handleViewOrderItem(order.orderId)}
                        >
                          View Item
                        </p>
                      </div>

                      {/* View Order Items Modal */}
                      {viewOrderModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/15">
                          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 min-h-96 relative">
                            <IoMdCloseCircle
                              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                              onClick={() => setViewOrderModal(false)}
                            />
                            <h2 className="text-lg font-bold text-gray-800 mb-2">
                              Order Items
                            </h2>
                            <p className="text-[16px] text-gray-500 mb-2">
                              Below are the items for this order.
                            </p>

                            {/* Display Order Items in a Table */}
                            <div className="overflow-x-auto">
                              <table className="min-w-full table-auto rounded-lg shadow-md text-sm">
                                <thead>
                                  <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                                    <th className="px-4 py-2 text-left">
                                      Item Name
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Description
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Unit
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Price
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {viewItems.length > 0 ? (
                                    viewItems.map((item, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          index % 2 === 0
                                            ? "bg-blue-50"
                                            : "bg-green-50"
                                        }
                                      >
                                        <td className="px-4 py-2">
                                          {item.itemName}
                                        </td>
                                        <td className="px-4 py-2">
                                          {item.description}
                                        </td>
                                        <td className="px-4 py-2">
                                          {item.unit}
                                        </td>
                                        <td className="px-4 py-2">
                                          {item.price
                                            ? formatPrice(item.price)
                                            : 0}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan="4"
                                        className="px-4 py-2 text-center text-gray-500"
                                      >
                                        No items found.
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div className="flex justify-end gap-4 items-center my-6">
                              <h1 className="text-md ">Total Amount {"="}</h1>
                              <p className="text-md font-semibold">
                                ₦ {totalPrice ? formatPrice(totalPrice) : 0.0}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                className="px-4 py-2 cursor-pointer bg-gray-800 rounded-lg mt-4 text-white"
                                onClick={() => handlePaymentModal(order.orderId)} // Open payment modal
                              >
                                Make Payment
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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
                      {isLoading ? (
                        <SpinnerLoader />
                      ) : (
                        message || "No Order found"
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientOrders;