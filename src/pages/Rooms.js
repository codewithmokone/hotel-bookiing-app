import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import SearchCard from '../components/cards/SearchCard';

const Rooms = () => {

    const [rooms, setRooms] = useState([]);
    const [searchResults, setSearchResults] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate()

    // Opens the login modal
    const login = () => {
        navigate("/login")
    }

    // Opens the register modal
    const register = () => {
        navigate("/register");
    }

    const searchRoom = async () => {
        setIsLoading(true)

        try {
            const roomsRef = collection(db, 'hotelRooms');
            const queryConditions = [
              where('price', '>=', parseInt(minPrice)),
              where('price', '<=', parseInt(maxPrice)),
            ]

            // if (checkInDate && checkOutDate) {
            //   queryConditions.push(
            //     where('availableDates', 'array-contains', checkInDate),
            //     where('availableDates', 'array-contains', checkOutDate)
            //   );
            // }

            const querySnapshot = await getDocs(query(roomsRef, ...queryConditions));

            const filteredData = querySnapshot.docs.map((doc) => doc.data());

            // const filteredData = [];
            // querySnapshot.forEach((doc) => {
            //   const room = doc.data();
            //   if (room.availableDates.includes(checkInDate) && room.availableDates.includes(checkOutDate)) {
            //     filteredData.push(room);
            //   }
            // });

            // const checkInQuerySnapshot = await getDocs(
            //     query(collection(db, 'hotelRooms'),
            //         where('price', '>=', parseInt(minPrice)),
            //         where('price', '<=', parseInt(maxPrice)),
            //         where('availableDates', 'array-contains', checkInDate)
            //     )
            // );

            // const availableRoomsOnCheckIn = checkInQuerySnapshot.docs.map((doc) => doc.data());

            // // Filter available rooms on the check-out date
            // const filteredData = availableRoomsOnCheckIn.filter((room) =>
            //     room.availableDates.includes(checkOutDate)
            // );

            setSearchResults(filteredData)
        } catch (err) {
            console.log("Error fetching data:", err)
        } finally {
            setIsLoading(false)
        }
    };

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
        return <div className="">Loading...</div>;
    }

    return (
        <div>
            <header className='w-[1024px]'>
                <Navbar login={login} register={register} />
            </header>
            <div>
                <Header />
            </div>
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
            <main className='bg-gray-300 w-[1024px]'>
            <div className="flex flex-col justify-start mr-4 my-3">
            <h1>Rooms</h1>
              {searchResults.length ?
                <ul className="flex flex-col justify-between"><li><SearchCard searchResults={searchResults} /></li></ul>
                :
                <div className="room-list">
                {rooms.map((room, index) => (
                    <div key={index} className="room">
                        <h2>{room.roomType}</h2>
                        <p>Price: ${room.price} per night</p>
                        <p>Capacity: {room.capacity} guests</p>
                        <p>Description: {room.description}</p>
                        {/* Add more room details here */}
                    </div>
                ))}
            </div>
              }
            </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Rooms;
