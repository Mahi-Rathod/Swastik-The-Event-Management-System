import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
function UserProfile() {
    const [userData, setUserData] = useState({});

    const axiosUserInstance = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`,
        withCredentials: true
    })

    const handleLogout = async () => {
        try {
            await axiosUserInstance.post('/logout');
            dispatch(logoutSuccess());
            setIsVendor(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosUserInstance.get(`/getUser`);
                setUserData(res.data.data.user)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    return (
        <div className="w-[90%] m-auto flex flex-row justify-evenly p-2 gap-3">
            <aside className="w-[20%] h-[50vh] bg-white shadow-md flex flex-col p-3">
                {userData.isVendor &&
                    <div className="flex items-center lg:order-2 flex-col  gap-2">
                        <NavLink
                            className={({ isActive }) => `block duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold bg-slate-200 rounded-sm w-[80%] text-center`
                            }
                            to=''
                        >
                            <p className="p-2">Profile</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `block duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold bg-slate-200 rounded-sm  w-[80%] text-center`
                            }
                            to='/packages-added'
                        >
                            <p className="p-2">Our Products</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `block duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold bg-slate-200 rounded-sm  w-[80%] text-center`
                            }
                            to='/add-products'
                        >
                            <p className="p-2">Add Products</p>
                        </NavLink>

                        <NavLink
                            className="text-gray-800 hover:bg-pink-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  mr-2 focus:outline-none bg-slate-200"
                            onClick={handleLogout}
                        >
                            <p className="p-2">Log Out</p>
                        </NavLink>
                    </div>
                }
                {!userData.isVendor &&
                    <div className="flex items-center lg:order-2 flex-col  gap-2">

                        <NavLink
                            className={({ isActive }) => `block duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold bg-slate-200 rounded-sm w-[80%] text-center`
                            }
                            to=''
                        >
                            <p className="p-2">Profile</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `block duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold bg-slate-200 rounded-sm  w-[80%] text-center`
                            }
                            to='/my-bookings'
                        >
                            <p className="p-2">Bookings</p>
                        </NavLink>



                        <NavLink
                            className="text-gray-800 hover:bg-pink-500 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  mr-2 focus:outline-none bg-slate-200"
                            onClick={handleLogout}
                        >
                            <p className="p-2">Log Out</p>
                        </NavLink>
                    </div>
                }
            </aside>
            <aside className="w-[80%] h-[50vh] m-auto p-2">
                <section className="w-[80%] h-[50vh] bg-white m-auto p-4" >
                    <div class="mt-8">
                        <h2 class="text-xl font-bold mb-4">Profile Information</h2>
                        <ul class="mb-4">
                            <li className='p-3 font-mono'><strong>Name:</strong> {userData.fullName}</li>
                            <li className='p-3 font-mono'><strong>Phone:</strong> {userData.mobileNumber}</li>
                            <li className='p-3 font-mono'><strong>Email:</strong> {userData.email}</li>
                            <li className='p-3 font-mono'><strong>IsVendor:</strong> {userData.isVendor ? "YES" : "NO"} </li>
                            <li className='p-3 font-mono'><strong>Bio:</strong> "Be YourSelf !  " </li>
                        </ul>
                    </div>
                </section>
            </aside>
        </div >
    )
}

export default UserProfile