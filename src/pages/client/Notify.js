import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/HeroSec'
import Service from '../../components/Service'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { db, storage } from '../../config/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CartContext } from '../../components/context/CartContext';
// import { UserAuthContext } from '../../components/context/UserAuthContext';
import { Box} from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';
import CustomTypography from '../../components/CustomTypography';

function Notify() {

    const { shoppingCart, dispatch, totalPrice } = useContext(CartContext);
    const { user } = useUserAuth();
    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState('');
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [file, setFile] = useState(null);

    const shoppingCartArray = shoppingCart[0];

    // Handles the booking function
    const handleBookings = async (e) => {
        e.preventDefault()

        if (!user) {
            alert("Please login or signup to continue.");
            return;
        }

        try {

            // Image upload logic
            const imageRef = ref(storage, `BookingImages/${file}`)
            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef);
            console.log('Image Url: ', url);

            // Update number of rooms available
            const docId = shoppingCartArray.id
            const bookedRoomRef = doc(db, "hotelRooms", docId);

            // Get the current room details
            const roomSnapshot = await getDoc(bookedRoomRef);
            const roomData = roomSnapshot.data();
            console.log(roomData)
            if (roomData.numberOfRooms > 0) {
                // Update the number of available rooms
                await updateDoc(bookedRoomRef, {
                    numberOfRooms: roomData.numberOfRooms - 1 // Decrement by 1
                });

                // Add room to bookings firestore database.
                const docRef = await addDoc(collection(db, "bookings"), {
                    userId: user.uid,
                    roomId: docId,
                    hotel: shoppingCartArray.hotel,
                    title: shoppingCartArray.title,
                    introDescr: shoppingCartArray.introDescr,
                    description: shoppingCartArray.description,
                    address: shoppingCartArray.address,
                    contact: shoppingCartArray.contact,
                    price: shoppingCartArray.price,
                    numberOfPeople: shoppingCartArray.numberOfPeople,
                    numberOfRooms: shoppingCartArray.numberOfRooms,
                    roomType: shoppingCartArray.roomType,
                    bedType: shoppingCartArray.bedType,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    roomImage: url
                });

                alert('Booking Successful');
                navigate('/clienthome');
            } else {
                alert('No rooms available for booking.');
            }

        } catch (error) {
            console.log("Error booking the room: ", error)
        }
    }


  return (
    <div>
      
    </div>
  )
}

export default Notify
