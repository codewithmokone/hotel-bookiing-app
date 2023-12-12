import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSec from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbar/Navbar';
import { db, storage } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { CartContext } from '../../components/context/CartContext';
// import { UserAuthContext } from '../../components/context/UserAuthContext';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Paper, TextField } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';

const Bookings = () => {

  const { shoppingCart, dispatch, totalPrice } = useContext(CartContext);
  const { user } = useUserAuth();
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [file, setFile] = useState(null);

  const shoppingCartArray = shoppingCart[0];

  const formData = {
    "amount": `${totalPrice}`,

  }

  useEffect(() => {
    if (shoppingCartArray && !file) {
      setFile(shoppingCartArray.roomImage);
    }
  }, [shoppingCartArray, file]);


  // Handles the booking function
  const handleBookings = async () => {

    if (!user) {
      alert("Please login or signup to continue.");
      return;
    }

    try {
      const imageRef = ref(storage, `BookingImages/${file}`)
      const docId = shoppingCartArray.id

      // Uploading a image to firebase storage
      await uploadBytes(imageRef, file)
      const url = await getDownloadURL(imageRef);
      console.log('Image Uploaded');

      // Sends data to firestore booking collections 
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
        roomImage: file
      });

      alert('Booking Successful');
      navigate('/clienthome');

    } catch (error) {
      console.log("Error booking the room: ", error)
    }
  }

  return (
    <Box
      sx={{
        width: { sm: 786, md: 1024 }
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
          <h5>Please fill in your information</h5>
        </div>
        <form action="http://localhost:4000/payment" method="post">
          <Box className=' flex flex-col justify-center items-center mt-4'>

            <Paper elevation={4} sx={{ width: 900 }}>
              <div className=' flex flex-col w-[900px] h-[280px] justify-center items-center mt-6'>
                <label className='w-[600px] mt-4'>Name</label>
                <TextField
                  size='small'
                  value={name}
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                />
                <label className='w-[600px]'>Email</label>
                <TextField
                  value={email}
                  size='small'
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
                <label className='w-[600px]'>Contact</label>
                <TextField
                  size='small'
                  value={contact}
                  sx={{ width: 600, height: 40 }}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  fullWidth
                />
              </div>
              {/* </Paper>
            <Paper elevation={4} sx={{ width: 900, marginTop: 2 }}> */}
              <div className=' flex flex-col w-[900px] h-[200px] justify-center items-center'>
                <label className="label text-base font-medium mx-0 my-2.5">Check-In Date</label>
                <TextField
                  value={checkOutDate}
                  type="date"
                  size='small'
                  sx={{ width: 600, height: 40, marginTop: -1 }}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  fullWidth
                />
                <label className="label text-base font-medium mx-0 my-2.5">Check-Out Date</label>

                <TextField
                  value={checkOutDate}
                  type="date"
                  size='small'
                  sx={{ width: 600, height: 40, marginTop: -1 }}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  fullWidth
                />
              </div>
            </Paper>
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
          <Box className="my-10 flex flex-row justify-center items-center ">
            <input type="hidden" name="amount" value={totalPrice} />
            <span className="font-medium m-2">Amount: R{totalPrice}.00</span><br />
            <button
              type='submit'
              onClick={handleBookings}
              className="border bg-sky-400 p-1">Confirm Bookings</button>
          </Box>
        </form>

      </main >
      <Footer />
    </Box >
  )
}

export default Bookings