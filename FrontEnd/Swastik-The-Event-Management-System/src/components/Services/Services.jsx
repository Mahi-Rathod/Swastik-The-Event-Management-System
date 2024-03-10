import wedding_1 from '../../assets/marriage/wedding_1.jpg'
import wedding_2 from '../../assets/marriage/wedding_2.jpg'
import wedding_3 from '../../assets/marriage/wedding_3.jpg'
import wedding_4 from '../../assets/marriage/wedding_4.jpg'
import wedding_5 from '../../assets/marriage/wedding_5.jpg'
import wedding_6 from '../../assets/marriage/wedding_6.jpg'
import React, { useState } from "react";
import './Services.css'
import SendEnquiry from './SendEnquiry/SendEnquiry'
import FeaturedEvent from './ServicesComponents/FeaturedEvent'

function Services() {
    const [queryPopUp, setQueryPopUp] = useState(false);
    const [queries, setQueries] = useState([]);

    const handleQueryPop = () => {
        setQueryPopUp(!queryPopUp);
    }

    const saveQuery = (queryObj) => {
        let tempList = queries;
        tempList.push(queryObj);
        localStorage.setItem("queries", JSON.stringify(tempList));
        setQueries(tempList);
    }

    return (
        <>
            <div className="flex flex-col mx-auto w-full md:flex-row">
                <div className='event-container'>
                    <FeaturedEvent data={marriageData} eventType="Featured Weddings" />
                    <FeaturedEvent data={marriageData} eventType="Featured BirthDays" />
                    <FeaturedEvent data={marriageData} eventType="Featured Carporate Party" />
                </div>
                <div className="flex flex-col items-center mt-[2rem]">
                    <button className='bg-blue-600 text-white w-[8rem] font-bold p-1 rounded sticky top-[10%] animate-bounce' onClick={handleQueryPop}>Help</button>
                </div>
            </div>
            {queryPopUp && <SendEnquiry handleQueryPop={handleQueryPop} saveQuery={saveQuery} />}
        </>
    )
}
export default Services;

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
