import React from 'react'
import {ChevronDownIcon} from '@heroicons/react/24/outline';
function SSDropdown({title, items, onChange, selectedItem}) {
    
  return (
   <div className='px-2 py-1.5 rounded-md bg-[#F9F9FC] flex items-center gap-x-1 justify-center'>
    <span className='text-gray-400 text-sm '>{title}: </span>
    <span className='text-gray-500 font-medium text-sm'>{items[0]}</span>
    <ChevronDownIcon className='w-3 h-3 '/>
   </div>
  )
}

export default SSDropdown