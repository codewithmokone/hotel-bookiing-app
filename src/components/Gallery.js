import React from 'react'
import Navbar from '../components/Navbar';
import HeroSec from '../components/HeroSec';
import Footer from '../components/Footer';

const Gallery = () => {
    return (
        <div>
            <header className="heading">
                <Navbar />
                <HeroSec />
            </header>
            <main className="m-auto w-[1024px] flex items-center justify-center mt-4 h-[400px]">
                <div>
                    <h2 className="text-sky-600 font-bold">Gallery</h2>
                </div>
                <div>

                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Gallery;