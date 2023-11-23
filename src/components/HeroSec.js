import React from 'react';
import heropic from '../images/hero-section.jpg'
import { Box } from '@mui/material';



const Header = () => {
    return (
        <Box sx={{width:{sm:786, md:1024}}} className=" flex flex-col justify-center items-center ">
            <Box sx={{width:{sm:786, md:1024}}} className=" bg-[#0088a9] w-[1024px] h-[4px] "></Box>
            <Box sx={{width:{sm:786, md:1024}}} className="w-[1024px] flex flex-col justify-center items-center">
                <img src={heropic} alt='banner' className="h-[350px] w-full" />
            </Box>
        </Box>
    )
}

export default Header;