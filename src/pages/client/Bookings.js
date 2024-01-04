import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSec from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbar/Navbar';
import { db, storage } from '../../config/firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CartContext } from '../../components/context/CartContext';
// import { UserAuthContext } from '../../components/context/UserAuthContext';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';

const Bookings = () => {

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

  useEffect(() => {
    if (shoppingCartArray && !file) {
      setFile(shoppingCartArray.roomImage);
    }
  }, [shoppingCartArray, file]);


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
    <Box
      sx={{
        width: { sm: 786, md: 1024 },
        backgroundColor:'snow'
      }}
      className="flex flex-col h-[100%] bg-[#F3F5F5] m-auto">
      <header className='flex flex-col m-auto'>
        <Navbar />
        <HeroSec />
      </header>
      <main className="m-auto w-[1024px] h-auto flex flex-col bg-white">
        {

        }
        <div className='mt-10 flex justify-center items-center'>
          <h5 className='text-[#0088a9]'>Please fill in your information</h5>
        </div>
        {/* <form action="http://localhost:4000/payment" method="post"> */}
        <form>
          <Box className=' flex flex-col justify-center items-center mt-4'>
            <Paper elevation={4} sx={{ width: 900 }}>
              <div className=' flex flex-col w-[900px] h-[280px] justify-center items-center mt-6'>
                <label className='w-[600px] mt-4'>Name</label>
                <TextField
                  value={name}
                  size='small'
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setName(e.target.value)}
                  // required
                  fullWidth
                />
                <label className='w-[600px]'>Email</label>
                <TextField
                  value={email}
                  size='small'
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                  fullWidth
                />
                <label className='w-[600px]'>Contact</label>
                <TextField
                  value={contact}
                  size='small'
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setContact(e.target.value)}
                  // required
                  fullWidth
                />
              </div>
              <div className=' flex flex-col w-[900px] h-[200px] justify-center items-center'>
                <label className="label text-base font-medium mx-0 my-2.5">Check-In Date</label>
                <TextField
                  type="date"
                  size='small'
                  sx={{ width: 600, height: 40, marginTop: -1 }}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  // required
                  fullWidth
                />
                <label className="label text-base font-medium mx-0 my-2.5">Check-Out Date</label>
                <TextField
                  type="date"
                  size='small'
                  sx={{ width: 600, height: 40, marginTop: -1 }}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  // required
                  fullWidth
                />
              </div>
            </Paper>
            {/* Selected Room */}
            <Paper elevation={4} sx={{ width: 900, marginTop: 2, height: 200 }}>
              <div className=' h-[200px]'>
                <div className='w-[900px] flex justify-center items-center'>
                  <h6 className=' w-[600px] mt-4 '>Selected Room:</h6>
                </div>
                <div className='mt-4 flex justify-center items-center'>
                  {shoppingCart ? (
                    <div>
                      {shoppingCart.map(cart => (
                        <Paper elevation={5} sx={{ width: 600, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                          <div className="flex flex-row justify-center items-center mb-[20px] h-[100px] w-[600px]" key={cart.id}>
                            <div>
                              <img className="w-[160px] h-[100px]" src={cart.roomImage} alt="not found" />
                            </div>
                            <div className='w-[320px]'>
                              <h5>{cart.title}</h5>
                              <p>{cart.introDescr}</p>
                            </div>
                            <div className='w-[76px]  justify-center items-center'>
                              <p>R {cart.price}.00</p>
                            </div>
                            <div>
                              <button className="delete-btn mr-4" onClick={() => dispatch({ type: 'DELETE', id: cart.id, cart })}><FontAwesomeIcon icon={faDeleteLeft} className=" text-sky-600 text-lg font-bold" /></button>
                            </div>
                          </div>
                        </Paper>
                      ))}
                    </div>
                  ) : (
                    <div> Please select a room.</div>
                  )
                  }
                </div>
              </div>
            </Paper>
          </Box>
          <Box 
          sx={{display:'flex', flexDirection:'column'}}
          className="my-10 flex justify-center items-center "
          >
            <span className="font-medium m-2">Amount: R{totalPrice}.00</span><br />
            {/* <button
             
              className="border bg-sky-400 p-1">Confirm Bookings
            </button> */}
            <Button sx={{backgroundColor:'#0088a9'}} variant="contained" onClick={handleBookings}>Confirm Bookings</Button>
          </Box>
        </form>

      </main >
      <Footer />
    </Box >
  )
}

export default Bookings