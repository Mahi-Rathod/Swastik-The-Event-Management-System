import React, { useState } from 'react';
import img1 from "../../assets/birthday/birthday_1.jpeg"
function Book() {
    const [details, setDetails] = useState([
        {
            Locations: "Delhi",
            Date: Date(),
            Guest: 10,
            Rooms: 5,
            flight: {
                from: "Aurangabad",
                to: "Delhi"
            },
            Food: [],
            Decoration: [],
        }
    ])
    const change = ({ key, value }) => {
        setDetails(key.value)
    }
    const eventLocations = ['Nanded', 'Pune', 'Sambhajinagar', 'Delhi', 'Jaipur', 'utii', 'Bengaluru']

    const images = [img1, img1, img1, img1, img1]
    return (
        <>
            <div className="bg-white w-[70%] h-[90vh] m-auto mt-5 shadow-xl rounded-md flex justify-evenly">
                <div className="flex flex-col p-2 gap-3 w-[50%]">
                    <div className="h-[70%] p-8 w-[100%] bg-white shadow-md rounded-md flex justify-center">
                        <img src={img1} alt="" className='h-[100%] rounded-md shadow-lg' />
                    </div>

                    <div className="h-[30%] w-[100%] gap-5 flex flex-row items-center">
                        <div className='w-[50%] h-[50%] p-4 rounded-md'>
                            <img src={img1} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={img1} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={img1} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={img1} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        
                    </div>
                </div>

                <div className="t">
                    <h3> Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                </div>
            </div>
        </>
    )
}

export default Book;