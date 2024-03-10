
import { Router,  Routes, Route, Navigate, Outlet } from 'react-router-dom'
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

// const router = createBrowserRouter([{
//   path:'',
//   element:<Layout />,
//   children:[
//     {path:'', element:<Home />},
//     {path:'about-us', element:<About />},
//     {path:'services', element:<Services />},
//     {path:'contact', element:<Contact />},
//     {path:'services/book-package', element:<Book />, action: requireAuth},
//     {path:'services/marriage', element:<MarriageEvents />, action: requireAuth},
//     {path:'login',element:<UserSignIn />},
//     {path:'signup',element:<UserSignUp />},
//     {path:'vendor-sign-in',element:<VendorSignIn/>},
//   ],
// }])

const PrivateRoutes = () => {
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

function App() {
  return (
    <Router>
      <Routes >
        <Route element={<PrivateRoutes />}>
          <Route path='services/book-package' element={<Book />} />
          <Route path='services/marriage' element={<MarriageEvents />} />
        </Route>
        <Route path='login' element={<UserSignIn />} />
      </Routes>
    </Router>
  )
}

export default App;
