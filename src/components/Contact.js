import React from 'react'

// Icons
import { faPersonHiking, faCar, faVanShuttle, faSquarePhone, faSquareEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Service = () => {
    return (
        <div className="services-section flex flex-col h-[300px] w-[1024px m-auto">
            <div className="heading my-8 flex justify-center items-center">
                <h5 className="text-xl font-bold text-black">Contact Us</h5>
            </div>
            <div className='activities flex flex-row justify-evenly items-center'>
                <div className="flex flex-col items-center justify-center w-[200px]">
                    <span className=" text-xl font-semibold mb-2 text-black "><FontAwesomeIcon icon={faLocationDot} /></span>
                    <h6 className=" text-lg font-semibold text-black ">Address</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center  w-[200px]">
                    <span className="  text-xl font-semibold mb-2 text-black"><FontAwesomeIcon icon={faSquarePhone} /></span>
                    <h6 className=" text-lg font-semibold text-black ">Phone</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[200px]">
                    <span className="  text-xl font-semibold mb-2 text-black"><FontAwesomeIcon icon={faSquareEnvelope} /></span>
                    <h6 className=" text-lg font-semibold text-black">Email</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Service