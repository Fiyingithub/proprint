import React from 'react';
import { Search, MessageSquare, Bell, Settings } from 'lucide-react';
import {Link} from 'react-router-dom';

const NavbarDashboard = () => {
  const navItems = [
    { name: 'Dashboard', href: '#', active: true },
    { name: 'Clients', href: '#', active: false },
    { name: 'Inventory', href: '#', active: false },
    { name: 'Product', href: '#', active: false },
    { name: 'Order', href: '#', active: false },
    { name: 'Staffs', href: '#', active: false },
    { name: 'Payments', href: '#', active: false },
  ];

  return (
    <nav className="bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-12">
          <Link to="#" className="text-white font-bold text-xl">
            Pro-prints
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm ${
                  item.active 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-gray-200'
                } transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
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