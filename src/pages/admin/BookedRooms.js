import React from 'react'
import NewRoomNavbar from '../../components/navbar/AdminNavbar'
import HeroSec from '../../components/HeroSec'
import Footer from '../../components/Footer'

function BookedRooms() {
  return (
    <div className='min-h-screen'>
        <header className='flex flex-col'>
            <NewRoomNavbar />
            <HeroSec />
        </header>
        <main>
          <div>
            <div className='flex justify-center items-center'>
              <h1 className='text-[#0088a9] font-bold'>Booked Rooms</h1>
            </div>
          </div>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
  )
}

export default BookedRooms
