import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
function BookCardVendor({ id, price, status, functionDate, customer, bookingId }) {
    const [product, setProduct] = useState({
        banquetHall: "",
        city: "",
        functionDate: functionDate,
        price: price,
        productImage: "",
        productName: "",
        state: "",
        status: status,
    })

    const [orderStatus, setOrderStatus] = useState(product.status);
    const [userData, setUserData] = useState({
        fullName: "",
        mobileNumber: ""
    })
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
        withCredentials: true
    })
    useEffect(() => {

        const fetchProduct = async () => {
            const res = await axiosInstance.get(`/product/get-product-by-id/${id}`);
            const product = res.data.data.product;

            setProduct(prevItem => ({
                ...prevItem,
                banquetHall: product.banquetHall,
                city: product.city,
                state: product.state,
                productImage: product.productImage,
                productName: product.productName,
            }))
        }

        const fetchUserData = async () => {
            const resData = await axiosInstance.get(`/users/get-user-by-id/${customer.id}`);
            setUserData(prevItem => ({
                ...prevItem,
                fullName: resData.data.data.fullName,
                mobileNumber: resData.data.data.mobileNumber,

            }))
        }

        fetchProduct();
        fetchUserData();
    }, [orderStatus])

    const updateBookingStatus = async() =>{
        try {
            const res = await axiosInstance.get(`/update-booking-status/${bookingId}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {

        if(orderStatus !=="COMPLETED"){
            setOrderStatus(event.target.value);
            console.log(orderStatus);
            updateBookingStatus();
        }
    };

    return (
        <div className='w-full bg-white h-[30vh] flex flex-row items-center mt-3'>
            <img src={product.productImage} alt="" className='w-[10vw] p-4 rounded-lg' />
            <div className='w-[40vw]'>
                <h2 className='font-bold text-2xl font-mono'>{product.productName}</h2>
                {/* <p className='font-semibold font-mono'>{product.banquetHall} {product.city} {product.state} </p> */}
                <p className='w-[20vw] font-semibold'>Booked Price: {product.price} </p>
            </div>
            <p className='w-[20vw] font-semibold'>Customer: <br /> {userData.fullName} <br /> {userData.mobileNumber} </p>
            {/* <p className='w-[30vw] font-semibold'> Status: <br /> {product.status} </p> */}
            <div className='w-[30vw] font-semibold'>
                <label htmlFor="status">Status:</label> <br />
                <select id="status" value={orderStatus} onChange={handleChange}>
                    <option value="">Select status</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                </select>
                {/* <p>Selected Status: {status}</p> */}
            </div>
        </div>
    )
}

export default BookCardVendor;