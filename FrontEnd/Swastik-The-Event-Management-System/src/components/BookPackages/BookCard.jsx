import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
function BookCard({id, price, status, functionDate}) {
    const [product, setProduct] = useState({
        banquetHall  : "",
        city         : "",
        functionDate : functionDate,
        price        : price,
        productImage : "",
        productName  : "",
        state        : "",
        status       : status,
    })
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
        withCredentials: true
    })
    useEffect(() => {
      
        const fetchProduct = async() =>{
            const res = await axiosInstance.get(`/product/get-product-by-id/${id}`);
            const product = res.data.data.product;

            setProduct(prevItem => ({
                ...prevItem,
                banquetHall: product.banquetHall,
                city       : product.city,
                state      : product.state,
                productImage:product.productImage,
                productName:product.productName
            }))
        }
        fetchProduct();
    }, [])
    

    return (
        <div className='w-full bg-white h-[30vh] flex flex-row items-center mt-3'>
            <img src={product.productImage} alt="" className='w-[10vw] p-4 rounded-lg' />
            <div className='w-[40vw]'>
                <h2 className='font-bold text-2xl font-mono'>{product.productName}</h2>
                <p className='font-semibold font-mono'>{product.banquetHall} {product.city} {product.state} </p>
            </div>
            <p className='w-[20vw] font-semibold'>Booked Price: <br />{product.price} </p>
            <p className='w-[30vw] font-semibold'> Status: <br /> {product.status} </p>
        </div>
    )
}

export default BookCard;