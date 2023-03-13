/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          sky: colors.sky,
          teal: colors.teal,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
    Bars3Icon,
    BellIcon,
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    SquaresPlusIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Outlet, useNavigate } from 'react-router-dom'

const user = {
    name: 'Debbie Lewis',
    handle: 'deblewis',
    email: 'debbielewis@example.com',
    imageUrl: ""
}
const navigation = [
    { name: 'Dashboard', href: '/user/dashboard', current: window.location.pathname == "/user/dashboard" },
    { name: 'Complaints', href: '/user/complaints', current: window.location.pathname == "/user/complaints" },

]
const subNavigation = [
    { name: 'Account', href: '#', icon: CogIcon, current: true },

]
let userNavigation = [
    { name: 'Your Profile', onClick: () => { } },
    { name: 'Sign out', onClick: () => { } },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [userName, setUserName] = useState("")
    const navigate = useNavigate()
    userNavigation = [
        {
            name: 'Your Profile', onClick: () => {
                navigate('/user/profile')
            }
        },
        {
            name: 'Sign out', onClick: () => {
                sessionStorage.clear()
                window.location.replace('/user/login')
            }
        },
    ]

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"))
        if (user) setUserName(user.surname + user.otherNames)
    }, [])
    return (
        <div>
            <Disclosure as="div" className="relative overflow-hidden bg-sky-700 pb-32">
                {({ open }) => (
                    <>
                        <nav
                            className={classNames(
                                open ? 'bg-sky-900' : 'bg-transparent',
                                'relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent'
                            )}
                        >
                            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                                <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                                    <div className="flex items-center px-2 lg:px-0">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="block h-10 rounded-full w-auto"
                                                src="/images/logo-512x512-8784601874.png"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                                            <div className="flex">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                                                            'rounded-md py-2 px-3 text-sm font-medium text-white'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        {userName && <div className='text-white text-md font-medium px-2  lg:ml-4 lg:px-0'>Welcome {userName}</div>}
                                    </div>
                                    <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                                        <div className="w-full max-w-lg lg:max-w-xs">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative text-sky-100 focus-within:text-gray-400">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                                </div>
                                                <input
                                                    id="search"
                                                    name="search"
                                                    className="block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm"
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex lg:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="hidden lg:ml-4 lg:block">
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-4 flex-shrink-0">
                                                <div>
                                                    <Menu.Button className="flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
                                                        <span className="sr-only">Open user menu</span>
                                                        <span class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                                                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                            </svg>
                                                        </span>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <div
                                                                        onClick={item.onClick}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block py-2 px-4 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </div>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="bg-sky-900 lg:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={""}
                                            className={classNames(
                                                item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                                                'block rounded-md py-2 px-3 text-base font-medium text-white'
                                            )}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-sky-800 pt-4 pb-3">
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-white">{user.name}</div>
                                            <div className="text-sm font-medium text-sky-200">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={"#"}

                                                className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </nav>
                        <div
                            aria-hidden="true"
                            className={classNames(
                                open ? 'bottom-0' : 'inset-y-0',
                                'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0'
                            )}
                        >
                            <div className="absolute inset-0 flex">
                                <div className="h-full w-1/2" style={{ backgroundColor: '#0a527b' }} />
                                <div className="h-full w-1/2" style={{ backgroundColor: '#065d8c' }} />
                            </div>
                            <div className="relative flex justify-center">
                                <svg
                                    className="flex-shrink-0"
                                    width={1750}
                                    height={308}
                                    viewBox="0 0 1750 308"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                                    <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                                    <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                                    <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                                </svg>
                            </div>
                        </div>
                        <header className="relative py-10">

                        </header>
                    </>
                )}
            </Disclosure>
            <Outlet />
        </div>
    )
}
