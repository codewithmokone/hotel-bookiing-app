import React, { useState } from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { Button, Menu, MenuItem } from '@mui/material';

const Navbar = () => {

    const { user, logOut } = useUserAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    // Opens the login page
    const login = () => {
        navigate("/login")
    }

    // Opens the register page
    const register = () => {
        navigate("/register");
    }

    const open = Boolean(anchorEl);

    // Opens user profile menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Closes user profile menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Signs out the user
    const signOut = async () => {
        try {
            await logOut(auth);
            alert('Signed Out');
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    if (user) {
        return (
            <div className="navbar w-[1024px] m-auto h-[70px] flex items-center justify-center">
                <header className='navContainer w-[1024px] '>
                    <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                    <nav className="navItems">
                        <Link to="/" className="galleryLink ">Home</Link>
                        <Link to="/gallery" className="galleryLink ">Gallery</Link>
                        <Link to="/rooms" className="roomsLink ">Rooms</Link>
                        <Link to="/bookings" className="roomsLink ">Bookings</Link>
                        <Link to="/contactus" className="contactus w-[100px] ">Contact Us</Link>
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{ marginLeft: -3, marginBottom: -2.5, width: 20, borderWidth: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                size='small'
                            >
                                <p>Profile</p>
                                {/* <FontAwesomeIcon icon={faUser} className=" text-sky-600 text-lg font-bold" /> */}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {/* <MenuItem onClick={signOut}>Profile</MenuItem>
                                <MenuItem onClick={signOut}>Order History</MenuItem> */}
                                <MenuItem onClick={signOut}>Logout</MenuItem>
                            </Menu>
                        </div>

                    </nav>
                </header>
            </div>
        )
    } else {
        return (
            <div className="navbar w-[1024px] m-auto h-[80px] flex items-center justify-center">
                <header className='navContainer w-[1024px] '>
                    <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                    <nav className="navItems">
                        <Link to="/" className="home">Home</Link>
                        <Link to="/gallery" className="galleryLink ">Gallery</Link>
                        <Link to="/rooms" className="roomsLink">Rooms</Link>
                        <Link to="/contactus" className="contactusLink ">Contact Us</Link>
                        <button className="registerBtn " onClick={() => { register(true) }}>Register</button>
                        <button className="loginBtn ml-[10px] " onClick={() => { login(true) }}>Login</button>
                    </nav>
                </header>
            </div>
        )
    }


}

export default Navbar;