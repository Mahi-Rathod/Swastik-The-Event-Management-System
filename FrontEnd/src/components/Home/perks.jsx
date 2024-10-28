import './perks.css'
import { FiDollarSign } from "react-icons/fi";
import { LuHeartPulse } from "react-icons/lu";
import { RiMentalHealthLine } from "react-icons/ri";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { SlGraph } from "react-icons/sl";
function Perks(){
    return(
        <>
            <div className="perks">
                <h1 className="trends">Perks</h1>
                <div className="perks-containers">
                    <div className="perks1">
                        <h1><FiDollarSign/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                    <div className="perks1">
                        <h1><LuHeartPulse/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                    <div className="perks1">
                        <h1><MdOutlineFlightTakeoff/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                    <div className="perks1">
                        <h1><RiMentalHealthLine/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                    <div className="perks1">
                        <h1><SlGraph/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                    <div className="perks1">
                        <h1><IoHome/></h1>
                        <h2>Competitive Salary & Equity</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur
                            adipisicing elit. Eum iusto quae quam id
                            quas culpa blanditiis cumque doloremque unde ut amet,
                            atque recusandae fugit cupiditate nihil earum sequi vero eos.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Perks;