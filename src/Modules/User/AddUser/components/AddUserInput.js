import React from 'react'
import { useId } from 'react'

function AddUserInput({label,onChange, value, type, name, placeholder, error, required, disabled, className, hasAutoComplete, colsSpanDef,...props }) {
    const labelId = useId()

    
    return (
        <div className={colsSpanDef}>
            <label htmlFor={labelId.toString()} className="block text-sm font-medium leading-6 text-gray-900">
                {label} 
                {required && <span className="">*</span>}
            </label>
            <input
                type={type ??= "text"}
                name={name}
                value={value}
                onChange={onChange}
                id={labelId.toString()}
                autoComplete={hasAutoComplete ? "on" : "off"}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${error ? "ring-error focus:ring-error" :""} sm:text-sm sm:leading-6 ${className}}`}
            />
        </div>
    )
}
AddUserInput.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
    hasAutoComplete: false,
    colsSpanDef: "col-span-6 sm:col-span-3"

}
export default AddUserInput