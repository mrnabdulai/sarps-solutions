import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlLoadingOverlay from "../../Shared/Components/AlLoadingOverlay";
import ErrorNotification from "../../Shared/Components/ErrorNotification";
import Axios from "../../Shared/utils/axios_instance";
import { nationalities } from "../../Shared/utils/countries";

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
export default function AddExpenditure() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setSubmitError("");
        setIsSubmitting(true);
        e.preventDefault()
        const bill_type = e.target.bill_type.value;
        const description = e.target.description.value;
        // const status = e.target.status.value;
        const amount = e.target.amount.value;
       
        const currentAdmin = JSON.parse(localStorage.getItem("admin"));

        const createdBy = currentAdmin.id

        const data = {
            bill_type,
            bill_description: description, 
            amount,
            createdBy


        }

        try {
            const response = await Axios.post("/api/expenditure/addExpenditure", data);
            console.log(response);
            setIsSubmitting(false);

            navigate("/app/accounts/income-and-expenditure")
        }
        catch (err) {
            console.log(err);
            setIsSubmitting(false);

            setSubmitError("An error occured, please try again later")
        }

    }
    return (
        <AlLoadingOverlay show={isSubmitting} text="Adding expenditure">
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mb-5">

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new expenditure record</h3>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="bill_type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Bill Type
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="bill_type"
                                    name="bill_type"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                   
                                    <option value="Water bill">Water bill</option>
                                    <option value="Rent">Rent</option>
                                </select>
                            </div>
                        </div>
                      
                      
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Description
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <textarea
                                    rows="4"
                                    name="description"
                                    id="description"
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
                        {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Status
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="status"
                                    name="status"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div> */}

                       


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
