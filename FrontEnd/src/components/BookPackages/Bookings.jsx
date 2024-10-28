import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCardVendor from './BookCardVendor';

function Bookings() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("All");
    const bookingAxiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
        withCredentials: true,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await bookingAxiosInstance.get('/get-vendor-bookings');
                const booked = bookings.data.data;
                setProducts(booked);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [status]);

    const handleClick = (e) => {
        setStatus(e.target.value);
    };

    const filteredProducts = status === "All"
        ? products
        : products.filter(product => product.status === status);

    const pendingBookingsCount = filteredProducts.filter(product => product.status === "PENDING").length;
    const completedBookingCount = status === "COMPLETED"
        ? products
        : products.filter(product => product.status === status).length;

    return (
        <div className="w-[90%] m-auto flex flex-row justify-evenly p-2 gap-3">
            <aside className="w-[20%] h-[50vh] bg-white shadow-md flex flex-col p-3">
                <h1 className="bg-gray-300 w-[90%] text-black text-xl font-semibold p-1 rounded-sm my-3">Filters</h1>
                <h1 className="w-[90%] text-black text-md font-semibold p-1 rounded-sm">Status</h1>
                <hr className="py-3" />
                <div className="flex flex-col space-y-4 ml-3">
                    {['All', 'PENDING', 'COMPLETED'].map((option) => (
                        <label key={option} className="flex cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value={option}
                                className="hidden peer"
                                checked={status === option}
                                onChange={handleClick}
                            />
                            <span className="w-4 h-4 border-2 border-blue-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-transparent"></span>
                            <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                    ))}
                </div>
            </aside>
            <aside className="w-[80%] m-auto text-center p-2">
                {
                    status === "All" && (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                                    <div className="w-full">
                                        <h2 className='text-2xl font-bold'>You don't have any Bookings</h2>
                                    </div>
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <BookCardVendor
                                        key={product._id}
                                        id={product.bookedItem}
                                        price={product.orderPrice}
                                        status={product.status}
                                        functionDate={product.functionDate}
                                        customer = {{id : product.customer}}
                                        bookingId={product._id}
                                    />
                                ))
                            )}
                        </>
                    )
                }

                {
                    status === "PENDING" && (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                                    <div className="w-full">
                                        <h2>You don't have any Pending Events</h2>
                                    </div>
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <BookCardVendor
                                        key={product._id}
                                        id={product.bookedItem}
                                        price={product.orderPrice}
                                        status={product.status}
                                        functionDate={product.functionDate}
                                        customer = {product.customer}
                                        bookingId={product._id}
                                    />
                                ))
                            )}
                        </>
                    )
                }

                {
                    status === "COMPLETED" && (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="w-full bg-white h-[30vh] flex flex-row items-center">
                                    <div className="w-full">
                                        <h2 className='text-2xl font-bold'>You don't have any Completed Events</h2>
                                    </div>
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <BookCardVendor
                                        key={product._id}
                                        id={product.bookedItem}
                                        price={product.orderPrice}
                                        status={product.status}
                                        functionDate={product.functionDate}
                                        customer = {product.customer}
                                        bookingId={product._id}
                                    />
                                ))
                            )}
                        </>
                    )
                }

            </aside>
        </div>
    );
}

export default Bookings;
