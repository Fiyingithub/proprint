import React, { useEffect, useState, useRef } from 'react';
import ProgressChart from "../DashboardComponents/ProgressChart";
import StudentOverview from "../DashboardComponents/StudentOverview";
import NavbarDashboard from "../NavbarDashboard";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../../../context/Loaders/ToastContext';
import SpinnerLoader from '../../../context/Loaders/SpinnerLoader';

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Clients = () => {
  const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } = useToast();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenEditMenu(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [trigger, setTrigger] = useState(false)

  function countElements(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
      count++;
    }
    return count;
  }

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://api.tranquility.org.ng/api/Member/GetAllMember');
        setMembers(response.data.$values);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
        if (error.response) {
          setMessage(error.response.data.responseMessage)
        } else {
          setMessage(`${error.message}, check your internet connection`)
        }
        setIsLoading(false);
      }
    }
    fetchMembers();
  }, [trigger]);

  const [openEditMenu, setOpenEditMenu] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const toggleEditMenu = (item) => {
    setOpenEditMenu(!openEditMenu);
    setMemberId(item);
  };

  const handleView = (id) => {
    navigate(`/admin/member/${id}`, { state: id });
  };

  const findMemberByName = (members, searchQuery) => {
    if (!searchQuery) return;
    const lowerCaseQuery = searchQuery.toLowerCase();

    const result = members.filter(member => member.lastname.toLowerCase().includes(lowerCaseQuery));
    return result || null;
  }

  const [addMemberModal, setAddMemberModal] = useState(false);
  const [existingMemberData, setExistingMemberData] = useState({
    firstname: '',
    lastname: '',
    othername: '',
    staffId: '',
    zeroIdId: '',
    contactAddress: '',
    phone: '',
    email: '',
    department: '',
    campusLocation: ''
  })
  const addExistingMember = async (e) => {
    e.preventDefault();
    startWaitingLoader();

    try {
      const res = await axios.post('https://api.tranquility.org.ng/api/Member/AddExistingMember', existingMemberData);
      notifySuccess(res.data.responseMessage);
      stopWaitingLoader();
      setAddMemberModal(false);
      setTrigger(true)
    } catch (error) {
      console.error(error);
      notifyError(error.response.data.responseMessage || 'An error occurred');
      stopWaitingLoader();
    }
  }

  const [membersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const iLastMember = currentPage * membersPerPage;
  const iFirstMember = iLastMember - membersPerPage;
  const currentMembers = members.slice(iFirstMember, iLastMember);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(members.length / membersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <NavbarDashboard />
      <div className="flex items-center px-20 bg-gray-900">
        <div className="w-3/4">
          <StudentOverview />
        </div>
        <div className="w-1/4">
          <ProgressChart />
        </div>
      </div>

      <div className="container mb-10 mx-auto p-2">
        <div className=''>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4">
            <h2 className="text-2xl font-medium mb-4 text-start">
              All Members
            </h2>
            <div className="gap-2 flex items-center flex-col md:flex-row md:justify-between ">
              <button
                className="bg-primary text-white hover:bg-[#63A0F0] transition-all duration-300 px-4 py-2 rounded mr-2"
                onClick={() => setAddMemberModal(true)}
              >
                Add Member
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search Members"
                  className="border border-gray-300 focus:border-primary outline-none rounded-md px-4 py-2 lg:w-[350px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-grey-800 text-white hover:bg-[#63A0F0] transition-all duration-300 px-4 py-2 rounded">
                  Search
                </button>

                <div className='flex items-center bg-primary py-2 px-4 text-white gap-2'>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`${currentPage === 1 ? 'opacity-20' : 'opacity-100'}`}
                  ><FaAngleLeft className='text-2xl' /></button>
                  <span className='font-medium'>page {currentPage} of {pageNumbers.length}</span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className={`${currentPage === pageNumbers.length ? 'opacity-20' : 'opacity-100'}`}
                  ><FaAngleRight className='text-2xl' /></button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-1 pb-24">
          <table className="min-w-full table-auto  rounded-lg shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-400 text-white rounded-t-lg">
                <th className="px-4 py-4 text-left">Member Name</th>
                <th className="px-2 py-4 text-left">Email</th>
                <th className="px-2 py-4 text-left">ZeroId</th>
                <th className="px-2 py-4 text-left">Phone</th>
                <th className="px-2 py-4 text-left">Campus Location</th>
                <th className="px-2 py-4 text-left">Department</th>
                <th className="px-2 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Decide which dataset to display: foundMembers or all members
                const filteredMembers = searchQuery
                  ? findMemberByName(members, searchQuery) || []
                  : currentMembers;

                return filteredMembers && filteredMembers.length > 0 ? (
                  filteredMembers.map((member, index) => (
                    <tr
                      key={member.memberId}
                      className={`${index % 2 === 0 ? "bg-blue-50" : "bg-green-50"
                        } hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-b text-sm text-gray-700 transition-colors`}
                    >
                      <td className="flex items-center gap-2 px-4 py-2">
                        <img
                          src={
                            member.imageUrl !== null
                              ? member.imageUrl
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          }
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium">
                            {member.firstname} {member.lastname}
                          </h3>
                        </div>
                      </td>
                      <td className="px-2 py-2">{member.email}</td>
                      <td className="px-2 py-2">{member.zeroId}</td>
                      <td className="px-2 py-2">{member.phone}</td>
                      <td className="px-2 py-2 whitespace-wrap">
                        {member.contactAddress}
                      </td>
                      <td className="px-2 py-2">{member.department}</td>
                      <td className="px-4 py-2">
                        <div className="relative">
                          <HiOutlineDotsHorizontal
                            className="text-[25px] text-gray-500 cursor-pointer transition-transform transform hover:scale-110"
                            onClick={() => toggleEditMenu(member.memberId)}
                          />
                          {memberId === member.memberId && openEditMenu ? (
                            <div ref={menuRef} className="shadow-lg px-2 py-4 rounded-lg border absolute right-8 top-4 bg-white text-[14px] text-left grid gap-4 w-[150px] z-50">
                              <p
                                className="cursor-pointer hover:bg-blue-500 hover:text-white py-1 px-2 rounded transition-colors"
                                onClick={() => handleView(member.memberId)}
                              >
                                View
                              </p>
                              <p className="cursor-pointer hover:bg-green-500 hover:text-white py-1 px-2 rounded transition-colors">
                                Edit
                              </p>
                              {/* <p className="cursor-pointer hover:bg-red-500 hover:text-white py-1 px-2 rounded transition-colors">
                                Delete
                              </p> */}
                            </div>
                          ) : null}
                        </div>
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
                          "No members found" || message
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

      {addMemberModal && (
        <div>
          <div className="fixed inset-0 z-30 flex items-center justify-center p-4 lg:overflow-y-auto lg:px-[10%] bg-black bg-opacity-50">
            <div className="bg-white lg:mt-40 lg:mb-10 p-4 lg:p-10 rounded-lg shadow-lg w-full relative">
              <IoMdCloseCircle
                className="absolute top-4 right-4 text-3xl text-primary cursor-pointer"
                onClick={() => setAddMemberModal(false)}
              />
              <h2 className="text-lg font-bold text-gray-600 mb-4">
                Add Existing Member
              </h2>
              <form
                action="submit"
                onSubmit={addExistingMember}
                className="w-[100%] space-y-4"
              >
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="firstname"
                      name="firstname"
                      required
                      placeholder="Member's first name"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          firstname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="lastname"
                      name="lastname"
                      required
                      placeholder="Member's last name"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="othername"
                      name="othername"
                      required
                      placeholder="Member's other name"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          othername: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="staffId"
                      name="staffId"
                      required
                      placeholder="Member's staff Id"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          staffId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="zeroId"
                      name="zeroId"
                      required
                      placeholder="Member's Zero Id"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          zeroId: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="contactAddress"
                      name="contactAddress"
                      required
                      placeholder="Member's contact address"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          contactAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Member's phone number"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="email"
                      name="email"
                      required
                      placeholder="Member's email address"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="department"
                      name="department"
                      required
                      placeholder="Member's department"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          department: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 focus:border-primary outline-none w-full"
                      id="campusLocation"
                      name="campusLocation"
                      required
                      placeholder="Member's campus location"
                      onChange={(e) =>
                        setExistingMemberData({
                          ...existingMemberData,
                          campusLocation: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded lg text-white"
                >
                  Add Member
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients
