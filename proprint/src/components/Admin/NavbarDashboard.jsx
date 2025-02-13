import React from "react";
import { Search, MessageSquare, Bell, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavbarDashboard = () => {
  const location = useLocation();
  const navItems = [
    { name: "Dashboard", navigationLink: "/admin/dashboard" },
    { name: "Clients", navigationLink: "/admin/clients" },
    { name: "Inventory", navigationLink: "#" },
    { name: "Product", navigationLink: "#" },
    { name: "Orders", navigationLink: "/admin/orders" },
    { name: "Staffs", navigationLink: "#" },
    { name: "Payments", navigationLink: "#" },
  ];

  return (
    <nav className="bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10 lg:gap-12">
          <Link to="#" className="text-white font-bold text-xl">
            Pro-prints
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.navigationLink;
              return (
                <Link
                  key={index}
                  to={item.navigationLink}
                  className={`text-sm ${
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-gray-200"
                  } transition-colors`}>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
