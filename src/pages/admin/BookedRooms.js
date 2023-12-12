import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function BookedRooms() {

  const [bookingList, setBookingList] = useState();

  // handles getting data from firestore
  const fetchBookingData = async () => {
    const bookingRef = await getDocs(collection(db, "bookings"));
    const bookings = bookingRef.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    console.log("Bookings page: ", bookings);
    setBookingList(bookings);
  }

  useEffect(() => {
    fetchBookingData();
  }, [])


  return (
    <Box className='min-h-screen'>
      <header>
        <AdminNavbar />
      </header>
      <main className='h-[50vh] m-auto bg-white'>
        <Box>
          <Box className='flex justify-center items-center'>
            <h5 className='text-[#0088a9] font-bold mt-10 '>Booked Rooms</h5>
          </Box>
          <Box className=' flex flex-col justify-center items-center m-auto'>
            {
              bookingList ? (bookingList.map((item, index) => (
                <>
                  <Accordion sx={{ width: 800 }}>
                    <AccordionSummary
                      key={index}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ fontSize: 20, marginRight: 5, fontWeight: 600 }}>{item.title}</Typography>
                      <Typography sx={{ fontSize: 20 }}>R{item.price}.00</Typography>
                      {/* <Typography>{item.title}</Typography> */}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Client name: {item.name}</Typography>
                      <Typography>Contact number: {item.contact}</Typography>
                      <Typography>Room type: {item.roomType}</Typography>
                      <Typography>Bed type: {item.bedType}</Typography>
                      <Typography>Check In: {item.checkInDate}</Typography>
                      <Typography>Check Out: {item.checkOutDate}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </>
              ))
              ) : (
                <Box>
                  <p>No rooms have been booked yet.</p>
                </Box>
              )
            }
          </Box>
        </Box>
      </main>
    </Box>
  )
}

export default BookedRooms
