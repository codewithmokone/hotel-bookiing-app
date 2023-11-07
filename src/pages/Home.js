import React, { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import Cards from '../components/cards/Cards';
import SearchCard from '../components/cards/SearchCard'
import Service from '../components/Service';
import FeaturedRooms from '../components/FeaturedRooms';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';


export const Home = () => {

  const [searchResults, setSearchResults] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const filterRoom = async () => {
    setIsLoading(true)

    try {
      const querySnapshot = await getDocs(
        query(collection(db, 'hotelRooms'),
          where('price', '>=', parseInt(minPrice)),
          where('price', '<=', parseInt(maxPrice)),
        )
      );

      const filteredData = querySnapshot.docs.map((doc) => doc.data());

      setSearchResults(filteredData)
    } catch (err) {
      console.log("Error fetching data:", err)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className='home-container bg-[#F4F4F4] block h-auto m-auto'>
      <header className='w-[1024px] flex flex-col'>
        <Navbar />
        <Header />
      </header>
      <div className="main flex flex-col justify-center items-center w-[1024px] m-auto">
        <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center m-0">
          <div className="search-section rounded w-[600px] h-[40px] flex justify-between items-center border bg-white">
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
              <button
                className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                onClick={filterRoom}>Search</button>
            </div>
          </div>
        </div>
        <main className='bg-white'>
          <div>
            <FeaturedRooms />
          </div>
          <div className=" flex flex-row h-auto ">
            {/* Map Section */}
            <div className='w-[30%] ml-6'>
              <div class="mapouter my-5 mt-4">
                <div className="gmap_canvas">
                  <iframe className="gmap_iframe"
                    width="100%"
                    height="300"
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
      <footer className='m-auto'>
        <Footer />
      </footer>
    </div>
  )
}
export default Home;
