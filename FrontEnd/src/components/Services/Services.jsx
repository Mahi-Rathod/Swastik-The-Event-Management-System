//import mages for wedding
import wedding_1 from '../../assets/marriage/wedding_1.jpg'
import wedding_2 from '../../assets/marriage/wedding_2.jpg'
import wedding_3 from '../../assets/marriage/wedding_3.jpg'
import wedding_4 from '../../assets/marriage/wedding_4.jpg'
import wedding_5 from '../../assets/marriage/wedding_5.jpg'
import wedding_6 from '../../assets/marriage/wedding_6.jpg'

//import images for birthday
import birthday_1 from '../../assets/birthday/birthday_1.jpeg'
import birthday_2 from '../../assets/birthday/birthday_2.jpg'
import birthday_3 from '../../assets/birthday/birthday_3.jpg'
import birthday_4 from '../../assets/birthday/birthday_4.jpg'
import birthday_5 from '../../assets/birthday/birthday_5.jpg'
import birthday_6 from '../../assets/birthday/birthday_6.jpg'

//import images for concert
import concert_1 from '../../assets/concert/concert_1.jpeg'
import concert_2 from '../../assets/concert/concert_2.jpeg'
import concert_3 from '../../assets/concert/concert_3.jpg'
import concert_4 from '../../assets/concert/concert_4.jpg'
import concert_5 from '../../assets/concert/concert_5.jpg'
import concert_6 from '../../assets/concert/concert_6.jpg'

import React, { useState } from "react";
import './Services.css'
import FeaturedEvent from './ServicesComponents/FeaturedEvent'
import { useNavigate } from 'react-router-dom'

function Services() {
    const [queryPopUp, setQueryPopUp] = useState(false);
    const [queries, setQueries] = useState([]);
    const navigate = useNavigate();

    const handleQueryPop = () =>{
        navigate('/contact')
    }
    return (
        <>
            <div className="flex flex-col mx-auto w-full md:flex-row">
                <div className='event-container'>
                    <FeaturedEvent data={marriageData} eventType="661c44541e28b02ab8589989" />
                    <FeaturedEvent data={birthdayData} eventType="661c45401e28b02ab858998b" />
                    <FeaturedEvent data={publicEvent} eventType="661c45971e28b02ab858998f" />
                </div>
                <div className="flex flex-col items-center mt-[2rem]">
                    <button className='bg-blue-600 text-white w-[8rem] font-bold p-1 rounded sticky top-[10%] animate-bounce' onClick={handleQueryPop}>Help</button>
                </div>
            </div>
            
        </>
    )
}
export default Services;

// for marriage data
const marriageData = [
    {
        name: `Harmony of Hearts`,
        img: wedding_1,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless logistics, handle guest accommodations, transportation, and oversee the smooth flow of ceremonies and festivities. `
    },
    {
        name: `Creating a Spiritual Bonds`,
        img: wedding_2,
        review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero explicabo animi nostrum optio voluptatibus beatae ad consequuntur voluptate vero, accusantium delectus dolorum harum. Similique minus ullam molestiae sapiente explicabo reprehenderit, inventore ex delectus recusandae enim expedita quis libero `
    },
    {
        name: `Kanyadaan`,
        img: wedding_3,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi dolorum beatae perspiciatis nulla ea. Tempora blanditiis vitae magnam explicabo aut nesciunt reiciendis commodi quibusdam, eum ducimus. Ducimus vitae vel voluptatum nisi deleniti nam suscipit quia quisquam, natus illo? Quae debitis harum praesentium, tempore at, `
    },
    {
        name: `Happily Ever After`,
        img: wedding_4,
        review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos earum minima vitae, alias nisi provident sed fugit tenetur! Sunt veniam, earum quod nam fugiat perferendis, aperiam recusandae qui excepturi magnam sed vero quis ipsum! Tenetur quas rem, autem ex atque, consequuntur at id dolorem velit aliquid quis ipsum illo temporibus? Aspernatur, odit facilis beatae magni, porro modi qui alias consequuntur omnis vitae iure .`
    },
    {
        name: `Affable`,
        img: wedding_5,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless `
    },
    {
        name: `Heart-to-Heart`,
        img: wedding_6,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero velit sunt incidunt consectetur omnis illum dicta dolorum accusamus alias deleniti perferendis quam praesentium reiciendis minima, nostrum vel deserunt quisquam architecto ullam doloribus? Velit voluptates praesentium impedit accusantium eum nihil cumque quae dicta consequuntur soluta, porro, error expedita ipsum eius dolore quo aperiam natus quasi saepe rerum, suscipit aspernatur. Commodi, alias.`
    },

]

