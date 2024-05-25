import React from 'react'

function MyBooking() {
    return (
        <div className='w-[90%] m-auto flex flex-row justify-evenly p-2'>
            <aside className='w-[20%] h-[90vh] border-x-4 border-black flex flex-col items-center'>
                <div class="flex items-center">
                    <input id="checkbox" type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
                    <label for="checkbox" class="ml-2 block text-sm leading-5 text-gray-900">Pending</label>
                </div>
                
                <div class="flex items-center">
                    <input id="checkbox" type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out" />
                    <label for="checkbox" class="ml-2 block text-sm leading-5 text-gray-900">Completed</label>
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