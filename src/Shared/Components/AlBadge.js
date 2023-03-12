import React from 'react'

function AlBadge({status, statusText}) {
    /**
     * Pass in status as either failure,pending, success
     */
    if(status == "rejected"){
  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800 capitalize">
  {statusText}
  </span>
  )
    }
    else if(status == "pending" ) {
        return (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-sm font-medium text-yellow-800 capitalize">
        {statusText}
      </span>
        )
    }
    else{
        return (
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800 capitalize">
            {statusText}
          </span>
        )
    }
}

export default AlBadge