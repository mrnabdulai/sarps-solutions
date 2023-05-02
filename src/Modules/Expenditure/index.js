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
import { doSetExpenditure, doSetTickets } from './duck/action'
import { doLogout } from '../Auth/Login/duck/action'
import { exportToPdf } from '../../Shared/utils/export_utils'

function Expenditure() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [fetchError, setFetchError] = useState("")
    const [totalExpenditure, setTotalExpenditure] = useState(null)
    const [totalIncome, setTotalIncome] = useState(null)
    const dispatch = useDispatch()
    const fetchData = async () => {
        setData([])
        try {
            setFetching(true)
            setFetchError("")
            const response = await Axios.get("/api/expenditure/getExpenditures")
            if (response.status == 403) {
                localStorage.clear()
                dispatch(doLogout())
                window.location.replace('/login')
                return
            }
            setData(response.data)
            dispatch(doSetExpenditure(response.data))
            const totalExpenditureResponse = await Axios.get("/api/expenditure/getTotalExpenditure")
            const totalIncomeResponse = await Axios.get("/api/application/totalIncome")
            setTotalExpenditure(totalExpenditureResponse.data[0].total)
            setTotalIncome(totalIncomeResponse.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
            if (err.response) setFetchError(err.response.data[Object.keys(err.response.data)[0]])
            else setFetchError("An error occurred while fetching expenditure list")
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
                {/* <div class="px-4 pr-20 py-6 shadow-lg shadow-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 rounded-xl bg-green-400 p-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="mt-4 font-medium">Total expenditure</p>
                    <p class="mt-2 text-xl font-medium">
                        $23.4k
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </p>
                </div> */}
                <div className='flex-1 flex gap-x-10'>
                <div class="flex w-72  mt-7">
                    <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                        <div class="p-3">
                            <div class="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr bg-green-700 from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mt-4 h-7 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="pt-1 text-right">
                                <p class="text-sm font-light capitalize">Total Expenditure</p>
                                {totalExpenditure != null ? <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">GHC {totalExpenditure}</h4> :
                                    (<h4 className='text-2xl font-semibold tracking-tighter xl:text-2xl flex justify-end mt-2'>
                                        <svg class=" animate-spin -ml-1 mr-3 h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </h4>)

                                }
                            </div>
                        </div>
                        {/* <hr class="opacity-50" />
      <div class="p-4">
        <p class="font-light"><span class="text-sm font-bold text-red-600">-3% </span>vs last month</p>
      </div> */}
                    </div>
                </div>
                <div class="flex w-72  mt-7">
                    <div class="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                        <div class="p-3">
                            <div class="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr bg-indigo-700 from-emerald-700 to-emerald-500 text-center text-white shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="mt-4 h-7 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="pt-1 text-right">
                                <p class="text-sm font-light capitalize">Total Income</p>
                                {totalIncome != null ? <h4 class="text-2xl font-semibold tracking-tighter xl:text-2xl">GHC {totalIncome}</h4> :
                                    (<h4 className='text-2xl font-semibold tracking-tighter xl:text-2xl flex justify-end mt-2'>
                                        <svg class=" animate-spin -ml-1 mr-3 h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </h4>)

                                }
                            </div>
                        </div>
                        {/* <hr class="opacity-50" />
      <div class="p-4">
        <p class="font-light"><span class="text-sm font-bold text-red-600">-3% </span>vs last month</p>
      </div> */}
                    </div>
                </div>
                </div>
                <AlButton text="Add Expenditure" onClick={() => {
                    navigate('/app/accounts/income-and-expenditure/add')
                }} />

            </div>
            {/* Table section */}
            <div className='rounded-xl w-full px-2 py-3 bg-gray-100 border '>
                <div className='flex items-center justify-between mb-5'>
                    <div className='flex gap-x-2'>
                        <ExportBtn Icon={<img src='/images/export-icons/csv.png' className=' h-5 object-contain' />} text="CSV" />
                        <ExportBtn Icon={<img src='/images/export-icons/excel-app.png' className=' h-5 object-contain' />} text="Excel" />
                        <ExportBtn onClick={() => {
                            exportToPdf(data, "Income And Expenditure")
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
                                Bill Type
                            </th>
                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Description
                            </th>

                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5  text-sm font-semibold text-gray-900 sm:table-cell"
                            >Amount

                            </th>

                            <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Created By
                            </th>
                            {/* <th
                                scope="col"
                                align='center'

                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Status
                            </th> */}

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
                        {doneFetchingAndHasData() ? (data.map((item, index) => {

                            return (<tr key={item.id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {item.id}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">bill type</dt>
                                        <dd className="mt-1 truncate text-gray-700">{item.bill_type}</dd>
                                        <dt className="sr-only sm:hidden">Nill Description</dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{item.bill_description}</dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{item.bill_type}</td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {item.bill_description}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">
                                    {item.amount}GHC

                                </td>

                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {item.createdBy}

                                </td>


                                {/* <td className="hidden px-3 ppy-4 text-sm text-gray-500 sm:table-cell">
                                    <AlBadge status={item.status} statusText={item.status} />


                                </td> */}

                                <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{format(Date.parse(item.createdAt), 'MM/dd/yyyy')}</td>
                                <td className="py-4 text-right text-sm font-medium ">
                                    <div className='h-full w-full flex items-center justify-center gap-x-4' >
                                        <AlIconButton Icon={EyeIcon} colorClass="text-primary" onClick={() => {
                                            navigate("/app/accounts/income-and-expenditure/" + item.id)
                                        }} />
                                        {/* <AlIconButton Icon={PencilSquareIcon} colorClass="text-yellow-400" /> */}
                                        <AlIconButton Icon={TrashIcon} colorClass="text-error" />
                                    </div>

                                </td>
                            </tr>
                            )
                        }
                        )) : !fetching ? (<tr>
                            <td colspan={8} className="text-center py-4">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>


                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Expenditure records created yet</h3>
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

export default Expenditure