import React from 'react'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function InforCard({title, value, Icon, 
  // color, changeType, change
}) {
  return (
    <div
          
            className="relative overflow-hidden rounded-lg flex-1 bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-primary p-3">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{title}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              {/* <p
                className={classNames(
               changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}

                <span className="sr-only"> {changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                {change}
              </p> */}
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {title} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
  )
}

export default InforCard