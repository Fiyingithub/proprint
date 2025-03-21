import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import Receipt from "./Receipt";

const Payment = ({ clientId }) => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [receiptModal, setReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details

  const formatAmount = (amt) =>
    amt ? amt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";

  useEffect(() => {
    const fetchClient = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Payment/GetPaymentByClientId/${clientId}`
        );

        // Extract payments from the response
        const paymentData = Array.isArray(
          response.data.data?.payments.payments?.$values
        )
          ? response.data.data.payments.payments.$values
          : [];
        setPayments(paymentData);
        setIsLoading(false);
      } catch (error) {
        setMessage(
          error.response?.data?.responseMessage || "An error occurred"
        );
        setIsLoading(false);
      }
    };
    if (clientId) fetchClient();
  }, [clientId]);

  const handleReceiptModal = async (payment) => {
    setSelectedPayment(payment);
    if (payment.orderId) {
      await fetchOrderDetails(payment.orderId); // Fetch order details for the selected payment
    } else {
      console.error("Order ID is null or undefined");
    }
    setReceiptModal(true);
  };
  
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `https://proprints.tranquility.org.ng/api/Order/GetOrderItems/${orderId}`
      );

      const orderItems = Array.isArray(
        response.data.data?.order?.orderItems?.$values
      )
        ? response.data.data.order.orderItems.$values
        : [];
      const totalAmount = orderItems.reduce(
        (total, item) => total + (item.price || 0),
        0
      );
      setOrderDetails({ orderItems, totalAmount });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setOrderDetails(null);
    setReceiptModal(false);
  };

  return (
    <div className="w-full">
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

      {/* Payments Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Payments</h2>
        <div className="overflow-x-auto p-1 pb-24">
          <table className="min-w-full table-auto rounded-lg shadow-md text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-800/80 text-white rounded-t-lg">
                <th className="px-4 py-4 text-left">S/N</th>
                <th className="px-2 py-4 text-left">Amount</th>
                <th className="px-2 py-4 text-left">Payment Date</th>
                <th className="px-2 py-4 text-left">Payment Mode</th>
                <th className="px-2 py-4 text-left">Description</th>
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                    } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b transition-colors`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      ₦ {payment.amount ? formatAmount(payment.amount) : 0}
                    </td>
                    <td className="px-2 py-2">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2">{payment.paymentMode}</td>
                    <td className="px-2 py-2">{payment.paymentDescription}</td>
                    <td className="px-2 py-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleReceiptModal(payment)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-2 text-center text-gray-500 whitespace-nowrap h-40"
                  >
                    <div className="flex justify-center">
                      {isLoading ? (
                        <SpinnerLoader />
                      ) : (
                        message || "No Payments found"
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {receiptModal && (
            <Receipt
            payment={selectedPayment}
            orderDetails={orderDetails}
            closeModal={closeModal}
            handlePrint={handlePrint}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;