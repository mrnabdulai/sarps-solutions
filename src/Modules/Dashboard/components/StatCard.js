import React from 'react'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
function StatCard({title, value, Icon, color}) {
  return (
    <li  className="col-span-1 flex  rounded-md shadow-sm">
            <div
              className={classNames(
              color,
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
          {<Icon className="h-7 w-7" aria-hidden="true" />}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-1.5 text-sm">
                <a href="/sdf" className="font-medium text-gray-500 hover:text-gray-600">
                  {title}
                </a>
                <p className="text-grey-900 text-lg">    $ {value}</p>
              </div>
              
            </div>

          </li>
  )
}

export default StatCard