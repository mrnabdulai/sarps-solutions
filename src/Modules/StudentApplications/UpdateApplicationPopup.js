import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const people = [
//   {
//     id: 1,
//     name: 'Wade Cooper',
//     avatar:
//       'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 2,
//     name: 'Arlene Mccoy',
//     avatar:
//       'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 3,
//     name: 'Devon Webb',
//     avatar:
//       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
//   },
//   {
//     id: 4,
//     name: 'Tom Cook',
//     avatar:
//       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 5,
//     name: 'Tanya Fox',
//     avatar:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 6,
//     name: 'Hellen Schmidt',
//     avatar:
//       'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 7,
//     name: 'Caroline Schultz',
//     avatar:
//       'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 8,
//     name: 'Mason Heaney',
//     avatar:
//       'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 9,
//     name: 'Claudie Smitham',
//     avatar:
//       'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
//   {
//     id: 10,
//     name: 'Emil Schaefer',
//     avatar:
//       'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//   },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function UpdateApplicationPopup({ onUpdateConfirm, open, setOpen, selectedStatus, setSelectedStatus, selectedPaymentStatus, setSelectedPaymentStatus, selectedPaymentMethod, setSelectedPaymentMethod, selectedPaidAmount, setSelectedPaidAmount }) {
  // const [selected, setSelected] = useState(people[3])


  const cancelButtonRef = useRef(null)
  const handleSubmit = () => {
    onUpdateConfirm()

  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* < className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"> */}
              <Dialog.Panel className="bg-white shadow sm:rounded-lg relative transform overflow-hidden rounded-lg  px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Update application status</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Select new status for this application</p>
                  </div>
                  <div className="mt-5 ">
                    <div className="w-full sm:max-w-xs mt-2.5">
                      <label for="status" class="block text-sm font-medium text-gray-700">Application status</label>


                      <select id="status" onChange={(e) => {
                        setSelectedStatus(e.target.value)
                      }} name="status" value={selectedStatus} class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="started">Started</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="w-full sm:max-w-xs mt-3 mb-4 ">
                      <label for="status" class="block text-sm font-medium text-gray-700">Payment Status</label>


                      <select id="status" value={selectedPaymentStatus} onChange={(e) => {
                        setSelectedPaymentStatus(e.target.value)
                      }} name="payment_status" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value="paid">Paid</option>
                        <option value="not_paid">Not Paid</option>
                        <option value="part_payment">Part Payment</option>

                      </select>
                    </div>
                    <div className="w-full sm:max-w-xs mt-3 mb-4 ">
                      <label for="status" class="block text-sm font-medium text-gray-700">Payment Status</label>


                      <select id="status" value={selectedPaymentStatus} onChange={(e) => {
                        setSelectedPaymentStatus(e.target.value)
                      }} name="payment_status" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value="paid">Paid</option>
                        <option value="not_paid">Not Paid</option>
                        <option value="part_payment">Part Payment</option>

                      </select>
                    </div>
                    <div className="w-full sm:max-w-xs mt-3 mb-4 ">
                      <label for="status" class="block text-sm font-medium text-gray-700">Payment Method</label>


                      <select id="payment_method" value={selectedPaymentMethod} onChange={(e) => {
                        setSelectedPaymentMethod(e.target.value)
                      }} name="payment_method" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value={null}></option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="mobile_money">Mobile Money</option>

                      </select>
                      <div className="w-full sm:max-w-xs mt-3 mb-4 ">

                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                          Amount
                        </label>
                        {/* mt-1 sm:col-span-2 sm:mt-0 */}
                        <div className="relative mt-1 rounded-md  " >
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            min={0}
                            defaultValue={selectedPaidAmount}
                            onChange={(e) => {
                              setSelectedPaidAmount(e.target.value)
                            }}

                            className="block w-full max-w-lg rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                            placeholder=""
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="h-5 w-5 inline-block text-gray-400 md:mr-6 mr-3" aria-hidden="true" >
                              GHC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:max-w-xs flex justify-end " >
                      <button
                        // type="submit"
                        onClick={onUpdateConfirm}
                        className="mt-3 inline-flex  w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
              {/* </> */}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
