import React from 'react';
import '../../styles/navbar.css'
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({ login, register }) => {

    return (
        <div className="w-[1024px] h-[50px] flex items-center jusstify-center m-[auto] bg-slate-200">
            <div className="navContainer w-[1024px] flex items-center justify-between bg-slate-200 ">
                <span className='font-bold ml-4 decoration-black text-lg ' >HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className=" decoration-black flex items-center mr-[20px] ">
                    <Link to="/gallery" className="mr-[10px]">Gallery</Link>
                    <Link to="/rooms" className="mr-[10px]">Rooms</Link>
                    <button className="reg-link" onClick={() => { register(true) }}>Register</button>
                    <button className="login-link bg-sky-950" onClick={() => { login(true) }}>Login</button>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;