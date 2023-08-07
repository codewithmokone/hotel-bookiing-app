import React from 'react'

// Icons
import { faPersonHiking, faPersonBiking, faCar, faVanShuttle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Service = () => {
    return (
        <div className="services-section flex flex-col h-[300px] w-[1024px] bg-slate-200 m-auto">
            <div className="heading my-8 flex justify-center items-center">
                <h5 className="text-xl font-bold text-sky-600">Services</h5>
            </div>
            <div className='activities flex flex-row justify-evenly items-center'>
                <div className="flex flex-col items-center justify-center w-[200px]">
                    <span className=" text-xl font-semibold mb-2 text-sky-600 "><FontAwesomeIcon icon={faCar} /></span>
                    <h6 className=" text-lg font-semibold text-sky-600 ">Car Hire</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center  w-[200px]">
                    <span className="  text-xl font-semibold mb-2 text-sky-600"><FontAwesomeIcon icon={faPersonHiking} /></span>
                    <h6 className=" text-lg font-semibold text-sky-600 ">Free Hiking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[200px]">
                    <span className="  text-xl font-semibold mb-2 text-sky-600"><FontAwesomeIcon icon={faVanShuttle} /></span>
                    <h6 className=" text-lg font-semibold text-sky-600">Free Shuttle</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-[200px] ">
                    <span className=" text-xl font-semibold mb-2 text-sky-600"><FontAwesomeIcon icon={faPersonBiking} /></span>
                    <h6 className=" text-lg font-semibold text-sky-600 ">Free Biking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Service