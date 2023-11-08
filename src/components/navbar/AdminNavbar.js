import React, { useState } from 'react';
import '../../styles/navbar.css';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AdminNavbar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const { logOut } = useUserAuth();
    const navigate = useNavigate();

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

    return (
        <div className="navbar w-[1024px] m-auto h-[70px] flex items-center justify-center">
            <header className='navContainer w-[1024px] '>
                <span className='logo font-bold text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
                <nav className="flex flex-row justify-center items-center">
                    <Link to="/adminhome" className="adminHome mr-2">Home</Link>
                    <Link to="/newroom" className="adminNewRoom mr-2">New Room</Link>
                    <Link to="/bookedrooms" className="adminBookings mr-8">Bookings</Link>
                    <div>
                        <Button
                            className='adminProfile'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ marginLeft: -4, width: 35, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            size='small'
                        >
                            <AccountCircleIcon sx={{width:35, height:35, color: "#0088a9"}} />
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
}

export default AdminNavbar