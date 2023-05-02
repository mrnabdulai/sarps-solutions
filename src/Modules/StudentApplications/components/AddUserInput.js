import React from 'react'
import { useId } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

function AddUserInput({ label, onChange, value, type, name, placeholder, error, trailing, required, disabled, className, hasAutoComplete, colsSpanDef, endAdorment,defaultValue, ...props }) {
    const labelId = useId()
    function showStar(){
        if(label && required){
            return true
        }
        else{
           return false
        }
    }
    return (
        <div className={colsSpanDef}>
            <label htmlFor={labelId.toString()} className="block text-sm font-medium leading-6  text-gray-900">
                {label}
                {showStar() && <span className="">*</span>}
            </label>
            <div class="relative mt-1 rounded-md shadow-sm">
                <input
                    type={type ??= "text"}
                    name={name}
                   defaultValue={defaultValue}
                    onChange={onChange}
                    id={labelId.toString()}
                    autoComplete={hasAutoComplete ? "on" : "off"}
                    required={required}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${error ? "ring-error focus:ring-error" : ""} sm:text-sm sm:leading-6 ${className}}`}
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {endAdorment}
                </div>
            </div>
            {error && <span className="text-error text-xs">{error}</span>}
            <div className="absolute right:-inset-3 top-0 z-30">
                {trailing}
            </div>
        </div>
    )
}
AddUserInput.defaultProps = {
    type: "text",
    // TODO: make required true
    required: false,
    disabled: false,
    hasAutoComplete: false,
    colsSpanDef: "col-span-6 sm:col-span-3 relative",

}
export default AddUserInput