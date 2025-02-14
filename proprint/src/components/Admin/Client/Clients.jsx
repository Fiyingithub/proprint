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
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { MdOutlineLocalPhone } from "react-icons/md";



const Clients = () => {
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

  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://proprints.tranquility.org.ng/api/Client/GetAllClients"
        );
        setClients(response.data.$values);
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
  const [clientId, setClientId] = useState(null);

  const toggleEditMenu = (item) => {
    setOpenEditMenu(!openEditMenu);
    setClientId(item);
  };

  const handleView = (id) => {
    navigate(`/admin/client/${id}`, { state: id });
  };

  const findClientByName = (clients, searchQuery) => {
    if (!searchQuery) return;
    const lowerCaseQuery = searchQuery.toLowerCase();

    const result = clients.filter((client) =>
      client.clientName.toLowerCase().includes(lowerCaseQuery)
    );
    return result || null;
  };

  const [addClientModal, setAddClientModal] = useState(false);
  const [clientData, setClientData] = useState({
    clientName: "",
    businessName: "",
    businessAddress: "",
    email: "",
    phone: "",
  });
  const addExistingMember = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post(
        "https://proprints.tranquility.org.ng/api/Client/CreateClient",
        clientData
      );
      notifySuccess(res.responseMessage);
      console.log(res);
      stopWaitingLoader();
      setAddClientModal(false);
      setTrigger(true);
    } catch (error) {
      console.error(error);
      notifyError(error.response.data.responseMessage || "An error occurred");
      stopWaitingLoader();
    }
  };

  const [clientsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const iLastClient = currentPage * clientsPerPage;
  const iFirstClient = iLastClient - clientsPerPage;
  const currentClient = clients.slice(iFirstClient, iLastClient);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(clients.length / clientsPerPage); i++) {
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
            <h2 className="text-2xl font-medium mb-4 text-start">Clients</h2>

            <div className="gap-8 flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
              <button
                className="bg-gray-800 text-white hover:bg-gray-800/85 transition-all duration-300 px-4 py-2 rounded w-[150px] md:w-full"
                onClick={() => setAddClientModal(true)}>
                Add New Client
              </button>

              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search by client's name"
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

        <div className="overflow-x-auto p-1 pb-24">
          <table className="min-w-full table-auto  rounded-lg shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                <th className="px-4 py-4 text-left">S/N</th>
                <th className="px-2 py-4 text-left">Client Name</th>
                <th className="px-2 py-4 text-left">Business Name</th>
                <th className="px-2 py-4 text-left">Business Address</th>
                <th className="px-2 py-4 text-left">Email</th>
                <th className="px-2 py-4 text-left">Phone</th>
                {/* <th className="px-2 py-4 text-left">Orders</th> */}
                {/* <th className="px-2 py-4 text-left">Payments</th> */}
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Decide which dataset to display: foundMembers or all clients
                const filteredMembers = searchQuery
                  ? findClientByName(clients, searchQuery) || []
                  : currentClient;

                return filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((client, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                      } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b text-sm text-gray-700 transition-colors`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className=" px-4 py-2">{client.clientName}</td>
                      <td className="px-2 py-2">{client.businessName}</td>
                      <td className="px-2 py-2">{client.businessAddress}</td>
                      <td className="px-2 py-2">{client.email}</td>
                      <td className="px-2 py-2 whitespace-wrap">
                        {client.phone}
                      </td>
                      {/* <td className="px-2 py-2">{client.orders === null ? 0 : client.orders}</td> */}
                      {/* <td className="px-2 py-2">{client.payments === null ? 0 : client.payments}</td> */}
                      <td className="px-4 py-2">
                        <div className="relative">
                          <HiOutlineDotsHorizontal
                            className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                            onClick={() => toggleEditMenu(client.clientId)}
                          />
                          {clientId === client.clientId && openEditMenu ? (
                            <div
                              ref={menuRef}
                              className="shadow-lg px-2 py-4 rounded-lg border absolute right-8 top-4 bg-white text-[14px] text-left grid gap-4 w-[150px] z-50">
                              <p
                                className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                                onClick={() => handleView(client.clientId)}>
                                View
                              </p>
                              <p className="cursor-pointer hover:bg-green-500 hover:text-white py-1 px-2 rounded transition-colors">
                                Edit
                              </p>
                              {/* <p className="cursor-pointer hover:bg-red-500 hover:text-white py-1 px-2 rounded transition-colors">
                                Delete
                              </p> */}
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
                          "No clients found" || message
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

      {addClientModal && (
        <div>
          <div className="fixed inset-0 z-30 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-800/80">
            <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
              <IoMdCloseCircle
                className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                onClick={() => setAddClientModal(false)}
              />
              <h2 className="text-lg font-bold text-gray-600 mb-4">
                Add New Clients
              </h2>
              <form
                action="submit"
                onSubmit={addExistingMember}
                className="w-[100%] space-y-4">
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
                          businessAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <AiOutlineMail />
                      <label htmlFor="clientName">Email Address</label>
                    </div>
                    <input
                      type="email"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <MdOutlineLocalPhone />
                      <label htmlFor="clientName">Phone number</label>
                    </div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="PhoneNumber"
                      name="PhoneNumber"
                      required
                      placeholder="Phone number"
                      onChange={(e) =>
                        setClientData({
                          ...clientData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 rounded lg text-white">
                  Add Client
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
