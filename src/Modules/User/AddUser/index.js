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

import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nationalities } from "../../../Shared/utils/countries";
import AddUserInput from "./components/AddUserInput";
import FormSectionSeparator from "./components/FormSectionSeparator";
import { idTypes, maritalStatuses,applicantRelations, jobTypes } from "./options";
import { genericRequired, getOtherNamesValidator, getSurnameValidator, phoneValidator } from "./validators";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function AddUser() {
    const accountTypes = ["Type A", "Type B"];
    const [welcomeEmail, setWelcomeEmail] = useState(false)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})




    return (
        <div className="pt-5">
            <div className="mb-20">
                <h4 className="font-bold text-2xl mb-5 ml-8">PERSONAL INFORMATION</h4>
                <div className="bg-gray-100 mx-auto max-w-7xl rounded-xl">
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">BASIC INFORMATION</h3>
                                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" error={errors.hasOwnProperty("surname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.surname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, surname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Names" error={errors.hasOwnProperty("otherNames")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getOtherNamesValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.otherNames
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, otherNames: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Date of Birth
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="dob"
                                                        id="dob"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nationality
                                                    </label>
                                                    <select
                                                        id="nationality"
                                                        name="nationality"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            nationalities.map((nationality, index) => (
                                                                <option key={index} value={index}>{nationality}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Gender
                                                    </label>
                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        <option value={1}>Male</option>
                                                        <option value={1}>Female</option>
                                                    </select>
                                                </div>
                                                <AddUserInput label="Hometown" error={errors.hasOwnProperty("hometown")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.hometown
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, hometown: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Occupation" error={errors.hasOwnProperty("occupation")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.occupation
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, occupation: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Residence" error={errors.hasOwnProperty("residence")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.residence
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, residence: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Citizenship" error={errors.hasOwnProperty("Citizenship")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.citizenship
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, citizenship: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Phone" error={errors.hasOwnProperty("phone")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.phone
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, phone: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Phone" error={errors.hasOwnProperty("otherPhone")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.otherPhone
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, otherPhone: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Religion" error={errors.hasOwnProperty("religion")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.religion
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, religion: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Postal address" error={errors.hasOwnProperty("postalAddress")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.postalAddress
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, postalAddress: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <div className="col-span-6 flex items-center  ">
                                                    <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        ID Type:
                                                    </legend>
                                                    {
                                                        idTypes.map((idType, index) => (
                                                            <div className="flex items-center gap-x-2 mr-5">
                                                                <input
                                                                    id={idType.trim()}
                                                                    name="notification-method"
                                                                    type="radio"
                                                                    defaultChecked={false}
                                                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <label htmlFor={idType.trim()} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                    {idType}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} label="Passport No." error={errors.hasOwnProperty("passportNumber")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.passportNumber
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, passportNumber: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="do-issue" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Date of Issue
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="doIssue"
                                                        id="do-issue"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} label="Place of Issue" error={errors.hasOwnProperty("placeOfIssue")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.placeOfIssue
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, placeOfIssue: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="do-expriry" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Date of Expiry
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="doExpiry"
                                                        id="do-expriry"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Languages Spoken
                                                        {/* TODO:fix languages spoken input */}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <div className="grid col-span-6 grid-cols-8 gap-5">
                                                    <AddUserInput label="Height" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.hasOwnProperty("height")}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.height
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, height: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Weight" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.hasOwnProperty("weight")}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.weight
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, weight: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Hair Color" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.hasOwnProperty("hairColour")}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.hairColour
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, hairColour: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Eye Color" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.hasOwnProperty("eyeColour")}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.eyeColour
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, eyeColour: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">EDUCATION & WORK EXPERIENCE</h3>
                                    {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="Name of Last School Attended" error={errors.hasOwnProperty("nameOfLastSchoolAttended")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.nameOfLastSchoolAttended
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, nameOfLastSchoolAttended: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Level" error={errors.hasOwnProperty("schoolLevel")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.schoolLevel
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, schoolLevel: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="school-date-attend-from" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Date attended from
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="schoolDateAttendedFrom"
                                                        id="school-date-attend-from"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="school-date-attend-to" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Date attended to
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="schoolDateAttendedTo"
                                                        id="school-date-attend-to"
                                                        autoComplete=""
                                                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <AddUserInput label="Qualification" error={errors.hasOwnProperty("qualification")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.qualification
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, qualification: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Work Experience" error={errors.hasOwnProperty("workExperience")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.workExperience
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, workExperience: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <FormSectionSeparator />
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">MARITAL STATUS AND FAMILY INFORMATION</h3>
                                    {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 flex items-center  ">
                                                    <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        ID Type:
                                                    </legend>
                                                    {
                                                        maritalStatuses.map((maritalStatus, index) => (
                                                            <div className="flex items-center gap-x-2 mr-5">
                                                                <input
                                                                    id={maritalStatus.trim()}
                                                                    name="marital-statuses"
                                                                    type="radio"
                                                                    defaultChecked={false}
                                                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <label htmlFor={maritalStatus.trim()} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                    {maritalStatus}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="If Married ? Name of Spouse" error={errors.hasOwnProperty("nameOfSpouse")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.nameOfLastSchoolAttended
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, nameOfLastSchoolAttended: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                {/* TODO: handle names of children */}
                                                <AddUserInput label="Names of Children" error={errors.hasOwnProperty("namesOfChildren")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.namesOfChildren
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, namesOfChildren: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            <div className="mb-20">
                <h4 className="font-bold text-2xl mb-5 ml-8"> PARENTS, EMERGENCY CONTACT & GUARANTOR INFORMATION</h4>
                <div className="bg-gray-100 mx-auto max-w-7xl rounded-xl">
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">FATHER’S INFORMATION</h3>
                                    <p className="mt-1 text-sm text-gray-600">.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Names" error={errors.hasOwnProperty("fatherOtherNames")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getOtherNamesValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOtherNames
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOtherNames: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                             
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nationality
                                                    </label>
                                                    <select
                                                        id="nationality"
                                                        name="fatherNationality"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            nationalities.map((nationality, index) => (
                                                                <option key={index} value={index}>{nationality}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                                <AddUserInput label="Hometown/Residence" error={errors.hasOwnProperty("fatherHometown")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherHometown
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherHometown: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Occupation" error={errors.hasOwnProperty("fatherOccupation")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOccupation
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOccupation: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Contact" error={errors.hasOwnProperty("fatherContact")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherContact
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherContact: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantFatherRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantFatherRelation"
                                                        name="applicantFatherRelation"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            applicantRelations.map((applicantRelation, index) => (
                                                                <option key={index} value={index}>{applicantRelation}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />
                   
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">MOTHER’S INFORMATION</h3>
                                    <p className="mt-1 text-sm text-gray-600">.</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Names" error={errors.hasOwnProperty("fatherOtherNames")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getOtherNamesValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOtherNames
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOtherNames: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                             
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nationality
                                                    </label>
                                                    <select
                                                        id="nationality"
                                                        name="fatherNationality"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            nationalities.map((nationality, index) => (
                                                                <option key={index} value={index}>{nationality}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                                <AddUserInput label="Hometown/Residence" error={errors.hasOwnProperty("fatherHometown")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherHometown
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherHometown: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Occupation" error={errors.hasOwnProperty("fatherOccupation")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOccupation
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOccupation: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Contact" error={errors.hasOwnProperty("fatherContact")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherContact
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherContact: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantFatherRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantFatherRelation"
                                                        name="applicantFatherRelation"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            applicantRelations.map((applicantRelation, index) => (
                                                                <option key={index} value={index}>{applicantRelation}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />
                   
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">EMERGENCY CONTACT</h3>
                                    <p className="mt-1 text-sm text-gray-600">PLEASE IF SAME AS MOTHER OR FATHER, KINDLY LEAVE BLANK</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Names" error={errors.hasOwnProperty("fatherOtherNames")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getOtherNamesValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOtherNames
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOtherNames: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                             
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nationality
                                                    </label>
                                                    <select
                                                        id="nationality"
                                                        name="fatherNationality"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            nationalities.map((nationality, index) => (
                                                                <option key={index} value={index}>{nationality}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                                <AddUserInput label="Hometown/Residence" error={errors.hasOwnProperty("fatherHometown")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherHometown
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherHometown: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Occupation" error={errors.hasOwnProperty("fatherOccupation")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOccupation
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOccupation: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Contact" error={errors.hasOwnProperty("fatherContact")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherContact
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherContact: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantFatherRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantFatherRelation"
                                                        name="applicantFatherRelation"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            applicantRelations.map((applicantRelation, index) => (
                                                                <option key={index} value={index}>{applicantRelation}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />
                   
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">GUARANTOR’S INFORMATION</h3>
                                    <p className="mt-1 text-sm text-gray-600"></p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Other Names" error={errors.hasOwnProperty("fatherOtherNames")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getOtherNamesValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOtherNames
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOtherNames: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                             
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nationality
                                                    </label>
                                                    <select
                                                        id="nationality"
                                                        name="fatherNationality"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            nationalities.map((nationality, index) => (
                                                                <option key={index} value={index}>{nationality}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                              
                                                <AddUserInput label="Hometown/Residence" error={errors.hasOwnProperty("fatherHometown")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherHometown
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherHometown: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Occupation" error={errors.hasOwnProperty("fatherOccupation")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherOccupation
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherOccupation: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Contact" error={errors.hasOwnProperty("fatherContact")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = phoneValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherContact
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherContact: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantFatherRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantFatherRelation"
                                                        name="applicantFatherRelation"
                                                        autoComplete=""
                                                        value={70}
                                                        className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    >
                                                        {
                                                            applicantRelations.map((applicantRelation, index) => (
                                                                <option key={index} value={index}>{applicantRelation}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <AddUserInput label="Place of Work" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                                <AddUserInput label="Name and Contact of Employer" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />
                   
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">GUARANTOR’S ASSETS</h3>
                                    <p className="mt-1 text-sm text-gray-600"></p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="ID copy/number" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            
                                             
                                           
                                             
                                               
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                   
                </div >
            </div>
            <div className="mb-20">
                <h4 className="font-bold text-2xl mb-5 ml-8"> </h4>
                <div className="bg-gray-100 mx-auto max-w-7xl rounded-xl">
                   
                   
                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">COUNTRIES OF INTEREST: (PLEASE WRITE)</h3>
                                    <p className="mt-1 text-sm text-gray-600"></p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                            
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                            <label htmlFor={""} className="block text-sm font-medium leading-6 text-gray-900">
                                             &nbsp;
                                            </label>
                                            <textarea rows={3} className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            </textarea>
                                            </div>
                                                <AddUserInput label="Currrent Job" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            
                                                <AddUserInput label="Skills" error={errors.hasOwnProperty("fatherSurname")}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = getSurnameValidator(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.fatherSurname
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, fatherSurname: errorMessage }
                                                                )
                                                            }
                                                        }
                                                    }
                                                />
                                            
                                             
                                           
                                             
                                               
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                    <FormSectionSeparator />

                    <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900"> JOB TYPE (PLEASE TICK)</h3>
                                    <p className="mt-1 text-sm text-gray-600"></p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                            
                                            <div className="col-span-6   flex items-center">
                                                 
                                                    {
                                                        jobTypes.map((jobType, index) => (
                                                            <div className="flex items-center gap-x-2 mr-5">
                                                                <input
                                                                    id={jobType.trim()}
                                                                    name="notification-method"
                                                                    type="radio"
                                                                    defaultChecked={false}
                                                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                />
                                                                <label htmlFor={jobType.trim()} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                    {jobType}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                               
                                              
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            </div>
        </div >
    )
}




// Switch widget
// <div className="col-span-6 sm:col-span-3">
// <div className="flex items-center ">
//     <span className="inline-block mr-5">Send Welcome Email?</span>
//     <Switch
//         checked={welcomeEmail}
//         onChange={setWelcomeEmail}
//         className={classNames(
//             welcomeEmail ? 'bg-indigo-600' : 'bg-gray-200',
//             'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
//         )}
//     >
//         <span className="sr-only te">Use setting</span>
//         <span
//             aria-hidden="true"
//             className={classNames(
//                 welcomeEmail ? 'translate-x-5' : 'translate-x-0',
//                 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
//             )}
//         />
//     </Switch>
// </div>
// </div>


//Submit BUtton templeate

{/* <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
<button
    onClick={() => {
        navigate('/user/add-success', {
            replace: true
        })
    }}
    type="submit"
    className="inline-flex justify-center rounded-md bg-indigo-600 py-3 px-5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"

    Continue
</button>
</div> */}