import React from 'react';
import StudyStatisticsChart from './DashboardComponents/StudyStatisticsChart';
import ProgressChart from './DashboardComponents/ProgressChart';
import StudentOverview from './DashboardComponents/StudentOverview';
import UpcomingClasses from './DashboardComponents/UpcommingClasses';
import NavbarDashboard from './NavbarDashboard';

const AdminDashboard = () => {
    return (
        <div>
            <NavbarDashboard />
            <div className="flex flex-col lg:flex-row items-center px-6 lg:px-20 bg-gray-900">
                <div className='w-full lg:w-3/4'>
                    <StudentOverview />
                </div>
                <div className='w-full lg:w-1/4'>
                    <ProgressChart />
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-4 px-6 lg:px-20 bg-gray-50 w-full'>
                <StudyStatisticsChart />
                <UpcomingClasses />

            </div>
        </div>
    )
}

export default AdminDashboard