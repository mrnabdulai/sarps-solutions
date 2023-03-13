import React, { useEffect, useState } from 'react'
import SideBarAction from './SideBarAction'
import { BellIcon, PlusIcon, EllipsisHorizontalIcon, HomeIcon, ExclamationCircleIcon, TruckIcon, CubeIcon, FlagIcon, UserIcon, CalculatorIcon, WalletIcon, DocumentDuplicateIcon, ListBulletIcon, CalendarDaysIcon, ShoppingCartIcon, ChartBarSquareIcon, CogIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import SSIconButton from '../../AlIconButton'
import { AVATAR_IMG_URL } from '../../../Constants/mock'
import { useDispatch } from 'react-redux'
import { doLogout } from '../../../../Modules/Auth/Login/duck/action'

function Sidebar() {
  const [adminDetails, setAdminDetails] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    const tempAdminDetails = JSON.parse(localStorage.getItem('admin'))
    console.log(tempAdminDetails)
    setAdminDetails(tempAdminDetails)
  }, [])
  const handleLogout  = () => {
    localStorage.clear()
    window.location.href = '/login'
    dispatch(doLogout())
  }
  return (
    //  sidebar-scrollbar 
    <div className='text-white h-screen overflow-y shadow sticky top-0 bg-white flex flex-col '>
      {/* Logo */}
      <div className='px-2 py-6 flex mb-5 mr-10'>
        <img className='w-[30px] h-[30px] bg-primary rounded-full mr-2 object-center object-cover' src="/images/logo-512x512-8784601874.png" />
        <div>
          <h1 className='text-base font-bold text-primary'>Sarps Solutions</h1>

        </div>
      </div>

      {/* Nav Links */}

      {/* <div className="flex flex-col w-full items-center mb-4">
      <SideBarAction Icon={ExclamationCircleIcon} isAlert={false} to="/app/screen" text="Requests" notificationsCount={0}/>
      <SideBarAction Icon={BellIcon} isAlert={false} to="/app/screen" text="Notifications" notificationsCount={1}/>
      
    </div>
  <hr className='mb-5'/> */}
      <div className="flex flex-col w-full items-center mb-4">
        <SideBarAction Icon={HomeIcon} isAlert={false} to="/app/dashboard" text="Dashboard" />
        <SideBarAction Icon={UserIcon} isAlert={false} to="/app/applications" text="Applications"
          children={[
            { title: 'New application', to: '/user/add' },
            { title: 'List applications', to: '/app/applications/list' },
            // {title: 'Companies', to: '/app/screen'},
            // {title: 'Groups', to: '/app/screen'},
            // {title: 'Files', to: '/app/screen'},

          ]}
        />
        <SideBarAction Icon={ChatBubbleLeftEllipsisIcon} isAlert={false} to="/app/complaints" text="Complaints" />


        <SideBarAction Icon={WalletIcon} isAlert={false} to="/app/screen" text="Transactions"
          children={[
            { title: 'Invoices', to: '/app/screen' },
            { title: 'New Invoice', to: '/app/screen' },
            { title: 'Recurring Invoices', to: '/app/screen' },
            { title: 'New Recurring Invoice', to: '/app/screen' },
            { title: 'Credit Notes', to: '/app/screen' },
            { title: 'New Credit Note', to: '/app/screen' },
            { title: 'Quotes', to: '/app/screen' },
            { title: 'Create New Quote', to: '/app/screen' },
            { title: 'Payment', to: '/app/screen' },
          ]}
        />
        <SideBarAction Icon={DocumentDuplicateIcon} isAlert={false} to="/app/screen" text="Documents" />

        <SideBarAction Icon={ChartBarSquareIcon} isAlert={false} to="/app/screen" text="Reports"
          children={[
            { title: 'Transactions', to: '/app/screen' },
            { title: 'Invoices', to: '/app/screen' },
            { title: 'Contracts', to: '/app/screen' },
            { title: 'Account Statement', to: '/app/screen' },
            { title: 'Income Reports', to: '/app/screen' },
            { title: 'Expense Reports', to: '/app/screen' },
            { title: 'Income vs Expense', to: '/app/screen' },
            { title: 'Reports by Date', to: '/app/screen' },
            { title: 'All Income', to: '/app/screen' },
            { title: 'Invoice vs Expense', to: '/app/screen' },
            { title: 'Export', to: '/app/screen' },
          ]}
        />
        <SideBarAction Icon={Cog8ToothIcon} isAlert={false} to="/app/screen" text="Settings"
          children={[
            { title: 'General Settings', to: '/app/screen' },
            { title: 'Staff', to: '/app/screen' },
            { title: 'Roles', to: '/app/screen' },
            { title: 'Localization', to: '/app/screen' },
            { title: 'Currencies', to: '/app/screen' },
            { title: 'Expense Categories', to: '/app/screen' },
            { title: 'Expense Types', to: '/app/screen' },
            { title: 'Income Categories', to: '/app/screen' },
            { title: 'Units', to: '/app/screen' },
            { title: 'Manage Tags', to: '/app/screen' },
            { title: 'Payment Methods', to: '/app/screen' },
            { title: 'Transaction Taxes', to: '/app/screen' },
            { title: 'Email Settings', to: '/app/screen' },
            { title: 'Email Templates', to: '/app/screen' },
            { title: 'Departments', to: '/app/screen' },
            { title: 'About', to: '/app/screen' },
          ]}
        />


      </div>

      {/* This expands an empty div */}
      <div className='flex-1'></div>
      {/* Bottom section */}
      <div className='flex flex-col'>

<hr className='mt-3' />
<div className='px-2.5 py-3 flex    justify-between items-center'>
  <div className='flex items-center gap-2 mr-3'>
    <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>      <div>
      <h1 className='text font-medium text-black'>{adminDetails.firstName} {adminDetails.lastName}</h1>
      <h3 className='text-sm text-[#75808c]'>{adminDetails.email}</h3>
    </div>
  </div>
  <SSIconButton Icon={EllipsisHorizontalIcon} colorClass="text-gray-900"/>
  
</div>
</div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex text-red-700 items-center text-center rounded-md mx-4 my-2 border border-transparent border-red-500 px-3 py-2 text-sm font-medium leading-4  shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <ArrowLeftOnRectangleIcon className="-ml-0.5 mr-2 h-5 w-5   " aria-hidden="true" />
        Logout
      </button>
    
    </div>
  )
}

export default Sidebar