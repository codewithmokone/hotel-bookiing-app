import React from 'react'

// Icons
import { faPersonHiking, faPersonBiking, faCar, faVanShuttle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Service = () => {
    return (
        <div className="services-section flex flex-col h-[300px] w-[1024px] bg-slate-200 m-auto">
            <div className="heading my-8 flex justify-center items-center">
                <h5 className="text-xl font-bold text-[#0088a9]">Services</h5>
            </div>
            <div className='activities flex flex-row justify-evenly items-center'>
                <div className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9] "><FontAwesomeIcon icon={faCar} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Car Hire</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center  w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonHiking} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Free Hiking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faVanShuttle} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9]">Free Shuttle</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[200px] mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonBiking} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Free Biking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Service