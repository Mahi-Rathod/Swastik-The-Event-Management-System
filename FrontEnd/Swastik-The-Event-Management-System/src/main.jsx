import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import Layout from './Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Services from './components/Services/Services.jsx'
import Contact from './components/Contact/Contact.jsx'
import Book from './components/BookPackages/BookPackage.jsx'
import MarriageEvents from './components/Services/ServicesComponents/MarriageEvents.jsx'
import UserSignIn from './components/Authentication/UserSignIn.jsx'
import UserSignUp from './components/Authentication/UserSignUp.jsx'
import VendorSignIn from './components/Authentication/VendorSignIn.jsx'
import AddProducts from './components/VendorThings/AddProducts.jsx'
import MyBooking from './components/BookPackages/myBookings.jsx'

const router = createBrowserRouter([{
  path:'',
  element:<Layout />,
  children:[
    {path:'', element:<Home />},
    {path:'about-us', element:<About />},
    {path:'services', element:<Services />},
    {path:'contact', element:<Contact />},
    // {path:'services/book-package/:id', element:<Book />},
    {
      path:'services/book-package',
      element:<Book />,
      children:[
        {
          path:':id'
        }
      ]
    },
    {path:'services/event', element:<MarriageEvents />},
    {path:'login',element:<UserSignIn />},
    {path:'signup',element:<UserSignUp />},
    {path:'vendor-sign-in',element:<VendorSignIn/>},
    {path:'add-products', element:<AddProducts/>},
    {path:'my-bookings', element:<MyBooking />}
  ],
}])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
