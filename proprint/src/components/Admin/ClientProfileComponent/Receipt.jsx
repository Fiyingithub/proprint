import React, { useState, useEffect } from "react";
import "../../../Style/customScrollbar.css";
import assets from "../../../assets/images/assets";
import axios from "axios";

const Receipt = ({ payment, orderDetails, closeModal, handlePrint }) => {
  if (!payment) return null; // Ensure no errors if payment is undefined

  const formatPrice = (amt) =>
    amt
      ? amt
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : "0.00";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [clientProfile, setClientProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Client/GetClientById/${payment.clientId}`
        );

        setClientProfile(response.data.data.clientName);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response) {
          setMessage(error.response.data.responseMessage);
        } else {
          setMessage(`${error.message}, check your internet connection`);
        }
        setIsLoading(false);
      }
    };
    if (payment.clientId) {
      getUser();
    }
  }, [payment.clientId]);

  return (
    <div className="fixed inset-0 flex bg-black/60 items-center justify-center z-50">
      <div className="w-[80%] bg-white px-6 pt-20 pb-8 h-screen border border-gray-300 customScrollbar overflow-y-auto">
        {/* Paid Stamp */}
        <div className="text-end mb-2">
          <span className="font-bold text-2xl text-red-600">PAID</span>
        </div>

        {/* Company Information */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between mb-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center gap-4">
            <img
              className="w-[50%] md:w-1/18"
              src={assets.proPrintLogo}
              alt=""
            />
            <div className="text-left md:w-1/2">
              <h2 className="text-lg font-semibold text-yellow-500">
                proprinters agency limited
              </h2>
              <p className="text-sm text-gray-500 ">
                proprintersagencylimited@gmail.com
              </p>
              <p className="text-sm text-gray-500 ">08083124442</p>
            </div>
          </div>

          <div className="text-left md:text-right md:w-1/2">
            <p className="text-sm text-gray-500">51A Akeju Street by</p>
            <p className="text-sm text-gray-500">Dabira Street off Oguntolu</p>
            <p className="text-sm text-gray-500">Street Somolu Lagos</p>
          </div>
        </div>

        {/* Name and Signature */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">Abimbola</p>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-sm text-gray-500">Signature</p>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 font-semibold">
            Terms & Conditions
          </p>
          <p className="text-sm text-gray-500">
            Please pay within 0 Days of receiving this invoice.
          </p>
        </div>

        {/* Invoice Header */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Billed to</span>
            </p>
            <p className="text-[18px] font-medium">{clientProfile}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Invoice number</span>
            </p>
            <p className="text-sm text-gray-500">INV 0109</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Reference{"(Order Id)"}</span>
            </p>
            <p className="text-sm text-gray-500">{payment.orderId}</p>
          </div>
        </div>

        {/* INVOICE title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">INVOICE</h1>
        </div>

        {/* Payment Method and Amount */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">{payment.paymentMode}</p>
          <p className="text-lg font-bold">
            NGN {payment.amount ? formatPrice(payment.amount) : 0.0}
          </p>
        </div>

        {/* Subject and Dates */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Subject</span>
            </p>
            <p className="text-[18px] font-medium">{clientProfile}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Invoice date</span>
            </p>
            <p className="text-sm text-gray-500">
              {payment.paymentDate
                ? formatDate(payment.paymentDate)
                : "No date"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Due date</span>
            </p>
            <p className="text-sm text-gray-500">
              {payment.paymentDate
                ? formatDate(payment.paymentDate)
                : "No date"}
            </p>
          </div>
        </div>

        {/* Invoice Items Table */}
        {/* Invoice Items Table */}
        <div className="mb-4">
          <table className="w-full border-collapse border border-gray-300 text-sm text-gray-500">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-left">
                <th className="p-2">ITEM</th>
                <th className="p-2">DETAIL</th>
                <th className="p-2 text-center">QTY</th>
                <th className="p-2 text-right">RATE</th>
                <th className="p-2 text-right">AMOUNT</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">
                  {orderDetails?.orderItems[0]?.itemName !== null
                    ? orderDetails?.orderItems[0]?.itemName
                    : ""}
                </td>
                <td className="p-2">
                  {orderDetails?.orderItems[0]?.description !== null
                    ? orderDetails?.orderItems[0]?.description
                    : ""}
                </td>
                <td className="p-2 text-center">
                  {orderDetails?.orderItems[0]?.unit !== null
                    ? orderDetails?.orderItems[0]?.unit
                    : ""}
                </td>
                <td className="p-2 text-right">
                  {orderDetails?.orderItems[0]?.price !== null
                    ? orderDetails?.orderItems[0]?.price
                    : ""}
                </td>
                <td className="p-2 text-right">
                  {payment.amount ? formatPrice(payment.amount) : ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end text-sm text-gray-500 space-y-1 border-t border-gray-300 pt-2">
          <div className="flex justify-between w-1/2">
            <span>Subtotal</span>
            <span>NGN {payment.amount ? formatPrice(payment.amount) : ""}</span>
          </div>
          <div className="flex justify-between w-1/2">
            <span>Discount </span>
            <span>
              NGN{" "}
              {orderDetails?.orderItems[0]?.discount !== null
                ? formatPrice(orderDetails?.orderItems[0]?.discount)
                : 0.0}
            </span>
          </div>
          <div className="flex justify-between w-1/2">
            <span>VAT (0.00%)</span>
            <span>NGN0.00</span>
          </div>
          <div className="flex justify-between w-1/2">
            <span>Shipping Fee</span>
            <span>NGN0.00</span>
          </div>
          <div className="flex justify-between w-1/2 font-bold">
            <span>Total</span>
            <span>
              NGN{" "}
              {formatPrice(
                payment.amount - orderDetails?.orderItems[0]?.discount
              )}
            </span>
          </div>
        </div>

        {/* Buttons (Hidden on Print) */}
        <div className="flex justify-end gap-2 mt-10 no-print">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
