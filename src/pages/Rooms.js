import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import SearchCard from '../components/cards/SearchCard';
import { Card, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material';
// import ReserveRoomForm from './client/ReserveRoomForm';
import ButtonComponent from '../components/ButtonComponent';
import ViewRoom from '../components/ViewRoom';
// import Button from '../components/Button';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState('')
    const [searchResults, setSearchResults] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate()

    const searchRoom = async () => {
        setIsLoading(true)

        try {
            const roomsRef = collection(db, 'hotelRooms');
            const queryConditions = [
                where('price', '>=', parseInt(minPrice)),
                where('price', '<=', parseInt(maxPrice)),
            ]

            if (checkInDate && checkOutDate) {
              queryConditions.push(
                where('availableDates', 'array-contains', checkInDate),
                where('availableDates', 'array-contains', checkOutDate)
              );
            }

            const querySnapshot = await getDocs(query(roomsRef, ...queryConditions));

            const filteredData = querySnapshot.docs.map((doc) => doc.data());

            setSearchResults(filteredData)
        } catch (err) {
            console.log("Error fetching data:", err)
        } finally {
            setIsLoading(false)
        }
    };

    const handleView = (room) => {

        console.log("Rooms Component: ", room)

        try {
            let selectedRoom = room;
            setData(selectedRoom);
        } catch (err) {
            console.log(err)
        }
        setOpenModal(true)
    }

    const handleReserve = () => {

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
        <>
            <header className='w-[1024px] flex flex-col'>
                <Navbar />
                <Header />
                <div className="main flex flex-col justify-center items-center w-[1024px] m-auto">
                    <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center">
                        <div className="search-section rounded w-[1000px] h-[40px] flex justify-between items-center border bg-white">
                            <div>
                                <input
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
                                <input
                                    className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[150px]'
                                    type="date"
                                    value={checkInDate}
                                    placeholder='Check-in date'
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                />
                                <input
                                    className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[150px]'
                                    type="date"
                                    value={checkOutDate}
                                    placeholder='Check-out date'
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                                <button
                                    className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                                    onClick={searchRoom}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className='bg-gray-300 w-[1024px] h-[100vh] justify-center items-center'>
                <div className="flex flex-col justify-center items-center mr-4">
                    <h3 className='mt-6'>Our Rooms</h3>
                    {searchResults.length ?
                        <ul className="flex flex-col justify-between"><li><SearchCard searchResults={searchResults} /></li></ul>
                        :
                        <div className="room-list flex flex-wrap justify-center items-center">
                            {rooms.map((room, index) => (
                                <Card key={index} sx={{ maxWidth: 445, height: 300, marginTop: 3, marginLeft: 2, display: 'flex', flexDirection: 'row' }}>
                                    <div className='w-[70%] h-[100%]'>
                                        <CardMedia
                                            sx={{ height: 300, width: 280 }}
                                            image={room.roomImage}
                                            title="green iguana"
                                        />
                                    </div>
                                    <div className='w-30%] h-[100%] border-2'>
                                        <CardContent sx={{ width: '100%', height: '50%' }}>
                                            <Typography sx={{ width: '100%' }} gutterBottom variant="h6" component="div">{room.title}</Typography>
                                            <Typography sx={{ width: '100%' }} variant="body2" color="text.secondary">Description: {room.introDescr}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <ButtonComponent label="View" onClick={() => handleView(room)} />
                                            <ButtonComponent label="Reserve"  />
                                        </CardActions>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    }
                </div>
                {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Rooms;
