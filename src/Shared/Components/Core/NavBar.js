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

        <nav className='  sticky top-0 bg-white rounded-lg mr-[32px] my-[16px]' style={{ zIndex: 999 }}>
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
                    <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />            
                            {/* <p>{currentDateString}</p> */}
                </div>
            </div>
        </nav>
    )
}