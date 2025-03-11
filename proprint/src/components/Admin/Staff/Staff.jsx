import React, { useEffect, useState, useRef } from "react";
import ProgressChart from "../DashboardComponents/ProgressChart";
import StudentOverview from "../DashboardComponents/StudentOverview";
import NavbarDashboard from "../NavbarDashboard";
import axios from "axios";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Staff = () => {
  const menuRef = useRef(null);

  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [addStaffModal, setAddStaffModal] = useState(false); // State for add staff modal
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  // Fetch all staff
  useEffect(() => {
    const fetchStaff = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://proprints.tranquility.org.ng/api/Staff/GetAllStaff"
        );
        const staffData = Array.isArray(response.data?.$values)
          ? response.data.$values
          : [];
        setStaff(staffData);
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
    fetchStaff();
  }, []);

  // Search staff by name, email, or role
  const findStaffByQuery = (staff, searchQuery) => {
    if (!searchQuery) return staff;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return staff.filter(
      (staffMember) =>
        staffMember.name?.toLowerCase().includes(lowerCaseQuery) ||
        staffMember.email?.toLowerCase().includes(lowerCaseQuery) ||
        staffMember.role?.toLowerCase().includes(lowerCaseQuery)
    );
  };

  // Pagination
  const [staffPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(staff.length / staffPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle adding new staff
  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://proprints.tranquility.org.ng/api/Staff/CreateStaff",
        newStaff
      );
      if (response.status === 200) {
        setStaff([...staff, response.data.data]); // Add new staff to the list
        setAddStaffModal(false); // Close the modal
        setNewStaff({ name: "", email: "", role: "", phone: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

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
            <h2 className="text-2xl font-medium mb-4 text-start">Staff</h2>

            <div className="gap-8 flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search by name, email, or role"
                    className="border border-gray-300 focus:border-primary outline-none rounded-md px-4 py-2 w-full sm:w-auto lg:w-[350px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-gray-800 text-white hover:bg-gray-800/85 transition-all duration-300 px-4 py-2 rounded w-[150px] md:w-[100px]">
                    Search
                  </button>
                </div>

                {/* Add Staff Button */}
                <button
                  onClick={() => setAddStaffModal(true)}
                  className="bg-gray-800 text-white hover:bg-gray-800/85 transition-all duration-300 px-4 py-2 rounded w-[150px] md:w-[100px]">
                  Add Staff
                </button>

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
                <th className="px-2 py-4 text-left">Name</th>
                <th className="px-2 py-4 text-left">Email</th>
                <th className="px-2 py-4 text-left">Role</th>
                <th className="px-2 py-4 text-left">Phone</th>
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Decide which dataset to display: filtered staff or all staff
                const filteredStaff = searchQuery
                  ? findStaffByQuery(staff, searchQuery)
                  : currentStaff;

                return filteredStaff && filteredStaff.length > 0 ? (
                  filteredStaff.map((staffMember, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                      } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b text-sm text-gray-700 transition-colors`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{staffMember.name}</td>
                      <td className="px-2 py-2">{staffMember.email}</td>
                      <td className="px-2 py-2">{staffMember.role}</td>
                      <td className="px-2 py-2">{staffMember.phone}</td>
                      <td className="px-4 py-2">
                        <div className="relative">
                          <HiOutlineDotsHorizontal
                            className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                            onClick={() => {
                              // Handle action for staff (e.g., edit or delete)
                            }}
                          />
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
                          "No staff found" || message
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

      {/* Add Staff Modal */}
      {addStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:overflow-y-hidden lg:px-[8%] bg-gray-700/60">
          <div className="bg-white lg:mt-10 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full lg:w-1/2 relative">
            <IoMdCloseCircle
              className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
              onClick={() => setAddStaffModal(false)}
            />
            <h2 className="text-lg font-bold text-gray-800 mb-4">Add Staff</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    value={newStaff.name}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    value={newStaff.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="role">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    value={newStaff.role}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, role: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                    required
                    value={newStaff.phone}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 rounded-lg mt-4 text-white w-full">
                Add Staff
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;