import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
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
export default function AddTicket() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [staffList, setStaffList] = useState([])
    const navigate = useNavigate();

    const getStaff = () => {
        Axios.get("/api/user/getStaff")
            .then(res => {
                console.log(res.data)
                setStaffList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

        const handleSubmit = async (e) => {
        setSubmitError("");
        setIsSubmitting(true);
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        // const status = e.target.status.value;
        const priority = e.target.priority.value;
        const assignedTo = e.target.assignedTo.value;
        const currentAdmin = JSON.parse(localStorage.getItem("admin"));

        const createdBy = currentAdmin.id

        const data = {
            title,
            description,

            priority,
            assigned_to: assignedTo,
            createdBy: createdBy,
            status: "open",


        }

        try {
            const response = await Axios.post("/api/ticket/sendTicket", data);
            console.log(response);
            setIsSubmitting(false);

            navigate("/app/general/tickets")
        }
        catch (err) {
            console.log(err);
            setIsSubmitting(false);

            setSubmitError("An error occured, please try again later")
        }

    }
    useEffect(() => {
        getStaff()
    }, [])
    return (
        <AlLoadingOverlay show={isSubmitting} text="Adding ticket">
            <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 mb-5">

                <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                    <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new Ticket</h3>
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

                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Priority
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <select
                                    id="priority"
                                    name="priority"
                                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                >

                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Assign to
                            </label>
                            <div className="mt-1 sm:col-span-2 sm:mt-0 after:content-none ">
                                <div className="max-w-lg sm:max-w-xs w-full relative">
                                    <select
                                        id="assignedTo"
                                        name="assignedTo"
                                        placeholder="Select staff member"
                                        disabled={staffList.length === 0}
                                        className=" block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm"
                                    >
                                        {staffList.length > 0 && staffList.map((staff) => (
                                            <option value={staff.id}>{staff.firstName} {staff.lastName}</option>
                                        ))}

                                    </select>
                                    {staffList.length === 0 &&
                                        <svg class="absolute -right-10 top-2 animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    }
                                </div>

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
