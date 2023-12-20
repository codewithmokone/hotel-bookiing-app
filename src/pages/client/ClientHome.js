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
  const [filteredResults, setFilteredResults] = useState([]);

  // function for filtering the room by price
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
    <Box
      sx={{
        width: { xs: 400, sm: 768, md: 1024 }
      }}
      className=' home-container bg-[#F2F5F5] block h-auto m-0'>
      <header className="flex flex-col w-[1024px] m-auto">
        <Navbar />
        <Header />
      </header>
      <Box
        sx={{
          width: { xs: 390, md: 1024 },
          height: { xs: 'auto', sm: 'auto', md: 60 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto'
        }}
        className=" bg-gray-500"
      >
        <Box
          sx={{
            width: { xs: 300, sm: 500, md: 500 }
          }}
          className="search-section rounded h-[40px] flex justify-center items-center border bg-white">
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
            width: { xs: 400, sm: 786, md: 1024 },
            height: { sm: 'auto', md: 'auto' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            justifyContent: 'center', alignItems: 'center', margin: 'auto',
            backgroundColor: 'white'
          }}
        >
          {/* Map Section */}
          <Box
            sx={{
              width: { xs: 400, sm: 500, md: 200 }
            }}
          >
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
          <Box
            sx={{
              width: { xs: 400, sm: 500, md: 824 },
              height: { md: 'auto' },
              display: "flex",
              flexDirection: "column",
              // justifyContent: 'center',
              // alignItems: 'center',
              marginTop: 40
            }}
          >
            {filteredResults.length ?
              <SearchCard filteredResults={filteredResults} />
              :
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Cards />
              </Box>
            }
          </Box>
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
