import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { useToast } from "../../Loaders/ToastContext";

import AdminEditMemberProfile from "../ClientProfileComponent/Admin_EditClientProfile";
import ClientOrders from "../ClientProfileComponent/ClientOrders";

import { FaRegEdit } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

function ClientProfile() {
  const location = useLocation();
  // console.log(location.state);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [activeTab, setActiveTab] = useState("Profile");
  const tabs = [
    {
      id: 1,
      label: "Profile",
      value: <AdminEditMemberProfile clientId={location.state} />,
      icon: <FaRegEdit />,
    },
    {
      id: 2,
      label: "Orders",
      value: <ClientOrders clientId={location.state} />,
      icon: <GiTakeMyMoney />,
    },
    
  ];

  return (
    <div className="bg-gray-100">
      <div className="w-full">
        <div className="lg:px-4 flex flex-col lg:flex-row mt-5">
          {/* SidTab */}
          <div className="bg-white w-full flex lg:flex-col lg:space-y-4 lg:w-48 p-4 rounded-lg lg:h-screen sticky top-0 mb-6 z-40">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.label)}
                className={`flex flex-col lg:flex-row items-center space-x-2 lg:space-x-2 px-2 lg:px-4 py-2 rounded-lg hover:bg-gray-200 ${
                  activeTab === tab.label
                    ? "bg-blue-50 border border-primary"
                    : ""
                }`}>
                <span className="lg:p-2 bg-blue-100 rounded-full text-primary">
                  {tab.icon}
                </span>
                <span className="text-primary">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 px-4">
            {tabs.map((content) => (
              <div key={content.id}>
                {content.label === activeTab && <div>{content.value}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
