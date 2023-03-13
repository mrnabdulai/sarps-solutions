import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { AdjustmentsHorizontalIcon, BellIcon, DocumentIcon } from '@heroicons/react/24/solid'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import SSDropdown from '../AlDropdown';
export default function NavBar() {
    const [currentDateString, setCurrentDateString] = useState("")
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateString(moment().format("MMMM Do YYYY, h:mm:ss a"))
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (

        // <nav className='  sticky top-0 bg-white rounded-lg mr-[32px] my-[16px]' style={{ }}>
        <nav className='   bg-white rounded-lg mr-[32px] my-[16px]' style={{ }}>
            <div className="container px-4 py-4 flex justify-between" >
                {/* Right side */}
                <div className='flex items-center '>
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500 mr-2' strokeWidth="1" />
                    <input className='bg-transparent border-none outline-none text-gray-400 text-sm ' placeholder='Search for something' />
                </div>
                <div className="flex items-center gap-x-4">
                <AdjustmentsHorizontalIcon className='w-6 h-6  cursor-pointer text-primary' />
                <BellIcon className='w-6 h-6 cursor-pointer text-primary' />
                <DocumentIcon className='w-6 h-6 cursor-pointer text-primary' />
                {/* <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>            */}
                            {/* <p>{currentDateString}</p> */}
                </div>
            </div>
        </nav>
    )
}