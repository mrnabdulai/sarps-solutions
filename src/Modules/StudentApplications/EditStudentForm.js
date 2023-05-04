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

import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { nationalities, countryList } from "../../Shared/utils/countries";
import AddUserInput from "./components/AddUserInput";
import FormSectionSeparator from "./components/FormSectionSeparator";
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'

import { idTypes, maritalStatuses, applicantRelations, jobTypes, titles } from "./options";
import { genericRequired, getOtherNamesValidator, getSurnameValidator, phoneValidator, genericMetricValidator, emailValidator, passwordValidator } from "../../Shared/utils/validators";
import Axios from "../../Shared/utils/axios_instance";
import ErrorNotification from '../../Shared/Components/ErrorNotification'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function EditStudentApplicationForm() {
    const accountTypes = ["Type A", "Type B"];
    const [welcomeEmail, setWelcomeEmail] = useState(false)
    const [childrenList, setChildrenList] = useState([
        ""
    ])
    const [countriesOfInterestList, setCountriesOfInterestList] = useState([
        ""
    ])
    const [passportFile, setPassportFile] = useState(null)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("")
    const [applicationData, setAppliationData] =  useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const paramsList = useSelector(state => state.applicationsReducer.applications)

    useEffect(() => {

        const indexOfThisApplication = paramsList.findIndex((application) => {
            return application.id == id
        })
        const tempTimelines = []
        //TODO: do timeline algorithms and stuff
        console.log(paramsList[indexOfThisApplication])
        setAppliationData(paramsList[indexOfThisApplication])
        // setSelectedStatus(paramsList[indexOfThisApplication].reg_status)
    }, [])
    // const [selectedP]
    const handleSubmit = async (e) => {
        // const formData = {
        //     surname:
        // }
        e.preventDefault();
        //Basic infor values
        const title = e.target.title.value
        const familyName = e.target.familyName.value
        const givenNames = e.target.givenNames.value
        const preferredNames = e.target.preferredNames.value
        const dob = e.target.dob.value
        const gender = e.target.gender.value
        const email = e.target.email.value
        // const password = e.target.password.value
        const address = e.target.address.value
        const mobilePhone = e.target.mobilePhone.value
        const homePhone = e.target.homePhone.value
        const birthCountry = e.target.birthCountry.value
        //Take index
        const nationality = e.target.nationality.value
        //Take index
        
        const permanetResNewZeland = e.target.permanetResNewZeland.value
        const passportNumber = e.target.passportNumber.value
        const otherCountriesCitizenShip = e.target.otherCountriesCitizenShip.value
        const ieTScore = e.target.ieTScore.value
        const otherScore = e.target.otherScore.value
        const toStudyInNewZeland = e.target.toStudyInNewZeland.value
        const yesOtherStudySchool = e.target.yesOtherStudySchool.value
        const studyWhenDates = e.target.studyWhenDates.value
        const secondarySchoolAttented = e.target.secondarySchoolAttented.value
        const secondarySchoolQualitification = e.target.secondarySchoolQualitification.value
        const secondarySchoolCountry = e.target.secondarySchoolCountry.value
        const secondarySchoolLanguage = e.target.secondarySchoolLanguage.value
        const postSchoolName = e.target.postSchoolName.value
        const postSchoolQualification = e.target.postSchoolQualification.value
        const postSchoolCompleted = e.target.postSchoolCompleted.value
        const postExpectedCompleteData = e.target.postExpectedCompleteData.value
        const underTakenStudyInNZ = e.target.underTakenStudyInNZ.value
        const previosStudyDetails = e.target.previosStudyDetails.value
        const program1 = e.target.program1.value
        const program2 = e.target.program2.value
        const program3 = e.target.program3.value
        //take index
        


        



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
        
        
        //Career stuff
        const careerIntensions = e.target.careerIntensions.value
        const accomodationRequired = e.target.accomodationRequired.value
        const accomodationType = e.target.accomodationType.value
        const airportPickupRequired = e.target.airportPickupRequired.value
        const requestLearningSupport = e.target.requestLearningSupport.value
        

        // Agent infor
        const agentCode = e.target.agentCode.value

        if (Object.keys(errors).length > 0) {
            e.target[Object.keys(errors)[0]].focus()
            return
        }
        const formData  = new FormData()
        const data = {
            title, 
            family_name :familyName, 
            given_name: givenNames, 
            preferred_name: preferredNames, 
            dob, 
            gender, 
            email, 
            // password, 
            address, 
            phone:mobilePhone, 
            home_telephone:homePhone, 
            country_of_birth:countryList[birthCountry], 
            nationality:nationalities[nationality], 
            //TODO: passport file
            // passport_file, 
            passport_no : passportNumber, 
            permanent_resident_status:permanetResNewZeland, 
            other_countries_citizenship:otherCountriesCitizenShip, 
            ielts_toefl_score:ieTScore, 
            other_proficiency_score:otherScore, 
            studying_english:toStudyInNewZeland, 
            school_name:yesOtherStudySchool, 
            start_date:studyWhenDates, 
            name_of_qualification:secondarySchoolQualitification, 
            school_attended:secondarySchoolAttented, 
            country:countryList[secondarySchoolCountry], 
            language_of_instruction:secondarySchoolLanguage, 
            //post secondary and further education 
            name_of_qualification:postSchoolQualification, 
            institution_attended:postSchoolName, 
            completed:postSchoolCompleted, 
            expected_completion_date:postExpectedCompleteData, 
            taken_study_in_newzealand:underTakenStudyInNZ, 
            attach_details:previosStudyDetails, 
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
            career_intentions:careerIntensions,
            airport_reception:airportPickupRequired,
            require_accommodation:accomodationRequired,
            type_of_accommodation:accomodationType,
            request_for_learning_support:requestLearningSupport,
            agent_code: agentCode,
            agent_code: agentCode
            // reg_status: "pending",
            // payment_status: "not_paid",
            // payment_method: "null",
        }
        // console.log(JSON.stringify(data))
        for (var key in data){
            formData.append(key, data[key])
        }
        formData.append("passport_file", passportFile)
        console.log([...formData])
        // return
        try {
            setSubmitError("")
            setIsSubmitting(true)
            const response = await Axios.put(`/api/student/updateApplication/${applicationData.id}`, formData, {
                
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      
                    }
                
            })
            console.log(response.data)
            setIsSubmitting(false)

            navigate('/app/applications-students/edit/success', {
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
            <span class="-mb-1 block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text pb-1 text-transparent text-3xl font-bold">Edit Student Application</span>
            <hr className="mt-2 mb-5"/>
                <div className="mb-20">
                    <h4 className="font-bold text-2xl mb-5 ">PERSONAL INFORMATION</h4>
                    <div className="bg-gray-100 mx-auto max-w-7xl rounded-xl">
                        <div className="mt-10 sm:mt-0 py-6 sm:px-6 lg:px-8">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">BASIC INFORMATION</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="col-span-6 flex items-center mb-3  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Title:
                                                        </legend>
                                                        {
                                                            titles.map((idType, index) => (
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={idType.trim()}
                                                                        name="title"
                                                                        value={idType}
                                                                        type="radio"
                                                                        
                                                                       defaultChecked={applicationData.title === idType}
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={idType.trim()} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                        {idType}
                                                                    </label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Family Name" placeholder="" name="familyName" defaultValue={applicationData.family_name}
                                                      
                                                    />
                                                    <AddUserInput label="Given Names" name="givenNames" defaultValue={applicationData.given_name}
                                                       
                                                    />
                                                    <AddUserInput label="Preferred Names" name="preferredNames" error={errors.otherNames} defaultValue={applicationData.preferred_name}
                                                       
                                                    />
                                                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
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
                                                            defaultValue={applicationData.dob}
                                                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                    
                                                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Gender*
                                                        </label>
                                                        <select
                                                            id="gender"
                                                            name="gender"
                                                            autoComplete=""
                                                            defaultValue={applicationData.gender}

                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        >
                                                            <option value={"male"}>Male</option>
                                                            <option value={"female"}>Female</option>
                                                        </select>
                                                    </div>
                                                      <AddUserInput label="Email" placeholder="user@gmail.com" name="email" required={true} error={errors.email}
                                                                                                                  defaultValue={applicationData.email}

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
                                                    {/* <AddUserInput label="Passowrd" type="password" name="password" required={true} error={errors.password}
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
                                                    /> */}

                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label class="block text-sm font-medium text-gray-700">Upload Passport Photo</label>
                                                        <label for="passport-file-upload" class="mt-1 flex justify-center items-center rounded-md border-2 border-dashed border-gray-300  pt-7 pb-8 	w-5/6 h-60">
                                                        <input  onChange={(e)=>{
                                                                            const {files} = e.target
                                                                            console.log(files)
                             console.log(files)

                                                                            if(files && files.length > 0){
                                                                                setPassportFile(files[0])
                                                                            }

                                                                        }}  id="passport-file-upload" name="passportFileUpload" type="file" accept="image/*" class="sr-only" />
                                                          {applicationData.passport_file != null     ? <img src={passportFile == null ? applicationData.passport_file : URL.createObjectURL(passportFile)} alt="passport photo" className="object-cover h-60"/>
                                                            :
                                                            <> <div class="space-y-1 text-center">
                                                                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                </svg>
                                                                <div class="flex text-center justify-center text-sm text-gray-600">
                                                                    <div  class="text-center relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                        <span>Upload a file</span>
                                                                       
                                                                    </div>
                                                                    {/* <p class="pl-1">or drag and drop</p> */}
                                                                </div>
                                                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                            </div>
                                                            </>
                                                            }

                                                        </label>
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">CONTACT DETAILS</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                            
                                                <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="Address in home country (must be applicant’s address):" name="address" 
                                                     defaultValue={applicationData.address}
                                                    />
                                                <AddUserInput label="Mobile Telephone" name="mobilePhone" placeholder="eg: +233 55 xxx xxxx" error={errors.mobilePhone}
                                                     defaultValue={applicationData.phone}

                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = phoneValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.mobilePhone
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, mobilePhone: errorMessage }
                                                                    )
                                                                }
                                                            }
                                                        }
                                                    />
                                                    <AddUserInput label="Home telephone:" placeholder="eg: +233 55 xxx xxxx" name="homePhone" required={false} error={errors.homePhone}
                                                     defaultValue={applicationData.home_telephone}

                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = phoneValidator(e.target.value)
                                                                console.log(errorMessage)
                                                                if (!errorMessage) {
                                                                    let tempErrors = { ...errors }
                                                                    delete tempErrors.homePhone
                                                                    setErrors(tempErrors)
                                                                    console.log(errors)
                                                                }
                                                                else {
                                                                    setErrors(
                                                                        { ...errors, homePhone: errorMessage }
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">NATIONALITY/CITIZENSHIP</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                            
                                                <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="birthCountry" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Country of Birth*
                                                        </label>
                                                        <select
                                                            id="birthCountry"
                                                            name="birthCountry"
                                                            autoComplete=""
                                                            value={countryList.findIndex(item => item === applicationData.country_of_birth)}                                                        required
                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            {
                                                                countryList.map((country, index) => (
                                                                    <option key={index} value={index}>{country}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                       <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Nationality*
                                                        </label>
                                                        <select
                                                            id="nationality"
                                                            name="nationality"
                                                            autoComplete=""
                                                            defaultValue={nationalities.findIndex(item => item === applicationData.nationality)}                                                        
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
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-3"} label="Passport No." name="passportNumber" error={errors.passportNumber}
                                                                                                            defaultValue={applicationData.passport_no}

                                                    />
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-3"} label="Other Countries CitizenShip" required={false} name="otherCountriesCitizenShip" error={errors.passportNumber}
                                                                                                            defaultValue={applicationData.address}

                                                    />

<div className="col-span-6 flex items-center mb-3  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Do you hold Permanent Resident status in New Zealand or Australia?                                            </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"perm-res-nz-yes-radio"}
                                                                        name="permanetResNewZeland"
                                                                        value={"yes"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.permanent_resident_status =="yes"}
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"perm-res-nz-yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"perm-res-nz-no-radio"}
                                                                        name="permanetResNewZeland"
                                                                        value={"no"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.permanent_resident_status =="no"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"perm-res-nz-no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">ENGLISH PROFICIENCY</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                            
                                                <div className="grid grid-cols-6 gap-6">
                                                <AddUserInput label="IELTS or TOEFL score:" placeholder="" name="ieTScore" 
                                        defaultValue={applicationData.ielts_toefl_score}
                                                      />
                                                <AddUserInput label="Other" placeholder="" name="otherScore" 
                                                                                              defaultValue={applicationData.other_proficiency_score}

                                                      />
                                                    <div className="col-span-6 flex items-center mb-3  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Will you be studying English in New Zealand before starting at UCIC?                                                         </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"yes-radio"}
                                                                        name="toStudyInNewZeland"
                                                                        value={"yes"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.studying_english =="yes"}
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"no-radio"}
                                                                        name="toStudyInNewZeland"
                                                                        value={"no"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.studying_english =="no"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
                                                                </div>
                                                      

                                                    </div>
                                                  
                                                    <AddUserInput label="If “Yes”, name of school:" placeholder="" required={false} name="yesOtherStudySchool" error={errors.surname}
                                                    colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"}
                                                      defaultValue={applicationData.school_name}
                                                      />
                                                    <AddUserInput label="When? (Dates)" placeholder="" name="studyWhenDates" 
                                                      required={false}
                                                      defaultValue={applicationData.start_date}

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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">EDUCATION DETAILS</h3>
                                         <p className="mt-1 text-sm text-gray-600">Secondary Education – highest level achieved</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="School attended:" name="secondarySchoolAttented" 
                                                      defaultValue={applicationData.school_attended}
                                                    />
                                                  
                                                    <AddUserInput label="Name of qualiﬁcation" placeholder="eg Year 12, HKDSE or ‘A’ Levels" name="secondarySchoolQualitification" error={errors.schoolLevel}
                                                                                                              defaultValue={applicationData.name_of_qualification}

                                                    />
                                                     <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                                        <label htmlFor="nationality" className="block text-sm font-medium leading-6 text-gray-900">
                                                            Country
                                                        </label>
                                                        <select
                                                            id="secondarySchoolCountry"
                                                            name="secondarySchoolCountry"
                                                            autoComplete=""
                                                            value={countryList.findIndex(item => item === applicationData.country)}                                                        required
                                                            required
                                                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            {
                                                                countryList.map((country, index) => (
                                                                    <option key={index} value={index}>{country}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <AddUserInput  label="Language of institution:" name="secondarySchoolLanguage" 
                                                                                                                                                                      defaultValue={applicationData.language_of_instruction}

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
                                         <p className="mt-1 text-sm text-gray-600">Post-secondary and further education</p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="Institution  attended:" name="postSchoolName" error={errors.nameOfLastSchoolAttended}
                                                                                                                                                                                                                              defaultValue={applicationData.institution_attended}

                                                    />
                                                    
                                                    <AddUserInput label="Name of qualiﬁcation" placeholder="eg Year 12, HKDSE or ‘A’ Levels" name="postSchoolQualification" error={errors.schoolLevel}
                                                       defaultValue={applicationData.name_of_qualification}
                                                    />

<div className="col-span-6 flex items-center mb-3  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Completed:?
                                                        </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"yes-radio"}
                                                                        name="postSchoolCompleted"
                                                                        value={"yes"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.completed == "yes"}
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"no-radio"}
                                                                        name="postSchoolCompleted"
                                                                        value={"no"}
                                                                       defaultChecked={applicationData.completed == "no"}

                                                                        type="radio"
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
                                                                </div>
                                                      

                                                    </div>
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="If “No”, when do you expect to complete" name="postExpectedCompleteData" error={errors.nameOfLastSchoolAttended}
                                                        required={false}
                                                        defaultValue={applicationData.expected_completion_date}
                                                        />



<div className="col-span-6 flex items-center mb-3  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Have you previously undertaken any study in New Zealand?
                                                        </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"yes-radio"}
                                                                        name="underTakenStudyInNZ"
                                                                        value={"yes"}
                                                                       defaultChecked={applicationData.taken_study_in_newzealand == "yes"}
                                                                        type="radio"
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"no-radio"}
                                                                        name="underTakenStudyInNZ"
                                                                        value={"no"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.taken_study_in_newzealand == "no"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
                                                                </div>
                                                      

                                                    </div>
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="If “Yes”, please attach details." name="previosStudyDetails"
                                                            required={false}
                                                            defaultValue={applicationData.attach_details}
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">PROGRAMME SELECTION</h3>
                                        {/* <p className="mt-1 text-sm text-gray-600">(Please select the appropriate)</p> */}
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                 
                                                    {/* {childrenList.map((childForm, index) => (
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

                                                    } */}
                                                    <AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="" name="program1" 
                                                        
                                                        />

<AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="" name="program2"
                                                        
                                                        />

<AddUserInput colsSpanDef={"col-span-6 sm:col-span-6 lg:col-span-4"} label="" name="program3"
                                                        
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
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <AddUserInput label="Surname" name="fatherSurname" error={errors.fatherSurname}
                                                    defaultValue={applicationData.fSurname}
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
                                                                                                        defaultValue={applicationData.fOtherName}

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
                                                            defaultValue={nationalities.findIndex(item => item === applicationData.fNationality)}                                                        
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
                                                    defaultValue={applicationData.fHometown}
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
                                                    defaultValue={applicationData.fatherOccupation}
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
                                                                                                        defaultValue={applicationData.fatherContact}

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
                                                                                                                                                            defaultValue={applicationData.mSurname}

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
                                                    defaultValue={applicationData.mOtherName}
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
                                                            defaultValue={nationalities.findIndex(item => item === applicationData.mNationality)}                                                        
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
                                                    defaultValue={applicationData.mHometown}
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
                                                    defaultValue={applicationData.mOccupation}
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
                                                     defaultValue={applicationData.mContact}
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
                                                        defaultValue={applicationData.emergency_surname}
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
                                                                                                                defaultValue={applicationData.emergency_otherName}
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
                                                            defaultValue={nationalities.findIndex(item => item === applicationData.emergency_nationality)}                                                        
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
                                                    defaultValue={applicationData.emergency_hometown}
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
                                                        defaultValue={applicationData.emegency_occupation}
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
                                                             defaultValue={applicationData.emergency_contact}
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
  defaultValue={applicationData.emergency_relation}
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
                                                    defaultValue={applicationData.guarantor_surname}
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
                                                    defaultValue={applicationData.guarantor_otherName}
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
                                                            defaultValue={nationalities.findIndex(item => item === applicationData.guarantor_nationality)}                                                        
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
                                                    defaultValue={applicationData.guarantor_hometown}
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
                                                    defaultValue={applicationData.guarantor_occupation}
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
                                                     defaultValue={applicationData.guarantor_contact}
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
                                                    defaultValue={applicationData.guarantor_relation}
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
                                                    defaultValue={applicationData.guarantor_placeofwork}
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
                                                    defaultValue={applicationData.guarantor_name_contact_of_employer}
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
                                                    defaultValue={applicationData.guarantor_ID}
                                                        onChange={
                                                            (e) => {
                                                                const errorMessage = genericRequired(e.target.value)
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
                                                                    <label for="guranter-id-file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                                                        <span>Upload a file</span>
                                                                        <input id="guranter-id-file-upload" name="guarantorIdUpload" type="file" accept="image/*" class="sr-only" />
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">FUTURE CAREER INTENTIONS</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div action="#" method="POST">
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">

                                                  <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                                                        <label htmlFor={""} className="block text-sm font-medium leading-6 text-gray-900">
                                                        Brieﬂy explain your future career intentions upon completion of your
university qualiﬁcation:
                                                        </label>
                                                        <textarea name="careerIntensions" placeholder="" rows={3} defaultValue={applicationData.career_intentions} className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                        </textarea> 
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">ACCOMODATION</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 flex items-center   ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Do you require accommodation?
                                                        </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"acc-req-yes-radio"}
                                                                        name="accomodationRequired"
                                                                        value={"yes"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.require_accommodation == "yes"}
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"acc-req-yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"acc-req-no-radio"}
                                                                        name="accomodationRequired"
                                                                        value={"no"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.require_accommodation == "no"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"acc-req-no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
                                                                </div>
                                              

                                                    </div>

                                                    <div className="col-span-6 flex items-center  ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        If “Yes”, what type of accommodation?
                                                        </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"acc-type-yes-radio"}
                                                                        name="accomodationType"
                                                                        value={"Campus"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.type_of_accommodation == "Campus"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"acc-type-yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                    Campus
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"acc-type-no-radio"}
                                                                        name="accomodationType"
                                                                        value={"Own arrangements"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.type_of_accommodation == "Own arrangements"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"acc-type-no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                    Own arrangements
                                                                    </label>
                                                                </div>
                                                      </div>

                                                      <div className="col-span-6 flex items-center text-gray-800 text-sm ">
                                                      Homestay
                                                      <br />
Once you accept your oﬀer, apply for campus accommodation
at least two weeks before you arrive in the campus
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">AIRPORT RECEPTION</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 flex items-center   ">
                                                        <legend className="block text-sm font-medium leading-6 text-gray-900 mr-5">
                                                        Do you require airport pick-up?
                                                        </legend>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"airport-pickup-yes-radio"}
                                                                        name="airportPickupRequired"
                                                                        value={"yes"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.airport_reception == "yes"}

                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"airport-pickup-yes-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-x-2 mr-5">
                                                                    <input
                                                                        id={"airport-pickup-no-radio"}
                                                                        name="airportPickupRequired"
                                                                        value={"no"}
                                                                        type="radio"
                                                                       defaultChecked={applicationData.airport_reception == "no"}
                                                                        
                                                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <label htmlFor={"airport-pickup-no-radio"} className=" block text-[13px] font-medium leading-6 text-gray-900">
                                                                     No
                                                                    </label>
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
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">REQUEST FOR LEARNING SUPPORT</h3>
                                        <p className="mt-1 text-sm text-gray-600"></p>
                                    </div>
                                </div>
                                <div className="mt-5 md:col-span-2 md:mt-0">
                                    <div>
                                        <div className="overflow-hidden shadow sm:rounded-md">
                                            <div className="bg-white px-4 py-5 sm:p-6">
                                                <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6    ">
                                                <label htmlFor={"requestLearningSupport"} className="block text-sm font-medium leading-6 text-gray-900">
                                                        If there is anything that may aﬀect your learning (for example, impairments to
your mobility, sight, hearing, reading or writing), please notify us so that we
can support you. Please indicate your needs on a separate sheet of paper and
attach it to this application.
                                                        </label>
                                                        <textarea defaultValue={applicationData.request_for_learning_support} name="requestLearningSupport" id="requestLearningSupport" placeholder="" rows={3} className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                        </textarea> 
                                                              
                                                            

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
//        defaultChecked={welcomeEmail}
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