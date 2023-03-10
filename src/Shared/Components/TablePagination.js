import React from 'react'

function TablePagination({total,   onPageChange, onRowsPerPageChange}) {

    const [currentPageIndex, setCurrentPageIndex] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    function getStartLimit() {
        if(currentPageIndex === 0) return 1
        else if(rowsPerPage > total){
            return 
        }
        return currentPageIndex * rowsPerPage +1 
    }
    function getEndLimit(){
        if(getStartLimit() + rowsPerPage > total) return total
        return getStartLimit() + rowsPerPage -1
    }

    const onNextTap = () => {
        if(getStartLimit() + rowsPerPage > total) return
            setCurrentPageIndex(currentPageIndex + 1)
                    //Due to the way set state works in react i guess this just works

            onPageChange(currentPageIndex +2)
    }
    const onPrevTap = () => {
        if(currentPageIndex  <= 0) return
        setCurrentPageIndex(currentPageIndex  -1)
        //Due to the way set state works in react i guess this just works
        onPageChange(currentPageIndex)

    }
    return (
        <div className='bg-gray-50 py-3 px-4 flex justify-between items-center'>
            <div className=''>
                <span className='text-sm inline-block mr-3'>Rows Per Page</span>
                <input onChange={(e)=>{
                    setRowsPerPage(+e.target.value)
                    setCurrentPageIndex(0)
                    onRowsPerPageChange(e.target.value)
                }} type="number" id="" class=" w-20 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" placeholder="" />

            </div>
            <div className='flex gap-x-2'>
                <button onClick={onPrevTap} className={`border rounded-md w-9 h-9 flex items-center justify-center cursor-pointer  ${currentPageIndex  > 0 && "hover:bg-white" } disabled:text-gray-500`} disabled={currentPageIndex  <= 0}>
                    <span className='text-2xl '>&lt;</span>
                </button>
                <div className='border rounded-md w-9 h-9 flex items-center justify-center cursor-pointer '>
                    <span className='text-lg '>{currentPageIndex +1}</span>
                </div>
                <button onClick={onNextTap} className={`border rounded-md w-9 h-9 flex items-center justify-center cursor-pointer  ${currentPageIndex  > 0 && "hover:bg-white" } disabled:text-gray-500`} disabled={getStartLimit() + rowsPerPage > total}>
                    <span className='text-2xl '>&gt;</span>
                </button>
            </div>
            <span className=' text-gray-700'>
                {`${getStartLimit()} - ${getEndLimit() } of ${total}`}
            </span>
        </div>
    )
}

export default TablePagination