import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Navbar = ({signOut}) => {

    return (
        <div className="navbar w-[1024px] flex items-center jusstify-center m-[auto]">
            <div className=' w-[1024px] flex items-center justify-between bg-slate-200'>
                <span className='logo '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="navItems">
                    <Link to="/adminhome">Home</Link>
                    <Link to="/" className="logout-link" onClick={signOut}>Log out</Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;