import React from 'react'
import AlButton from '../../Shared/Components/AlButton'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

import AlIconButton from '../../Shared/Components/AlIconButton'
import AlSearchInput from '../../Shared/Components/AlSearchInput'
import AlSectionHeader from '../../Shared/Components/AlSectionHeader'
import TablePagination from '../../Shared/Components/TablePagination'
import ExportBtn from '../../Shared/Components/ExportBtn'
import { clients } from './mock/clients'

function ClientList() {
    const nvaigate = useNavigate()

  return (
    <section className='pr-5'>
    <div className="items-center flex justify-between mb-5">
        <AlSectionHeader>Clients</AlSectionHeader>
        <AlButton text="Add New Client" onClick={()=>{
            // nvaigate('/app/user-management/roles/add')
        }}/>

    </div>
    {/* Table section */}
    <div className='rounded-xl w-full px-2 py-3 bg-gray-100 border '>
        <div className='flex items-center justify-between mb-5'>
            <div className='flex gap-x-2'>
                <ExportBtn  Icon={<img src='/images/export-icons/csv.png' className=' h-5 object-contain' />} text="CSV" />
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
                {clients.map((client, index) => (
                    <tr key={index}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                            {index}
                            <dl className="font-normal lg:hidden">
                                <dt className="sr-only">name</dt>
                                <dd className="mt-1 truncate text-gray-700">{client.name}</dd>
                                <dt className="sr-only sm:hidden">email</dt>
                                <dd className="mt-1 truncate text-gray-500 sm:hidden">{client.phone}</dd>
                            </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{client.name}</td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                               {client.phone}
                            
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                               {client.address}
                            
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                               {client.email}
                            
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{client.createdAt}</td>
                        <td className="py-4 text-right text-sm font-medium ">
                            <div className='h-full w-full flex items-center justify-center gap-x-4' >
                                <AlIconButton Icon={EyeIcon} colorClass="text-primary" />
                                <AlIconButton Icon={PencilSquareIcon} colorClass="text-yellow-400" />
                                <AlIconButton Icon={TrashIcon} colorClass="text-error" />
                            </div>

                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
     <TablePagination total={199} onPageChange={(currentPage)=>{
        console.log(currentPage)
     }}   onRowsPerPageChange={(rowsPerPage) =>{
            console.log(rowsPerPage)
     }} />
    </div>
</section>
  )
}

export default ClientList