const birthdayData = [
    {
        name: `Harmony of Hearts`,
        img: birthday_1,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless logistics, handle guest accommodations, transportation, and oversee the smooth flow of ceremonies and festivities. `
    },
    {
        name: `Creating a Spiritual Bonds`,
        img: birthday_2,
        review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero explicabo animi nostrum optio voluptatibus beatae ad consequuntur voluptate vero, accusantium delectus dolorum harum. Similique minus ullam molestiae sapiente explicabo reprehenderit, inventore ex delectus recusandae enim expedita quis libero `
    },
    {
        name: `Kanyadaan`,
        img: birthday_3,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi dolorum beatae perspiciatis nulla ea. Tempora blanditiis vitae magnam explicabo aut nesciunt reiciendis commodi quibusdam, eum ducimus. Ducimus vitae vel voluptatum nisi deleniti nam suscipit quia quisquam, natus illo? Quae debitis harum praesentium, tempore at, `
    },
    {
        name: `Happily Ever After`,
        img: birthday_4,
        review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos earum minima vitae, alias nisi provident sed fugit tenetur! Sunt veniam, earum quod nam fugiat perferendis, aperiam recusandae qui excepturi magnam sed vero quis ipsum! Tenetur quas rem, autem ex atque, consequuntur at id dolorem velit aliquid quis ipsum illo temporibus? Aspernatur, odit facilis beatae magni, porro modi qui alias consequuntur omnis vitae iure .`
    },
    {
        name: `Affable`,
        img: birthday_5,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless `
    },
    {
        name: `Heart-to-Heart`,
        img: birthday_6,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero velit sunt incidunt consectetur omnis illum dicta dolorum accusamus alias deleniti perferendis quam praesentium reiciendis minima, nostrum vel deserunt quisquam architecto ullam doloribus? Velit voluptates praesentium impedit accusantium eum nihil cumque quae dicta consequuntur soluta, porro, error expedita ipsum eius dolore quo aperiam natus quasi saepe rerum, suscipit aspernatur. Commodi, alias.`
    },

]

const publicEvent = [
    {
        name: `Shubh Prabs `,
        img: concert_1,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless logistics, handle guest accommodations, transportation, and oversee the smooth flow of ceremonies and festivities. `
    },
    {
        name: `Creating a Spiritual Bonds`,
        img: concert_2,
        review: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero explicabo animi nostrum optio voluptatibus beatae ad consequuntur voluptate vero, accusantium delectus dolorum harum. Similique minus ullam molestiae sapiente explicabo reprehenderit, inventore ex delectus recusandae enim expedita quis libero `
    },
    {
        name: `Kanyadaan`,
        img: concert_3,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi dolorum beatae perspiciatis nulla ea. Tempora blanditiis vitae magnam explicabo aut nesciunt reiciendis commodi quibusdam, eum ducimus. Ducimus vitae vel voluptatum nisi deleniti nam suscipit quia quisquam, natus illo? Quae debitis harum praesentium, tempore at, `
    },
    {
        name: `Happily Ever After`,
        img: concert_4,
        review: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos earum minima vitae, alias nisi provident sed fugit tenetur! Sunt veniam, earum quod nam fugiat perferendis, aperiam recusandae qui excepturi magnam sed vero quis ipsum! Tenetur quas rem, autem ex atque, consequuntur at id dolorem velit aliquid quis ipsum illo temporibus? Aspernatur, odit facilis beatae magni, porro modi qui alias consequuntur omnis vitae iure .`
    },
    {
        name: `Affable`,
        img: concert_5,
        review: `This wedding involves meticulous planning, coordination, and execution to create a memorable and culturally rich celebration. From selecting auspicious dates and venues to arranging elaborate decorations, traditional rituals, sumptuous cuisine, and entertainment, every detail is carefully curated to reflect the couple's heritage and preferences. Skilled event managers work closely with families to ensure seamless `
    },
    {
        name: `Heart-to-Heart`,
        img: concert_6,
        review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero velit sunt incidunt consectetur omnis illum dicta dolorum accusamus alias deleniti perferendis quam praesentium reiciendis minima, nostrum vel deserunt quisquam architecto ullam doloribus? Velit voluptates praesentium impedit accusantium eum nihil cumque quae dicta consequuntur soluta, porro, error expedita ipsum eius dolore quo aperiam natus quasi saepe rerum, suscipit aspernatur. Commodi, alias.`
    },

]