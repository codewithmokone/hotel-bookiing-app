import React, { useState } from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { Box, Button, Drawer, Hidden, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerNavBar from './DrawerNavBar';


const Navbar = () => {

    const { user, logOut } = useUserAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    // const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const navigate = useNavigate();

    // Opens the login page
    const login = () => {
        navigate("/login")
    }

    // Opens the register page
    const register = () => {
        navigate("/register");
    }


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

    // Renders the navbar ui according to the logged in user
    if (user) {
        return (
            <Box sx={{
                width: { xs: 400, sm: 786, md: 1024 },
                backgroundColor: "#24252A",
                height: 80,
                display: 'flex',
                alignItems: 'center'
            }}
            >
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
                            sx={{ marginRight: -3, marginLeft: -3, width: 20, borderWidth: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            size='small'
                        >
                            <AccountCircleIcon sx={{ width: 35, height: 35, color: "#0088a9" }} />
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
            </Box>
        )
    } else {
        return (
            <>
                <Hidden smDown implementation="css">
                    <Box sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        backgroundColor: "#24252A",
                        height: 80,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    >
                        <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                        <nav className="navItems topnav" id="myTopnav" >
                            <Link to="/" className="home">Home</Link>
                            <Link to="/gallery" className="galleryLink">Gallery</Link>
                            <Link to="/rooms" className="roomsLink">Rooms</Link>
                            <Link to="/contactus" className="contactusLink">Contact Us</Link>
                            <button className="registerBtn" onClick={() => { register(true) }}>Register</button>
                            <button className="loginBtn " onClick={() => { login(true) }}>Login</button>
                        </nav>
                    </Box>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <DrawerNavBar />
                </Hidden>
            </>
        )
    }
}

export default Navbar;