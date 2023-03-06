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
import { genericRequired, getOtherNamesValidator, getSurnameValidator, phoneValidator,genericMetricValidator } from "./validators";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function AddUser() {
    const accountTypes = ["Type A", "Type B"];
    const [welcomeEmail, setWelcomeEmail] = useState(false)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    
    const handleSubmit = (e) => {
        // const formData = {
        //     surname:
        // }
        e.preventDefault();
        //Basic infor values
        const surname=e.target.surname.value
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
        
        
        
        //Father Info
        const fatherSurname = e.target.fatherSurname.value
        const fatherOtherNames = e.target.fatherOtherNames.value
        const fatherNationality = e.target.fatherNationality.value
        const fatherHometown = e.target.fatherHometown.value
        const fatherOccupation = e.target.fatherOccupation.value
        const fatherContact = e.target.fatherContact.value
        const applicantFatherRelation = e.target.applicantFatherRelation.value
        


        //MOther Info
        const motherSurname = e.target.motherSurname.value
        const motherOtherNames = e.target.motherOtherNames.value
        const motherNationality = e.target.motherNationality.value
        const motherHometown = e.target.motherHometown.value
        const motherOccupation = e.target.motherOccupation.value
        const motherContact = e.target.motherContact.value
        const applicantMotherRelation = e.target.applicantMotherRelation.value
        

        //Emmergency contact info
        const emergencyContactSurname = e.target.emergencyContactSurname.value
        const emergencyContactOtherNames = e.target.emergencyContactrOtherNames.value
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
        const guarantorContact = e.target.guarantorrContact.value
        const applicantGuarantorRelation = e.target.applicantGuarantorRelation.value
        const guarantorPlaceOfWork = e.target.guarantorPlaceOfWork.value
        const guarantorEmployerDetails = e.target.guarantorEmployerDetails.value
        const guarantorIdNumber = e.target.guarantorIdNumber.value
        
        
        //Countries of interest and other details
        const countriesOfInterest = e.target.countriesOfInterest.value
        const currentJob = e.target.currentJob.value
        const skills = e.target.skills.value
        const jobType = e.target.jobType.value
        

        if(Object.keys(errors).length === 0){
            console.log("form is valid")
        }

    }



    return (
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
                                <div  action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" placeholder="" name="surname"  error={errors.surname}
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
                                                        <option value={1}>Male</option>
                                                        <option value={1}>Female</option>
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
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} label="Passport No." name="passportNumber"  error={errors.passportNumber}
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
                                                    <AddUserInput label="Weight" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2 "}  name="weight" error={errors.weight}
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
                                                    <AddUserInput label="Eye Color" colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-2"} error={errors.eyeColour}
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
                                <div  action="#" method="POST">
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
                                                <AddUserInput label="Work Experience" error={errors.workExperience}
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
                                    <p className="mt-1 text-sm text-gray-600">PLEASE CIRCLE OR TICK APPROPRIATE ONE</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <div  action="#" method="POST">
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
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="If Married ? Name of Spouse" name="nameOfSpouse" error={errors.nameOfSpouse}
                                                    onChange={
                                                        (e) => {
                                                            const errorMessage = genericRequired(e.target.value)
                                                            console.log(errorMessage)
                                                            if (!errorMessage) {
                                                                let tempErrors = { ...errors }
                                                                delete tempErrors.nameOfSpouse
                                                                setErrors(tempErrors)
                                                                console.log(errors)
                                                            }
                                                            else {
                                                                setErrors(
                                                                    { ...errors, nameOfSpouse: errorMessage }
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
                                <div  action="#" method="POST">
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
                                                />
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
                                                <AddUserInput label="Occupation" error={errors.fatherOccupation}
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
                                <div  action="#" method="POST">
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
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
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
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">EMERGENCY CONTACT</h3>
                                    <p className="mt-1 text-sm text-gray-600">PLEASE IF SAME AS MOTHER OR FATHER, KINDLY LEAVE BLANK</p>
                                </div>
                            </div>
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <div  action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="Surname" name="emmergencyContactSurname" error={errors.emmergencyContactSurname}
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
                                                require={false}
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
                                              
                                                <AddUserInput label="Hometown/Residence" name="emergencyContactHomeTown" error={errors.emergencyContactHomeTown}
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
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantEmergencyContactRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantEmergencyContactRelation"
                                                        name="applicantEmergencyContactRelation"
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
                                <div  action="#" method="POST">
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
                                               
                                               <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                    <label htmlFor="applicantguarantorRelation" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Relation With Applicant
                                                    </label>
                                                    <select
                                                        id="applicantguarantorRelation"
                                                        name="applicantguarantorRelation"
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
                                <div  action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="ID copy/number" name="guarantorIdNumber" error={errors.guarantorIdNumber}
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
                                <div  action="#" method="POST">
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                            
                                            <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                            <label htmlFor={""} className="block text-sm font-medium leading-6 text-gray-900">
                                             &nbsp;
                                            </label>
                                            <textarea name="countriesOfInterest" placeholder="eg: USA, Canada, Denmark" rows={3} className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            </textarea>
                                            </div>
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
                                            
                                                <AddUserInput label="Skills"  name="skills" placeholder="coding, writing, video editing" error={errors.skills}
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