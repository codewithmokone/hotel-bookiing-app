import React from 'react'

// Images
import fimage1 from '../images/home-images/Feat-room1.jpg'
import fimage2 from '../images/home-images/Feat-room2.jpg'
import fimage3 from '../images/home-images/Feat-room3.jpg'
import { Box, Hidden } from '@mui/material'

const FeaturedRooms = () => {
    return (
        <Box
            sx={{
                width: { xs: 400, sm: 786, md: 1024 },
                height: { sm: 310, md: 310 },
                display: 'flex',
                flexDirection: { sm: "column", md: 'column' },
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'white'
            }}
            className="flex flex-col justify-center items-center"
        >
            <Box className="heading flex justify-center">
                <h2 className=" text-xl font-bold mt-4 text-[#0088a9] border-b-2 border-[#0088a9] mb-8">Featured Rooms</h2>
            </Box>
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    height: { xs: 550, sm: 300, md: 300 }, 
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: {sm:-6}
                }}
            >
                <Box
                    sx={{
                        width: { xs: 360, sm: 786, md: 1024 },
                        height: { xs: 'auto' },
                        flexDirection: { xs: 'column', sm: 'column' },
                        backgroundColor: '#0088a9'
                    }}
                    className=" rounded-md ">
                    <img className="w-[360px] h-[120px]" src={fimage1} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Family Deluxe</p>
                </Box>
                <Box
                    sx={{ width: { xs: 360, sm: 786, md: 1024 }, height: { xs: 'auto' } }}
                    className=" bg-[#0088a9]  mx-10  rounded-md ">
                    <img className="w-[360px] h-[120px]" src={fimage2} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Standard Deluxe</p>
                </Box>
                <Box
                    sx={{
                        width: { xs: 360, sm: 786, md: 1024 },
                        height: { xs: 'auto' },
                    }}
                    className="bg-[#0088a9]  rounded-md">
                    <img className="w-[360px] h-[120px]" src={fimage3} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Couples Deluxe</p>
                </Box>
            </Box>
        </Box>
    )
}

export default FeaturedRooms