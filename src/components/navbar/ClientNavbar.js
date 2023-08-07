import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({signOut}) => {

    return (
        <div className="navbar bg-gray-200 w-[1024px] m-auto items-center justify-center">
            <div className='navContainer flex flex-row justify-between items-center h-[60px]'>
                <h1 className='logo text-sky-600 font-bold'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</h1>
                <nav className="navItems">
                    <Link to='/bookings' className="text-sky-600">Bookings</Link>
                    <Link to="/" className="logout-link text-sky-600" onClick={signOut}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;