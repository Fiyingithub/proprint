import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SpinnerLoader from '../../../Loaders/SpinnerLoader';

const Security = ({ memberId }) => {
    const [userPass, setUserPass] = useState('');
    const [isLoading, setIsLoading] = useState(true);
      const [message, setMessage] = useState('');

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.tranquility.org.ng/api/Member/GetMemberById/${memberId}`
                );

                if (response.data.data) {
                    setUserPass(response.data.data.passwordHash);
                };
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
        if (memberId) {
            getUser();
        }
    }, [memberId]);

    return (
        <div>
            {userPass === null ? (
                <div>{isLoading ? 
                    <div>
                        spinner
                    </div>
                // <SpinnerLoader /> 
                : message}</div>
            ) : (
                <div className="p-6 bg-white shadow-lg rounded-lg flex items-center gap-4">
                    <p>Member's Password:</p>
                    <p className='font-semibold'>{userPass !== undefined ? userPass : "Not Found"}</p>
                </div>
            )}
        </div>
    )
}

export default Security