import { Fragment, useEffect, useState } from 'react'
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import Axios from '../../Shared/utils/axios_instance';
import { doLogout } from '../Auth/Login/duck/action';
import { format } from 'date-fns'
import AlLoadingOverlay from '../../Shared/Components/AlLoadingOverlay';
import SuccessNotification from '../../Shared/Components/SuccessNotification';
import { reverseString, yyyyMMDDtoDDMMYYYY } from '../../Shared/utils/data_structures';
import { data } from 'autoprefixer';
import EventList from './EventsList';

const meetings = [
    {
        id: 1,
        date: 'January 10th, 2022',
        time: '5:00 PM',
        datetime: '2022-01-10T17:00',
        name: 'Leslie Alexander',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        location: 'Starbucks',
    },
    // More meetings...
]
const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Events() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const [value, onChange] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [currentEvents, setCurrentEvents] = useState([])
    const dispatch = useDispatch()
    const fetchData = async () => {
        setData([])
        try {
            setFetching(true)
            setFetchError("")
            const response = await Axios.get("/api/event/getEvents")
            if (response.status == 403) {
                localStorage.clear()
                dispatch(doLogout())
                window.location.replace('/login')
                return
            }
            setData(response.data)
            if (currentEvents.length > 0) {
                setCurrentEvents(response.data.filter(x =>  { 
                    console.log(x.date === format(value, "dd-MM-yyyy"));
                   return  x.date === format(value, "dd-MM-yyyy")}))

            }
            // dispatch(doSetComplaints(response.data))
            console.log(response.data)
        } catch (err) {
            console.log(err)
            if (err.response) setFetchError(err.response.data[Object.keys(err.response.data)[0]])
            else setFetchError("An error occurred while fetching events")
        }
        finally {
            setFetching(false)

        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const doneFetchingAndHasData = () => {
        return !fetching && data.length > 0
    }
    const handleSubmit = async (e) => {
        setSubmitError("");
        setIsSubmitting(true);
        e.preventDefault()

        const title = e.target.title.value;
        const description = e.target.description.value;
        const date = e.target.date.value;

        // const role = e.target.role.value;   



        const currentAdmin = JSON.parse(localStorage.getItem("admin"));
        const createdBy = currentAdmin.id;
        const data = {
            title,
            createdBy,
            description,
            date: yyyyMMDDtoDDMMYYYY(date),




        }
        console.log(data)

        try {
            const response = await Axios.post("/api/event/addEvent", data);
            console.log(response);
            setIsSubmitting(false);
            setAddSuccess(true)
            //Reset form
            fetchData()
            e.target.reset()
            // navigate("/app/jobs")
        }
        catch (err) {
            console.log(err);
            setIsSubmitting(false);

            setSubmitError("An error occured, please try again later")
        }

    }
    const tileClassName = ({ activeStartDate, date, view }) => {
        const isSelected = date.toDateString() === value.toDateString();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isSameMonth = view === 'month' && date.getMonth() === activeStartDate.getMonth();
        const isCurrentMonth = view === 'month' && isSameMonth;
        const isPrevMonth = view === 'month' && date.getMonth() < activeStartDate.getMonth();
        const isNextMonth = view === 'month' && date.getMonth() > activeStartDate.getMonth();
        const hasEvents = data.find(x => x.date === format(date, "dd-MM-yyyy"))

        return [
            'text-center',
            'w-full',
            'py-2',
            'rounded-full',
            'cursor-pointer',
            hasEvents ? isSelected ? "bg-blue-500 text-white" : 'bg-green-500 text-white' : '',
            isSelected ? 'bg-blue-500 text-white' : '',
            isWeekend ? 'text-red-500' : '',
            isPrevMonth ? 'text-gray-400' : '',
            isNextMonth ? 'text-gray-400' : '',
            isCurrentMonth ? isSelected ? "" : 'bg-gray-200' : "",
        ].filter(Boolean).join(' ');
    };
    return (
        <AlLoadingOverlay show={isSubmitting} text="Adding Event">
            <div className='pr-5'>
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">

                    <div className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                <div className="space-y-6 sm:space-y-5">
                                    <div>
                                        <h3 className="text-xl font-medium leading-6 text-gray-900 mb-3 ">Add a new event</h3>
                                        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            This information will be displayed publicly so be careful what you share.
                          </p> */}
                                    </div>
                                    <div className="space-y-6 sm:space-y-5">
                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Title
                                            </label>
                                            {/* mt-1 sm:col-span-2 sm:mt-0 */}
                                            <div className="relative mt-1 rounded-md  " >
                                                <input
                                                    type="text"
                                                    name="title"

                                                    required className="block w-full max-w-lg rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Description
                                            </label>
                                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                                <textarea
                                                    required
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
                                                    defaultValue={''}
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Date
                                            </label>
                                            {/* mt-1 sm:col-span-2 sm:mt-0 */}
                                            <div className="relative mt-1 rounded-md  " >
                                                <input
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    required
                                                    className="block w-full max-w-lg rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-5 pr-5">
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="ml-3 w-full sm:max-w-sm inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add Event
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mt-10 col-span-4 lg:mt-9">
                        <Calendar
                            className="bg-white p-4 rounded-lg shadow-lg mb-2 text-center w-full max-w-2xl"
                            tileClassName={tileClassName}

                            calendarType="US"
                            prev2Label={null}
                            next2Label={null}
                            minDetail="year"

                            onChange={(nextValue) => {
                                onChange(nextValue)
                                setCurrentEvents(data.filter(x => x.date === format(nextValue, "dd-MM-yyyy")))
                            }} value={value}
                        //  tileClassName={
                        //     ({ date, view }) => {
                        //         console.log(format(date, "dd-MM-yyyy"))
                        //         if (data.find(x => x.date === format(date, "dd-MM-yyyy"))) {
                        //             return 'bg-green-500 text-white'
                        //         } else {
                        //             return 'text-gray-600'
                        //         }
                        //     }
                        // }
                        />
                        <EventList events={currentEvents} />
                    </div>
                </div>
            </div>
            <SuccessNotification show={addSuccess} setShow={setAddSuccess} message={"Event added to calender"} />
        </AlLoadingOverlay>
    )
}
