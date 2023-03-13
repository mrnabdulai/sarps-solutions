import { Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
function SideBarAction({ to, Icon, text, notificationsCount, isAlert, children }) {
  const location = useLocation()
  const [childrenIsOpen, setChildrenIsOpen] = useState(false)
  const isActive = location.pathname.startsWith(to)
  const navigate = useNavigate()
  const handleNavClick = () => {
    if (children) {
      setChildrenIsOpen(!childrenIsOpen)
      return
    }
    else {
      navigate(to)
    }
  }
  const handleChildClick = (to) => {
    navigate(to)
  }
  useEffect(() => {
    if (children) {
      setChildrenIsOpen(false)
    }
  }, [location.pathname])
  return (
    <>

    <div className="w-full">
      <div className='w-full relative'>
        {/* Bar */}
        {isActive && <div className='h-full bg-primary w-[3px] absolute left-0 '></div>}
        <div onClick={handleNavClick} className={`py-2 px-2 mx-2  hover:bg-[#FBFBFB] flex  justify-between items-center text-[#44484d]  ${isActive && 'text-grey-600 bg-[#F9F9FC]  rounded-md'} `}>
          <div className='flex items-center'>
            {<Icon strokeWidth="1" className={`w-6 h-6 mr-3 ${isActive && 'text-primary'} text--400`} />}
            <span className={`text-[15px]  ${isActive ? 'font-semibold text-gray-700' : "text-[#44484d]"} `}>{text}</span>
          </div>
          {notificationsCount > 0 && <div className={`w-5 h-5  flex items-center justify-center ${isAlert ? "bg-error" : "bg-gray-100"}  rounded-md max-h-min`}>
            <span className={` ${isAlert ? "text-white" : "text-[#8A9AAB]"}  text-xs`}>{notificationsCount}</span>
          </div>}
          {children  ? childrenIsOpen ? <ChevronDownIcon className='w-3 h-3 ' /> :  <ChevronRightIcon className='w-3 h-3 ' />    : null
          }
        </div>
        {/* TODO: Slide in children */}
    
      </div>
         {children && <Transition
          show={childrenIsOpen}
          enter="transition transform ease-out duration-50"
          enterFrom='-translate-y-4 '
          enterTo='translate-y-0'
          leave="transition ease-in-out duration-50 transform"
          leaveFrom="translate-y-0"
          leaveTo="-translate-y-4"
        >
          {children.map((child, index) =>
            <p onClick={() => { handleChildClick(child.to) }} className='text-[#6c7988] py-2 px-2 pl-8 mx-2 text-[14.8px] hover:bg-[#FBFBFB] cursor-pointer' key={index}>{child.title}</p>
          )}
        </Transition>
       }
    </div>
    </>
  )
}

export default SideBarAction