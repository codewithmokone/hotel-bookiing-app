import React from 'react';
import '../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({ login, register }) => {

    return (
        <div className="navbar bg-gray-200 w-[1024px] m-auto h-[50px] flex items-center justify-center">
            <div className='navContainer w-[1024px] flex items-center justify-between'>
                <span className='logo text-sky-800 font-bold '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems mr-2 text-sky-800">
                    <Link to="/gallery" className="mr-[10px] text-sky-800 font-semibold">Gallery</Link>
                    <Link to="/rooms" className="mr-[10px] text-sky-800 font-semibold">Rooms</Link>
                    <button className="reg-link text-sky-800 font-semibold" onClick={() => { register(true) }}>Register</button>
                    <button className="login-link  text-sky-400 font-semibold" onClick={() => { login(true) }}>Login</button>

                </nav>
            </div>
        </div>
    )
}

export default Navbar;