import React from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
function SSSearchInput({placeholder, name, onInputChange}) {
  return (
    <div class="relative mt-1 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
    <input type="text" name={name} id={name} placeholder={placeholder} onChange={onInputChange} class="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm" />
  </div>
  )
}

export default SSSearchInput