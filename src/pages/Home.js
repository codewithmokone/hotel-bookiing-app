import React, { useState } from 'react';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import Navbar from '../components/Navbar';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import Cards from '../components/cards/Cards';
import SearchCard from '../components/cards/SearchCard'
import Service from '../components/Service';
import FeaturedRooms from '../components/FeaturedRooms';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

  const [searchResults, setSearchResults] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const searchRoom = async () => {
    setIsLoading(true)

    try {
      // const roomsRef = collection(db, 'hotelRooms');
      // const queryConditions = [
      //   where('price', '>=', parseInt(minPrice)),
      //   where('price', '<=', parseInt(maxPrice)),
      // ]

      // if (checkInDate && checkOutDate) {
      //   queryConditions.push(
      //     where('availableDates', 'array-contains', checkInDate),
      //     where('availableDates', 'array-contains', checkOutDate)
      //   );
      // }

      // const querySnapshot = await getDocs(query(roomsRef, ...queryConditions));

      // const filteredData = querySnapshot.docs.map((doc) => doc.data());

      // const filteredData = [];
      // querySnapshot.forEach((doc) => {
      //   const room = doc.data();
      //   if (room.availableDates.includes(checkInDate) && room.availableDates.includes(checkOutDate)) {
      //     filteredData.push(room);
      //   }
      // });

      const checkInQuerySnapshot = await getDocs(
        query(collection(db, 'hotelRooms'),
          where('price', '>=', parseInt(minPrice)),
          where('price', '<=', parseInt(maxPrice)),
          where('availableDates', 'array-contains', checkInDate)
        )
      );

      const availableRoomsOnCheckIn = checkInQuerySnapshot.docs.map((doc) => doc.data());

      // Filter available rooms on the check-out date
      const filteredData = availableRoomsOnCheckIn.filter((room) =>
        room.availableDates.includes(checkOutDate)
      );

      console.log("Check availability: ", filteredData)

      setSearchResults(filteredData)
    } catch (err) {
      console.log("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  };

  // Opens the login modal
  const login = () => {
    navigate("/login")
  }

  // Opens the register modal
  const register = () => {
    navigate("/register");
  }

  return (
    <div className='min-h-screen'>
      <header className='w-[1024px]'>
        <Navbar login={login} register={register} />
      </header>
      <div>
        <Header />
      </div>
      <div className="main flex flex-col justify-center items-center w-[1024px] m-auto">
        <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center">
          <div className="search-section rounded w-[1000px] h-[40px] flex justify-between items-center border bg-white">
            <div>
              <input
                className=' ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                type="number"
                value={minPrice}
                placeholder='Enter minimum amount'
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                type="number"
                value={maxPrice}
                placeholder='Enter maximum amount'
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <input
                className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[150px]'
                type="date"
                value={checkInDate}
                placeholder='Check-in date'
                onChange={(e) => setCheckInDate(e.target.value)}
              />
              <input
                className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[150px]'
                type="date"
                value={checkOutDate}
                placeholder='Check-out date'
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
              <button
                className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                onClick={searchRoom}>Search</button>
            </div>
          </div>
        </div>
        <main className='bg-gray-300'>
          <div>
            <FeaturedRooms />
          </div>
          <div className=" flex flex-row h-auto ">
            {/* Map Section */}
            <div className='w-[30%] ml-6'>
              <div class="mapouter my-5">
                <div className="gmap_canvas">
                  <iframe className="gmap_iframe"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=307&amp;height=600&amp;hl=en&amp;q=pretoria cbd&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                  </iframe><a href="https://embed-googlemap.com" className='border-none'></a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start mr-4 my-3">
              {searchResults.length ?
                <ul className="flex flex-col justify-between"><li><SearchCard searchResults={searchResults} /></li></ul>
                :
                <ul className="flex flex-col justify-between"><li><Cards /></li></ul>
              }
            </div>
          </div>
          <div>
            <Service />
          </div>
          {/* <div>
          <Contact />
          </div> */}
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
export default Home;
