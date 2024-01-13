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
import ClientDrawerNavBar from './ClientDrawerNavBar';


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
            <>
                <Hidden smDown implementation="css">
                    <Box sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        backgroundColor: "#24252A",
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                    >
                        <Box sx={{ width: { sm: '34%', sm:'34%' ,md: '46%' } }}>
                            <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                        </Box>
                        <Box sx={{ width: { sm: '65%', sm:'65%',md: '50%' } }}>
                            <nav className="navItems">
                                <Link to="/" className="links ">Home</Link>
                                <Link to="/gallery" className="links ">Gallery</Link>
                                <Link to="/rooms" className="roomsLink ">Rooms</Link>
                                <Link to="/bookings" className="roomsLink ">Bookings</Link>
                                <Link to="/contactus" className="contactus roomsLink w-[100px] ">Contact Us</Link>
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
                                        <MenuItem onClick={() => navigate("/clientprofile")}>Profile</MenuItem>
                                        <MenuItem onClick={signOut}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </nav>
                        </Box>
                    </Box>
                </Hidden>
                <Hidden smUp implementation="css">
                    <Box
                        sx={{
                            width: { xs: 400 },
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems:'center',
                            backgroundColor:'#24252A'
                        }}
                    >
                        <Box sx={{marginLeft: 3}}>
                            <span className='font-bold text-[#0088a9] text-xs '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                        </Box>
                        <Box sx={{marginRight: 1}}>
                            <ClientDrawerNavBar signout={signOut} />
                        </Box>
                    </Box>
                </Hidden>
            </>
        )
    } else {
        return (
            <>
                <Hidden smDown implementation="css">
                    <Box sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        backgroundColor: "#24252A",
                        height: 60,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >
                        <Box sx={{ width: { sx: '34%', sm:'27%' ,md: '46%' } }}>
                            <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                        </Box>
                        <Box sx={{ width: { sx: '65%', sm:'73%',md: '65%' } }}>
                            <nav className="navItems topnav" id="myTopnav" >
                                <Link to="/" className="links">Home</Link>
                                <Link to="/gallery" className="links">Gallery</Link>
                                <Link to="/rooms" className="roomsLink">Rooms</Link>
                                <Link to="/contactus" className="links">Contact Us</Link>
                                <button className="registerBtn" onClick={() => { register(true) }}>Register</button>
                                <button className="loginBtn " onClick={() => { login(true) }}>Login</button>
                            </nav>
                        </Box>

                    </Box>
                </Hidden>
                <Hidden smUp implementation="css">
                    <Box
                        sx={{
                            width: { xs: 400 }
                        }}
                    >
                        <DrawerNavBar />
                    </Box>
                </Hidden>
            </>
        )
    }
}

export default Navbar;