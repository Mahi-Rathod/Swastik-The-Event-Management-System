import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DiAtom } from "react-icons/di";
import Product from "../Products/product.jsx";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/product`,
    withCredentials: true
});

const axiosInstanceCategory = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/category`,
    withCredentials: true
});

function Book() {

    const targetRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const [startDate, setStartDate] = useState(new Date());
    const [isBook, setIsBook] = useState(false);
    const [proceed, setProceed] = useState(false);
    const [eventType, setEventType] = useState("")
    const [products, setProducts] = useState([])

    const [product, setProduct] = useState({
        _id: "",
        productName: "",
        productDescription: "",
        productImage: "",
        productPrice: "",
        category: "",
        productSold: "",
        foodType: "",
        decorationType: "",
        otherEvents: "",
        totalGuests: ""
    })

    const [bookData, setBookData] = useState({
        product: product._id,
        name: "",
        date: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/get-product-by-id/${id}`);
                const statusCode = response.data.statusCode
                if (statusCode === '401') {
                    navigate('/login')
                }
                setProduct(response.data.data.product)


                const res = await axiosInstance.get(`/get-products`);
                setProducts(res.data.data.products)

                // 
            } catch (error) {
                console.error('Error fetching data: ', error);
                navigate('/login')
            }
        };


        const fetchCategory = async () => {
            try {
                const categories = await axiosInstanceCategory.get(`/get-categorybyid/${product.category}`)
                setEventType(categories.data.data.category.categoryName)
            } catch (error) {
                console.log("problem occured : - ", error)
            }
        }

        fetchData();
        if (product.category) {
            fetchCategory();
        }
    }, [product.category, product._id, id])


    const handleChangeDate = (date) => {
        const currentDate = new Date();
        const minDate = new Date();
        minDate.setDate(currentDate.getDate() + 20)
        if (date > minDate) {
            setStartDate(date);
        }
        else {
            alert("Function Date must be 20 days after today..")
        }
    }

    const scrollToDetails = () => {
        if (isBook === false) {
            setIsBook(!isBook);
        }

        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }


    const handleChangeLocation = (e) => {
        const { value } = e.target
        setAddress(value)
    }

    const checkOutPackage = async () => {
        const requestData = new FormData();
        requestData.append("orderPrice", product.productPrice)
        requestData.append("address", address)
        requestData.append("functionDate", startDate)
    }

    const handleProceed = async () => {
        setProceed(!proceed);
    }

    return (
        <>
            <div className="bg-white w-[70%] h-[90vh] m-auto mt-5 shadow-xl rounded-md flex justify-evenly">
                <div className="flex flex-col p-2 gap-3 w-[50%]">
                    <div className="h-[70%] p-8 w-[100%] bg-white shadow-md rounded-md flex justify-center">
                        <img src={product.productImage} alt="" className='h-[100%] rounded-md shadow-lg' />
                    </div>

                    <div className="h-[30%] w-[100%] gap-5 flex flex-row items-center">
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={product.productImage} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={product.productImage} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={product.productImage} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>
                        <div className='w-[50%] h-[50%] shadow-lg p-4 rounded-md'>
                            <img src={product.productImage} alt="" className='w-[100%] h-[100%] shadow-lg  rounded-md' />
                        </div>

                    </div>
                </div>

                <div className="w-[40%] flex flex-col justify-between">
                    <div className="p-5 w-[100%] h-[70%] flex flex-col justify-evenly">
                        <h3 className='text-2xl font-sans text-black-600 text-justify'>
                            {product.productName}
                        </h3>
                        <p className='text-sm font-sans text-black-600 text-justify'>
                            {product.productDescription}
                        </p>
                        <h3 className='text-3xl font-bold font-mono text-black-600'> Price : ₹ {product.productPrice} /- </h3>
                        <div className='font-sans w-[100%] flex gap-4'>
                            <p className='text-md font-semibold'>Function Date : </p>
                            <DatePicker
                                selected={startDate}
                                onChange={handleChangeDate}
                                className='rounded font-mono w-[50%] px-2 bg-blue-500 text-white'
                            />
                        </div>
                        <div className='flex justify-start gap-4 w-[100%]'>
                            <button className='w-[30%] bg-blue-500'> Send Query</button>
                            <button className='w-[30%] bg-blue-200 font-thin border-solid border-blue-600 border-[1px] text-blue-600' onClick={scrollToDetails}> BOOK NOW</button>

                        </div>
                        <div className='font-sans w-[100%] flex gap-4'>
                            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Event Place:</label>
                            <h3 id='address' className='font-bold font-mono text-black-600 border-gray-300 border-[1px] p-2 rounded-md'>{product.banquetHall}, <br /> {product.city},<br /> {product.state}</h3>
                        </div>
                        <div className='flex justify-start items-end text-[0.8em] text-red-500 font-mono font-bold cursor-pointer' onClick={scrollToDetails}> view Details </div>
                    </div>

                    <div className='h-[20%] flex items-center font-serif'>
                        <DiAtom />
                        <p>Terms and Contidions Applied</p>
                    </div>

                </div>
            </div>

            <div className="mt-6 flex flex-col w-[70%] m-auto font-serif">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            colSpan="2"
                                            scope="col"
                                            className="px-4 py-3.5 text-center font-normal text-black text-2xl "
                                        >
                                            <div className='w-[100%] flex justify-evenly'>
                                                <span ref={targetRef} className='w-[80%]'> Details </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">

                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-900 font-semibold ">Event Type</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-gray-900 text-right">{eventType}</div>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">Food Type</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-gray-900 text-right">{product.foodType}</div>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">Decoration Type</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-gray-900 text-right">{product.decorationType}</div>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">Other Events</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-gray-900 text-right">{product.otherEvents}</div>
                                        </td>
                                    </tr>
                                    <tr className="divide-x divide-gray-200">
                                        <td className="whitespace-nowrap px-4 py-4">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">Total Guests</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-12 py-4">
                                            <div className="text-sm text-gray-900 text-right">{product.totalGuests}</div>
                                        </td>
                                    </tr>

                                    {isBook &&
                                        <tr>
                                            <th
                                                colSpan="2"
                                                scope="col"
                                                className="px-4 py-3.5 text-center font-normal text-black text-2xl "
                                            >
                                                <button onClick={handleProceed} className='w-[15%] bg-blue-500'> Proceed to Book </button>
                                            </th>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-6 flex flex-col w-[70%] m-auto font-serif bg-white rounded">
                <h3 className='text-center mt-3 text-2xl font-serif'> Other Packages</h3>
                <div className="flex flex-nowrap gap-10 p-10">
                    {products.map((product) => {
                        return (
                            <Product key={product._id} id={product._id} img={product.productImage} name={product.productName} desc={product.productDescription} rate={product.productPrice} sold={product.productSold} />
                        )
                    })}
                </div>
            </div>

            {proceed &&
            // className="fixed inset-0 z-10 flex items-center justify-center w-[100vw]"
                <div className='fixed inset-0 z-10 flex items-center justify-center' >
                    {/* className="absolute inset-0 bg-gray-800 opacity-50 w-[100vw]" */}
                    <div className="absolute inset-0 bg-gray-800 opacity-50 w-[100vw]" ></div>
                    {/* className="bg-white rounded-lg p-8 z-20" */}
                    <div className="bg-white rounded-lg p-8 z-20 w-[70%]">
                        <h1>CheckOut</h1>
                    {/* className="w-full" */}
                        <div>
                        {/* className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" */}
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            {/* className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" */}
                            <input
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your name"
                                id="name"
                            ></input>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Book;

// https://pages.razorpay.com/pl_ODWanY8l0VuryS/view