import React, { useState } from 'react';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Cards from '../../components/cards/Cards';
import Service from '../../components/Service';
import { db } from '../../config/firebase';
import FeaturedRooms from '../../components/FeaturedRooms';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Navbar from '../../components/navbar/Navbar';
import SearchCard from '../../components/cards/SearchCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';

export const Home = () => {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const filterData = async () => {

    try {
      const querySnapshot = await getDocs(query(collection(db, "hotelRooms"),
        where('price', '>=', parseInt(minPrice)),
        where('price', '<=', parseInt(maxPrice))
      ));

      const filteredData = querySnapshot.docs.map((doc) => doc.data());

      console.log("filtered", querySnapshot)

      setFilteredResults(filteredData)
    } catch (err) {
      console.log("Error fetching data:", err)
    }
  };

  return (
    <Box className=' home-container bg-[#F2F5F5] block h-auto m-0'>
      <header className="flex flex-col w-[1024px] m-auto">
        <Navbar />
        <Header />
      </header>
      <Box 
      sx={{
        width:{xs:380 ,md:1024},
        height:{md:60},
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'auto'
      }}
      className=" bg-gray-500"
      >
        <Box 
        sx={{
          width:{xs:300}
        }}
        className="search-section rounded w-[500px] h-[40px] flex justify-center items-center border bg-white">
            <input
              className=' ml-[50px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[400px]'
              type="number"
              value={minPrice}
              placeholder='Enter minimum amount'
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className='ml-[15px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[400px]'
              type="number"
              value={maxPrice}
              placeholder='Enter maximum amount'
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              className="bg-[#0088a9] text-white p-1 rounded ml-[40px] mr-10"
              onClick={filterData}>Search
            </button>
        </Box>
      </Box>
      <main className="main bg-white flex flex-col w-[1024px] m-auto ">
        {/* <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center">
          <div className="search-section rounded w-[600px] h-[40px] flex justify-between items-center border bg-white">
            <div>
              <input
                className='w-[215px] ml-[30px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                type="number"
                value={minPrice}
                placeholder='Enter minimum amount'
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className='w-[215px] ml-[30px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                type="number"
                value={maxPrice}
                placeholder='Enter maximum amount'
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <button
                className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                onClick={fetchData}>Search</button>
            </div>
          </div>
        </div> */}
        <div className="m-auto bg-gray-300">
          <FeaturedRooms />
        </div>
        <Box
          sx={{
            width: { sm: 786, md: 1024 },
            display: 'flex',
            flexDirection: { sm: 786, md: 1024 },
            justifyContent:'space-between',
            // alignItems:'center'
          }}
          className="bg-gray"
        >
          <Box 
          sx={{
            width:{xs:320,sm:500, md:900}
          }}
          className="w-[40%]">
            <div className="gmap_canvas">
              <iframe className="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginHHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=307&amp;height=400&amp;hl=en&amp;q=pretoria cbd&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe><a href="https://embed-googlemap.com" className='border-none'></a>
            </div>
          </Box>
          <div className="card-list flex flex-col justify-center items-center ml-2 my-3 mr-5">
            {filteredResults.length ?
              <ul className="flex flex-col justify-between"><li><SearchCard filteredResults={filteredResults} /></li></ul>
              :
              <ul className="flex flex-col justify-between"><li><Cards /></li></ul>
            }
          </div>
        </Box>
        <div className="m-auto">
          <Service />
        </div>
      </main>
      <footer className='m-auto'>
        <Footer />
      </footer>
    </Box>
  )
}

export default Home;
