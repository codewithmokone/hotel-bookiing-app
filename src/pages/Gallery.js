import React, { useEffect, useState } from 'react'
import HeroSec from '../components/HeroSec';
import Footer from '../components/Footer';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import { Paper } from '@mui/material';

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
        <div className="bg-[#F5F5F5] m-auto" >
            <header className="w-[1024px] m-auto flex flex-col ">
                <Navbar />
                <HeroSec />
            </header>
            <main className=" w-[1024px] flex flex-col m-auto bg-white  items-center justify-center h-fit">
                <div>
                    <h2 className="font-bold text-[#0088a9] mt-10">Gallery</h2>
                </div>
                <div className='flex flex-row flex-wrap justify-center mb-10'>
                    {images.map((image, index) => (
                        <Paper elevation={3} key={index} className=' bg-white m-2 border-white'>
                                <img className=" w-[280px] m-[14px] h-[250px]" src={image} alt='roomImage' />
                        </Paper>
                    ))
                    }
                </div>
            </main>
            <footer className='m-auto'>
                <Footer />
            </footer>
        </div>
    )
}

export default Gallery;