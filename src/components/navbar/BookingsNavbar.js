import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({signOut}) => {

    return (
        <div className="navbar bg-gray-200 w-[1024px] m-auto">
            <div className='navContainer flex flex-row justify-between items-center h-[60px]'>
                <span className='logo text-lg font-semibold'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to='/clienthome'>Home</Link>
                    <Link to="/" className="logout-link" onClick={signOut}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;