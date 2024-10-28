import Slogan from './slogan'
import Gallery from './gallery'
import Perks from './perks'
import TrendingPackages from './trendingpackages'
import img1 from "../../assets/gallary/img1.jpg";
import img2 from "../../assets/gallary/img2.jpg";
import img3 from "../../assets/gallary/img3.jpg";
import img4 from "../../assets/gallary/img4.jpg";
import img5 from "../../assets/gallary/img5.jpg";
import img6 from "../../assets/gallary/img6.jpg";
import img7 from "../../assets/gallary/img7.jpg";
import img8 from "../../assets/gallary/img8.jpg";
import img9 from "../../assets/gallary/img9.jpg";
import img10 from "../../assets/gallary/img10.jpg";

function Home() {
    const slides = [{ img: img1 },
    { img: img2, 
        // name: "Birthday and surprise Parties", dec: "Celebrations held at homes, restaurants, event venues, or outdoor locations."
    },
    { img: img3, 
        // name: "Traditional Music and Dance Performances", dec: "Provide platforms for artists to preserve and showcase cultural heritage and for audiences to enjoy diverse forms of entertainment." 
    },
    { img: img4,
        //  name: "Film Screenings and Festivals:", dec: "Provide opportunities for filmmakers to present their work and for audiences to explore diverse cinematic experiences."
         },
    { img: img5,
        //  name: "Ethnic Food Festivals", dec: "Events celebrating the culinary traditions of different cultures and regions" 
        },
    { img: img6, 
        // name: "Destination weddings and Celebrations", dec: "Destination weddings are weddings that take place in a location away from the couple's hometown or country."
     },
    { img: img7, 
        // name: "Heritage Tours and Events", dec: "Offer educational experiences that promote awareness and appreciation of local history and heritage."
     },
    { img: img8, 
        // name: "Art Exhibitions and Gallery Openings", dec: "Provide opportunities for artists to display their work and for the public to appreciate and purchase art."
     },
    { img: img9, 
        // name: "Historical Reenactments", dec: "Offer immersive experiences that allow participants and spectators to learn about and engage with history." 
    },
    { img: img10, 
        // name: "Candle Light Dinners and Caters", dec: "Caterers are responsible for preparing and cooking a wide range of dishes, including appetizers, main courses, desserts, and beverages. They must ensure that the food is fresh, delicious, and presented attractively."
     }
    ];


    return (
        
        <>
            {/* <Slogan /> */}
            <Gallery slides={slides} />
            <TrendingPackages />
            <Perks />
        </>
    );
}

export default Home;