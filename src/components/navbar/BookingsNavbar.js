import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navbar = ({signOut}) => {

    return (
        <header className="navbar">
            <div className='navContainer w-[1024px] flex justify-between items-center h-[60px]'>
                <span className='logo'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to='/clienthome' className='ml-[130px]'>Home</Link>
                    <Link to="/" className='mr-[20px]' onClick={signOut}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;