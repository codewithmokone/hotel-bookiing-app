import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import Service from '../components/Service';
import ViewRoom from '../components/ViewRoom';
import SearchCard from '../components/cards/SearchCard';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, TextField, Typography } from '@mui/material';
import CustomTypography from '../components/CustomTypography';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState('')
    const [searchResults, setSearchResults] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false)

    const searchRoom = async () => {
        setIsLoading(true)

        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'hotelRooms'),
                    where('price', '>=', parseInt(minPrice)),
                    where('price', '<=', parseInt(maxPrice)),
                )
            );

            const filteredData = querySnapshot.docs.map((doc) => doc.data());

            console.log("Filter price: ", filteredData)

            setSearchResults(filteredData);

        } catch (err) {
            console.log("Error fetching data:", err)
        } finally {
            setIsLoading(false)
        }
    };

    const handleView = (room) => {

        try {
            let selectedRoom = room;
            setData(selectedRoom);
        } catch (err) {
            console.log(err)
        }
        setOpenModal(true)
    }

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'hotelRooms'));
                const roomData = querySnapshot.docs.map((doc) => doc.data());
                setRooms(roomData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        fetchRooms();
    }, []);

    if (isLoading) {
        return (
            <div className='flex flex-col h-[100vh] justify-center items-center '>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Box
            sx={{
                width: { xs: 400, sm: 786, md: '100vw' },
                margin: 'auto',
                backgroundColor: 'whitesmoke'
            }}
        >
            <Navbar />
            <Header />
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    height: 60,
                    backgroundColor: '#24252A',
                }}
                className="flex justify-center items-center"
            >
                <div className="search-section rounded w-[600px] h-[40px] flex justify-between items-center border bg-white">
                    <div>
                        <input
                            sx={{ width: { xs: 50 } }}
                            className=' ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                            type="number"
                            value={minPrice}
                            placeholder='Enter minimum amount'
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                            type="number"
                            value={maxPrice}
                            placeholder='Enter maximum amount'
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                        <button
                            className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                            onClick={searchRoom}>Search</button>
                    </div>
                </div>
            </Box>
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    display: 'flex',
                    flexDirection: { xs: 'column' },
                    justifyContent: { xs: 'center' },
                    backgroundColor: "white",
                    marginBottom: { xs: 10 }
                }}
                className=' justify-center items-center m-auto'
            >
                <Box
                    sx={{ 
                        marginBotton: { xs: 10 },
                    }}
                    className="flex flex-col min-h-[600px] justify-center items-center mr-4 m-auto">
                    <CustomTypography theme="heading" text='Our Rooms' />
                    {searchResults.length ?
                        <ul className="flex flex-col justify-between"><li><SearchCard searchResults={searchResults} /></li></ul>
                        :
                        <div className="room-list flex flex-wrap justify-center items-center">
                            {rooms.map((room, index) => (
                                <Card elevation={5} key={index} sx={{ maxWidth: 300, height: 400, marginTop: 3, marginLeft: 2, display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        sx={{ height: 350, width: 300 }}
                                        image={room.roomImage}
                                        title={room.title}
                                    />
                                    <Divider />
                                    <CardContent sx={{ width: '100%', height: '20%' }}>
                                        <Typography sx={{ width: '100%', borderBottom: 1, fontWeight: 700 }} gutterBottom variant="h6" component="div">{room.title}</Typography>
                                        <Typography sx={{ width: '100%' }} variant="body2" color="text.secondary">{room.introDescr}</Typography>
                                    </CardContent>
                                    <CardContent sx={{ width: '100%', height: '10%', marginTop: 5 }}>
                                        <Typography sx={{ width: '100%', fontWeight: 800 }} variant="body2" color="text.secondary">R {room.price}.00</Typography>
                                    </CardContent>
                                    <CardActions sx={{ width: '100%', height: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button label="View" onClick={() => handleView(room)}>View</Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </div>
                    }
                </Box>
                {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
            </Box>
            <Service />
            <Footer />
        </Box>
    );
};

export default Rooms;
