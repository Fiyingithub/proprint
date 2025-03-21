// import React, { useState } from "react";

// const Receipt = ({ payment, orderDetails, closeModal, handlePrint }) => {
//   if (!payment) return null; // Ensure no errors if payment is undefined

//   const [receiptData, setReceiptData] = useState({
//     receiptNumber: '00012345',
//     date: 'March 21, 2025',
//     cashier: 'John D.',
//     register: '#3',
//     customer: 'Jane Smith',
//     accountNumber: 'CUS-789456',
//     items: [
//       { name: 'Premium Widget', quantity: 2, price: 29.99 },
//       { name: 'Standard Gadget', quantity: 1, price: 24.99 },
//       { name: 'Deluxe Service Package', quantity: 1, price: 79.95 }
//     ],
//     taxRate: 0.0825, // 8.25%
//     paymentMethod: 'Credit Card'
//   });

//   // Calculate subtotal
//   const subtotal = receiptData.items.reduce((total, item) =>
//     total + (item.price * item.quantity), 0);

//   // Calculate tax
//   const tax = subtotal * receiptData.taxRate;

//   // Calculate total
//   const total = subtotal + tax;

//   return (
//     <div className="fixed inset-0 flex bg-black/60 items-center justify-center z-50">
//       <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
//       {/* Logo */}
//       <div className="text-center mb-4">
//         <img
//           src="/api/placeholder/200/80"
//           alt="Company Logo"
//           className="mx-auto"
//         />
//       </div>

//       {/* Company Info */}
//       <div className="text-center mb-6">
//         <h2 className="text-xl font-bold">ACME COMPANY</h2>
//         <p className="text-sm text-gray-500">
//           123 Business Street, Suite 100<br />
//           Cityville, ST 12345<br />
//           Phone: (555) 123-4567<br />
//           Email: sales@acmecompany.com
//         </p>
//       </div>

//       {/* Receipt Header */}
//       <div className="flex justify-between border-b pb-3 mb-4">
//         <div>
//           <p><span className="font-bold">Receipt #:</span> {receiptData.receiptNumber}</p>
//           <p><span className="font-bold">Date:</span> {receiptData.date}</p>
//         </div>
//         <div>
//           <p><span className="font-bold">Cashier:</span> {receiptData.cashier}</p>
//           <p><span className="font-bold">Register:</span> {receiptData.register}</p>
//         </div>
//       </div>

//       {/* Customer Info */}
//       <div className="mb-4">
//         <p><span className="font-bold">Customer:</span> {receiptData.customer}</p>
//         <p><span className="font-bold">Account #:</span> {receiptData.accountNumber}</p>
//       </div>

//       {/* Items */}
//       <div className="mb-6">
//         <h3 className="font-bold mb-2">Items Purchased</h3>
//         {receiptData.items.map((item, index) => (
//           <div key={index} className="flex justify-between mb-1">
//             <span>
//               {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
//             </span>
//             <span>${(item.price * item.quantity).toFixed(2)}</span>
//           </div>
//         ))}
//       </div>

//       {/* Totals */}
//       <div className="border-t pt-3">
//         <div className="flex justify-between mb-1">
//           <span>Subtotal:</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between mb-1">
//           <span>Tax ({(receiptData.taxRate * 100).toFixed(2)}%):</span>
//           <span>${tax.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between font-bold border-t border-b py-1 my-2">
//           <span>TOTAL:</span>
//           <span>${total.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Payment Method:</span>
//           <span>{receiptData.paymentMethod}</span>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="text-center mt-6 text-sm text-gray-500 text-gray-600">
//         <p>Thank you for your business!</p>
//         <p className="mt-1">Return Policy: Items can be returned within 30 days with original receipt.</p>
//         <p className="mt-1">www.acmecompany.com</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Receipt;

import React from "react";
import "../../../Style/customScrollbar.css";
import assets from "../../../assets/images/assets";

const Receipt = ({ payment, orderDetails, closeModal, handlePrint }) => {
  if (!payment) return null; // Ensure no errors if payment is undefined

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
            <img className="w-[50%] md:w-1/18" src={assets.proPrintLogo} alt="" />
          <div className="text-left md:w-1/2">
          <h2 className="text-lg font-semibold text-yellow-500">proprinters agency limited</h2>
          <p className="text-sm text-gray-500 ">proprintersagencylimited@gmail.com</p>
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
          <p className="text-sm text-gray-500 font-semibold">Terms & Conditions</p>
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
            <p className="text-sm text-gray-500">Abimbola</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Invoice number</span>
            </p>
            <p className="text-sm text-gray-500">INV 0109</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Reference</span>
            </p>
            <p className="text-sm text-gray-500">0109</p>
          </div>
        </div>

        {/* INVOICE title */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">INVOICE</h1>
        </div>

        {/* Payment Method and Amount */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">bank_transfer</p>
          <p className="text-lg font-bold">NGN15,400.00</p>
        </div>

        {/* Subject and Dates */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Subject</span>
            </p>
            <p className="text-sm text-gray-500">Abimbola</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Invoice date</span>
            </p>
            <p className="text-sm text-gray-500">20 Mar 2025</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Due date</span>
            </p>
            <p className="text-sm text-gray-500">20 Mar 2025</p>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="mb-4">
          <div className="grid grid-cols-4 font-semibold text-sm text-gray-500 border-b border-gray-300 pb-1 mb-2">
            <div className="col-span-1">ITEM</div>
            <div className="col-span-1">DETAIL</div>
            <div className="text-center">QTY</div>
            <div className="text-right">RATE</div>
            <div className="text-right">AMOUNT</div>
          </div>

          <div className="grid grid-cols-5 text-sm text-gray-500 py-2">
            <div className="col-span-1">A2 Borderless Print</div>
            <div className="col-span-1">A2 Borderless Print</div>
            <div className="text-center">7</div>
            <div className="text-right">NGN2200.0</div>
            <div className="text-right">NGN15,400.00</div>
          </div>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end text-sm text-gray-500 space-y-1 border-t border-gray-300 pt-2">
          <div className="flex justify-between w-1/2">
            <span>Subtotal</span>
            <span>NGN15,400.00</span>
          </div>
          <div className="flex justify-between w-1/2">
            <span>Discount (0.00%)</span>
            <span>NGN0.00</span>
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
            <span>NGN15,400.00</span>
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
