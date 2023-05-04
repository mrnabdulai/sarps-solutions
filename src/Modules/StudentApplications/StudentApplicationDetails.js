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
import moment from 'moment/moment'
import AlBadge from '../../Shared/Components/AlBadge'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from '../../Shared/utils/axios_instance'
import UpdateApplicationPopup from './UpdateApplicationPopup'
import AlLoadingOverlay from '../../Shared/Components/AlLoadingOverlay'
import ErrorNotification from '../../Shared/Components/ErrorNotification'
import SuccessNotification from '../../Shared/Components/SuccessNotification'
import AddNotePopup from './AddNotePopup'
import DeclineApplicationPopup from './DeclineApplicationPopup'
import { sentenceCase } from 'change-case'
const timelineEventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    approved: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
    declined: { icon: XCircleIcon, bgColorClass: 'bg-primary' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StudentApplicationDetails() {
    const [data, setData] = useState({})
    const [timeline, setTimeline] = useState([])
    const [updateOpen, setUpdateOpen] = useState(false)
    // const [declineOpen, setDeclineOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updateError, setUpdateError] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("accepted")
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("not_paid")
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const [selectedPaidAmount, setSelectedPaidAmount] = useState(0)
    const [addNoteOpen, setAddNoteOpen] = useState(false)
    const [note, setNote] = useState("")
    const [addingNote, setAddingNote] = useState(false)
    const [addNoteSuccess, setAddNoteSuccess] = useState(false)
    const [addNoteError, setAddNoteError]= useState("")
    const [notesForThisApplication, setNotesForThisApplication] = useState([])


    const handleNoteAdd = async () => {
        setAddingNote(true)
        const currentAdmin = JSON.parse(localStorage.getItem("admin"));

        const createdBy = currentAdmin.id
        try{
            const noteResponse = await Axios.post("/api/note/addNote", {
                applicationCode: data.applicationCode,
                note: note,
                createdBy: createdBy
            })

            setAddingNote(false)
            setAddNoteOpen(false)
            setAddNoteSuccess(true)
            fetchNotes(data.applicationCode)

        }
       
        catch(e){
            console.log(e)
            setAddingNote(false)
            setAddNoteOpen(false)
            setAddNoteError("An error occured while adding note")
        }
      
    }

    const { id } = useParams()
    const navigate = useNavigate()
    const paramsList = useSelector(state => state.applicationsReducer.applications)

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
        console.log("selected status is", selectedStatus)
        try {
            setUpdateError("")
            setIsUpdating(true)
            const response = await Axios.put(`/api/student/updateApplication/${id}`, {
                reg_status: selectedStatus,
                payment_status: selectedPaymentStatus,
                payment_method: selectedPaymentMethod,
                paid_amount: selectedPaidAmount,
            })
            console.log("this is the response data")
            console.log(response)
            navigate("/app/applications/list")
            setIsUpdating(false)
            setUpdateOpen(false)
            setUpdateSuccess("Application Updated")

        }
        catch (err) {
            console.log(err)
            if (err.response) setUpdateError(err.response.data.message)
            else setUpdateError("An error occured while updating application")
            setIsUpdating(false)
            setUpdateOpen(false)

        }
    }
   const fetchNotes = async(applicationCode) => {
       const notesResponse = await Axios.get("/api/note/getNotes/" + applicationCode)
       console.log(notesResponse    )
       setNotesForThisApplication(notesResponse.data)
    }
    useEffect(() => {

        const indexOfThisApplication = paramsList.findIndex((application) => {
            return application.id == id
        })
        const tempTimelines = []
        //TODO: do timeline algorithms and stuff
        tempTimelines.push({
            id: 1,
            type: timelineEventTypes.applied,
            content: 'Applied',
            date: format(Date.parse(paramsList[indexOfThisApplication].createdAt), "MMM dd"),
            datetime: format(Date.parse(paramsList[indexOfThisApplication].createdAt), "yyyy-MM-dd"),
        },
        )
        setTimeline(tempTimelines)
        setData(paramsList[indexOfThisApplication])
        setSelectedStatus(paramsList[indexOfThisApplication].reg_status)
        setSelectedPaymentMethod(paramsList[indexOfThisApplication].payment_method)
        setSelectedPaidAmount(paramsList[indexOfThisApplication].total)
        if(paramsList[indexOfThisApplication].payment_status != null) setSelectedPaymentStatus(paramsList[indexOfThisApplication].payment_status)
        fetchNotes(paramsList[indexOfThisApplication].applicationCode)

    }, [])
    const mapPaymentStatusToStatus = () => {
        if(data.payment_status == null) return "rejected"
        if (data.payment_status === "not_paid") return "rejected"
        if (data.payment_status === "part_payment") return "pending"
        if (data.payment_status === "paid") return "success"
    }
    const getPaymentMethodIcon = () => {
        if (data.payment_method === "cash") return "cash.png"
        if (data.payment_method === "bank") return "icons8-bank-building-50.png"
        if (data.payment_method === "mobile_money") return "momoghana.jpg"
        return "momoghana.jpg"
    }
    return (

        <>            <AlLoadingOverlay text="Adding Note" show={addingNote} >

            <AlLoadingOverlay text="Updating application" show={isUpdating} >
                <div className="min-h-full">


                    {Object.keys(data).length > 0 && <main className="py-10">
                        {/* Page header */}
                        <img src={data.passport_file } alt="passport photo" className="     border-dashed w-48 object-cover h-60"/> 

                        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                            <div className="flex items-center space-x-5">

                                <div>
                                    <div className="flex gap-x-4 items-center">
                                        <h1 className="text-2xl font-bold text-gray-900">{data.surname} {data.otherNames}</h1>
                                        <AlBadge status={data.reg_status} statusText={data.reg_status} />
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Applied   on <time dateTime={data.createdAt}>{format(Date.parse(data.createdAt), "MMM dd,YYY ")} by Agent #{data.agent_code}</time>
                                    </p>
                                    <div className="mt-2">
                                        <span className="inline-block mr-3 text-sm font-medium">Payment Status:</span>
                                        <AlBadge status={mapPaymentStatusToStatus()} statusText={data.payment_status == null ? "Not paid" : sentenceCase(data.payment_status)} />

                                    </div>
                                    {/* {data.payment_method != null  && <div className="mt-2 flex gap-x-2 items-center">
                                        <span className="inline-block  text-sm font-medium">Payment Method:</span>
                                        <span className="inline-block  text-sm  text-gray-700">{sentenceCase(data.payment_method)}</span>
                                        <img src={`/images/payment-icons/${getPaymentMethodIcon()}`} className="h-8 object-contain" />
                                    </div>  } */}
                                    {data.payment_method != null && <div className="mt-2 flex gap-x-2 items-center">
                                        <span className="inline-block  text-sm font-medium">Payment Method:</span>
                                        <span className="inline-block  text-sm  text-gray-700">{sentenceCase(data.payment_method)}</span>
                                        <img src={`/images/payment-icons/${getPaymentMethodIcon()}`} className="h-8 object-contain" />
                                    </div>}
                                </div>
                            </div>
                            <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">

                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3  font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                >
                                    Update Status
                                </button>
                                <button
                                    type="button"
                                    autoFocus={true}
                                    onClick={()=>{
                                        navigate("/app/applications-students/edit/" + data.id)

                                    }}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent border-blue-600 px-8 py-3  outline-blue-500 font-medium text-blue-600 shadow-sm hover:outline-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                >
                                
                                   Edit Application
                                </button>

                                <button
                                        type="button"
                                        onClick={() => {
                                            setAddNoteOpen(true)
                                        }}
                                        className="inline-flex items-center justify-center rounded-md border  border-yellow-600 px-8 py-3  outline-yellow-500 font-medium text-yellow-600 shadow-sm hover:outline-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    >
                                        Add Note
                                    </button>
                            </div>

                        </div>



                        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                                {/* Description list*/}
                                <section aria-labelledby="applicant-information-title">
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                BASIC INFORMATION

                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.title}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Family Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.family_name ? data.family_name : "N/A"}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Given Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.given_name}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Preferred Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.preferred_name}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                    {/* <dd className="mt-1 text-sm text-gray-900">{moment(data.dob, "MMM dd,YYY ")}</dd> */}
                                                    <dd className="mt-1 text-sm text-gray-900">{data.dob}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.gender}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.email}</dd>
                                                </div>


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                BASIC INFORMATION

                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.title}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Family Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.family_name ? data.family_name : "N/A"}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Given Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.given_name}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Preferred Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.preferred_name}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                    {/* <dd className="mt-1 text-sm text-gray-900">{moment(data.dob, "MMM dd,YYY ")}</dd> */}
                                                    <dd className="mt-1 text-sm text-gray-900">{data.dob}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Nationality</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.nationality}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.gender}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Hometown</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.hometown}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.email}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.address}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.phone}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Phone</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.home_telephone}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                CONTACT DETAILS



                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.address}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.phone}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Phone</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.home_telephone}</dd>
                                                </div>
                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                NATIONALITY/CITIZENSHIP



                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Nationality</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.nationality}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Country Of Birth</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.country_of_birth}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Passport Number</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.passport_no}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Other Countries CitizenShip</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.other_countries_citizenship}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Do you hold Permanent Resident status in New Zealand or Australia?</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.permanent_resident_status}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                ENGLISH PROFICIENCY




                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">IELTS or TOEFL score</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.ielts_toefl_score}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Other Proficiency Score</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.other_proficiency_score}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Will you be studying English in New Zealand before starting at UCIC?</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.studying_english}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">If “Yes”, name of school:</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.school_name}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">When? (Dates)</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.start_date}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                EDUCATION DETAILS (Secondary Education – highest level achieved)





                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">School attended</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.school_attended}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Name of qualiﬁcation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.name_of_qualification}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Country</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.country}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Language of Institution</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.language_of_instruction}</dd>
                                                </div>


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                            Post-secondary and further education






                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Institution attended</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.institution_attended}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Name of qualiﬁcation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.name_of_qualification}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Completed?</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.completed}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Expected Completion Date</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.expected_completion_date}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Have you previously undertaken any study in New Zealand?</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.taken_study_in_newzealand}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Attached Details for Study</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.attach_details}</dd>
                                                </div>


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                MARITAL STATUS AND FAMILY INFORMATION



                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Marital Status</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.marritalStatus}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Spouse</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.spouse}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Children</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.children}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Date Attended To</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.dateAttendedTo}</dd>
                                                </div>


                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Qualification</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.qualification}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Work Experience</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.workExperience}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                FATHER’S INFORMATION




                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Surname</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fSurname}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Other Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fOtherName}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Nationality   </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fNationality}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Town</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fHometown}</dd>
                                                </div>


                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fOccupation}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.fContact}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                MOTHER'S INFORMATION




                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Surname</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mSurname}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Other Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mOtherName}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Nationality   </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mNationality}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Town</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mHometown}</dd>
                                                </div>


                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mOccupation}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.mContact}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                EMERGENCY CONTACT





                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Surname</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_surname}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Other Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_otherName}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Nationality   </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_nationality}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Town</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_hometown}</dd>
                                                </div>


                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_occupation}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.emergency_contact}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                                GUARANTOR’S INFORMATION






                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Surname</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_surname}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Other Name</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_otherName}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Nationality   </dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_nationality}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Home Town</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_hometown}</dd>
                                                </div>


                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_occupation}</dd>
                                                </div>

                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Contact</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_contact}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Relation With Applicant</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_relation}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Place of Work</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_placeofwork}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Name of Employer</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_ID}</dd>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <dt className="text-sm font-medium text-gray-500">Guarantor ID No.</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.guarantor_ID}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">







                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                            FUTURE CAREER INTENTIONS







                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    {/* <dt className="text-sm font-medium text-gray-500">Institution attended</dt> */}
                                                    <dd className="mt-1 text-sm text-gray-900">{data.career_intentions}</dd>
                                                </div>
                                         


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                            ACCOMODATION








                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Accomodation Required</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.require_accommodation}</dd>
                                                </div>
                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Type of  Accomodation</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.type_of_accommodation}</dd>
                                                </div>
                                         


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                            AIRPORT RECEPTION









                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Airport Pickup Required</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.airport_reception}</dd>
                                                </div>
                                              
                                         


                                            </dl>
                                        </div>
                                        <div className="px-4 py-5 sm:px-6">
                                            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                                            REQUEST FOR LEARNING SUPPORT










                                            </h2>
                                            {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-1">

                                                    <dt className="text-sm font-medium text-gray-500">Learning Support Request Details</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">{data.request_for_learning_support}</dd>
                                                </div>
                                              
                                         


                                            </dl>
                                        </div>

                                    </div>
                                </section>

                                {/* Comments*/}

                            </div>

                            <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                    <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                        Timeline
                                    </h2>

                                    {/* Activity Feed */}
                                    <div className="mt-6 flow-root">
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
                                    </div>
                                    {/* <div className="justify-stretch mt-6 flex flex-col">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Advance to offer
                                    </button>
                                </div> */}
                                </div>
                                <div className="mt-3 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                            Notes
                                        </h2>

                                        {/* Activity Feed */}
                                        <div className="mt-6 flow-root">
                                            <ul role="list" className="-mb-8">
                                                {notesForThisApplication.map((item, itemIdx) => (
                                                    <li key={item.id} className=' '>
                                                        <div className="relative pb-8">
                                                         
                                                            <div className="relative flex space-x-3">
                                                            
                                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                                    <div>
                                                                        <p className="text-sm text-gray-700">
                                                                            {item.note}{' '}
                                                                        
                                                                        </p>
                                                                    </div>
                                                                    <div className="whitespace-nowrap text-right text-[13px] text-gray-500 flex flex-col">
                                                                        <time dateTime={item.createdAt}>{format(Date.parse(item.createdAt), "MMM dd") }</time>
                                                                        {/* <span>By {item.createdBy}</span> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* {itemIdx !=  notesForThisApplication.length - 1 &&  <div     className='border-b mx-[-24px]'></div> } */}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* <div className="justify-stretch mt-6 flex flex-col">
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Advance to offer
                                    </button>
                                </div> */}
                                    </div>
                            </section>
                        </div>
                    </main>}
                    <UpdateApplicationPopup setOpen={setUpdateOpen} open={updateOpen} onUpdateConfirm={onUpdateConfirm} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} selectedPaymentStatus={selectedPaymentStatus} setSelectedPaymentStatus={setSelectedPaymentStatus} selectedPaymentMethod={selectedPaymentMethod} setSelectedPaymentMethod={setSelectedPaymentMethod} selectedPaidAmount={selectedPaidAmount} setSelectedPaidAmount={setSelectedPaidAmount} />
                        <AddNotePopup setOpen={setAddNoteOpen} open={addNoteOpen} handleNoteAdd={handleNoteAdd} note={note} setNote={setNote} />
                    </div>
                    {updateError && <ErrorNotification errorMessage={updateError} show={!!updateError} setShow={()=>{
                        setUpdateError("")
                       
                    }}/>}
                    {updateSuccess && <SuccessNotification message={updateSuccess} show={!!updateSuccess} setShow={()=>{
                        setUpdateSuccess("")
                       
                    }}/>}
                    {addNoteError && <ErrorNotification errorMessage={addNoteError} show={!!addNoteError} setShow={()=>{
                        setAddNoteError("")
                       
                    }}/>}
                    {addNoteSuccess && <SuccessNotification message={"Note has been added"} show={addNoteSuccess} setShow={()=>{
                        setAddNoteSuccess(false)
                       
                    }}/>}
            </AlLoadingOverlay>
            </AlLoadingOverlay>

        </>
    )
}
