import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../../context/Loaders/ToastContext";
import axios from "axios";

import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";

const CreateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
    useToast();
  const [clientData, setClientData] = useState({
    clientName: "",
    businessName: "",
    address: "",
    orderDate: "",
    clientId: id,
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
        navigate("/admin/orders");
      }
      stopWaitingLoader();
    } catch (error) {
      console.error(error);
      if (error) {
        notifyError(error.response.data.responseMessage || "An error occurred");
        navigate("/admin/clients");
      }
      stopWaitingLoader();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/admin/clients");
  };

  return (
    <div>
      <div className="fixed inset-0 z-30 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-800/90">
        <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
          <IoMdCloseCircle
            className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
            onClick={handleCancel}
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
            className="w-[100%] space-y-4 mt-10">
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
              className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white">
              Create order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
