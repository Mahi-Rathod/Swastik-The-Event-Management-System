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

const axiosInstanceUser = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isBook, setIsBook] = useState(false);
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
    });


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
            setSelectedDate(date);
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


    const saveBookings = async () => {
        const requestData = {
        "orderPrice":product.productPrice,
        "address": `${product.banquetHall} ${product.city} ${product.state}`,
        "functionDate": startDate
        }
        try {
            const bookRes = await axiosInstanceUser.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/bookPackage/${product._id}`,requestData);
            if(bookRes.status===201){
                alert("Your Order Placed SuccessFully You Can Track Your Order");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const paymentForm = async (formData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/createOrder`, formData);

            if (response.data.success) {
                const { order_id, key_id, amount, productName, productDescription, name, contact, email } = response.data.data;


                const options = {
                    key: key_id,
                    amount: amount.toString(),
                    currency: "INR",
                    name: productName,
                    description: productDescription,
                    image: "",
                    order_id: order_id,
                    handler: function (response) {
                        console.log(response);
                        saveBookings();
                        alert("payment Succeeded!");
                    },
                    prefill: {
                        contact: contact,
                        name: name,
                        email: email
                    },
                    notes: {
                        description: productDescription,
                    },
                    theme: {
                        color: "#2300a3"
                    },
                };
                const razorpayObject = new window.Razorpay(options);
                razorpayObject.on('payment.failed', function (response) {
                    alert("payment failed!");
                });

                razorpayObject.open();
            }

            else {
                alert(response.data.msg);
            }
        }
        catch (error) {
            console.log("Error Creating Order: ", error);
            alert("An Error Occurred. Please try again....");
        }
    };

    const handleProceed = async () => {
        const user = await axiosInstanceUser.get(`/users/getUser`);
        const { fullName, email, mobileNumber } = user.data.data.user;

        const formData = {
            "amount": product.productPrice,
            "productName": product.productName,
            "productDescription": product.productDescription,
            "name": fullName,
            "email": email,
            "contact": mobileNumber,
            "productImage": product.productImage,
        }
        if (selectedDate === startDate) {
            paymentForm(formData);
        }
        else {
            alert("Please Select Date")
        }
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
                        <h3 className='text-2xl font-bold font-mono text-black-600'> Price : ₹ {product.productPrice} /- </h3>
                        <div className='font-sans w-[100%] flex gap-4'>
                            <p className='text-md font-semibold'>Function Date : </p>
                            <DatePicker
                                selected={startDate}
                                onChange={handleChangeDate}
                                // dateFormat="DD/MM/YYYY"
                                className='rounded font-mono w-[50%] px-2 bg-blue-500 text-white'
                                placeholderText='DD/MM/YYYY'
                            />
                        </div>
                        <div className='flex justify-start gap-4 w-[100%]'>
                            <button className='w-[30%] bg-white hover:bg-white'> </button>
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

        </>
    )
}

export default Book;

// https://pages.razorpay.com/pl_ODWanY8l0VuryS/view