import React from 'react'
import HeroSec from '../../components/HeroSec'
import Footer from '../../components/Footer'
import AdminNavbar from '../../components/navbar/AdminNavbar'

function BookedRooms() {
  return (
    <div className='min-h-screen m-auto'>
        <header className='flex flex-col'>
            <AdminNavbar />
            <HeroSec />
        </header>
        <main className='h-[50vh]'>
          <div>
            <div className='flex justify-center items-center'>
              <h5 className='text-[#0088a9] font-bold mt-10 '>Booked Rooms</h5>
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
