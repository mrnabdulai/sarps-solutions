import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import AlLoadingOverlay from "../../Shared/Components/AlLoadingOverlay";
import ErrorNotification from "../../Shared/Components/ErrorNotification";
import Axios from "../../Shared/utils/axios_instance";
import { nationalities } from "../../Shared/utils/countries";
import { Combobox } from '@headlessui/react'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function AddAccountPayable() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState(null)
    const people = [
        { id: 1, name: 'Leslie Alexander' },
        // More users...
    ]

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    const handleSubmit = async (e) => {
        setSubmitError("");
       
        setIsSubmitting(true);
        e.preventDefault()
        const title = e.target.title.value;
        const note = e.target.note.value;
        const status = e.target.status.value;
        const amount = e.target.amount.value;

        const currentAdmin = JSON.parse(localStorage.getItem("admin"));

        const createdBy = currentAdmin.id

        const data = {
            title,
            note,
            amount,
            createdBy,
            status,
            vendorId: ""
            //TODO: Resolve vendorId

        }

        try {
            const response = await Axios.post("/api/accountPayable/addAccountPayable", data);
            console.log(response);
            setIsSubmitting(false);

            navigate("/app/accounts/account-payable")
        }
        catch (err) {
            console.log(err);
            setIsSubmitting(false);

            setSubmitError("An error occured, please try again later")
        }

    }
    return (
        <AlLoadingOverlay show={isSubmitting} text="Adding account payable">
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mb-5">

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new account payable record record</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Title
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="note" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Note
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea
                                    rows="4"
                                    name="note"
                                    id="note"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Amount
                            </label>
                            {/* mt-1 sm:col-span-2 sm:mt-0 */}
                            <div className="relative mt-1 rounded-md  " >
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
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
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Status
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="status"
                                    name="status"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid </option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Vendor
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                {/* <select
                                    id="status"
                                    name="status"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid </option>
                                </select> */}
                                <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
                                    <div className="relative mt-1 max-w-lg sm:max-w-xs">
                                        <Combobox.Input
                                        placeholder="Search for a vendor"
                                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                            onChange={(event) => setQuery(event.target.value)}
                                            displayValue={(person) => person?.name}
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </Combobox.Button>

                                        {filteredPeople.length > 0 && (
                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {filteredPeople.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        value={person}
                                                        className={({ active }) =>
                                                            classNames(
                                                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                            )
                                                        }
                                                    >
                                                        {({ active, selected }) => (
                                                            <>
                                                                <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>

                                                                {selected && (
                                                                    <span
                                                                        className={classNames(
                                                                            'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
                                                                            active ? 'text-white' : 'text-indigo-600'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}
                                    </div>
                                </Combobox>
                            </div>
                        </div>




                    </div>
                </div>

                <div className="pt-5 pr-5">
                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate("/app/general/tickets")}
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
            {submitError && <ErrorNotification message={submitError} />}
        </AlLoadingOverlay>
    )
}
