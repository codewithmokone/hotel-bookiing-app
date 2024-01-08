import React from 'react'
import '../../styles/navbar.css'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function ClientDrawerNavBar({signout}) {

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, backgroundColor: "#24252A", height: '100vh' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ width: 150, display: 'flex', flexDirection: 'column', marginLeft: 2, marginTop: 2 }}>
                <Link to="/" className="links m-2">Home</Link>
                <Link to="/gallery" className="links m-2">Gallery</Link>
                <Link to="/rooms" className="links m-2">Rooms</Link>
                <Link to="/bookings" className="links m-2">Bookings</Link>
                <Link to="/contactus" className="links m-2">Contact Us</Link>
                <Divider SX={{ backgroundColor: "#gray", }} />
            </Box>
            <Divider SX={{ backgroundColor: "#gray", }} />

            <Box sx={{ width: 150, display: 'flex', flexDirection: 'column', marginLeft: 2 }} >
                <Link to="/clientprofile" className='links m-2' >Profile</Link>
                <Link onClick={signout} className="contactus m-2">Sign Out</Link>
                {/* <button onClick={signOut}>Sign Out</button> */}
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                backgroundColor: "#24252A",
                height: 40,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><MenuIcon sx={{fontSize:35}}/></Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </Box>
    )
}

export default ClientDrawerNavBar
