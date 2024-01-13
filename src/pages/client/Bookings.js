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
import { Box, Button, Paper } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';
import CustomTypography from '../../components/CustomTypography'
import InputComponent from '../../components/InputComponent';

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

  // console.log("Email: ", email)

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

  // const amount = (totalPrice + 0.00).toFixed(2);

  return (
    <Box
      sx={{
        width: { sm: 786, md: 1024 },
        backgroundColor: 'snow'
      }}
      className="flex flex-col h-[100%] bg-[#F3F5F5] m-auto">
      <header className='flex flex-col m-auto'>
        <Navbar />
        <HeroSec />
      </header>
      <Box
        sx={{
          width: { xs: 400, sm: 786, md: 1024 },
          height: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#24252A',
        }}
      >
      </Box>
      <Box>
        <main className="m-auto h-auto flex flex-col">
          <Box className='flex justify-center items-center'>
            <CustomTypography theme="heading" text="Bookings" />
          </Box>
          {/* Selected Room */}
          <Paper elevation={4} sx={{ width: { xs: 400, sm: 700, md: 900 }, marginTop: 2, height: 200 }}>
            <div className=' h-[200px]'>
              <div className='flex justify-center items-center'>
                <h6 className=' mt-4 '>Selected Room:</h6>
              </div>
              <div className='mt-4 flex justify-center items-center'>
                {shoppingCart ? (
                  <div>
                    {shoppingCart.map(cart => (
                      <Paper elevation={5} sx={{ width: { xs: 340, sm: 600, md: 600 }, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <div className="flex flex-row justify-center items-center mb-[20px] h-[100px]" key={cart.id}>
                          <Box sx={{ width: { xs: 100, sm: 600, md: 600 } }}>
                            <img className="w-full h-[100px]" src={cart.roomImage} alt="not found" />
                          </Box>
                          <Box sx={{}}>
                            <Box sx={{width:{xs:200}}}>
                              <CustomTypography theme='subheading' text={cart.title} />
                              <CustomTypography sx={{ fontSize: { xs: 10 } }} text={cart.introDescr} />
                            </Box>
                            <Box>
                              <p>R {cart.price}.00</p>
                            </Box>
                          </Box>
                          <Box>
                            <button className="delete-btn mr-4" onClick={() => dispatch({ type: 'DELETE', id: cart.id, cart })}><FontAwesomeIcon icon={faDeleteLeft} className=" text-sky-600 text-lg font-bold" /></button>
                          </Box>
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
          {/* <form action="https://hotel-booking-nodejs.onrender.com/payment" method="post"> */}
          <Box
            sx={{
              width: { xs: 400, sm: 700, md: 900 }
            }}
          >
            <form onSubmit={handleBookings}>
              {/* <form action="http://localhost:4000/payment" method="post"> */}
              <Box className=' flex flex-col justify-center items-center mt-4'>
                <Paper
                  sx={{
                    width: { xs: 400, sm: 700, md: 900 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  elevation={4}
                >
                  <div className=' h-[260px] mt-6'>
                    <Box sx={{
                      width: { xs: 350, sm: 650, md: 800 }
                    }}>
                      <label className='ml-4'>Name</label>
                      <InputComponent
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        placeholder='Name'
                        value={name}
                      />
                    </Box>
                    <Box sx={{
                      width: { xs: 350, sm: 650, md: 800 }
                    }}>
                      <label className='ml-4'>Email</label>
                      <InputComponent
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="text"
                        placeholder='Email'
                        value={email}
                      />
                    </Box>
                    <Box sx={{
                      width: { xs: 350, sm: 650, md: 800 }
                    }}>
                      <label className='ml-4'>Contact</label>
                      <InputComponent
                        onChange={(e) => setContact(e.target.value)}
                        required
                        type="text"
                        placeholder='Contact'
                        value={contact}
                      />
                    </Box>
                  </div>
                  <div className='h-[180px]'>
                    <Box sx={{
                      width: { xs: 350, sm: 650, md: 800 }
                    }}
                    >
                      <label className="text-base font-medium ml-4">Check-In Date</label>
                      <InputComponent
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                        type="date"
                      />
                    </Box>
                    <Box sx={{
                      width: { xs: 350, sm: 650, md: 800 }
                    }}
                    >
                      <label className="text-base font-medium ml-4">Check-Out Date</label>
                      <InputComponent
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        type="date"
                      />
                    </Box>
                  </div>
                </Paper>
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column' }}
                className="my-10 flex justify-center items-center "
              >
                <span className="font-medium m-2">Amount: R{totalPrice}.00</span><br />
                {/* <input type="hidden" name="email_address" value={email}></input>
            <input type="hidden" name="amount" value={amount} /> */}
                <Button sx={{ backgroundColor: '#0088a9' }} variant="contained" type='submit'>Confirm Bookings</Button>
              </Box>
            </form>
          </Box>

        </main >
      </Box>

      <Footer />
    </Box >
  )
}

export default Bookings