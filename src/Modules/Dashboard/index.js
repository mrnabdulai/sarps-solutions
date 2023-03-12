import { BuildingOffice2Icon, UsersIcon, CheckCircleIcon, ExclamationCircleIcon,  XCircleIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Axios from '../../Shared/utils/axios_instance'
import InforCard from './components/InforCard'
import { OverViewChart } from './components/OverviewChart'
import StatCard from './components/StatCard'
import { humanStats, summarystats } from './mock_data'


function Dashboard() {
  const [isFetchingDashboardStats, setIsFetchingDashboardStats] = useState(true) 
  const [isDashboardStatsError, setDashboardStatsError] = useState("") 
  const [dashboardData, setDashboardData] = useState({})
  
  const fetchDashboardStats = async() => {
    let  tempDashboardStats ={}
    setDashboardStatsError(""	)
    try{
      setIsFetchingDashboardStats(true)
      const totalApplicationsResponse = await Axios.get("/api/stats/getTotalApplications")
      const totalVisaProcessesResponse = await Axios.get("api/stats/getTotalApplicationsByStatus/VisaProcess")
      const totalCompletedApplicationsResponse = await Axios.get("api/stats/getTotalApplicationsByStatus/Completed")
      const totalPendingApplicationsResponse = await Axios.get("api/stats/getTotalApplicationsByStatus/Pending")
      const totalRejectedApplicationsResponse = await Axios.get("api/stats/getTotalApplicationsByStatus/Rejected")
      console.log(totalApplicationsResponse)
      console.log(totalVisaProcessesResponse)
      const applicationStats = [
        {title: 'Total Applications', value: totalApplicationsResponse.data, icon:UsersIcon, color: 'bg-green-500', changeType: 'increase', change: '122'},
        {title: 'Total Visa Applications', value: totalVisaProcessesResponse.data, icon:BuildingOffice2Icon, color: 'bg-green-500', changeType: 'increase', change: '24'},
    ]
    const summaryStats = [
      {title: 'Total Completed Applications', value: totalCompletedApplicationsResponse.data, icon:CheckCircleIcon, color: 'bg-green-500'}, 
      {title: 'Total Pending Applications', value: totalPendingApplicationsResponse.data, icon:ExclamationCircleIcon, color: 'bg-yellow-400'}, 
      {title: 'Total Rejected Applications', value: totalRejectedApplicationsResponse.data, icon:XCircleIcon, color: 'bg-red-500'}, 
    ]
      tempDashboardStats.applicationStats = applicationStats
      tempDashboardStats.summaryStats = summaryStats

      setDashboardData(tempDashboardStats)
    }
    catch(err){
      console.log(err)
      if(err.response) setDashboardStatsError(err.response.data.message)
      else setDashboardStatsError("An error occurred while fetching dashboard stats")
    }
    finally{
      setIsFetchingDashboardStats(false)
    }
  }

  useEffect(()=>{
    fetchDashboardStats()
  }, [])

  return (
    <div>
    { Object.keys(dashboardData).length > 0 && <div className='flex gap-x-8'>
          <div className='bg-white pl-5 pr-8 py-2 rounded-md' style={{
            flex: 1,
          }}>
            <h6 className='font-semibold text-lg mb-3 text-'>Summary</h6>
            <div className='space-y-3.5'>
            {dashboardData.summaryStats.map((stat, index) =>
              (
                <StatCard key={index} Icon={stat.icon} color={stat.color} title={stat.title} value={stat.value}/>
              )
            )}
            </div>
                    </div>
          <div className='bg-white pr-6 pl-5 py-2 rounded-md flex-3 ' style={{
            flex: 3,
          }}>
                    <div className='flex gap-x-5 mb-5'>
            {dashboardData.applicationStats.map((stat, index) =>(
             <InforCard Icon={stat.icon}  title={stat.title}  value={stat.value} key={index}/>
            ))}
            </div>
            <OverViewChart />
          </div>
      </div> }
              {
                isFetchingDashboardStats && <div className='flex h-full mt-20 justify-center items-center'>
                <svg class="animate-spin -ml-1 mr-3 h-20 w-20 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
                </div>
              }
    </div>
  )
}

export default Dashboard