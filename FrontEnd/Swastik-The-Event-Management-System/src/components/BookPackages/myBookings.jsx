import React from 'react'

function MyBooking() {
    return (
        <div className='w-[90%] m-auto flex flex-row justify-evenly p-2'>
            <aside className='w-[20%] h-[90vh] border-x-4 border-black flex flex-col items-center'>
                <div class="flex flex-col space-x-4 items-left">
                    <label class="flex w-[100%] items-center border-x-4 border-black space-x-2">
                        <input type="radio" name="status" value="all" class="form-radio h-4 w-4 text-blue-600" checked />
                        <span class="text-gray-700">All</span>
                    </label>
                    <label class="flex w-[100%] items-center border-x-4 border-black space-x-2">
                        <input type="radio" name="status" value="completed" class="form-radio h-4 w-4 text-blue-600" />
                        <span class="text-gray-700">Completed</span>
                    </label>
                    <label class="flex w-[100%] items-center border-x-4 border-black space-x-2">
                        <input type="radio" name="status" value="pending" class="form-radio h-4 w-4 text-blue-600" />
                        <span class="text-gray-700">Pending</span>
                    </label>
                </div>

            </aside>
            <aside className='w-[80%] h-[90vh] m-auto border-r-4 border-black text-center'>
                <p>completed</p>
                <p>Pending</p>
            </aside>

        </div>
    )
}

export default MyBooking;