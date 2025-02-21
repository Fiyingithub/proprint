import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Admin
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import Clients from "./components/Admin/Client/Clients";
import Orders from "./components/Admin/Order/Orders";
import ClientProfile from "./components/Admin/Client/ClientProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clients" element={<Clients />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/client/:id" element={<ClientProfile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
