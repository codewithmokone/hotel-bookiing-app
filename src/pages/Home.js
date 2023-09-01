import React, { useState } from 'react';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

// Components and pages
import Navbar from '../components/Navbar';
import Header from '../components/HeroSec';
import Footer from '../components/Footer';
import Cards from '../components/cards/Cards';
import SearchCard from '../components/cards/SearchCard'
import LoginModal from '../components/modal/LoginModal';
import RegistModal from '../components/modal/RegistModal';

// import Contact from '../components/Contact';
import Service from '../components/Service';
import FeaturedRooms from '../components/FeaturedRooms';
import { useNavigate } from 'react-router-dom';


export const Home = () => {

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegistModal, setOpenRegistModal] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const readingData = collection(db, "hotelRooms")

  console.log(readingData)

  // Function returned from the useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate()


  // Handles search functionality
  // const searchData = async () => {

  //   try {
  //     // Query the Firestore collection "hotelRooms" with a filter on the "title" field
  //     const data = await getDocs(query(collection(db, "hotelRooms")
  //       , where("title", "==", searchInput)));

  //     // Map through the retrieved documents and create an array of objects with additional "id" field
  //     setSearchResults(data.docs.map(doc => ({ ...doc.data(), id: doc.title })));

  //     console.log("Search data", searchResults)
  //   } catch (err) {
  //     console.log(err)
  //   }

  // };

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

  // Opens the login modal
  const login = () => {
    setOpenLoginModal(true);
  }

  // Closes the login modal
  const closeLogin = () => {
    setOpenLoginModal(false);
  }

  // Opens the register modal
  const register = () => {
    setOpenRegistModal(true);
  }

  // Closes the register modal
  const closeRegister = () => {
    setOpenRegistModal(false);
  }

  return (
    <div className='min-h-screen'>
      <header className='w-[1024px]'>
        {openLoginModal && <LoginModal closeLogin={closeLogin} />}
        {openRegistModal && <RegistModal closeRegister={closeRegister} />}
        <Navbar login={login} register={register} />
      </header>
      <div>
        <Header />
      </div>
      <div className="main flex flex-col justify-center items-center w-[1024px] m-auto">
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
        <main className='bg-gray-300'>
          <div>
            <FeaturedRooms />
          </div>
          <div className=" flex flex-row h-auto ">
            {/* Map Section */}
            <div class="mapouter my-5">
              <div class="gmap_canvas">
                <iframe class="gmap_iframe"
                  width="100%"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=307&amp;height=600&amp;hl=en&amp;q=pretoria cbd&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe><a href="https://embed-googlemap.com" className='border-none'></a>
              </div>
            </div>
            <div className="flex flex-col justify-start ml-5 my-3">
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
