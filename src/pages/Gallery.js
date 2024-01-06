import React, { useEffect, useState } from 'react'
import HeroSec from '../components/HeroSec';
import Footer from '../components/Footer';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import Navbar from '../components/navbar/Navbar';
import { Box, Paper } from '@mui/material';
import CustomTypography from '../components/CustomTypography';

const Gallery = () => {

    const [images, setImages] = useState([])

    // Handles fetching images from firebase storage
    const fetchImages = async () => {
        try {
            const imageRef = ref(storage, 'hotelGallery/');
            const result = await listAll(imageRef);
            const imageUrls = await Promise.all(
                result.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return url;
                })
            )
            setImages(imageUrls);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [images])


    if (images.length === 0) {
        return (
            <div className='flex flex-col h-[100vh] justify-center items-center '>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Box
            sx={{
                width: { xs: 400, sm: 786, md: 1024 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
                backgroundColor: 'blue'
            }}
        >
            <Navbar />
            <HeroSec />
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    height: 60,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#24252A',
                }}
            >
            </Box>
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    height: { xs: "auto", sm: "100%" },
                    backgroundColor: 'white'
                }}
                className=" flex flex-col m-auto  items-center justify-center h-screen"
            >
                <Box
                >
                    <CustomTypography theme="heading" text='Gallery' />
                    {/* <h3 className="font-bold text-[#0088a9]">Gallery</h3> */}
                </Box>
                <Box
                    sx={{
                        width: { xs: 400, sm: 700, md: 1024 },
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // marginBottom: 10,
                    }}
                    className=' mb-10'
                >
                    {
                        images.map((image, index) => (
                            <Paper
                                sx={{
                                    width: { xs: 180, sm: 310, md: 280 },
                                    height: { xs: 150, sm: 250, md: 250 },
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: { xs: 10, sm: 10, md: 10 }
                                }}
                                elevation={3}
                                key={index}
                                className='bg-white m-2 border-white'
                            >
                                <img className=" w-[91%] h-[89%]" src={image} alt='roomImage' />
                            </Paper>
                        ))
                    }
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default Gallery;