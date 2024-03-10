import img1 from '../../assets/gallary/img1.jpg'
import './BookPackage.css'
import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
function Book(){
    const [details, setDetails] = useState([
        {
            Locations :"Delhi",
            Date : Date(),
            Guest: 10,
            Rooms: 5,
            flight:{
                from:"Aurangabad",
                to  :"Delhi"
            },
            Food :[],
            Decoration :[],
        }
    ])
    const change = ({key, value}) =>{
        setDetails(key.value)
    }
    const eventLocations = ['Nanded', 'Pune', 'Sambhajinagar', 'Delhi', 'Jaipur', 'utii', 'Bengaluru']
    return(
        <>
            <div className='image' style={{ backgroundImage: `url(${img1})` }} />
            <div className='offers'></div>
            <form>
                <div className="event-locations">
                    <p className="text-black mb-2 font-bold my-1">Locations</p>
                    <select
                        className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    >
                        {eventLocations.map((Location)=>(
                            <option key={Location} value={Location}>
                                {Location}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="dates" className="text-black mb-2 font-bold my-1">Date</label>
                    <input type='date' id='dates' className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" />

                </div>
                <table className='table'>
                    <thead className=''>
                        <tr>
                            <th className='head'><div> Offerings </div></th>
                            <th className='head'><div>Prices</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr> 
                            <td className='head'><div className='td'>Private Resort:Guest, Rooms</div></td>
                            <td className='head'><div className='td'>500000</div></td>
                        </tr>
                    
                        <tr>
                            <td className='head'><div className='td'>Food</div></td>
                            <td className='head'><div className='td'>30000(may change)</div></td>
                        </tr>
                        <tr>
                            <td className='head'><div className='td'>Decoration</div></td>
                            <td className='head'><div className='td'>300000</div></td>
                        </tr>
                        <tr>
                            <td className='head'><div className='td'>Functions,haldi,mehandi</div></td>
                            <td className='head'><div className='td'>All The More.</div></td>
                        </tr>
                        
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default Book;