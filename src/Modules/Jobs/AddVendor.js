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
export default function AddVendor() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setSubmitError("");
        setIsSubmitting(true);
        e.preventDefault()
        const name = e.target.name.value;
        const country = e.target.country.value;
        const address = e.target.address.value;
        const contact = e.target.contact.value;
        const jobName = e.target.jobName.value;
        const jobType = e.target.jobType.value;
        const numberOfWorkers = e.target.numberOfWorkers.value;
        // const role = e.target.role.value;   
        


        // const currentAdmin = JSON.parse(localStorage.getItem("admin"));
        // const createdBy = currentAdmin.id;
        const data = {
            name,
            country: nationalities[country],
            address,
            contact,
           job_name: jobName,
           type_of_job : jobType,
          number_of_workers:   numberOfWorkers,



        }
     
        try {
            const response = await Axios.post("api/vendor/addVendor", data);
            console.log(response);
            setIsSubmitting(false);

            navigate("/app/jobs")
        }
        catch (err) {
            console.log(err);
            setIsSubmitting(false);

            setSubmitError("An error occured, please try again later")
        }

    }
    return (
        <AlLoadingOverlay show={isSubmitting} text="Adding vendor">
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mb-5">

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Vendor Details</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Enter vendor details and job details</p>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="fname" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Nname
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="given-name"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Country
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete=""
                                    value={70}
                                    required
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    {
                                        nationalities.map((nationality, index) => (
                                            <option key={index} value={index}>{nationality}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>


                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                               Address
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Contact
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    autoComplete="address-level2"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Job Name
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="text"
                                    name="jobName"
                                    id="jobName"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Role
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="role"
                                    name="role"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Type of Job
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="jobType"
                                    name="jobType"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >
                                    <option value="skilled">Skilled</option>
                                    <option value="unskilled">Unskilled</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="numberOfWorkers" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                No. Of Workers
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                    type="number"
                                    name="numberOfWorkers"
                                    id="numberOfWorkers"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                            </div>
                        </div>



                    </div>
                </div>

                <div className="pt-5 pr-5">
                    <div className="flex justify-end">
                        <button
                            onClick={() => navigate("/app/payouts")}
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
