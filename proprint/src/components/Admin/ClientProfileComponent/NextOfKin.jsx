import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useToast } from "../../../Loaders/ToastContext";
// import SpinnerLoader from "../../../Loaders/SpinnerLoader";
// import WaitingLoader from "../../../Loaders/WaitingLoader";

const NextOfKin = ({memberId}) => {
  // const userId = JSON.parse(localStorage.getItem("tmcsMemberId"));

  // const { notifySuccess, notifyError, startWaitingLoader, stopWaitingLoader } =
  //   useToast();
  const [nextOfKin, setNextOfKin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    const fetchNextOfKin = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://api.tranquility.org.ng/api/Member/GetMemberNextOfKin/${memberId}`
        );

        // notifySuccess(res.data.responseMessage)
        if(res.data.responseMessage === 'nextofkin found'){
          setNextOfKin(res.data.data.$values[0])
          // console.log(res.data.data.$values)
        }
        setIsLoading(false);
      } catch (error) {
        // console.log(error);
        if (error.response) {
          setMessage(error.response.data.responseMessage);
        } else {
          setMessage(`${error.message}, check your internet connection`);
        }
        setIsLoading(false);
      }
    };

    fetchNextOfKin();
  }, [memberId]);

  const [nextOfKinData, setNextOfKinData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    memberId: memberId,
  });

  const handleSummitNextOfKin = async (e) => {
    e.preventDefault();
    // startWaitingLoader();

    try {
      const res = await axios.post(
        "https://api.tranquility.org.ng/api/Member/AddNextOfKin",
        nextOfKinData
      );
      console.log(res.data.responseMessage);
      // notifySuccess(res.data.responseMessage);
      if(res.data.responseMessage === 'next of kin added successfully'){
        window.location.reload();
      }
      stopWaitingLoader();
    } catch (err) {
      console.log(err.response.data.responseMessage);
      // notifyError(err.response.data.responseMessage);
      // stopWaitingLoader();
    }
  };

  return (
    <div>
      {/* <WaitingLoader /> */}
      {nextOfKin === null ? (
        <div>
          {isLoading ? (
            <div>Spinning</div>
            // <SpinnerLoader />
          ) : (
            <div>
              <p className='p-6 text-gray-500 bg-white shadow-sm rounded-lg mb-2'>{message}</p>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                  Add Next of Kin
                </h1>
                <form
                  action="submit"
                  onSubmit={handleSummitNextOfKin}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter next of kin's name"
                      onChange={(e) =>
                        setNextOfKinData({
                          ...nextOfKinData,
                          name: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border outline-none rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter next of kin's address"
                      onChange={(e) =>
                        setNextOfKinData({
                          ...nextOfKinData,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border outline-none rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter next of kin's Phone number"
                      onChange={(e) =>
                        setNextOfKinData({
                          ...nextOfKinData,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border outline-none rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter next of kin's email"
                      onChange={(e) =>
                        setNextOfKinData({
                          ...nextOfKinData,
                          email: e.target.value,
                        })
                      }
                      className="mt-1 block w-full border outline-none rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Next of Kin
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Next of Kin datails
            </h1>
            <div>
              <table className="border-collapse border border-gray-400 w-full text-left">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 font-bold">
                    <th className="border border-gray-400 px-4 py-2">
                      Next of Kin
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">Name</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {nextOfKin.name}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">
                      Address
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {nextOfKin.address}
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">Phone</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {nextOfKin.phone}
                    </td>
                  </tr>
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="border border-gray-400 px-4 py-2">Email</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {nextOfKin.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default NextOfKin;
