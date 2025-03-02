import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import { useToast } from '../../../Loaders/ToastContext';
// import WaitingLoader from '../../../Loaders/WaitingLoader';
import { Link } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import { MdAddAPhoto } from "react-icons/md";
import SpinnerLoader from "../../../context/Loaders/SpinnerLoader";

const AdminEditMemberProfile = ({ clientId }) => {
  console.log(clientId);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const [clientData, setClientData] = useState({
    clientName: "",
    businessAddress: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://proprints.tranquility.org.ng/api/Client/GetClientById/${clientId}`
        );

        console.log(response.data.data);

        if (response.data.data) {
          setUserData(response.data.data);
          setClientData({
            clientName: response.data.data.clientName || "",
            businessAddress: response.data.data.businessAddress || "",
            phone: response.data.data.phone || "",
            email: response.data.data.email || "",
          });
        }
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
    if (clientId) {
      getUser();
    }
  }, [clientId, profilePhotoUrl, trigger]);

  const handleIconClick = () => {
    document.getElementById("fileInput").click();
  };

  // const [photo, setPhoto] = useState(null);
  // const handleUploadPhoto = async (e) => {
  //   e.preventDefault();
  //   // startWaitingLoader();

  //   let imageUrl = '';
  //   if (photo) {
  //     const formData = new FormData();
  //     formData.append('file', photo);
  //     formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME);
  //     formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_ID);
  //     try {
  //       const res = await axios.post(
  //         `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/upload`,
  //         formData
  //       );
  //       imageUrl = res.data.secure_url;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   try {
  //     const res = await axios.post(
  //       `https://api.tranquility.org.ng/api/Member/ImageUrl/${memberId}`,
  //       { imageUrl }
  //     );

  //     notifySuccess(res.data.responseMessage);
  //     setProfilePhotoUrl(res.data.data.imageUrl);
  //     stopWaitingLoader();
  //   } catch (err) {
  //     notifyError(err.response.data.responseMessage);
  //     stopWaitingLoader();
  //   }
  // };

  return (
    <div className="mb-8">
      {/* <WaitingLoader /> */}
      {userData === null ? (
        <div>
          {isLoading ? (
             <SpinnerLoader />
          ) : (
           
            message
          )}
        </div>
      ) : (
        <div className="mx-0 md:mx-2 lg:mx-2 space-y-4">
          <div>
            <button className="px-8 py-2 bg-gray-800/80 rounded-md mt-4">
              <Link to="/admin/clients">
                <div className="flex items-center gap-1 text-sm text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"  
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span>Back</span>
                </div>
              </Link>
            </button>
          </div>
          <div className="w-full h-36 bg-white p-4 rounded-lg flex items-center gap-4 relative">
            <div className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={userData.imageUrl || avatar}
                alt=""
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{userData.clientName}</p>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <button
              onClick={handleIconClick}
              className="bg-blue-500 rounded-full p-1 text-white absolute left-2 top-[90px] shadow-lg ">
              <MdAddAPhoto />
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              // onChange={(e) => setPhoto(e.target.files[0])}
              accept="image/*"
            />
            <button
              // onClick={handleUploadPhoto}
              className="bg-blue-500 rounded text-[10px] p-[2px] text-white absolute left-2 top-[120px] shadow-lg ">
              Upload
            </button>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Member Profile
            </h2>

            <form className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(clientData).map((field, index) => (
                  <div key={index}>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor={field}>
                      {field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type="text"
                      id={field}
                      value={clientData[field]}
                      readOnly
                      className="mt-1 block w-full border border-black outline-none rounded-md p-2"
                    />
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEditMemberProfile;

// import React from 'react'

// const Admin_EditClientProfile = () => {
//   return (
//     <div>Admin_EditClientProfile</div>
//   )
// }

// export default Admin_EditClientProfile
