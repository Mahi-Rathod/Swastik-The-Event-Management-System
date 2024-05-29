import { useState,useEffect } from "react";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr"

import "./gallery.css"
function Gallery({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  
  const prev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const next = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }
  
   // Function to go to the next slide
   const nextSlide = () => {
    const newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    // Set up a timer to advance to the next slide every 5 seconds (5000 milliseconds)
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    // Clean up the timer when the component unmounts or when slides change
    return () => clearInterval(timer);
  }, [currentIndex, slides]);

  
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="slider">
            <div className="item" style={{ backgroundImage: `url(${slides[currentIndex].img})` }}>
            </div>

            <div className="item" style={{ backgroundImage: `url(${slides[(currentIndex)].img}})` }}>
              <div className="content">
                <div className="name">{slides[currentIndex].name}</div>
                <div className="dec">
                  {slides[currentIndex].dec}
                </div>
                {/* <button className="px-[10px] py-[20px] bg-[#6abef7] font-semibold rounded-[0.3px] w-[10rem]">See more</button> */}
              </div>
            </div>

            <div className="item" style={{ backgroundImage: `url(${slides[((currentIndex) - 1) % 10].img})` }} onClick={prev}>
            </div>

            <div className="item" style={{ backgroundImage: `url(${slides[((currentIndex) + 1) % 10].img})` }} onClick={next}>
            </div>

            {/* <div className="item" style={{ backgroundImage: `url(${slides[((currentIndex) + 3) % 10].img})` }}>
            </div> */}

          </div>
          <div className="buttons">
            <button className="pre" onClick={prev}>
              <GrCaretPrevious />
            </button>
            <button className="next" onClick={next}>
              <GrCaretNext />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;