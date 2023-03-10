import React from 'react'

function ExportBtn({onClick, Icon, text}) {
  return (
    <button onClick={onClick} className="border rounded-md px-2 py-1.5 flex gap-x-1 items-center hover:bg-gray-50">
    <span className='font-medium text-sm'>{text}</span>
    {Icon}
    </button>
  )
}

export default ExportBtn