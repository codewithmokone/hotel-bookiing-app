import React from 'react'

// Icons
import { faPersonHiking, faPersonBiking, faCar, faVanShuttle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';


const Service = () => {
    return (
        <Box
            sx={{
                width: { xs:400 ,sm: 786, md: 1024 },
                height: {xs:500, sm: 300, md: 300 },
                display: 'flex',
                flexDirection: 'column'
            }}
            className="services-section bg-slate-200 m-auto"
        >
            <div className="heading my-8 flex justify-center items-center">
                <h5 className="text-xl font-bold text-[#0088a9]">Services</h5>
            </div>
            <Box
                sx={{
                    width: { sm: 786, md: 1024 },
                    height: { sm: 300, md: 300 },
                    display: 'flex',
                    flexDirection: {xs:'row', sm:'row', md:"row"},
                    flexWrap:{xs:"wrap"},
                    justifyContent:'center'
                }}
            >
                <Box 
                sx={{width:{xs:150}}}
                className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9] "><FontAwesomeIcon icon={faCar} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Car Hire</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </Box>
                <Box 
                sx={{width:{xs:150}}}
                className="flex flex-col items-center justify-center  w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonHiking} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Free Hiking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </Box>
                <Box 
                sx={{
                    width:{xs:150},
                }}
                className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faVanShuttle} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9]">Free Shuttle</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </Box>
                <Box
                sx={{width:{xs:150}}} 
                className="flex flex-col items-center justify-center w-[200px] mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonBiking} /></span>
                    <h6 className=" text-lg font-semibold text-[#0088a9] ">Free Biking</h6>
                    <p className=" text-center ">Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </p>
                </Box>
            </Box>
        </Box>
    )
}

export default Service