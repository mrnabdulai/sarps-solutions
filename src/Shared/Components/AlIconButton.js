import React from 'react'

function SSIconButton({onClick, Icon}) {
  return (
    <div className='hover:bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center' onClick={onClick}>
        <Icon className="h-5 w-5 text-black" stokeWidth='1' />
    </div>
  )
}

export default SSIconButton