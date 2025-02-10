import React from 'react';
import { Clock, Calendar, Award, MessageCircle } from 'lucide-react';
import assets from '../../../assets/images/assets';

const StudentOverview = () => {
    return (
        <div className="bg-gray-900 text-white">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>

            <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Profile Section */}
                    <div className="flex flex-col items-start gap-4">
                        <img
                            src={assets.woman}
                            alt="Profile"
                            className="w-16 h-16 rounded-full bg-white"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">Brooklyn Simmons</h3>
                            <p className="text-gray-400 text-sm">Admin </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        <table>
                            <tbody>
                                <tr className='border-b'>
                                    <td className="py-6 pr-32 border-r">
                                        {/* Earning Points */}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-500/20 p-2 rounded-lg">
                                                <MessageCircle className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">126</div>
                                                <div className="text-gray-400 text-sm">Earning Points</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 pl-32">
                                        {/* Pending Courses */}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-orange-500/20 p-2 rounded-lg">
                                                <Calendar className="w-6 h-6 text-orange-400" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">04</div>
                                                <div className="text-gray-400 text-sm">Pending Courses</div>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-6 pr-32 border-r">
                                        {/* Watch Time */}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-pink-500/20 p-2 rounded-lg">
                                                <Clock className="w-6 h-6 text-pink-400" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">62h</div>
                                                <div className="text-gray-400 text-sm">Watch Time</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 pl-32">
                                        {/* Certificates */}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-cyan-500/20 p-2 rounded-lg">
                                                <Award className="w-6 h-6 text-cyan-400" />
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">08</div>
                                                <div className="text-gray-400 text-sm">Certificates</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentOverview;