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

function UserApplicationsList() {
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
            const {id} = JSON.parse(sessionStorage.getItem("user"))
            console.log("user id is ", id)
            const response = await Axios.get(`/api/application/getApplicationByUserId/${id}`, {
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
    return (
        <main className="relative -mt-32">
            <div className="mx-auto max-w-screen-lg px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <section className='px-10 py-8'>
                        <div className="items-center flex justify-between mb-5">
                            <AlSectionHeader>Your Applications</AlSectionHeader>
                            <AlButton text="Add New Application" onClick={() => {
                                navigate('/user/add')
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
                                        {data.length > 0 && data.map((application, index) => {
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
                                                    {/* <AlBadge status={mapPaymentStatusToStatus(application.payment_status)} statusText={sentenceCase(application.payment_status)} /> */}
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
                                        )}
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
        </main>
    )
}

export default UserApplicationsList