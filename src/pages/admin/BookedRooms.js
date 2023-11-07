import React, { useEffect, useState } from 'react'
import HeroSec from '../../components/HeroSec'
import Footer from '../../components/Footer'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'

function BookedRooms() {

  const [bookingList, setBookingList] = useState();

  // handles getting data from firestore
  const fetchBookingData = async () => {
    const bookingRef = await getDocs(collection(db, "bookings"));
    const bookings = bookingRef.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    setBookingList(bookings);
  }

  useEffect(() => {
    fetchBookingData();
  }, [])


  return (
    <div className='min-h-screen m-auto bg-[#F5F5F5]'>
      <header className='flex flex-col'>
        <AdminNavbar />
        <HeroSec />
      </header>
      <main className='h-[50vh] w-[1024px] m-auto bg-[]'>
        <div>
          <div className='flex justify-center items-center'>
            <h5 className='text-[#0088a9] font-bold mt-10 '>Booked Rooms</h5>
          </div>
          <div className='w-[900px] flex flex-col justify-center items-center m-auto'>
            <Accordion>
              <AccordionSummary
                expandIcon={<p>More</p>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </main>
      <footer className='m-auto'>
        <Footer />
      </footer>
    </div>
  )
}

export default BookedRooms
