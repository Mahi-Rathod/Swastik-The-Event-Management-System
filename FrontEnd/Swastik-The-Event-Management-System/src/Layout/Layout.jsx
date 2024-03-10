import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer"
import { Outlet } from "react-router-dom";
// import { myContext } from "../Contexts/AllContexts";
import { Provider } from "react-redux";
import Store from "../Store/Store";
function Layout(){
    return(
        <Provider store={Store}>
            <Navbar />
            <Outlet />
            <Footer />
        </Provider>
    )
}
export default Layout