import React, { useEffect, useState } from 'react'
import AlButton from '../../Shared/Components/AlButton'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { sentenceCase } from "change-case";
import AlIconButton from '../../Shared/Components/AlIconButton'
import AlSearchInput from '../../Shared/Components/AlSearchInput'
import AlSectionHeader from '../../Shared/Components/AlSectionHeader'
import TablePagination from '../../Shared/Components/TablePagination'
import ExportBtn from '../../Shared/Components/ExportBtn'
import Axios from '../../Shared/utils/axios_instance'
import { useDispatch } from 'react-redux'
// import { doSetApplications } from './duck/action'
import AlBadge from '../../Shared/Components/AlBadge'
import FileComplaintPopup from './FileComplaintPopup'

function UserComplaints() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState([])
    const [complaintPopupOpen, setComplaintPopupOpen] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const dispatch = useDispatch()
    const fetchData = async () => {
        setData([])
        try {
            setFetching(true)
            setFetchError("")
            const { id } = JSON.parse(sessionStorage.getItem("user"))
            console.log("user id is ", id)
            const response = await Axios.get(`/api/complaint/getComplaints/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    Accept: "application/json",
                }
            })
            setData(response.data)
            // dispatch(doSetApplications(response.data))
            console.log(response.data)
        } catch (err) {
            console.log(err)
            if (err.response) setFetchError(err.response.data[Object.keys(err.response.data)[0]])
            else setFetchError("An error occurred while fetching applications")
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
    return (
        <main className="relative -mt-32">
            <div className="mx-auto max-w-screen-lg px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <section className='px-10 py-8'>
                        <div className="items-center flex justify-between mb-5">
                            <AlSectionHeader>Your Complaints</AlSectionHeader>
                            <AlButton text="File a complaint" onClick={() => {
                                setComplaintPopupOpen(true)
                            }} />

                        </div>
                        {/* Table section */}
                        <div className='rounded-xl w-full px-2 py-3 '>
                            <div className='flex items-center justify-between mb-5'>
                                {/* <div className='flex gap-x-2'>
                                    <ExportBtn Icon={<img src='/images/export-icons/csv.png' className=' h-5 object-contain' />} text="CSV" />
                                    <ExportBtn Icon={<img src='/images/export-icons/excel-app.png' className=' h-5 object-contain' />} text="Excel" />
                                    <ExportBtn Icon={<img src='/images/export-icons/pdf-file.png' className=' h-5 object-contain' />} text="PDF" />
                                </div> */}
                                <AlSearchInput placeholder="Search " />
                            </div>
                            <div class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-t-lg">                                <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th align='center' scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                        >
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            align='center'

                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            align='center'

                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Complain
                                        </th>

                                        <th
                                            scope="col"
                                            align='center'

                                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Status
                                        </th>

                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                            Actions
                                        </th>
                                        {/* <th scope="col" className="">
          <span className="sr-only">Edit</span>
        </th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {doneFetchingAndHasData() ? (data.map((complaint, index) => {

                                        return (<tr key={complaint.id}>
                                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                                {complaint.id}
                                                <dl className="font-normal lg:hidden">
                                                    <dt className="sr-only">user</dt>
                                                    <dd className="mt-1 truncate text-gray-700">{complaint.user}</dd>
                                                    <dt className="sr-only sm:hidden">title</dt>
                                                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{complaint.title}</dd>
                                                </dl>
                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{complaint.user}</td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {complaint.title}

                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {complaint.complaint}

                                            </td>

                                            <td className="hidden px-3 ppy-4 text-sm text-gray-500 sm:table-cell">
                                                <AlBadge status={complaint.status} statusText={complaint.status} />


                                            </td>

                                            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{format(Date.parse(complaint.createdAt), 'MM/dd/yyyy')}</td>
                                            <td className="py-4 text-right text-sm font-medium ">
                                                <div className='h-full w-full flex items-center justify-center gap-x-4' >
                                                    <AlIconButton Icon={EyeIcon} colorClass="text-primary" onClick={() => {
                                                        navigate("/app/complaints/" + complaint.id)
                                                    }} />
                                                    {/* <AlIconButton Icon={PencilSquareIcon} colorClass="text-yellow-400" /> */}
                                                    <AlIconButton Icon={TrashIcon} colorClass="text-error" />
                                                </div>

                                            </td>
                                        </tr>
                                        )
                                    }
                                    )) : !fetching ? (
                                        <tr>
                                            <td colspan={7} className="text-center py-4">

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                                </svg>


                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Complaints filed yet</h3>
                                                <p className="mt-1 text-sm text-gray-500">Get started by filling a complaint.</p>
                                                <div className="mt-6">

                                                </div>

                                            </td>
                                        </tr>
                                    ) : (<div></div>)}
                                    { }
                                    {fetching && [0, 0, 0, 0].map((shimmer, index) => (
                                        <tr key={index} className="animate-pulse">
                                            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium h-2 bg-slate-700 rounded sm:w-auto sm:max-w-none sm:pl-6">
                                                <div className='h-5 w-5  bg-gray-300 rounded'></div>


                                            </td>
                                            <td className="hidden px-3 py-4 text-sm  rounded lg:table-cell">
                                                <div className='h-2 bg-gray-300 rounded'></div>
                                            </td>
                                            <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">
                                                <div className='h-2 bg-gray-300 rounded'></div>


                                            </td>
                                            <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">

                                                <div className='h-2 bg-gray-300 rounded'></div>

                                            </td>
                                            <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">

                                                <div className='h-2 bg-gray-300 rounded'></div>

                                            </td>

                                            <td className="hidden px-3 py-4 text-sm text-center h-2 bg-slate-700 rounded sm:table-cell">
                                                <div className='h-2 bg-gray-300 rounded'></div>

                                            </td>
                                            <td className="hidden px-3 py-4 text-sm text-center h-2 bg-slate-700 rounded sm:table-cell">
                                                <div className="flex items-center justify-center  gap-x-2">
                                                    <div className='h-5 w-5  bg-gray-300 rounded'></div>
                                                    <div className='h-5 w-5  bg-gray-300 rounded'></div>
                                                    <div className='h-5 w-5  bg-gray-300 rounded'></div>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            </div>
                            {/* {data.length > 0 && <TablePagination total={data.length} onPageChange={(currentPage) => {
                                console.log(currentPage)
                            }} onRowsPerPageChange={(rowsPerPage) => {
                                console.log(rowsPerPage)
                            }} />
                            } */}
                        </div>
                    </section>
                </div>
            </div>
            <FileComplaintPopup open={complaintPopupOpen} setOpen={setComplaintPopupOpen}/>
        </main>
    )
}

export default UserComplaints