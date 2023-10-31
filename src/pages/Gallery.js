import React, { useEffect, useState } from 'react'
import HeroSec from '../components/HeroSec';
import Footer from '../components/Footer';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

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
        <div className="min-h-screen bg-">
            <header className="w-[1024px] m-auto flex flex-col ">
                <Navbar />
                <HeroSec />
            </header>
            <main className="m-auto w-[1024px] flex flex-col bg-gray-300  items-center justify-center mt-10 mb-5 min-h-full">
                <div>
                    <h2 className="font-bold text-[#0088a9] m-10">Gallery</h2>
                </div>
                <div className='flex flex-row flex-wrap justify-center'>
                    {images.map((image, index) => (
                        <div key={index} className='shadow-sm bg-white shadow-black m-2 mb-2 border-white'>
                            <img className=" w-[300px] m-[10px] h-[250px]" src={image} alt='roomImage'  />
                        </div>))
                    }
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Gallery;