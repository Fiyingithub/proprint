import React, { useEffect, useState, useRef } from "react";
import ProgressChart from "../DashboardComponents/ProgressChart";
import StudentOverview from "../DashboardComponents/StudentOverview";
import NavbarDashboard from "../NavbarDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";


const AdminPayment = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState({}); // Store client data by clientId
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all payments
  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://proprints.tranquility.org.ng/api/Payment/GetAllPayments"
        );
        const paymentData = Array.isArray(response.data?.$values)
          ? response.data.$values
          : [];
        setPayments(paymentData);

        // Fetch client data for each payment
        const clientIds = paymentData.map((payment) => payment.clientId);
        const uniqueClientIds = [...new Set(clientIds)]; // Remove duplicates
        await fetchClients(uniqueClientIds);

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
    fetchPayments();
  }, []);

  // Fetch client data for each unique clientId
  const fetchClients = async (clientIds) => {
    try {
      const clientData = {};
      for (const clientId of clientIds) {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Client/GetClientById/${clientId}`
        );
        clientData[clientId] = response.data.data; // Store client data by clientId
      }
      setClients(clientData);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  // Search payments by client name, business name, or payment description
  const findPaymentByQuery = (payments, searchQuery, clients) => {
    if (!searchQuery) return payments;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return payments.filter((payment) => {
      const client = clients[payment.clientId];
      return (
        client?.clientName?.toLowerCase().includes(lowerCaseQuery) ||
        client?.businessName?.toLowerCase().includes(lowerCaseQuery) ||
        payment.paymentDescription?.toLowerCase().includes(lowerCaseQuery) ||
        payment.paymentMode?.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  // Pagination
  const [paymentsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / paymentsPerPage); i++) {
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

      <div className="container mb-10 mx-auto p-2 lg:p-0">
        <div className="">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
            <h2 className="text-2xl font-medium mb-4 text-start">Payments</h2>

            <div className="gap-8 flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search by client, business, or description"
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
          <table className="min-w-full table-auto rounded-lg shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                <th className="px-4 py-4 text-left">S/N</th>
                <th className="px-2 py-4 text-left">Client Name</th>
                <th className="px-2 py-4 text-left">Business Name</th>
                <th className="px-2 py-4 text-left">Email</th>
                <th className="px-2 py-4 text-left">Payment Mode</th>
                <th className="px-2 py-4 text-left">Amount</th>
                <th className="px-2 py-4 text-left">Payment Date</th>
                <th className="px-2 py-4 text-left">Description</th>
                {/* <th className="px-2 py-4 text-left">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Decide which dataset to display: filtered payments or all payments
                const filteredPayments = searchQuery
                  ? findPaymentByQuery(payments, searchQuery, clients)
                  : currentPayments;

                return filteredPayments && filteredPayments.length > 0 ? (
                  filteredPayments.map((payment, index) => {
                    const client = clients[payment.clientId];
                    return (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                        } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b text-sm text-gray-700 transition-colors`}>
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{client?.clientName || "N/A"}</td>
                        <td className="px-2 py-2">{client?.businessName || "N/A"}</td>
                        <td className="px-2 py-2">{client?.email || "N/A"}</td>
                        <td className="px-2 py-2">{payment.paymentMode}</td>
                        <td className="px-2 py-2">{payment.amount}</td>
                        <td className="px-2 py-2">
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-2">{payment.paymentDescription}</td>
                        {/* <td className="px-4 py-2">
                          <div className="relative">
                            <HiOutlineDotsHorizontal
                              className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                              onClick={() => {
                                // Handle action for payment (e.g., view details)
                              }}
                            />
                          </div>
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-2 text-center text-gray-500 whitespace-nowrap h-40">
                      <div className="flex justify-center">
                        {isLoading ? (
                          <SpinnerLoader />
                        ) : (
                          "No payments found" || message
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
    </div>
  );
};

export default AdminPayment;