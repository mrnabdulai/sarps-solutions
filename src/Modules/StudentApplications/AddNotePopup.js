import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function AddNotePopup({ open, setOpen,handleNoteAdd, note, setNote }) {
  // const [selected, setSelected] = useState(people[3])


  const cancelButtonRef = useRef(null)
  const handleSubmit = () => {
    handleNoteAdd()

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
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add a note for this application</h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    {/* <p>Select new status for this application</p> */}
                  </div>
                  <div className="mt-3 ">
                    <div className="w-full sm:max-w-xs mt-2.5 mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Note
                                </label>
                                <div className="mt-2 sm:col-span-2 sm:mt-2">
                                    <textarea
                                        id="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        name="note"
                                        rows={4}
                                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
                                        defaultValue={''}
                                    />
                                </div>
                    </div>
                    <div className="w-full sm:max-w-xs flex justify-end " >
                      <button
                        // type="submit"
                        onClick={handleNoteAdd}
                        className="mt-3 inline-flex  w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Add
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
