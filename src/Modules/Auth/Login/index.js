import { useState } from "react"
import LoadingOverlay from "react-loading-overlay"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ErrorNotification from "../../../Shared/Components/ErrorNotification"
import Axios from "../../../Shared/utils/axios_instance"
import { emailValidator, passwordValidator } from "../../../Shared/utils/validators"
import { ActionTypes } from "./duck/type"

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
export default function Login() {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      return
    }
    const email = e.target.email.value
    const password = e.target.password.value
    setIsSubmitting(true)
    //Call routes
    try {
      setSubmitError("")

      const response = await Axios.post("/api/admin/adminLogin", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token)
      dispatch({ type: ActionTypes.LOGGED_IN, payload: response.data.token })
      window.location.replace("/app/applications/list")
    }
    catch (err) {
     
      if(err.response) setSubmitError(err.response.data.error)
      setSubmitError("Something went wrong")

    }
    finally {
      setIsSubmitting(false)

    }
  }
  return (
    <>
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
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">

          <img className='mx-auto h-16 w-16 rounded-full  object-center ' src="/images/logo-512x512-8784601874.png" alt="logo" />

          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>

        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
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
                    className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm ${errors.email ? "focus:border-error" : "focus:border-primary"} focus:outline-none ${errors.email ? "focus:ring-error" : "focus:ring-primary"} sm:text-sm`}
                  />

                </div>
                {errors.email && <span className="text-error text-xs">{errors.email}</span>}

              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
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
                    className={`block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm ${errors.password ? "focus:border-error" : "focus:border-primary"} focus:outline-none ${errors.password ? "focus:ring-error" : "focus:ring-primary"} sm:text-sm`}
                  />
                  {errors.password && <span className="text-error text-xs">{errors.password}</span>}

                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  {/* //TODO: Handle Forgot password */}
                  <a href="#" className="font-medium text-primary hover:text-primary">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                  {isSubmitting && <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  }
                  Sign in
                </button>
              </div>
            </form>


          </div>
        </div>
      </div>
      {submitError && <ErrorNotification errorMessage={submitError} />}

      </LoadingOverlay>
    </>
  )
}
