import React, { useState, useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import HomeIcon from '@mui/icons-material/Home';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import PeopleIcon from '@mui/icons-material/People';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import { CartContext } from '../../src/components/context/CartContext';
import { faBed, faUserGroup, faPhone, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Alert, Box, Divider, Typography } from '@mui/material';
import { useUserAuth } from './context/UserAuthContext';
import InputComponent from './InputComponent';

const ViewRoom = ({ data, setOpenModal }) => {

  const { dispatch } = useContext(CartContext);
  const { user } = useUserAuth();
  const navigate = useNavigate()

  const [room, setRoom] = useState(data);
  const [checkBookings, setCheckBookings] = useState('')
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Checks if the selected room has available room
    const numberOfRoomsAvailable = async () => {
      if (room.id) {
        const roomRef = doc(db, "hotelRooms", room.id);
        const docSnapshot = await getDoc(roomRef);

        if (docSnapshot.exists()) {
          const roomData = docSnapshot.data();
          const roomsLeft = roomData.numberOfRooms;

          if (roomsLeft > 0) {
            setMessage(`Rooms left: ${roomsLeft}`);
            setErrorMessage('');
          } else {
            setErrorMessage("All rooms are currently booked.");
            setMessage('');
          }
        } else {
          console.log("Room not found.");
        }
      }
      return;
    }
    numberOfRoomsAvailable();
  }, [message])

  // Handles closing the view room modal
  const closeModal = () => {
    setOpenModal(false)
  }

  // Function to check room availability
  const checkAvailability = async (e) => {
    e.preventDefault()

    // Assigns the current date and replaces the / with -
    const currentDate = new Date().toLocaleDateString().split('/').join('-');;

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
        alert('Something went wrong.!');
      }

      if (checkInDate >= currentDate) {
        if (checkInDate >= checkBookings.checkInDate && checkInDate <= checkBookings.checkOutDate) {
          alert("Room is not available.")
        } else if (checkInDate > checkBookings.checkOutDate && checkOutDate > checkBookings.checkOutDate) {
          alert("Room is available.")
        } else {
          alert("Room is available.")
        }
      }
      // if (checkBookings) {
      //   const start = checkBookings.checkInDate;
      //   const end = checkBookings.checkOutDate;
      //   const checkIn = checkInDate;
      //   const checkOut = checkOutDate;
      //   // console.log("Booking start date: ", start)
      //   // console.log("Booking end date: ", end)
      //   // console.log("Checking: ", checkIn)
      //   // console.log("Checking: ", checkOut)
      //   // Check if the selected check-in and check-out dates are within the room's availability range
      //   const isRoomAvailable = checkIn <= start && checkOut > end;

      //   setIsAvailable(isRoomAvailable);

      //   if (isRoomAvailable) {
      //     alert('Room is available for the selected dates!');
      //   } else {
      //     alert('Room is not available for the selected dates.');
      //   }
      // }
      setCheckInDate(null);
      setCheckOutDate(null);
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
          width: { xs: 380, sm: 720, md: 800 },
          height: { xs: 600, sm: 600, md: 630 }
        }}
        className="bg-white rounded flex flex-col justify-center items-center ">
        <div className='roomHearding flex flex-col '>
          <Box
            sx={{ width: { xs: 400, sm: 700, md: 800 } }}
            className='flex items-center'
          >
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 16, md: 16 },
                marginLeft: { xs: 0, sm: 0, md: 5 },
                fontWeight: { xs: 0, sm: 600, md: 600 }
              }}
              className='mt-2 ml-8 mb-[5px] font-extrabold text-lg'
            >{room.title}</Typography>
            {message && <Alert>{message}</Alert>}
            {errorMessage && <Alert sx={{ fontSize: { xs: 9 } }} severity="error">{errorMessage}</Alert>}
            <button className='bg-[#0088a9] text-white w-[35px] h-[30px] rounded mt-2 mr-7' onClick={closeModal}>X</button>
          </Box>
          <Box
            sx={{
              width: { xs: 380, sm: 700 },
              fontSize: { xs: 12, sm: 14, },
              display:'flex',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Typography
              sx={{
                width: { xs: 360, sm: 600 },
                fontSize: { xs: 10, sm: 12, md: 12 },
                marginTop: { xs: 0, sm: 2, md: 2 },
                textAlign:'center'
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} className=" text-[#0088a9] text-lg font-bold" /> {room.address}
            </Typography>
          </Box>
        </div>
        <Box
          sx={{
            width: { xs: 200, sm: 400, md: 350 },
            height: { xs: 150, sm: 200, md: 200 },
            marginTop: { xs: 2, sm: 8, md: 8 }
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
          <img className='w-[100%] h-full' src={room.roomImage} />
        </Box>
        <Box
          sx={{
            width: { xs: 360, sm: 680, md: 750 },
            marginTop: { xs: 0, sm: 6, md: 4 }
          }}
        >
          <Box
            sx={{
              width: { xs: 360, sm: 680, md: 900 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row', md: 'row' },
              alignItems: 'center',
              marginTop: { xs: 0, sm: -10, md: 0 },
            }}
            className='justify-center items-center m-auto'
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 } }}><HomeIcon sx={{ fontSize: { xs: 'medium', sm: 'medium', md: 'large' } }} className=" text-[#0088a9]" /> : {room.roomType}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 } }} className='ml-8 mt-6'><BedroomParentIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} className=" text-[#0088a9]" /> : {room.bedType}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 } }} className='ml-8 mt-6'><PeopleIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} className=" text-[#0088a9]" /> : {room.numberOfPeople}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 } }} className='ml-8 mt-6'><PhoneIcon sx={{ fontSize: { xs: 'medium', md: 'large' } }} className=" text-[#0088a9]" /> : {room.contact}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontSize: { xs: 11, sm: 12, md: 13 }, fontWeight: 600 }} className='ml-8 mt-6 font-bold '>R{room.price}</Typography>
            </Box>
          </Box>
          <Divider className='mt-2' />
        </Box>
        {/* Description Section */}
        <Box
          sx={{
            fontSize: { xs: 11, sm: 14, md: 16 },
            width: { xs: 350, sm: 680 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className=' flex justify-center items-center'>
          <Typography
            sx={{ fontSize: { xs: 11, sm: 12, md: 13 } }}
          >{room.description}</Typography>
        </Box>
        <Box
          sx={{
            width: { xs: 380, sm: 680, md: 600 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between', md: 'center' },
            alignItems: { xs: 'center', sm: 'center', md: 'center' },
            marginTop: { xs: -6, sm: 0, md: -6 },
          }} className=' m-auto '
        >
          {/* Input Fields */}
          <Box
            sx={{
              width: { xs: 380, sm: 200, md: 400 },
              display: 'flex',
              flexDirection: { xs: 'row' },
              justifyContent: { xs: 'space-evenly', sm: 'center' },
              alignItems: { xs: 'center', sm: 'center' },
              marginTop: { xs: -3, sm: 0, md: 0 },
              margin: 'auto'
            }}
          >
            <InputComponent
              type="date"
              width="160px"
              className='rounded focus:ring focus:ring-[#0088a9]'
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
            <InputComponent
              type="date"
              width="160px"
              className='rounded focus:ring focus:ring-[#0088a9]'
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </Box>
          {/* Buttons */}
          <Box
            sx={{
              width: { xs: 380, sm: 300, md: 600 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row', md: 'row' },
              justifyContent: { xs: 'space-evenly', sm: 'space-between', md: 'space-between' },
              alignItems: 'center',
              marginTop: { xs: 2, sm: 0, md: 0 },
              marginLeft: { xs: 0, sm: 0, md: 8 },
              marginRight: { xs: 0, sm: 2, md: 0 }
            }}
          >
            <button className='bg-[#0088a9] text-white w-[140px] h-[30px] rounded' onClick={checkAvailability}>Check Availability</button>
            <button className='bg-[#0088a9] text-white w-[140px] h-[30px] rounded m-2 ' onClick={handleReservation}>Reserve Room</button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewRoom