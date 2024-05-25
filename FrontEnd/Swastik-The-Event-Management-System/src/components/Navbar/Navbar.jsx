import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, loginSuccess } from "../../Store/authSlice";
import axios from "axios"
import { useEffect, useState } from "react";


function Navbar() {
    const checkAuth = useSelector((state) => state.authentication.isAuthenticated);
    const [isVendor, setIsVendor] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        // Your backend URL
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/users`,
        // Set credentials to include cookies with each request
        withCredentials: true
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/getUser');
                if (response.data.statusCode === 200) {
                    if (response.data.data.user.isVendor === true) {
                        setIsVendor(true);
                    }
                    else {
                        setIsVendor(false);
                    }
                    dispatch(loginSuccess());
                    // navigate('/');
                }
                else {
                    setIsVendor(false);
                }
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchData();
    }, [navigate, checkAuth])


    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout');
            dispatch(logoutSuccess());
            setIsVendor(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-gray-200 border-gray-200 px4 lg:px-6 py-1">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo} alt="Swastika"
                            className="sticky mr-3 h-14"
                        />
                    </Link>

                    {isVendor &&
                        <div className="flex items-center lg:order-2">
                            <Link
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                to='/add-products'
                            >
                                Add Products
                            </Link>
                        </div>
                    }

                    {checkAuth && !isVendor &&
                        <div className="flex items-center lg:order-2">
                            <Link
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                to='/my-bookings'
                            >
                                My Bookings
                            </Link>
                        </div>
                    }

                    {!checkAuth &&
                        <div className="flex items-center lg:order-2">
                            <Link
                                to='/login'

                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Log In
                            </Link>
                            <Link
                                to='signup'
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                            >
                                Sign Up
                            </Link>
                        </div>
                    }

                    {checkAuth &&
                        <div className="flex items-center lg:order-2">
                            <Link
                                // to='/login'
                                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                onClick={handleLogout}
                            >
                                Log Out
                            </Link>
                        </div>
                    }




                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                            <li className="hover:bg-white px-2 py-1 rounded-md">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li className="hover:bg-white px-2 py-1 rounded-md">
                                <NavLink
                                    to="/services"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-500" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold`
                                    }
                                >
                                    Services

                                </NavLink>
                            </li>

                            <li className="px-2 py-1 rounded-md hover:bg-white">
                                <NavLink
                                    to="/about-us"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>

                            <li className="hover:bg-white px-2 py-1 rounded-md">
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-600" : "text-gray-500"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0  font-bold`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            {/* <div className="track-route">Home</div> */}
        </header>
    )
}
export default Navbar;