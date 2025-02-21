import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { useToast } from '../../../Loaders/ToastContext';
import { IoMdClose } from "react-icons/io";

const LoanHistory = ({ memberId }) => {
    const [trigger, setTrigger] = useState(false)
    const [activeLoan, setActiveLoan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('')

    // console.log(activeLoan);

    useEffect(() => {
        const fetchActiveLoan = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.tranquility.org.ng/api/Loan/GetLoanByMemberId/${clientId}`
                );
                console.log(response.data.data.$values);
                setActiveLoan(response.data.data.$values);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                if (err.response) {
                    setMessage(err.response.data.responseMessage)
                } else {
                    setMessage(`${err.message}, check your internet connection`)
                }
                setIsLoading(false);
            }
        };
        fetchActiveLoan();
    }, [memberId, trigger]);

    const [isLoanHistoryModal, setIsLoanHistoryModal] = useState(false)
    const [loanHistoryData, setLoanHistoryData] = useState({
        memberId: memberId,
        amount: "",
        loanType: "",
        purpose: "",
        guarntor1: "",
        guarantor2: "",
        startDate: "",
        endDate: ""
    })

    const handleAddLoan = async (e) => {
        e.preventDefault();
        startWaitingLoader();
        try {
            const res = await axios.post(`https://api.tranquility.org.ng/api/Loan/AddExistingLoan`, loanHistoryData)
            // console.log(res.data.data)
            notifySuccess(res.data.responseMessage)
            setTrigger(!trigger)
            loanHistoryData.amount = "";
            loanHistoryData.purpose = "";
            loanHistoryData.guarntor1 = "";
            loanHistoryData.guarantor2 = "";
            loanHistoryData.startDate = "";
            loanHistoryData.endDate = "";
        } catch (err) {
            console.log(err)
            notifyError(err.response.data.responseMessage)
        } finally {
            stopWaitingLoader();
        }
    }

    const [isLoanRepaymentModal, setIsLoanRepaymentModal] = useState(false)
    const [loanId, setLoanId] = useState('')
    const [loanRepaymentData, setLoanRepaymentData] = useState({
        memberId: memberId,
        amount: "",
    })
    const handleRepayLoan = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://api.tranquility.org.ng/api/Loan/LoanRepayment`, {...loanRepaymentData, loanId})
            console.log(res.data)
            setTrigger(!trigger)
            loanRepaymentData.amount = "";
        } catch (err) {
            console.log(err)
        } finally {
        }
    }

    const handleRepayButton = (loanId) => {
        setLoanId(loanId)
        setIsLoanRepaymentModal(true)
    }

    const formatString = (str) => str.replace(/([a-z])([A-Z])/g, "$1 $2");
    const formatAmount = (amt) =>
        amt
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="w-full">
            <div className='m-6 md:m-2 p-4 shadow-md rounded-md bg-white'>
                <div className='space-x-4'>
                    <button onClick={() => setIsLoanHistoryModal(true)} className='bg-primary px-4 py-2 text-white rounded-md'>Add Existing Loan</button>

                </div>

                {isLoanHistoryModal && (
                    <div className='bg-[#00000099] fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center '>
                        <div className='p-6 bg-white space-y-4 relative'>
                            <WaitingLoader />
                            <IoMdClose className='absolute top-4 right-4 cursor-pointer text-4xl bg-primary p-1 text-white' onClick={() => setIsLoanHistoryModal(false)} />
                            <h4 className='text-md font-medium'>Loan History</h4>
                            <form action="submit" className='grid gap-4' onSubmit={handleAddLoan}>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <input type="number" name="amount" placeholder="Enter loan amount" value={loanHistoryData.amount}
                                        className="p-2 outline-none border focus:border-primary rounded-md "
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, amount: e.target.value })} />
                                    <select
                                        id="loanType"
                                        // value={loanHistoryData.loanType}
                                        defaultValue={"Select loan type"}
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, loanType: e.target.value })}
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Select loan type" disabled >Select loan type</option>
                                        <option value="RegularLoan">Regular Loan</option>
                                        <option value="EmergencyLoan">Emergency Loan </option>
                                        <option value="AssetLoan">Asset Loan </option>
                                    </select>
                                    <input type="text" name="purpose" placeholder="Enter loan purpose" value={loanHistoryData.purpose}
                                        className="p-2 outline-none border focus:border-primary rounded-md "
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, purpose: e.target.value })} />
                                    <input type="text" name="guarantor1" placeholder="Enter loan guarantor 1"
                                        value={loanHistoryData.guarntor1}
                                        className="p-2 outline-none border focus:border-primary rounded-md "
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, guarntor1: e.target.value })} />
                                    <input type="text" name="guarantor2" placeholder="Enter loan guarantor 2" value={loanHistoryData.guarantor2}
                                        className="p-2 outline-none border focus:border-primary rounded-md "
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, guarantor2: e.target.value })} />
                                    <input type="date" name="date" className="p-2 outline-none border focus:border-primary rounded-md "
                                        value={loanHistoryData.startDate}
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, startDate: e.target.value })} />
                                    <input type="date" name="date" className="p-2 outline-none border focus:border-primary rounded-md "
                                        value={loanHistoryData.endDate}
                                        onChange={(e) => setLoanHistoryData({ ...loanHistoryData, endDate: e.target.value })} />
                                </div>
                                <button className='bg-primary px-4 py-2 text-white rounded-md'>Add loan</button>
                            </form>
                        </div>
                    </div>
                )}

                {isLoanRepaymentModal && (
                    <div className='bg-[#00000099] fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center '>
                        <div className='p-6 bg-white space-y-4 relative'>
                            <WaitingLoader />
                            <IoMdClose className='absolute top-4 right-4 cursor-pointer text-4xl bg-primary p-1 text-white' onClick={() => setIsLoanRepaymentModal(false)} />
                            <h4 className='text-md font-medium'>Loan Repayment</h4>
                            <form action="submit" className='grid gap-4 w-full lg:w-[400px]' onSubmit={handleRepayLoan}>
                                <div className='grid grid-cols-1 gap-4'>
                                    <input type="number" name="amount" placeholder="Enter repayment amount" value={loanRepaymentData.amount}
                                        className="p-2 outline-none border w-full focus:border-primary rounded-md "
                                        onChange={(e) => setLoanRepaymentData({ ...loanRepaymentData, amount: e.target.value })} />
                                </div>
                                <button className='bg-primary px-4 py-2 text-white rounded-md'>Repay loan</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div className="m-6 md:m-2 p-4 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Active Loan</h2>

                <div className="overflow-auto">
                    <table className="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow-sm text-[14px]">
                        <thead className="bg-blue-300 text-gray-700">
                            <tr>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Loan Type
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Loan Amount
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Remaining Balance
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Duration
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Start Date
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    End Date
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Purpose
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Status
                                </th>
                                <th className="p-2 border border-gray-200 text-left whitespace-nowrap">
                                    Repayment
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeLoan && activeLoan.length > 0 ? (
                                activeLoan.map((loan, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {formatString(loan.loanType)}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            ₦ {activeLoan !== null && loan.amount !== undefined ? formatAmount(loan.amount) : null}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            ₦ {activeLoan !== null && loan.balance !== undefined ? formatAmount(loan.balance) : null}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {loan.durationMonths} Months
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {new Date(loan.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {new Date(loan.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {loan.purpose}
                                        </td>
                                        <td
                                            className={`p-2 border border-gray-200 whitespace-nowrap ${loan.loanStatus === 0
                                                ? "bg-yellow-500"
                                                : loan.loanStatus === 1
                                                    ? "bg-green-500"
                                                    : loan.loanStatus === 2
                                                        ? "bg-blue-500"
                                                        : loan.loanStatus === 3
                                                            ? "bg-red-500"
                                                            : loan.loanStatus === 4
                                                                ? "bg-red-300"
                                                                : null
                                                }`}
                                        >
                                            {loan.loanStatus === 0
                                                ? "Pending"
                                                : loan.loanStatus === 1
                                                    ? "Approved"
                                                    : loan.loanStatus === 2
                                                        ? "Completed"
                                                        : loan.loanStatus === 3
                                                            ? "Rejected"
                                                            : loan.loanStatus === 4
                                                                ? "Defaulted"
                                                                : null}
                                        </td>
                                        <td className="p-2 border border-gray-200 whitespace-nowrap">
                                            {loan.loanStatus === 1 && (
                                                <button onClick={() => handleRepayButton(loan.loanId)} className='bg-primary px-4 py-2 text-white rounded-md'>Repay</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="9"
                                        className="px-4 py-2 text-center text-gray-500 whitespace-nowrap h-40"
                                    >
                                        <div className="flex justify-center">
                                            {isLoading ? <SpinnerLoader /> : message}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default LoanHistory




