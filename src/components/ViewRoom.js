import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import { CartContext } from '../../src/components/context/CartContext';
import { faBed, faUserGroup, faPhone, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Box, Divider, Modal, TextField } from '@mui/material';
import { useUserAuth } from './context/UserAuthContext';

const ViewRoom = ({ data, setOpenModal }) => {

  const { dispatch } = useContext(CartContext);
  const { user } = useUserAuth();
  const navigate = useNavigate()

  const [room, setRoom] = useState(data);
  const [checkBookings, setCheckBookings] = useState('')
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  // Handles closing the view room modal
  const closeModal = () => {
    setOpenModal(false)
  }

  // Function to check room availability
  const checkAvailability = async () => {

    try {
      const docRef = query(collection(db, "bookings"), where("roomId", "==", room.id));
      const querySnapshot = await getDocs(docRef);

      if (querySnapshot.size === 1) {
        querySnapshot.forEach((doc) => {
          const roomDate = doc.data()
          setCheckBookings(roomDate);
        });
      } else {
        console.error('Room not found or multiple rooms found with the same roomId.');
      }

      if (checkBookings) {
        const start = checkBookings.checkInDate;
        const end = checkBookings.checkOutDate;
        const checkIn = checkInDate;
        const checkOut = checkOutDate;
        // console.log("Booking start date: ", start)
        // console.log("Booking end date: ", end)
        // console.log("Checking: ", checkIn)
        // console.log("Checking: ", checkOut)
        // Check if the selected check-in and check-out dates are within the room's availability range
        const isRoomAvailable = checkIn <= start && checkOut > end;

        setIsAvailable(isRoomAvailable);

        if (isRoomAvailable) {
          alert('Room is available for the selected dates!');
        } else {
          alert('Room is not available for the selected dates.');
        }
      }
    } catch (error) {
      console.error('Error checking room availability:', error);
    }
  };

  // Handles the reservation function
  const handleReservation = () => {
    if (user) {
      dispatch({ type: 'ADD_TO_CART', id: room.id, room })
      alert("Room added to bookings page")
      navigate('/clienthome')
    } else {
      alert('Please login or register to continue.')
      navigate('login')
    }
  }

  return (
    <Box className="room-view-container m-auto fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
      <Box
        sx={{
          width: { xs: 400, sm: 786, md: 900},
          height: { xs: 400, sm: 600, md: 630}
        }}
        className="bg-white rounded flex flex-col justify-center items-center ">
        <div className='roomHearding flex flex-col '>
          <Box
            sx={{
              width: { xs: 400, sm: 700, md: 900 }
            }}
            className='w-[960px] flex flex-row justify-between items-center '
          >
            <p className='mt-2 ml-8 mb-[5px] font-extrabold text-lg'>{room.title}</p>
            <button className='bg-[#0088a9] text-white w-[35px] h-[30px] rounded mt-2 mr-7' onClick={closeModal}>X</button>
          </Box>
          <div>
            <p className='ml-8 mb-[-35px]'> <FontAwesomeIcon icon={faLocationDot} className=" text-[#0088a9] text-lg font-bold" /> {room.address}</p>
          </div>
        </div>
        <Box
          sx={{
            width: { sm: 500, md: 600 },
            height: { sm: 200, md: 250 },
            marginTop:{sm:8, md:8}
          }}
          className="carousel flex flex-row justify-center items-center"
        >
          {/* <Carousel
            slide={false}
            data-bs-theme="dark"
            sx={{
              width: { xs: 400, sm: 786, md: 1024 },
              height: { sm: 300, md:500 }
            }}
            className="h-[300px] flex flex-row justify-center items-center">
            <Carousel.Item>
              <CarouselImage text="First slide" images={room.roomImage} />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel> */}
          <img width={'100%'} height={'100%'} src={room.roomImage} />
        </Box>
        <Box
          sx={{
            width: { sm: 750, md: 750 },
            fontSize: { sm: 14, md: 16 },
            marginTop:{sm:6, md:4}
          }}
          className="room-details flex border-b-2 w-[900px]">
          <div className='flex flex-row justify-center items-center m-auto'>
            <p className='ml-8 mt-6'><FontAwesomeIcon icon={faHouse} className=" text-[#0088a9] text-lg font-bold" /> : {room.roomType}</p>
            <p className='ml-8 mt-6'><FontAwesomeIcon icon={faBed} className=" text-[#0088a9] text-lg font-bold" /> : {room.bedType}</p>
            <p className='ml-8 mt-6'><FontAwesomeIcon icon={faUserGroup} className=" text-[#0088a9] text-lg font-bold" /> : {room.numberOfPeople}</p>
            <p className='ml-8 mt-6'><FontAwesomeIcon icon={faPhone} className=" text-[#0088a9] text-lg font-bold" /> : {room.contact}</p>
            <p className='ml-8 mt-6 font-bold '>R{room.price}</p>
          </div>
          <Divider variant="middle" />
        </Box>
        <Box
          sx={{
            fontSize: { sm: 14, md: 16 },
            width: { sm: 750 }
          }}
          className='border-b-2 w-[900px] min-h-min flex justify-center items-center'>
          <p className='mt-3 ml-8 mb-3'>{room.description}</p>
        </Box>
        <div className=' flex flex-row m-auto justify-center items-center mt-[20px] '>
          <input
            type="date"
            size='normal'
            className='rounded outline focus:ring focus:ring-[#0088a9] w-[200px] mr-6'
            placeholder=" Check in date..."
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
          <input
            type="date"
            size='normal'
            className='rounded outline focus:ring focus:ring-[#0088a9] w-[200px]'
            placeholder=" Check out date..."
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
          <button className='bg-[#0088a9] text-white w-[140px] h-[30px] rounded ml-6' onClick={checkAvailability}>Check Availability</button>
          <button className='bg-[#0088a9] text-white w-[140px] h-[30px] rounded ml-6' onClick={handleReservation}>Reserve Room</button>
        </div>
      </Box>
    </Box>
  )
}

export default ViewRoom