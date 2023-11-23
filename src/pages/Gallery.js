import React, { useEffect, useState } from 'react'
import HeroSec from '../components/HeroSec';
import Footer from '../components/Footer';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { Box, Paper } from '@mui/material';

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
            width: { sm: 786, md: 1024 },
            display: 'flex',
            flexDirection: 'column',
            margin:'auto'
          }}
        //   className=' h-auto m-auto'
        >
            {/* className="bg-[#F5F5F5] m-auto" > */}
            <Navbar />
            <HeroSec />
            <Box
                sx={{
                    width: { sm: 786, md: 1024 },
                    height:{sm:"100%"}
                }}
                className=" flex flex-col m-auto bg-white  items-center justify-center h-screen"
            >
                <div>
                    <h2 className="font-bold text-[#0088a9] mt-10">Gallery</h2>
                </div>
                <Box
                    sx={{
                        width: { sm: 786, md: 1024 },
                        display: 'flex',
                        flexDirection: { sm: 'row', md: 'row' },
                        justifyContent:'center',
                        alignItems:'center',
                        flexWrap: "wrap",
                        marginBottom: 10,
                    }}
                    className=' mb-10'
                >
                    {
                        images.map((image, index) => (
                            <Paper elevation={3} key={index} className='w-[310px] bg-white m-2 border-white'>
                                <img className=" w-[280px] m-[14px] h-[250px]" src={image} alt='roomImage' />
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