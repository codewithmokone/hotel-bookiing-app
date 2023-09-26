import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ClientNavbar from '../../components/navbar/ClientNavbar';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Cards from '../../components/cards/Cards';
import Service from '../../components/Service';
import { useUserAuth } from '../../components/context/UserAuthContext'
import { auth, db } from '../../config/firebase';
import FeaturedRooms from '../../components/FeaturedRooms';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const Home = () => {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const { logOut } = useUserAuth();

  const signOut = async () => {
    try {
      await logOut(auth);
      alert('Signed Out');
      Navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  const fetchData = async () => {

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
    <div className='home-container bg-zinc-400 block h-auto'>
      <header className="flex flex-col w-[1024px]">
        <ClientNavbar signOut={signOut} />
        <Header />
      </header>
      <main className="main bg-white flex flex-col w-[1024px] m-auto ">
        <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center">
          <div className="search-section rounded w-[550px] h-[40px] flex justify-between items-center border bg-white">
            <div>
              <input
                className=' ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                type="number"
                value={minPrice}
                placeholder='Enter minimum amount'
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
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
        </div>
        <div className="m-auto">
          <FeaturedRooms />
        </div>
        <div className="flex flex-row justify-between">
          <div className="mapouter ml-6 my-5 w-[30%]">
            <div class="gmap_canvas">
              <iframe class="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?width=307&amp;height=400&amp;hl=en&amp;q=pretoria cbd&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              </iframe><a href="https://embed-googlemap.com" className='border-none'></a>
            </div>
          </div>
          <div className="card-list flex flex-col justify-center items-center ml-5 my-3">
            <ul className="card flex flex-col justify-between">
              <li><Cards /></li>
            </ul>
          </div>
        </div>
        <div className="m-auto">
          <Service />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Home;
