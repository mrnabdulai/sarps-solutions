import React, { useEffect, useState } from 'react'
import AlButton from '../../Shared/Components/AlButton'
import { EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
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
import { doSetJobs } from './duck/action'
import { doLogout } from '../Auth/Login/duck/action'
import { exportToPdf } from '../../Shared/utils/export_utils'

function Jobs() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const dispatch = useDispatch()
    const fetchData = async () => {
        setData([])
        try {
            setFetching(true)
            setFetchError("")
            const response = await Axios.get("/api/vendor/getVendors")
            if (response.status == 403) {
                localStorage.clear()
                dispatch(doLogout())
                window.location.replace('/login')
                return
            }
            setData(response.data)
            dispatch(doSetJobs(response.data))
            console.log(response.data)
        } catch (err) {
            console.log(err)
            if (err.response) setFetchError(err.response.data[Object.keys(err.response.data)[0]])
            else setFetchError("An error occurred while fetching vendors list")
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
                <AlSectionHeader>Vendors</AlSectionHeader>
                <AlButton text="Add New Vendor" onClick={() => {
                    navigate('/app/vendors/add')
                }} />

            </div>
            {/* Table section */}
            <div className='rounded-xl w-full px-2 py-3 bg-gray-100 border '>
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex gap-x-2'>
                        <ExportBtn Icon={<img src='/images/export-icons/csv.png' className=' h-5 object-contain' />} text="CSV" />
                        <ExportBtn Icon={<img src='/images/export-icons/excel-app.png' className=' h-5 object-contain' />} text="Excel" />
                        <ExportBtn onClick={() => {
                            exportToPdf(data, "Jobs")
                        }} Icon={<img src='/images/export-icons/pdf-file.png' className=' h-5 object-contain' />} text="PDF" />                      </div>
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
                                Name of Vendor
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Country
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Contact
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Type of Job
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Job Name
                            </th>
                            <th align='center' scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                                No. of Workers
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
                        {doneFetchingAndHasData() ? (data.map((vendor, index) => {

                            return (<tr key={vendor.id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {vendor.id}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">name</dt>
                                        <dd className="mt-1 truncate text-gray-700">{vendor.name}</dd>
                                        <dt className="sr-only sm:hidden">address</dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{vendor.country}</dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{vendor.name}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {vendor.country}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {vendor.address}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {vendor.contact}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {vendor.type_of_job}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {vendor.job_name}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">
                                    {vendor.number_of_workers}

                                </td>


                                {/* <td className="hidden px-3 ppy-4 text-sm text-gray-500 sm:table-cell">
                                    <AlBadge status={vendor.status} statusText={vendor.status} />


                                </td> */}

                                <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{format(Date.parse(vendor.createdAt), 'MM/dd/yyyy')}</td>
                                <td className="py-4 text-right text-sm font-medium ">
                                    <div className='h-full w-full flex items-center justify-center gap-x-4' >
                                        <AlIconButton Icon={EyeIcon} colorClass="text-primary" onClick={() => {
                                            navigate("/app/vendors/" + vendor.id)
                                        }} />
                                        {/* <AlIconButton Icon={PencilSquareIcon} colorClass="text-yellow-400" /> */}
                                        <AlIconButton Icon={TrashIcon} colorClass="text-error" />
                                    </div>

                                </td>
                            </tr>
                            )
                        }
                        )) : !fetching ? (<tr>
                            <td colspan={10} className="text-center py-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>


                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Vendors added yet</h3>
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
                                <td className="hidden px-3 py-4 text-sm h-2 bg-slate-700 rounded sm:table-cell">

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

export default Jobs