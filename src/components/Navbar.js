import React from 'react';
import '../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({ login, register }) => {

    return (
        <div className="navbar w-[1024px] m-auto h-[70px] flex items-center justify-center">
            <header className='navContainer w-[1024px] '>
                <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to="/gallery" className="galleryLink ">Gallery</Link>
                    <Link to="/rooms" className="roomsLink ">Rooms</Link>
                    <button className="registerBtn " onClick={() => { register(true) }}>Register</button>
                    <button className="loginBtn " onClick={() => { login(true) }}>Login</button>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;