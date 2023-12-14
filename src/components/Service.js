import React from 'react'
import { faPersonHiking, faPersonBiking, faCar, faVanShuttle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';


const Service = () => {
    return (
        <Box
            sx={{
                width: { xs: 400, sm: 786, md: 1024 },
                height: { xs: 420, sm: 300, md: 300 },
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
                    width: { xs: 400, sm: 786, md: 1024 },
                    // height: {xs:350, sm: 300, md: 300 },
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'row', md: "row" },
                    flexWrap: { xs: "wrap" },
                    justifyContent: 'space-evenly',
                    marginTop: -1
                }}
            >
                <Box
                    sx={{ width: { xs: 130 } }}
                    className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9] "><FontAwesomeIcon icon={faCar} /></span>
                    <Typography sx={{fontSize:{xs:14},fontWeight:600,color:"#0088a9"}} variant="h6" component="h2">Car Hire</Typography>
                    <Typography sx={{fontSize:{xs:13},marginTop:{xs:1}, textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </Typography>
                </Box>
                <Box
                    sx={{ width: { xs: 130 } }}
                    className="flex flex-col items-center justify-center  w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonHiking} /></span>
                    <Typography sx={{fontSize:{xs:14},fontWeight:600,color:"#0088a9"}} variant="h6" component="h2">Free Hiking</Typography>
                    <Typography sx={{fontSize:{xs:13},marginTop:{xs:1}, textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: { xs: 130 },
                        marginTop:{xs:3,sm:0,md:0}
                    }}
                    className="flex flex-col items-center justify-center w-[200px]  mx-3">
                    <span className="  text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faVanShuttle} /></span>
                    <Typography sx={{fontSize:{xs:14},fontWeight:600,color:"#0088a9"}} variant="h6" component="h2" >Free Shuttle</Typography>
                    <Typography sx={{fontSize:{xs:13},marginTop:{xs:1}, textAlign:'center'}} >Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </Typography>
                </Box>
                <Box
                    sx={{ width: { xs: 130 },marginTop:{xs:3,xs:0,md:0} }}
                    className="flex flex-col items-center justify-center w-[200px] mx-3">
                    <span className=" text-xl font-semibold mb-2 text-[#0088a9]"><FontAwesomeIcon icon={faPersonBiking} /></span>
                    <Typography sx={{fontSize:{xs:14},fontWeight:600,color:"#0088a9"}} variant="h6" component="h2" >Free Biking</Typography>
                    <Typography sx={{fontSize:{xs:13},marginTop:{xs:1}, textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor.
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Service