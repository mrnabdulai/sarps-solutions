import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import React from 'react'
import InforCard from './components/InforCard'
import { OverViewChart } from './components/OverviewChart'
import StatCard from './components/StatCard'
import { humanStats, summarystats } from './mock_data'

function Dashboard() {
  return (
    <div className='flex gap-x-8'>
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

          {humanStats.map((stat, index) =>(
           <InforCard Icon={stat.icon} change={stat.change} color={stat.color} title={stat.title} changeType={stat.changeType} value={stat.value} key={index}/>
          ))}
          </div>
          <OverViewChart />
        </div>
    </div>
  )
}

export default Dashboard