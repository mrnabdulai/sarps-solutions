import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React from 'react'
import AlLoadingOverlay from '../../Shared/Components/AlLoadingOverlay'
import Axios from '../../Shared/utils/axios_instance'
import ErrorNotification from '../../Shared/Components/ErrorNotification'
import SuccessNotification from '../../Shared/Components/SuccessNotification'
function AdminProfile() {
    const [isEditing, setIsEditing] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [submitSuccess, setSubmitSuccess] = React.useState(false)
    const [submitError, setSubmitError] = React.useState("")
    const [currentAdminDetails, setCurrentAdminDetails] = React.useState({})
    React.useEffect(() => {
        const currentAdmin = JSON.parse(localStorage.getItem("admin"));
        setCurrentAdminDetails(currentAdmin)
    }, [

    ])

    React.useEffect(() => {
        if (submitSuccess == true) {
            setTimeout(() => {
                window.location.reload()
            }, [2000])
        }

    }, [submitSuccess])
    const handleSubmit = async (e) => {

        e.preventDefault()
        const email = e.target.email.value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const password = e.target.password.value
        var data = {
            email,
            password,
            firstName,
            lastName
        }
        if (password == 'default') {
            data = {
                email,
                firstName,
                lastName
            }
        }


        setIsSubmitting(true)
        setSubmitError("")
        try {
            const res = await Axios.put("/api/admin/updateAdmin/" + currentAdminDetails.id, data)
            const newAdminDetails = {
                ...currentAdminDetails,
                firstName,
                lastName,
                email
            }
            console.log(newAdminDetails)
            localStorage.setItem("admin", JSON.stringify(newAdminDetails))
            setSubmitSuccess(true)
            setIsEditing(false)
            // setCurrentAdminDetails(res.data)
        }
        catch (err) {
            console.log(err)
            setSubmitError("An error occurred while updating your profile.")
        }
        finally {
            setIsSubmitting(false)

        }
    }
    return (
        <AlLoadingOverlay show={isSubmitting} text={"Updating profile..."}>

            <div className="flex-1 xl:overflow-y-auto">
                <div className="max-w-2xl py-5 px-4 sm:px-6 lg:py-7 lg:px-8">
                    <div className='flex items-center justify-between'>
                        <h1 className="text-3xl font-bold tracking-tight text-blue-gray-900">Account</h1>
                        <PencilSquareIcon className='w-10 h-10 text-primary p-1 hover:bg-gray-100 rounded-full cursor-pointer' onClick={() => {
                            setIsEditing(true)
                        }} />
                    </div>

                    <form onSubmit={handleSubmit} className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                            <div className="sm:col-span-6">
                                <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
                                {/* <p className="mt-1 text-sm text-blue-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p> */}
                            </div>


                            {/* 
                            <div className="sm:col-span-6">
                                <label htmlFor="username" className="block text-sm font-medium text-blue-gray-900">
                                    Username
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-blue-gray-300 bg-blue-gray-50 px-3 text-blue-gray-500 sm:text-sm">
                                        sarps.com/
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        disabled={isEditing == false}
                                        def
                                        id="username"
                                        className="block w-full min-w-0 flex-1 disabled:border-gray-300 rounded-none rounded-r-md border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div> */}
                            <div className="sm:col-span-6">
                                <label htmlFor="firstName" className="block text-sm font-medium text-blue-gray-900">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    disabled={isEditing == false}
                                    defaultValue={currentAdminDetails.firstName}
                                    className="mt-1 block w-full rounded-md disabled:opacity-70 disabled:border-gray-300 border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="lastName" className="block text-sm font-medium text-blue-gray-900">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    disabled={isEditing == false}
                                    defaultValue={currentAdminDetails.lastName}
                                    className="mt-1 block w-full rounded-md disabled:opacity-70 disabled:border-gray-300 border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="url" className="block text-sm font-medium text-blue-gray-900">
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    disabled={isEditing == false}
                                    defaultValue={currentAdminDetails.email}
                                    className="mt-1 block w-full rounded-md disabled:opacity-70 disabled:border-gray-300 border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium text-blue-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    disabled={isEditing == false}

                                    defaultValue="default"
                                    className="mt-1 block w-full disabled:opacity-70 disabled:border-gray-300 rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>


                        </div>



                        <div className="flex justify-end pt-8">

                            <button
                                type="submit"
                                disabled={isEditing == false}
                                className="ml-3 inline-flex justify-center disabled:hover:bg-blue-300 disabled:bg-blue-300 rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {submitError && <ErrorNotification errorMessage={submitError} />}
            {submitSuccess && <SuccessNotification show={submitSuccess} message={"Profile updated successfully"} setShow={setSubmitSuccess} />}
        </AlLoadingOverlay>
    )
}

export default AdminProfile