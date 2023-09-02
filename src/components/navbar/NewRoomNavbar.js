import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({signOut}) => {

    return (
        <div className="navbar w-[1024px] h-[70px] flex items-center jusstify-center m-[auto]">
            <div className='navContainer w-[1024px] flex items-center justify-between'>
                <span className='logo font-bold ml-4 decoration-black text-lg'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to="/newroom" className='no-underline' >New Room</Link>
                    <Link to="/bookedrooms" className='no-underline'>Bookings</Link>
                    <Link to="/" className="logout-link no-underline" onClick={signOut}>Log out</Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;