import img from "../../assets/about-us.jpg";
function About(){
    return(
        <div className="w-[90%] m-auto">
            <div className="w-full h-[25rem] bg-center bg-cover flex flex-col justify-center items-center" style={{backgroundImage:`url(${img})`}}>
                <h1 className="text-[6rem] text-white font-mono font-extrabold drop-shadow-lg">About Us</h1>
                <p className="w-[80%] font-semibold text-3xl text-[#ffffff]">
                    The team of My Codeless Website has over 18 years of experience in web design and web development. We’re based in Utrecht in the Netherlands. Combined, we’ve created over 500 websites and have seen so many websites – we dream about them. 
                </p>
            </div>
            <div className="w-full m-4">
                <h1 className="text-3xl text-black font-mono font-extrabold drop-shadow-lg">Want to visit us?</h1>
                <p className="font-mono text-[1rem] mt-2 mb-2">MGM'S College of Engineering Nanded, <br /> Namaskar Chauk, <br />Near Airport Road <br /> Nanded - 411601 </p>
            </div>
            <div className="w-full m-4">
                <h1 className="text-3xl text-black font-mono font-extrabold drop-shadow-lg">Want to call us?</h1>
                <p className="font-mono text-[1rem] mt-2 mb-2">+91 8012109870</p>
            </div>
            <p className="text-[1.2rem] text-black font-mono drop-shadow-lg m-4">Thank You for visiting Us..... <br /> if You had Any Query Reach us we will Provide you strong Guidence... <br /> Your Feedback will help us to Improve. :) </p>
        </div>
    )
}
export default About;