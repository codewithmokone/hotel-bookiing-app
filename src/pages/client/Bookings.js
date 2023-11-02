import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components imports
import HeroSec from '../../components/HeroSec';
import Service from '../../components/Service';
import Footer from '../../components/Footer';
import Navbar from '../../components/navbar/Navbar';

// Firebase imports
import { auth, db, storage } from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Context data imports
import { CartContext } from '../../components/context/CartContext';
// import { UserAuthContext } from '../../components/context/UserAuthContext';

// Icon and styling import
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Paper, TextField } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';

const Bookings = () => {

  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  const { user } = useUserAuth();
  const navigate = useNavigate()

  const shoppingCartArray = shoppingCart[0];

  const [name, setName] = useState('');
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [file, setFile] = useState(shoppingCartArray.roomImage);


  // Handles the booking function
  const handleBookings = async () => {

    if (user) {
      const imageRef = ref(storage, `BookingImages/${file}`)
      const docId = shoppingCartArray.id

      try {
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

      } catch (err) {
        console.log("Error uploading an image. ", err)
      }
    } else {
      <div>
        <Alert variant="filled" severity="error">
          Please login or signup to continue.
        </Alert>
      </div>
    }
  }

  return (
    <div className="flex flex-col h-[100%] bg-gray-100">
      <header className='flex flex-col'>
        <Navbar />
        <HeroSec />
      </header>
      <main className="m-auto w-[1024px] h-auto flex flex-col bg-white">
        <div className='mt-10'>
          <h5>Please fill in your information</h5>
        </div>
        <div className=''>
          <Paper elevation={4} sx={{ width: 900, height: 320 }}>
            <div className=' flex flex-col w-[900px] h-[280px] justify-center items-center mt-6'>
              <label className='w-[600px] mt-4'>Name</label>
              <TextField
                size='small'
                value={name}
                sx={{ width: 600, height: 40., marginTop: -3 }}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <label className='w-[600px]'>Email</label>
              <TextField
                value={email}
                size='small'
                sx={{ width: 600, height: 40, marginTop: -3 }}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <label className='w-[600px]'>Contact</label>
              <TextField
                size='small'
                value={contact}
                sx={{ width: 600, height: 40, marginTop: -3 }}
                onChange={(e) => setContact(e.target.value)}
                required
                fullWidth
              />
            </div>
          </Paper>
          <Paper elevation={4} sx={{ width: 900 }}>
            <div className=' flex flex-col w-[900px] h-[240px] justify-center items-center mt-3'>
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
              <div className='mt-4'>
                {shoppingCart && shoppingCart.map(cart => (
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
            </div>
          </Paper>
        </div>
        <div className="my-10 flex flex-row ">
          {/* <span className="font-medium m-2">Quantity: {totalQty}</span><br /> */}
          <span className="font-medium m-2">Amount: R {totalPrice}.00</span><br />
          <button className="border bg-sky-400 p-1" onClick={handleBookings}>Confirm Bookings</button>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Bookings