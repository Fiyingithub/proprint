import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import { useToast } from "../../../context/Loaders/ToastContext";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";

const ClientOrders = ({ clientId }) => {
  // const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } = useToast();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [addOrderModal, setAddOrderModal] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Order/GetClientById/${clientId}`
        );
        console.log("RESPONSE", response);
        setOrders(response.data.data.$values);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenEditMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
    useToast();
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
        setTrigger(true);
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

  const toggleEditMenu = (item) => {
    setOpenEditMenu(!openEditMenu);
    setOrderId(item);
  };

  // const handleView = (id) => {
  //   navigate(`/admin/client/${id}`, { state: id });
  // };

  const handleClientOrder = () => {
    setCreateOrderModal(true);
  };

  const handleAddOrder = () => {
    setAddOrderModal(true);
  };

  const handleViewOrderItem = () => {
    setViewOrderModal(true);
  };

  return (
    <div className="w-full">
      <div className="m-6 md:m-2 p-4 shadow-md rounded-md bg-white">
        <button
          onClick={handleClientOrder}
          className="bg-gray-800 px-4 py-2 text-white rounded-md"
        >
          Create client order
        </button>
      </div>

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
                      <div className="relative" onClick={handleAddOrder}>
                        <p
                          className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                          onClick={() => handleView(order.orderId)}
                        >
                          Add Order Item
                        </p>
                      </div>

                      {addOrderModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
                          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
                            <IoMdCloseCircle
                              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                              onClick={() => setAddOrderModal(false)}
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
                                    <label htmlFor="clientName">
                                      Client's fullname
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Business name
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Business Address
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Order Date
                                    </label>
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
                    </td>
                    <td className="px-4 py-2">
                      <div className="relative">
                        <p
                          className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                          onClick={handleViewOrderItem}
                        >
                          View Item
                        </p>
                      </div>
                      {viewOrderModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
                          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
                            <IoMdCloseCircle
                              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                              onClick={() => setViewOrderModal(false)}
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
                                    <label htmlFor="clientName">
                                      Client's fullname
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Business name
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Business Address
                                    </label>
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
                                    <label htmlFor="clientName">
                                      Order Date
                                    </label>
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
