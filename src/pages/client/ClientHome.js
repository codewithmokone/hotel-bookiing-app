import React from 'react';
import '../../styles/home.css'
import { Navigate } from 'react-router-dom';

// Components import
import ClientNavbar from '../../components/navbar/ClientNavbar';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import Cards from '../../components/cards/Cards';
import Service from '../../components/Service';

// Firebase imports
import { useUserAuth } from '../../components/context/UserAuthContext'
import { auth } from '../../config/firebase';
import FeaturedRooms from '../../components/FeaturedRooms';


export const Home = () => {

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


  return (
    <div className='home-container bg-zinc-400 block h-auto'>
      <header className="navbarsection">
        <ClientNavbar signOut={signOut} />
        <Header />
      </header>
      <main className="main bg-white flex flex-col w-[1024px] m-auto ">
        <div className="m-auto">
          <FeaturedRooms />
        </div>
        <div className="flex flex-row justify-between">
          <div className="mapouter ml-5 my-5 w-[33%]">
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
