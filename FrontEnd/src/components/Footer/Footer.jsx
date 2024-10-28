import img from "../../../Logo.png"
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
function Footer(){
    return(
        <>
            <div className="footers">
                <div className="company">
                    <div className="com">
                        <img src={img} alt="" />
                        <h2>Swastik</h2>
                    </div>
                    <p>Near MGM's College of Engineering, <br />Nanded, <br /> 431601</p>
                </div>
                <div className="sol">
                    <br />
                    <h1>Solutions</h1> <br />
                    <p>Onsite operations,<br />Virtual events,<br />Virtual trade shows,<br />Hybrid events</p>
                </div>
                <div className="cont-join">
                    <br />
                    <h2>Contact Us</h2> 
                    <hr /> <br />
                    <h2>Join us</h2>
                    <hr />
                </div>
                <div className="social-media"> <br />
                    <FaFacebookF/>
                    <SlSocialTwitter/>
                    <FaLinkedinIn/>
                    <FaGooglePlusG/>
                </div>
                
            </div>
        </>
    )
}
export default Footer;