import React from 'react'

// Images
import fimage1 from '../images/home-images/Feat-room1.jpg'
import fimage2 from '../images/home-images/Feat-room2.jpg'
import fimage3 from '../images/home-images/Feat-room3.jpg'
import { Box } from '@mui/material'

const FeaturedRooms = () => {
    return (
        <Box
            sx={{
                width: { sm: 786, md: 1024 },
                height: {sm: 500 ,md:350},
                display: 'flex',
                flexDirection: { sm: "column", md: 'column' },
                justifyContent: 'center',
                alignItems:'center'
            }}
            className="flex flex-col justify-center items-center"
        >
            <div className="heading flex justify-center">
                <h2 className=" text-xl font-bold mt-2 text-[#0088a9] border-b-2 border-[#0088a9] mb-8">Featured Rooms</h2>
            </div>
            <Box sx={{ width: { sm: 786, md: 1024 }, display:'flex', flexDirection:{sm:'column'} }} className="flex flex-row justify-evenly items-center">
                <div className="h-[230px] w-[300px] bg-[#0088a9]  rounded-md ">
                    <img className="w-[300px] h-[200px]" src={fimage1} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Family Deluxe</p>
                </div>
                <div className="h-[230px] w-[300px] bg-[#0088a9]  mx-10  rounded-md ">
                    <img className="w-[300px] h-[200px]" src={fimage2} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Standard Deluxe</p>
                </div>
                <div className="h-[230px] w-[300px] bg-[#0088a9]  rounded-md">
                    <img className="w-[300px] h-[200px]" src={fimage3} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Couples Deluxe</p>
                </div>
            </Box>
        </Box>
    )
}

export default FeaturedRooms