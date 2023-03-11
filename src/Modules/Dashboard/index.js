import { BuildingOffice2Icon, UsersIcon } from '@heroicons/react/24/outline'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Axios from '../../Shared/utils/axios_instance'
import InforCard from './components/InforCard'
import { OverViewChart } from './components/OverviewChart'
import StatCard from './components/StatCard'
import { humanStats, summarystats } from './mock_data'


function Dashboard() {
  const [isFetchingDashboardStats, setIsFetchingDashboardStats] = useState(false) 
  const [isDashboardStatsError, setDashboardStatsError] = useState("") 
  const [dashboardData, setDashboardData] = useState({})
  
  const fetchDashboardStats = async() => {
    let  tempDashboardStats ={}
    try{
      const totalApplicationsResponse = await Axios.get("/api/stats/getTotalApplications")
      const totalVisaProcessesResponse = await Axios.get("api/stats/getTotalApplicationsByStatus/VisaProcess")
      console.log(totalApplicationsResponse)
      console.log(totalVisaProcessesResponse)
      const applicationStats = [
        {title: 'Total Applications', value: totalApplicationsResponse.data, icon:UsersIcon, color: 'bg-green-500', changeType: 'increase', change: '122'},
        {title: 'Total Visa Applications', value: totalVisaProcessesResponse.data, icon:BuildingOffice2Icon, color: 'bg-green-500', changeType: 'increase', change: '24'},
    ]
      tempDashboardStats.applicationStats = applicationStats

      setDashboardData(tempDashboardStats)
    }
    catch(err){
      console.log(err)
      if(err.response) setDashboardStatsError(err.response.data.message)
      else setDashboardStatsError("An error occurred while fetching dashboard stats")
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
            {summarystats.map((stat, index) =>
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
    </div>
  )
}

export default Dashboard