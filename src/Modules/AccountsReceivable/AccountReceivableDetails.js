/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import {
    ArrowLongLeftIcon,
    CheckIcon,
    HandThumbUpIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    UserIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import AlBadge from '../../Shared/Components/AlBadge'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from '../../Shared/utils/axios_instance'
import AlLoadingOverlay from '../../Shared/Components/AlLoadingOverlay'
import ErrorNotification from '../../Shared/Components/ErrorNotification'
import SuccessNotification from '../../Shared/Components/SuccessNotification'
import { sentenceCase } from 'change-case'
import UpdateVendorPopup from './UpdateVendorPopup'
const timelineEventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    approved: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
    declined: { icon: XCircleIcon, bgColorClass: 'bg-primary' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AccountReceivableDetails() {
    const [data, setData] = useState({})
    const [timeline, setTimeline] = useState([])
    const [updateOpen, setUpdateOpen] = useState(false)
    // const [declineOpen, setDeclineOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updateError, setUpdateError] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("resolved")

    const { id } = useParams()
    const navigate = useNavigate()
    const paramsList = useSelector(state => state.accountsReceivableReducer.accountsReceivables)

    console.log(paramsList)
    // const mapStatusToTimelineEvent = (status) =>{
    //     if(status == "pending") {
    //         return    type: timelineEventTypes.applied,
    //     }
    //     //TODO: handle for rest
    // }
    const handleUpdate = () => {
        setUpdateOpen(true)
    }
    const onUpdateConfirm = async () => {
        try {
            setUpdateError("")
            setIsUpdating(true)
            // const response = await Axios.put(`api/complaint/updateComplaints/${id}`, {
            //     reg_status: selectedStatus
            // })

            console.log("this is the response data")
            // console.log(response)
            navigate("/app/vendors")
            setIsUpdating(false)
            setUpdateOpen(false)
            setUpdateSuccess("Vendor Updated")

        }
        catch (err) {
            console.log(err)
            if (err.response) setUpdateError(err.response.data.message)
            else setUpdateError("An error occured while updating vendor")
            setIsUpdating(false)
            setUpdateOpen(false)

        }
    }

    useEffect(() => {
        const indexOfThisVendor = paramsList.findIndex((vendor) => {
            return vendor.id == id
        })
        const tempTimelines = []
        //TODO: do timeline algorithms and stuff
        // tempTimelines.push({
        //     id: 1,
        //     type: timelineEventTypes.applied,
        //     content: 'Applied',
        //     date: format(Date.parse(paramsList[indexOfThisComplaint].createdAt), "MMM dd"),
        //     datetime: format(Date.parse(paramsList[indexOfThisComplaint].createdAt), "yyyy-MM-dd"),
        // },
        // )
        // setTimeline(tempTimelines)
        setData(paramsList[indexOfThisVendor])
    }, [])

    return (

        <>
            <AlLoadingOverlay text="Updating application" show={isUpdating} >
                <div className="min-h-full">


                    {Object.keys(data).length > 0 && <main className="py-10 mr-10">
                        {/* Page header */}
                        <div className=" md:flex md:items-center md:justify-between md:space-x-5 ">
                            <div className="flex items-center space-x-5">

                                <div>
                                    <div className="flex gap-x-4 items-center">
                                        <h1 className="text-2xl font-bold text-gray-900">#{data.id}</h1>
                                        <AlBadge status={data.status} statusText={data.status} />
                                        <p className="text-sm font-medium text-gray-500">
                                            Account Payable  created on on <time dateTime={data.createdAt}>{format(Date.parse(data.createdAt), "MMM dd,YYY ")}</time>
                                        </p>
                                    </div>


                                </div>
                            </div>
                            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">

                                {/* <button
                                    type="button"
                                    onClick={handleUpdate}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3  font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                >
                                    Update
                                </button> */}
                            </div>

                        </div>



                        {/* <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3"> */}
                        {/* <div className="space-y-6 lg:col-span-2 lg:col-start-1"> */}
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="overflow-hidden bg-white shadow sm:rounded-lg mt-4">
                                <div className="px-4 py-5 sm:px-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Account Payable Details</h3>
                                    {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                    <dl className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Title</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.title}</dd>
                                        </div>


                                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Note</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {data.note}
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Amount</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {data.amount}GHC
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Created By</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {data.createdBy}
                                            </dd>
                                        </div>
                                        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">Vendor</dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                {data.vendorId}
                                            </dd>
                                        </div>
                                        

                                    </dl>
                                </div>
                            </div>
                        </section>

                        {/* Comments*/}

                        {/* </div> */}
                        {/* 
                            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                        Timeline
                                    </h2>

                                    {/* Activity Feed */}
                        {/* <div className="mt-6 flow-root">
                                        <ul role="list" className="-mb-8">
                                            {timeline.map((item, itemIdx) => (
                                                <li key={item.id}>
                                                    <div className="relative pb-8">
                                                        {itemIdx !== timeline.length - 1 ? (
                                                            <span
                                                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"
                                                            />
                                                        ) : null}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span
                                                                    className={classNames(
                                                                        item.type.bgColorClass,
                                                                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                                                    )}
                                                                >
                                                                    <item.type.icon className="h-5 w-5 text-white" aria-hidden="true" />
                                                                </span>
                                                            </div>
                                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">
                                                                        {item.content}{' '}
                                                                        <a href="#" className="font-medium text-gray-900">
                                                                            {item.target}
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                                    <time dateTime={item.datetime}>{item.date}</time>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div> */}
                        {/* <div className="justify-stretch mt-6 flex flex-col">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Advance to offer
                                    </button>
                                </div> */}

                        {/* </div> */}
                        {/* </section> */}
                        {/* </div> */}


                    </main>}
                    <UpdateVendorPopup setOpen={setUpdateOpen} open={updateOpen} onUpdateConfirm={onUpdateConfirm} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
                </div>
                {updateError && <ErrorNotification errorMessage={updateError} />}
                {updateSuccess && <SuccessNotification message={updateSuccess} />}
            </AlLoadingOverlay>
        </>
    )
}
