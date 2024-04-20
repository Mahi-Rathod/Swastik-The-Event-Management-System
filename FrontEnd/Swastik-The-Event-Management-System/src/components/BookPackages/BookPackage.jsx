import React, { useState } from 'react';
import img1 from "../../assets/birthday/birthday_1.jpeg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DiAtom } from "react-icons/di";

const people = [
    {
      name: 'John Doe',
      title: 'Front-end Developer',
      department: 'Engineering'
    },
    {
      name: 'Jane Doe',
      title: 'Back-end Developer',
      department: 'Engineering',
    }
  ]

function Book() {
    const [startDate, setStartDate] = useState(new Date());
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
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
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

                <div className="w-[40%] flex flex-col justify-between">
                    <div className="p-5 w-[100%] h-[70%] flex flex-col justify-evenly">
                        <h3 className='text-2xl font-sans text-black-600 text-justify'> Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p className='text-sm font-sans text-black-600 text-justify'> Politics is a complex and multifaceted realm that encompasses the activities, beliefs, and institutions through which groups of people make collective decisions.
                        </p>
                        <h3 className='text-3xl font-bold font-mono text-black-600'> Price : ₹ 40000 /- </h3>
                        <div className='font-sans w-[100%] flex gap-4'>
                            <p className='text-md font-semibold'>Function Date : </p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                className='rounded font-mono w-[50%] px-2 bg-blue-500 text-white'
                            />
                        </div>
                        <div className='flex justify-start gap-4 w-[100%]'>
                            <button className='w-[30%] bg-blue-500'> Send Query</button>
                            <button className='w-[30%] bg-blue-200 font-thin border-solid border-blue-600 border-[1px] text-blue-600'> BOOK NOW</button>
                        </div>
                    </div>

                    <div className='h-[20%] flex items-center font-serif'>
                        <DiAtom />
                        <p>Terms and Contidions Applied</p>
                    </div>

                </div>
            </div>

            <div className="mt-6 flex flex-col w-[70%] m-auto">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr className="divide-x divide-gray-200">
                                        <th
                                            scope="col"
                                            className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                                        >
                                            <span>Package Details</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                                        >
                                            Title
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {people.map((person) => (
                                        <tr key={person.name} className="divide-x divide-gray-200">
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                        <div className="text-sm text-gray-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-12 py-4">
                                                <div className="text-sm text-gray-900">{person.title}</div>
                                                <div className="text-sm text-gray-500">{person.department}</div>
                                            </td>
                                            
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Book;