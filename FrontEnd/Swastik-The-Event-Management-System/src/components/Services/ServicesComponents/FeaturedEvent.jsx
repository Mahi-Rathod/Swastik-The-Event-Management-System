import React, { useEffect } from 'react'
import { useState } from 'react'
import { BiSolidSkipPreviousCircle, BiSolidSkipNextCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';


function FeaturedEvent({ data, eventType }) {
    let [index, setIndex] = useState(0);
    const [event, setEvent] = useState("")
    const prevBtn = () => {
        let len = data.length;
        if (index === 0) {
            setIndex(len - 1);
            console.log(index);
        }
        else {
            setIndex((index) => index - 1);
        }
    }
    useEffect(() => {
        const intervalId = setInterval(nxtBtn, 5000);
        const fetchData = async() =>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/category/get-categorybyid/${eventType}`);
                
                setEvent(res.data.data.category.categoryName)
            } catch (error) {
                console.log(error)
            }
        } 
        fetchData();
        return () => clearInterval(intervalId);
    })


    const nxtBtn = () => {
        let len = data.length;
        if (index === len - 1) {
            setIndex(0);
            console.log(index);
        }
        else {
            setIndex((index) => index + 1);
        }
    }
    return (

        <>
            <h1 className="text-3xl px-[2rem] mt-[1rem]  underline font-bold">{event}</h1>
            <div className='w-[90%] p-[1rem] flex justify-evenly items-center m-auto mt-[1rem] overflow-hidden border-l border-r border-black mb-[1rem]'>
                <button className='flex items-center justify-center w-[5rem] bg-[rgba(209, 209, 209, 0)]' onClick={prevBtn}><p><BiSolidSkipPreviousCircle /></p></button>
                <div className='prd-container'>
                    <div className='p-[1rem]' >
                        <div className='flex flex-col md:flex-row gap-3 '>
                            <div style={{ backgroundImage: `url(${data[index].img})` }} className='h-[25rem] w-[24rem] rounded bg-cover bg-center'> </div>
                            <div className='flex flex-col justify-between items-center gap-4 p-4  rounded-xl shadow-md h-[25rem] w-[30rem]'>
                                <p className='text-2xl no-underline hover:underline font-bold'>{data[index].name}</p>
                                <p className='text-justify '>{data[index].review}</p>
                                <button className='bg-indigo-500 text-white w-[7rem] text-sm px-2 py-1 rounded'>
                                    <Link to={`/services/event/${eventType}`}>See More</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='flex items-center justify-center w-[5rem] bg-[rgba(209, 209, 209, 0)]' onClick={nxtBtn}><p><BiSolidSkipNextCircle /></p></button>
            </div>
        </>
    )
}

export default FeaturedEvent