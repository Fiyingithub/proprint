// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useToast } from '../../../Loaders/ToastContext';
// import WaitingLoader from '../../../Loaders/WaitingLoader';

// const FundMemberWallet = ({memberId}) => {
//     const {startWaitingLoader, stopWaitingLoader, notifySuccess, notifyError} = useToast();
//     const [amount, setSetAmount] = useState('');
//     const [wallet, setWallet] = useState('');
//     const [transactionDetail, setTransactionDetail] = useState('');

//     const [assetWalletId, setAssetWalletId] = useState('');
//     useEffect(() => {
//         const getAssetWalletId = async () => {
//           try {
//             const res = await axios.get(`https://api.tranquility.org.ng/api/Wallet/GetAssetWalletByUserId/${memberId}`)
//             // console.log(res.data.data)
//             setAssetWalletId(res.data.data.walletId)
//           } catch (err) {
//             console.log(err.response.data)
//           }
//         }
//         if (memberId) {
//           getAssetWalletId();
//         }
//       }, [memberId])

//     const handleFundWallet = (e) => {
//         e.preventDefault();
//         if (wallet === 'Regular Savings') {
//             FundWalletRegularSavings(e);
//         } else if (wallet === 'Investment Savings') {
//             FundWalletInvestmentSavings(e);
//         } else if (wallet === 'Target Savings') {
//             FundWalletTargetSavings(e);
//         } else if(wallet === 'Asset wallet'){
//             FundWalletAssetSavings(e);
//         } else {
//             notifyError('Select a wallet to fund');
//         }
//     }

//     const FundWalletRegularSavings = async (e) => {
//         e.preventDefault();
//         startWaitingLoader();
//         try {
//             const res = await axios.post("https://api.tranquility.org.ng/api/Wallet/FundRegularSavingsWallet", {
//                 walletId: memberId,
//                 amount: amount,
//                 transactionDetail
//             });
//             notifySuccess(res.data.responseMessage);
//             console.log(res.data)
//             stopWaitingLoader();
//             setSetAmount('');
//             setTransactionDetail('')
//         } catch (error) {
//             notifyError(error.response.data.responseMessage);
//             console.error("Error funding wallet:", error);
//         }
//     };

//     const FundWalletInvestmentSavings = async (e) => {
//         e.preventDefault();
//         startWaitingLoader();
//         try {
//             const res = await axios.post("https://api.tranquility.org.ng/api/Wallet/FundInvestmentSavingsWalletByAdmin", {
//                 walletId: memberId,
//                 amount: amount,
//                 transactionDetail
//             });
//             notifySuccess(res.data.responseMessage);
//             stopWaitingLoader();
//             setSetAmount('');
//             setTransactionDetail('')
//         } catch (error) {
//             notifyError(error.response.data.responseMessage);
//             console.error("Error funding wallet:", error);
//         }
//     };

//     const FundWalletTargetSavings = async (e) => {
//         e.preventDefault();
//         startWaitingLoader();
//         try {
//             const res = await axios.post("https://api.tranquility.org.ng/api/Wallet/FundTargetSavingsWalletByAdmin", {
//                 walletId: memberId,
//                 amount: amount,
//                 transactionDetail
//             });
//             notifySuccess(res.data.responseMessage);
//             stopWaitingLoader();
//             setSetAmount('');
//             setTransactionDetail('')
//         } catch (error) {
//             notifyError(error.response.data.responseMessage);
//             console.error("Error funding wallet:", error);
//         }
//     };

//     const FundWalletAssetSavings = async (e) => {
//         e.preventDefault();
//         startWaitingLoader();
//         try {
//             const res = await axios.post("https://api.tranquility.org.ng/api/Wallet/FundAssetWalletByAdmin", {
//                 walletId: assetWalletId,
//                 amount: amount,
//                 transactionDetail
//             });
//             notifySuccess(res.data.responseMessage);
//             stopWaitingLoader();
//             setSetAmount('');
//             setTransactionDetail('')
//         } catch (error) {
//             notifyError(error.response.data.responseMessage);
//             console.error("Error funding wallet:", error);
//         }
//     };

//     return (
//         <div className='bg-white p-4 rounded-lg space-y-4'>
//             <WaitingLoader />
//             <h1 className='text-lg font-medium'>Fund Member Wallet</h1>
//             <form action='submit' onSubmit={handleFundWallet} className='space-y-4'>
//                 <select name="wallet" id="wallet" className='outline-none border border-gray-300 p-2 w-full rounded-lg' onChange={(e) => setWallet(e.target.value)}>
//                     <option value="Select Wallet">Select Wallet</option>
//                     <option value="Regular Savings">Regular Savings</option>
//                     <option value="Admin Fee" disabled>Admin Fee</option>
//                     <option value="Investment Savings">Investment Savings</option>
//                     <option value="Target Savings">Target Savings</option>
//                     <option value="Asset wallet">Asset Wallet</option>
//                 </select>
//                 <div>
//                     <input
//                         type="number"
//                         name="amount"
//                         value={amount}
//                         id="amount"
//                         onChange={(e) => setSetAmount(e.target.value)}
//                         placeholder='Enter Amount'
//                         className='outline-none border border-gray-300 p-2 focus:border-primary w-full rounded-lg'
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="Text"
//                         name="transactionDetail"
//                         value={transactionDetail}
//                         id="transactionDetail"
//                         onChange={(e) => setTransactionDetail(e.target.value)}
//                         placeholder='Enter Transaction detail'
//                         required
//                         className='focus:border-primary outline-none border border-gray-300 p-2 w-full rounded-lg'
//                     />
//                 </div>
//                 <button type="submit" className='px-6 py-2 bg-primary rounded-lg text-white '>Fund {wallet} Wallet</button>
//             </form>
//         </div>
//     )
// };

// export default FundMemberWallet;


import React from 'react'

const FundMemberWallet = () => {
  return (
    <div>FundMemberWallet</div>
  )
}

export default FundMemberWallet