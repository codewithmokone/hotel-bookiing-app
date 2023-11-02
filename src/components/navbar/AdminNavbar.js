import React from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const AdminNavbar = ({ signOut }) => {

    return (
        <div className="navbar w-[1024px] h-[70px] flex items-center jusstify-center m-[auto]">
            <div className='navContainer w-[1024px] flex items-center justify-between'>
                <span className='logo font-bold ml-4 decoration-black text-lg w-[60%]'>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className=" border w-[40%] justify-end items-end">
                    <Link to="/adminhome" className='home no-underline'>Home</Link>
                    <Link to="/newroom" className='newRoom no-underline' >New Room</Link>
                    <Link to="/bookedrooms" className='bookings no-underline'>Bookings</Link>
                    <Link to="/" className="logout-link no-underline" onClick={signOut}>Log out</Link>
                </nav>
            </div>
        </div>
    )
}

export default AdminNavbar;