import React, { useState } from 'react';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Cards from '../../components/cards/Cards';
import Service from '../../components/Service';
import { db } from '../../config/firebase';
import FeaturedRooms from '../../components/FeaturedRooms';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../../components/navbar/Navbar';
import SearchCard from '../../components/cards/SearchCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Typography } from '@mui/material';

function ClientProfile() {
    return (
        <Box className=' home-container bg-[#F2F5F5] block h-auto m-0'>
            <header className="flex flex-col w-[1024px] m-auto">
                <Navbar />
                <Header />
            </header>
            <main className="main bg-white flex flex-col w-[1024px] m-auto ">
                <Box
                    sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        height: { sm: 'auto', md: 'auto' },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        justifyContent: 'center', alignItems: 'center', margin: 'auto',
                        backgroundColor: 'white'
                    }}
                    className="border"
                >
                    <Box>
                        <Typography variant='h6'>Profile</Typography>
                    </Box>
                </Box>
            </main>
            <footer className='m-auto'>
                <Footer />
            </footer>
        </Box>
    )
}

export default ClientProfile
