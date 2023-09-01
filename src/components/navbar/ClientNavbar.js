import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({signOut}) => {

    return (
        <header className="navbar">
            <div className='navContainer w-[1024px] flex flex-row justify-between items-center h-[60px]'>
                <span className='logo'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to='/bookings' className="mr-[10px]">Bookings</Link>
                    <Link to="/" className="ml-[10px] mr-[30px] " onClick={signOut}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;