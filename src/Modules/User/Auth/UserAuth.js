import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AlLoadingOverlay from "../../../Shared/Components/AlLoadingOverlay"
import Axios from "../../../Shared/utils/axios_instance"
import { emailValidator, passwordValidator } from "../../../Shared/utils/validators"

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
export default function UserAuth() {
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
  
        const response = await Axios.post("/api/application/login", {
          email,
          password
        }, {
            headers:{

            }
        });
        localStorage.clear()
        sessionStorage.setItem("token", response.data.token)
        sessionStorage.setItem("user", JSON.stringify(response.data.user))
        // dispatch({ type: ActionTypes.LOGGED_IN, payload: response.data.token })
        window.location.replace("/user/dashboard")
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
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <AlLoadingOverlay show={isSubmitting} text="Logging in .......">
            <div className="flex min-h-full">
              <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                  <div>
                  <img className=' h-16 w-16 rounded-full  object-center ' src="/images/logo-512x512-8784601874.png" alt="logo" />
            
                  </div>
                  <div className="mt-8">
            
            
                    <div className="mt-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="space-y-1">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <div className="mt-1">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
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
                            <a href="#" className="font-medium text-primary hover:text-primary">
                              Forgot your password?
                            </a>
                          </div>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden h-screen w-0 flex-1 lg:block">
                <img
                  className="absolute inset-0 h-full w-full object-cover"

                  src="/images/travel-and-tour-bg.png"
                  alt=""
                />
              </div>
            </div>
        </AlLoadingOverlay>
      </>
    )
  }
  