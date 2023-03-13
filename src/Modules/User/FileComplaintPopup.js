import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import Axios from '../../Shared/utils/axios_instance'

export default function FileComplaintPopup({ open, setOpen }) {
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const topic = e.target.topic.value
        const complaint = e.target.complaint.value
        console.log(topic, complaint)
        setSubmitting(true)
        setSubmitError("")
        try {

            const userDetails = JSON.parse(sessionStorage.getItem("user"))
            const response = await Axios.post("/api/complaint/addComplaint", {
                topic,
                complaint,
                createdBy: userDetails.id,
                status: "pending"
            }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    Accept: "application/json",
                }
            })

            setSubmitting(false)

            setOpen(false)
            window.location.replace("/user/complaints")
        }
        catch (err) {
            setSubmitError("An error occured while submitting your complaint. Please try again later.")
            setSubmitting(false)

            console.log(err)

        }
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

                <form onSubmit={handleSubmit} className="fixed inset-0 z-10 overflow-y-auto">
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>

                                    <div className="mt-3 sm:mt-5">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                                            File A Complaint
                                        </Dialog.Title>

                                        <div className='mt-4'>
                                            <label for="topic" class="block text-sm font-medium text-gray-700">Topic</label>
                                            <div class="mt-1">
                                                <input disabled={submitting}
                                                    type="text" name="topic" id="topic" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <label for="complaint" class="block text-sm font-medium text-gray-700">Complaint</label>
                                            <div class="mt-1">
                                                <textarea disabled={submitting} id="complaint" name="complaint" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                            </div>
                                            <p class="mt-2 text-sm text-gray-500">Brief description for your issue</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                    >
                                        {submitting && <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx={12}
                                                cy={12}
                                                r={10}
                                                stroke="currentColor"
                                                strokeWidth={4}
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        }
                                        Submit Complaint
                                    </button>
                                </div>
                                {submitError && <div className="mt-2 text-error text-sm">{submitError}</div>}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </form>
            </Dialog>
        </Transition.Root>
    )
}
