import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
function SideBarAction({ to, Icon, text, notificationsCount, isAlert, children }) {
  const location = useLocation()
  const [childrenIsOpen, setChildrenIsOpen] = useState(false)
  const isActive = location.pathname.startsWith(to)
  const navigate = useNavigate()
  const handleNavClick = () => {
    if(children){
        setChildrenIsOpen(!childrenIsOpen)
      return
    }
    else{
      navigate(to)
    }
  }
  const handleChildClick =(to)=>{
    navigate(to)
  }
  return (

    <div className='w-full relative'>
      {/* Bar */}
      {isActive && <div className='h-full bg-primary w-[3px] absolute left-0 '></div>}
      <div onClick={handleNavClick} className={`py-2 px-2 mx-2  hover:bg-[#FBFBFB] flex  justify-between items-center text-[#8A9AAB]  ${isActive && 'text-grey-600 bg-[#F9F9FC]  rounded-md'} `}>
        <div className='flex items-center'>
          {<Icon strokeWidth="1" className={`w-6 h-6 mr-3 ${isActive && 'text-primary'} text--400`} />}
          <span className={`text-sm  ${isActive ? 'font-semibold text-gray-500' : "text-[#8A9AAB]"} `}>{text}</span>
        </div>
        {notificationsCount > 0 && <div className={`w-5 h-5  flex items-center justify-center ${isAlert ? "bg-error" : "bg-gray-100"}  rounded-md max-h-min`}>
          <span className={` ${isAlert ? "text-white" : "text-[#8A9AAB]"}  text-xs`}>{notificationsCount}</span>
        </div>}
        {children &&    <ChevronDownIcon className='w-3 h-3 '/>
 }
      </div>
      {/* TODO: Slide in children */}
      
      {childrenIsOpen && children.map((child, index) => 
      <p onClick={()=>{handleChildClick(child.to)}} className='text-[#8a9aab] py-2 px-2 pl-8 mx-2 text-sm hover:bg-[#FBFBFB] cursor-pointer' key={index}>{child.title}</p>
      )}
    </div>
  )
}

export default SideBarAction