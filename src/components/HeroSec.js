import React from 'react';
import heropic from '../images/hero-section.jpg'
import { Box } from '@mui/material';



const Header = () => {
    return (
        <Box sx={{ width: { xs: 320, sm: 786, md: 1024 } }} className=" flex flex-col justify-center items-center ">
            <Box sx={{ width: { xs: 320, sm: 786, md: 1024 } }} className=" bg-[pink] h-[4px] "></Box>
            <Box
                sx={{
                    width: { xs: 320, sm: 786, md: 1024 },
                    height:{xs:200,  sm:350, md: 350}
                }}
                className=" flex flex-col justify-center items-center"
            >
                <img src={heropic} alt='banner' className="h-[350px] w-full" />
            </Box>
        </Box>
    )
}

export default Header;