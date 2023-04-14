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
import { doSetApplications } from './duck/action'
import AlBadge from '../../Shared/Components/AlBadge'
import { doLogout } from '../Auth/Login/duck/action'

function ApplicationList() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState([])
    const [fetchError, setFetchError] = useState("")
    const dispatch = useDispatch()
    const fetchData = async () => {
        setData([])
        try {
            setFetching(true)
            setFetchError("")
            const response = await Axios.get("/api/application/getApplications")
            if (response.status == 403) {
                localStorage.clear()
                dispatch(doLogout())
                window.location.replace('/login')
                return
            }

            setData(response.data)
            dispatch(doSetApplications(response.data))
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
        <section className='pr-5'>
            <div className="items-center flex justify-between mb-5">
                <AlSectionHeader>Applications</AlSectionHeader>
                <AlButton text="Add New Application" onClick={() => {
                    navigate('/user/add')
                }} />

            </div>
            {/* Table section */}
            <div className='rounded-xl w-full px-2 py-3 bg-gray-100 border '>
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex gap-x-2'>
                        <ExportBtn Icon={<img src='/images/export-icons/csv.png' className=' h-5 object-contain' />} text="CSV" />
                        <ExportBtn Icon={<img src='/images/export-icons/excel-app.png' className=' h-5 object-contain' />} text="Excel" />
                        <ExportBtn Icon={<img src='/images/export-icons/pdf-file.png' className=' h-5 object-contain' />} text="PDF" />
                    </div>
                    <AlSearchInput placeholder="Search " />
                </div>
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th align='center' scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                #
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Phone
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Location
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Email
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Payment Status
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
                        {doneFetchingAndHasData() ? (data.map((application, index) => {
                            const mapPaymentStatusToStatus = () => {
                                if (application.payment_status === "not_paid") return "rejected"
                                if (application.payment_status === "part_payment") return "pending"
                                if (application.payment_status === "paid") return "success"
                            }
                            return (<tr key={application.id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {application.id}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">name</dt>
                                        <dd className="mt-1 truncate text-gray-700">{application.surname} {application.otherNames}</dd>
                                        <dt className="sr-only sm:hidden">email</dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{application.phone}</dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{application.surname} {application.otherNames}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {application.phone}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {application.residence}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {application.email}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    <AlBadge status={application.reg_status} statusText={application.reg_status} />


                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">

                                    <AlBadge status={"rejected"} statusText={"Not paid"} />

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{format(Date.parse(application.createdAt), 'MM/dd/yyyy')}</td>
                                <td className="py-4 text-right text-sm font-medium ">
                                    <div className='h-full w-full flex items-center justify-center gap-x-4' >
                                        <AlIconButton Icon={EyeIcon} colorClass="text-primary" onClick={() => {
                                            navigate("/app/applications/" + application.id)
                                        }} />
                                        <AlIconButton Icon={PencilSquareIcon} colorClass="text-yellow-400" />
                                        <AlIconButton Icon={TrashIcon} colorClass="text-error" />
                                    </div>

                                </td>
                            </tr>
                            )
                        }
                        )) : !fetching ? (<tr>
                            <td colspan={9} className="text-center py-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>


                                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications submitted yet</h3>
                                {/* <p className="mt-1 text-sm text-gray-500">Get started by filling a complaint.</p> */}
                                <div className="mt-6">

                                </div>

                            </td>
                        </tr>) : (<div></div>)}
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
                {data.length > 0 && <TablePagination total={data.length} onPageChange={(currentPage) => {
                    console.log(currentPage)
                }} onRowsPerPageChange={(rowsPerPage) => {
                    console.log(rowsPerPage)
                }} />
                }
            </div>
        </section>
    )
}

export default ApplicationList