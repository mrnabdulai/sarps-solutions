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
import LoadingOverlay from 'react-loading-overlay';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nationalities } from "../../../Shared/utils/countries";
import AddUserInput from "./components/AddUserInput";
import FormSectionSeparator from "./components/FormSectionSeparator";
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'

import { idTypes, maritalStatuses, applicantRelations, jobTypes } from "./options";
import { genericRequired, getOtherNamesValidator, getSurnameValidator, phoneValidator, genericMetricValidator, emailValidator, passwordValidator } from "../../../Shared/utils/validators";
import Axios from "../../../Shared/utils/axios_instance";
import ErrorNotification from '../../../Shared/Components/ErrorNotification'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function AddUser() {
    const accountTypes = ["Type A", "Type B"];
    const [welcomeEmail, setWelcomeEmail] = useState(false)
    const [childrenList, setChildrenList] = useState([
        ""
    ])
    const [countriesOfInterestList, setCountriesOfInterestList] = useState([
        ""
    ])
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    // const [selectedP]
    const handleSubmit = async (e) => {
        // const formData = {
        //     surname:
        // }
        e.preventDefault();
        //Basic infor values
        const surname = e.target.surname.value
        const otherNames = e.target.otherNames.value
        const dob = e.target.dob.value
        const nationality = e.target.nationality
        const gender = e.target.gender.value
        const hometown = e.target.hometown.value
        const occupation = e.target.occupation.value
        const residence = e.target.residence.value
        const citizenship = e.target.citizenship.value
        const phone = e.target.phone.value
        const otherPhone = e.target.otherPhone.value
        const email = e.target.email.value
        const password = e.target.password.value 
        const religion = e.target.religion.value
        const postalAddress = e.target.postalAddress.value
        const idType = e.target.idType.value
        const passportNumber = e.target.passportNumber.value
        const doIssue = e.target.doIssue.value
        const doExpiry = e.target.doExpiry.value
        const placeOfIssue = e.target.placeOfIssue.value
        const height = e.target.height.value
        const weight = e.target.weight.value
        const hairColour = e.target.hairColour.value
        const eyeColour = e.target.eyeColour.value
        const languagesSpoken = e.target.languagesSpoken.value

        //Education values
        const nameOfLastSchoolAttended = e.target.nameOfLastSchoolAttended.value
        const schoolLevel = e.target.schoolLevel.value
        const schoolDateAttendedFrom = e.target.schoolDateAttendedFrom.value
        const schoolDateAttendedTo = e.target.schoolDateAttendedTo.value
        const qualification = e.target.qualification.value
        const workExperience = e.target.workExperience.value
        const maritalStatus = e.target.maritalStatus.value
        //TODO: handle names of children
        const nameOfSpouse = e.target.nameOfSpouse.value
        // const namesOfChildren = e.target.namesOfChildren.value



        //Father Info
        const fatherSurname = e.target.fatherSurname.value
        const fatherOtherNames = e.target.fatherOtherNames.value
        const fatherNationality = e.target.fatherNationality.value
        const fatherHometown = e.target.fatherHometown.value
        const fatherOccupation = e.target.fatherOccupation.value
        const fatherContact = e.target.fatherContact.value
        // const applicantFatherRelation = e.target.applicantFatherRelation.value



        //MOther Info
        const motherSurname = e.target.motherSurname.value
        const motherOtherNames = e.target.motherOtherNames.value
        const motherNationality = e.target.motherNationality.value
        const motherHometown = e.target.motherHometown.value
        const motherOccupation = e.target.motherOccupation.value
        const motherContact = e.target.motherContact.value
        // const applicantMotherRelation = e.target.applicantMotherRelation.value


        //Emmergency contact info
        const emergencyContactSurname = e.target.emergencyContactSurname.value
        const emergencyContactOtherNames = e.target.emergencyContactOtherNames.value
        const emergencyContactNationality = e.target.emergencyContactNationality.value
        const emergencyContactHometown = e.target.emergencyContactHometown.value
        const emergencyContactOccupation = e.target.emergencyContactOccupation.value
        const emergencyContactContact = e.target.emergencyContactContact.value
        const applicantEmergencyContactRelation = e.target.applicantEmergencyContactRelation.value


        //Guarantors assets
        const guarantorSurname = e.target.guarantorSurname.value
        const guarantorOtherNames = e.target.guarantorOtherNames.value
        const guarantorNationality = e.target.guarantorNationality.value
        const guarantorHometown = e.target.guarantorHometown.value
        const guarantorOccupation = e.target.guarantorOccupation.value
        const guarantorContact = e.target.guarantorContact.value
        const applicantGuarantorRelation = e.target.applicantguarantorRelation.value
        const guarantorPlaceOfWork = e.target.guarantorPlaceOfWork.value
        const guarantorEmployerDetails = e.target.guarantorEmployerDetails.value
        const guarantorIdNumber = e.target.guarantorIdNumber.value


        //Countries of interest and other details
        // const countriesOfInterest = e.target.countriesOfInterest.value
        const currentJob = e.target.currentJob.value
        const skills = e.target.skills.value
        const jobType = e.target.jobType.value

        // Agent infor
        const agentCode = e.target.agentCode.value

        if (Object.keys(errors).length > 0) {
            e.target[Object.keys(errors)[0]].focus()
            return
        }
        const data = {
            surname,
            otherNames,
            dob,
            nationality: nationalities[nationality],
            gender,
            hometown,
            occupation,
            residence,
            citizenship,
            phone,
            email,
            otherPhone,
            religion,
            postalAddress,
            typeofId: idType,
            passportNo: passportNumber,
            dateofissue: doIssue,
            placeofissue: doExpiry,
            dateofexpiry: placeOfIssue,
            languages: languagesSpoken,
            height,
            weight,
            hairColor: hairColour,
            eyeColor: eyeColour,
            password: password,
            lastSchool: nameOfLastSchoolAttended,
            levelOfEducation: schoolLevel,
            dateAttendedFrom: schoolDateAttendedFrom,
            dateAttendedTo: schoolDateAttendedTo,
            qualification: qualification,
            workExperience: workExperience,
            marritalStatus: maritalStatus,
            spouse: nameOfSpouse,
            children: childrenList,
            fSurname: fatherSurname,
            fOtherName: fatherOtherNames,
            fNationality: nationalities[fatherNationality],
            fHometown: fatherHometown,
            fOccupation: fatherOccupation,
            fContact: fatherContact,
            mSurname: motherSurname,
            mOtherName: motherOtherNames,
            mNationality: nationalities[motherNationality],
            mHometown: motherHometown,
            mOccupation: motherOccupation,
            mContact: motherContact,
            emergency_surname: emergencyContactSurname,
            emergency_otherName: emergencyContactOtherNames,
            emergency_nationality: nationalities[emergencyContactNationality],
            emergency_hometown: emergencyContactHometown,
            emegency_occupation: emergencyContactOccupation,
            emergency_contact: emergencyContactContact,
            emergency_relation: applicantEmergencyContactRelation,
            guarantor_surname: guarantorSurname,
            guarantor_otherName: guarantorOtherNames,
            guarantor_nationality: nationalities[guarantorNationality],
            guarantor_hometown: guarantorHometown,
            guarantor_occupation: guarantorOccupation,
            guarantor_contact: guarantorContact,
            guarantor_relation: applicantGuarantorRelation,
            guarantor_placeofwork: guarantorPlaceOfWork,
            guarantor_name_contact_of_employer: guarantorEmployerDetails,
            guarantor_ID: guarantorIdNumber,
            countries_of_interest: countriesOfInterestList,
            current_job: currentJob,
            skills: skills,
            job_type: jobType,
            agent_code: agentCode
            // reg_status: "pending",
            // payment_status: "not_paid",
            // payment_method: "null",
        }
        try {
            setSubmitError("")
            setIsSubmitting(true)
            const response = await Axios.post("/api/application/addApplication", data)
            console.log(response.data)
            setIsSubmitting(false)

            navigate('/user/add-success', {
                replace: true
            })
        }
        catch (err) {

            console.log(err)
            if (err.response) {

                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                setSubmitError(err.response.data.error)
            }
            else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                setSubmitError("Something went wrong")
                console.log(err.request);
            }
            else setSubmitError("Something went wrong")
            setIsSubmitting(false)

        }

    }



    return (
        <LoadingOverlay
            active={isSubmitting}
            spinner
            styles={{
                overlay: (base) => ({
                    ...base,
                    width: '100vw',
                    height: '100vh',
                    position: "fixed",
                    overflow: 'hidden'
                })
            }}
            text="Submitting your form ........"
        >
            <form onSubmit={handleSubmit} className="pt-5">

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
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" placeholder="" name="surname" error={errors.surname}
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
                                                    <AddUserInput label="Other Names" name="otherNames" error={errors.otherNames}
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
                                                            Date of Birth*
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                console.log(e.target.value)
                                                            }}
                                                            type="date"
                                                            name="dob"
                                                            id="dob"
                                                            autoComplete=""
                                                            required
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                        <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Nationality*
                                                        </label>
                                                        <select
                                                            id="nationality"
                                                            name="nationality"
                                                            autoComplete=""
                                                            value={70}
                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
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
                                                            Gender*
                                                        </label>
                                                        <select
                                                            id="gender"
                                                            name="gender"
                                                            autoComplete=""
                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        >
                                                            <option value={"male"}>Male</option>
                                                            <option value={"female"}>Female</option>
                                                        </select>
                                                    </div>
                                                    <AddUserInput label="Hometown" name="hometown" error={errors.hometown}
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
                                                    <AddUserInput label="Occupation" name="occupation" error={errors.occupation}
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
                                                    <AddUserInput label="Residence" name="residence" error={errors.residence}
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
                                                    <AddUserInput label="Citizenship" name="citizenship" placeholder="eg: Ghanaian" error={errors.citizenship}
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
                                                    <AddUserInput label="Phone" name="phone" placeholder="eg: +233 55 xxx xxxx" error={errors.phone}
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
                                                    <AddUserInput label="Other Phone" placeholder="eg: +233 55 xxx xxxx" name="otherPhone" required={false} error={errors.otherPhone}
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
                                                    <AddUserInput label="Email" placeholder="user@gmail.com" name="email" required={true} error={errors.email}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = emailValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.email
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, email: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Passowrd" type="password" name="password" required={true} error={errors.password}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = passwordValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.password
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, password: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Religion" name="religion" required={false} error={errors.religion}
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
                                                    <AddUserInput label="Postal address" name="postalAddress" error={errors.postalAddress}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.postalAddress
                                                                    setErrors(tempErrors)

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
                                                                        name="idType"
                                                                        value={idType}
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
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} label="Passport No." name="passportNumber" error={errors.passportNumber}
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
                                                            Date of Issue*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="doIssue"
                                                            id="do-issue"
                                                            autoComplete=""
                                                            required
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} label="Place of Issue" name="placeOfIssue" error={errors.placeOfIssue}
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
                                                            Date of Expiry*
                                                        </label>
                                                        <input
                                                            type="date"
                                                            name="doExpiry"
                                                            id="do-expriry"
                                                            autoComplete=""
                                                            required
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-4">
                                                        <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Languages Spoken*
                                                            {/* TODO:fix languages spoken input */}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="languagesSpoken"
                                                            id="languages-spoken"
                                                            required
                                                            placeholder="eg: English, French, Arabic"
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    <div className="grid col-span-6 grid-cols-8 gap-5">
                                                        <AddUserInput label="Height" type="number" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} name="height" error={errors.height}
                                                            endAdorment={
                                                                <span class="text-gray-500 sm:text-sm" id="price-currency">ft</span>

                                                            }
                                                            onChange={
                                                                (e) => {
                                                                    const errorMessage = genericMetricValidator(e.target.value)
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
                                                        <AddUserInput label="Weight" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2 "} name="weight" type="number" error={errors.weight}
                                                            endAdorment={
                                                                <span class="text-gray-500 sm:text-sm" id="price-currency">kg</span>

                                                            }
                                                            onChange={
                                                                (e) => {
                                                                    const errorMessage = genericMetricValidator(e.target.value)
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
                                                        <AddUserInput label="Hair Color" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.hairColour} name="hairColour"
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
                                                        <AddUserInput label="Eye Color" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-1"} error={errors.eyeColour} name="eyeColour"
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
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label class="block text-sm font-medium text-gray-700">Passport photo</label>
                                                            <div class="mt-1 flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px- pt-7 pb-8 w-5/6	 h-60	">
                                                                <div class="space-y-1 text-center">
                                                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                    </svg>
                                                                    <div class="flex text-sm text-gray-600">
                                                                        <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                            <span>Upload a file</span>
                                                                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                                                        </label>
                                                                        <p class="pl-1">or drag and drop</p>
                                                                    </div>
                                                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />
                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">EDUCATION & WORK EXPERIENCE</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="Name of Last School Attended" name="nameOfLastSchoolAttended" error={errors.nameOfLastSchoolAttended}
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
                                                    <AddUserInput label="Level" name="schoolLevel" error={errors.schoolLevel}
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
                                                    <AddUserInput label="Qualification" name="qualification" error={errors.qualification}
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
                                                    <AddUserInput name="workExperience" label="Work Experience" error={errors.workExperience}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div SectionSeparator />
                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">MARITAL STATUS AND FAMILY INFORMATION</h3>
                                        <p className="mt-1 text-sm text-gray-600">(Please select the appropriate)</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 flex items-center  ">

                                                        {
                                                            maritalStatuses.map((maritalStatus, index) => (
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={maritalStatus.trim()}
                                                                        name="maritalStatus"
                                                                        type="radio"
                                                                        value="maritalStatus"
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
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} required={false} label="If Married ? Name of Spouse" name="nameOfSpouse" 
                                                        // onChange={
                                                        //     (e) => {
                                                        //         const errorMessage = genericRequired(e.target.value)
                                                        //         console.log(errorMessage)
                                                        //         if (!errorMessage) {
                                                        //             let tempErrors = { ...errors }
                                                        //             delete tempErrors.nameOfSpouse
                                                        //             setErrors(tempErrors)
                                                        //             console.log(errors)
                                                        //         }
                                                        //         else {
                                                        //             setErrors(
                                                        //                 { ...errors, nameOfSpouse: errorMessage }
                                                        //             )
                                                        //         }
                                                        //     }
                                                        // }
                                                    />
                                                    {/* TODO: handle names of children */}


                                                    {childrenList.map((childForm, index) => (
                                                        <>
                                                            <AddUserInput label={index == 0 && "Names of Children"} error={errors.hasOwnProperty("namesOfChildren")} name="namesOfChildren"
                                                                onChange={
                                                                    (e) => {
                                                                        childrenList[index] = e.target.value
                                                                        // const errorMessage = genericRequired(e.target.value)
                                                                        // console.log(errorMessage)
                                                                        // if (!errorMessage) {
                                                                        //     let tempErrors = { ...errors }
                                                                        //     delete tempErrors.namesOfChildren
                                                                        //     setErrors(tempErrors)
                                                                        //     console.log(errors)
                                                                        // }
                                                                        // else {
                                                                        //     setErrors(
                                                                        //         { ...errors, namesOfChildren: errorMessage }
                                                                        //     )
                                                                        // }
                                                                    }
                                                                }

                                                            />
                                                            <div className="flex items-end gap-x-3 ">

                                                                {index == childrenList.length - 1 && <button
                                                                    onClick={() => {
                                                                        const tempChildrenList = [...childrenList]
                                                                        tempChildrenList.push("")
                                                                        console.log(tempChildrenList)
                                                                        setChildrenList(tempChildrenList)
                                                                    }}
                                                                    type="button"
                                                                    className="inline-flex justify-center  max-h-min items-center rounded-md border border-transparent text-indigo-600 px-3 py-2 text-sm font-medium leading-4 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                                    Add
                                                                </button>
                                                                }
                                                                {index != 0 && <button
                                                                    onClick={() => {
                                                                        const tempChildrenList = [...childrenList]
                                                                        tempChildrenList.splice(index, 1)
                                                                        console.log(tempChildrenList)
                                                                        setChildrenList(tempChildrenList)
                                                                    }}
                                                                    type="button"
                                                                    className="inline-flex justify-center  max-h-min items-center rounded-md border border-transparent text-red-600 px-3 py-2 text-sm font-medium leading-4 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                                >
                                                                    <MinusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                                    Remove
                                                                </button>

                                                                }
                                                            </div>
                                                        </>
                                                    ))

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" name="fatherSurname" error={errors.fatherSurname}
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
                                                        f />
                                                    <AddUserInput label="Other Names" name="fatherOtherNames" error={errors.fatherOtherNames}
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
                                                            Nationality*
                                                        </label>
                                                        <select
                                                            id="nationality"
                                                            name="fatherNationality"
                                                            autoComplete=""
                                                            value={70}
                                                            required
                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            {
                                                                nationalities.map((nationality, index) => (
                                                                    <option key={index} value={index}>{nationality}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <AddUserInput label="Hometown/Residence" name="fatherHometown" error={errors.fatherHometown}
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
                                                    <AddUserInput label="Occupation" error={errors.fatherOccupation} name="fatherOccupation"
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
                                                    <AddUserInput label="Contact" placeholder="eg: +233 55 xxx xxxx" name="fatherContact" error={errors.fatherContact}
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

                                                    {/* <div className="col-span-6 sm:col-span-3 lg:col-span-3">
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
                                                        </div> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />

                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">MOTHER’S INFORMATION</h3>
                                        <p className="mt-1 text-sm text-gray-600">.</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" name="motherSurname" error={errors.motherSurname}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.motherSurname
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, motherSurname: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Other Names" name="motherOtherNames" error={errors.motherOtherNames}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getOtherNamesValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.motherOtherNames
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, motherOtherNames: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="mother-nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Nationality
                                                        </label>
                                                        <select
                                                            id="mother-nationality"
                                                            name="motherNationality"
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

                                                    <AddUserInput label="Hometown/Residence" name="motherHometown" error={errors.motherHometown}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.motherHometown
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, motherHometown: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Occupation" name="motherOccupation" error={errors.motherOccupation}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.motherOccupation
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, motherOccupation: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Contact" placeholder="eg: +233 55 xxx xxxx" name="motherContact" error={errors.motherContact}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = phoneValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.motherContact
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, motherContact: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

                                                    {/* <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                            <label htmlFor="applicantMotherRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Relation With Applicant
                                                            </label>
                                                            <select
                                                                id="applicantMotherRelation"
                                                                name="applicantMotherRelation"
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
                                                        </div> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />

                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">EMERGENCY CONTACT</h3>
                                        <p className="mt-1 text-sm text-gray-600">PLEASE IF SAME AS MOTHER OR FATHER, KINDLY LEAVE BLANK</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" name="emergencyContactSurname" error={errors.emmergencyContactSurname}
                                                        required={false}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.emmergencyContactSurname
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, emergencyContactSurname: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Other Names" name="emergencyContactOtherNames" error={errors.emergencyContactOtherNames}
                                                                                                                required={false}

                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getOtherNamesValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.emergencyContactOtherNames
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, emergencyContactOtherNames: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="emergencyContactNationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Nationality
                                                        </label>
                                                        <select
                                                            id="emergencyContactNationality"
                                                            name="emergencyContactNationality"
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

                                                    <AddUserInput label="Hometown/Residence" name="emergencyContactHometown" error={errors.emergencyContactHomeTown}
                                                        required={false}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.emergencyContactHomeTown
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, emergencyContactHomeTown: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Occupation" name="emergencyContactOccupation" error={errors.emergencyContactOccupation}
                                                        required={false}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.emergencyContactOccupation
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, emergencyContactOccupation: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Contact" name="emergencyContactContact" placeholder="eg: +233 55 xxx xxxx" error={errors.emergencyContactContact}
                                                        
                                                        required={false}

                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = phoneValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.emergencyContactContact
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, emergencyContactContact: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

<AddUserInput label="   Relation With Applicant" name="applicantEmergencyContactRelation" error={errors.applicantEmergencyContactRelation}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.applicantEmergencyContactRelation
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, applicantEmergencyContactRelation: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                            

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />

                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">GUARANTOR’S INFORMATION</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" name="guarantorSurname" error={errors.guarantorSurname}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorSurname
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorSurname: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Other Names" name="guarantorOtherNames" error={errors.guarantorOtherNames}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getOtherNamesValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorOtherNames
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorOtherNames: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="guarantorNationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Nationality
                                                        </label>
                                                        <select
                                                            id="guarantorNationality"
                                                            name="guarantorNationality"
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

                                                    <AddUserInput label="Hometown/Residence" name="guarantorHometown" error={errors.hasOwnProperty("guarantorHometown")}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorHometown
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorHometown: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Occupation" name="guarantorOccupation" error={errors.guarantorOccupation}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorOccupation
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorOccupation: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Contact" placeholder="eg: 233 55 xxx xxxx" name="guarantorContact" error={errors.guarantorContact}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = phoneValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorContact
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorContact: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />


                                                    <AddUserInput label="   Relation With Applicant" name="applicantguarantorRelation" error={errors.applicantguarantorRelation}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.applicantguarantorRelation
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, applicantguarantorRelation: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Place of Work" name="guarantorPlaceOfWork" error={errors.guarantorPlaceOfWork}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorPlaceOfWork
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorPlaceOfWork: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Name and Contact of Employer" name="guarantorEmployerDetails" error={errors.guarantorEmployerDetails}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorEmployerDetails
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorEmployerDetails: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />

                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">GUARANTOR’S ASSETS</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 flex items-center  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                            ID Type:
                                                        </legend>
                                                        {
                                                            idTypes.map((idType, index) => (
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={idType.trim()}
                                                                        name="guarnaterIdType"
                                                                        value={idType}
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
                                                    <AddUserInput label="ID Number" name="guarantorIdNumber" error={errors.guarantorIdNumber}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.guarantorIdNumber
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, guarantorIdNumber: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <br />
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label class="block text-sm font-medium text-gray-700">Upload ID</label>
                                                        <div class="mt-1 flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px- pt-7 pb-8 	">
                                                            <div class="space-y-1 text-center">
                                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <div class="flex text-sm text-gray-600">
                                                                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                        <span>Upload a file</span>
                                                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                                                    </label>
                                                                    <p class="pl-1">or drag and drop</p>
                                                                </div>
                                                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                            </div>

                                                        </div>
                                                    </div>





                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    {/* <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor={""} className="block text-sm font-medium leading-6 text-gray-900">
                                                            &nbsp;
                                                        </label>
                                                        <textarea name="countriesOfInterest" placeholder="eg: USA, Canada, Denmark" rows={3} className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                        </textarea> */}
                                                    {/* </div> */}
                                                    <AddUserInput label="Currrent Job" name="currentJob" error={errors.currentJob}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.currentJob
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, currentJob: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />

                                                    <AddUserInput label="Skills" name="skills" placeholder="coding, writing, video editing" error={errors.skills}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = getSurnameValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.skills
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, skills: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />


{countriesOfInterestList.map((country, index) => (
                                                        <>
                                                            <AddUserInput label={index == 0 && ""} placeholder="eg: USA, Canada, Denmark" error={errors.hasOwnProperty("countriesOfInterest")} name="countriesOfInterest"
                                                                onChange={
                                                                    (e) => {
                                                                        countriesOfInterestList[index] = e.target.value
                                                                        // const errorMessage = genericRequired(e.target.value)
                                                                        // console.log(errorMessage)
                                                                        // if (!errorMessage) {
                                                                        //     let tempErrors = { ...errors }
                                                                        //     delete tempErrors.namesOfChildren
                                                                        //     setErrors(tempErrors)
                                                                        //     console.log(errors)
                                                                        // }
                                                                        // else {
                                                                        //     setErrors(
                                                                        //         { ...errors, namesOfChildren: errorMessage }
                                                                        //     )
                                                                        // }
                                                                    }
                                                                }

                                                            />
                                                            <div className="flex items-end gap-x-3 ">

                                                                {index == countriesOfInterestList.length - 1 && <button
                                                                    onClick={() => {
                                                                        const tempcountriesOfInterestList = [...countriesOfInterestList]
                                                                        tempcountriesOfInterestList.push("")
                                                                        console.log(tempcountriesOfInterestList)
                                                                        setCountriesOfInterestList(tempcountriesOfInterestList)
                                                                    }}
                                                                    type="button"
                                                                    className="inline-flex justify-center  max-h-min items-center rounded-md border border-transparent text-indigo-600 px-3 py-2 text-sm font-medium leading-4 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                                >
                                                                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                                    Add
                                                                </button>
                                                                }
                                                                {index != 0 && <button
                                                                    onClick={() => {
                                                                        const tempcountriesOfInterestList = [...countriesOfInterestList]
                                                                        tempcountriesOfInterestList.splice(index, 1)
                                                                        console.log(tempcountriesOfInterestList)
                                                                        setCountriesOfInterestList(tempcountriesOfInterestList)
                                                                    }}
                                                                    type="button"
                                                                    className="inline-flex justify-center  max-h-min items-center rounded-md border border-transparent text-red-600 px-3 py-2 text-sm font-medium leading-4 shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                                >
                                                                    <MinusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                                                    Remove
                                                                </button>

                                                                }
                                                            </div>
                                                        </>
                                                    ))

                                                    }




                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />

                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900"> JOB TYPE (PLEASE TICK)</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    <div className="col-span-6   flex items-center">

                                                        {
                                                            jobTypes.map((jobType, index) => (
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={jobType.trim()}
                                                                        name="jobType"
                                                                        type="radio"
                                                                        value={jobType}
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

                                    </div>

                                </div>
                            </div>
                        </div >
                        <div SectionSeparator />
                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900"></h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                    <AddUserInput label="Agent Code" name="agentCode"
                                                        required={false}
                                                    // onChange={
                                                    //     (e) => {
                                                    //         const errorMessage = getSurnameValidator(e.target.value)
                                                    //         console.log(errorMessage)
                                                    //         if (!errorMessage) {
                                                    //             let tempErrors = { ...errors }
                                                    //             delete tempErrors.currentJob
                                                    //             setErrors(tempErrors)
                                                    //             console.log(errors)
                                                    //         }
                                                    //         else {
                                                    //             setErrors(
                                                    //                 { ...errors, currentJob: errorMessage }
                                                    //             )
                                                    //         }
                                                    //     }
                                                    // }
                                                    />







                                                </div>
                                            </div>
                                            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                                <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >



                </div>

            </form >
            {submitError && <ErrorNotification errorMessage={submitError} />}
        </LoadingOverlay>

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
      
    }}
    type="submit"
    className="inline-flex justify-center rounded-md bg-indigo-600 py-3 px-5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"

    Continue
</button>
</div> */}