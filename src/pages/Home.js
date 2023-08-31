import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  // State variable to control the visibility of the login modal
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // State variable to control the visibility of the registration modal
  const [openRegistModal, setOpenRegistModal] = useState(false);

  // State variable to store the current rating value
  const [rating, setRating] = useState(null);

  // State variable to store the value of a star being hovered over (for rating preview)
  const [hover, setHover] = useState(null);

  // State variable to store the input value for the search query
  const [searchInput, setSearchInput] = useState('');

  // State variable to store the results of a search operation
  const [searchResults, setSearchResults] = useState('');

  // State variable to control the visibility of the date picker
  const [openDate, setOpenDate] = useState(false);

  // State variable to store the selected date range
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // State variable to control the visibility of some options
  const [openOptions, setOpenOptions] = useState(false)

  // Function returned from the useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate()


  // Handles search functionality
  const searchData = async () => {

    try {
      // Query the Firestore collection "hotelRooms" with a filter on the "title" field
      const data = await getDocs(query(collection(db, "hotelRooms")
        , where("title", "==", searchInput)));

      // Map through the retrieved documents and create an array of objects with additional "id" field
      setSearchResults(data.docs.map(doc => ({ ...doc.data(), id: doc.title })));

      console.log("Search data", searchResults)
    } catch (err) {
      console.log(err)
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
      <div className="navbarsection ">
        {openLoginModal && <LoginModal closeLogin={closeLogin} />}
        {openRegistModal && <RegistModal closeRegister={closeRegister} />}
        <Navbar login={login} register={register} />
      </div>
      <div className='hero-section'>
        <Header />
      </div>
      <div className="main flex flex-col justify-center items-center w-[1024px] m-auto">
        <div className=" bg-gray-500 w-[1024px] h-[60px] flex justify-center items-center">
          {/* Search Section */}
          <div className="search-section rounded w-[900px] h-[40px] flex items-center justify-between border p-[10px] bg-white">
            <div className="m-3 flex flex-row items-center">
              <FontAwesomeIcon icon={faBed} className="headerIcon m-1 text-sky-800 " />
              <input type="text" placeholder="Search rooms...." onChange={(e) => setSearchInput(e.target.value)} className="SearchInput m-1 outline-none" />
            </div>
            <div className="m-3 flex flex-row items-center ml-[-30px]">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon m-1 text-sky-800" />
              <span onClick={() => setOpenDate(!openDate)} className="cursor-pointer" >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="	position: absolute bottom-[132px]"
                minDate={new Date()}
              />}
            </div>
            <div className="m-3 flex flex-row items-center">
              <FontAwesomeIcon icon={faPerson} className="headerIcon m-1 text-sky-800" />
              <span onClick={() => setOpenOptions(!openOptions)}></span>
              {openOptions &&
                <select>
                  <option>Select Options</option>
                  <option>Adult</option>
                  <option>2 Adult</option>
                  <option>Family</option>
                </select>
              }
            </div>
            <div>
              <button className="bg-sky-800 text-white p-1 mr-[-7px] rounded" onClick={searchData}>Search</button>
            </div>

          </div>
        </div>
        <main>
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
