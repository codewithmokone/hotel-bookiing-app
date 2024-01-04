import React, { useState } from 'react';
import '../../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useUserAuth } from '../context/UserAuthContext';
import { Avatar, Box, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const drawerWidth = 180;

function AdminNavbar() {

  const [anchorEl, setAnchorEl] = useState(null);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const { user } = useUserAuth();

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
    <Box sx={{ width: { sm: 700, md: '100vw' }, backgroundColor: '#24252A' }}>
      <Paper sx={{ backgroundColor: "#24252A" }}>
        {/* <CssBaseline /> */}
        <AppBar
          position="sticky"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: 'white' }}
        >
          <Toolbar sx={{ width: { sm: 700, md: '100vw' }, display: 'flex', justifyContent: 'space-between', width: 1180 }}>
            <Typography sx={{ fontSize: 18 }} variant="h2" className='text-black' noWrap component="div">
              Hi, {user.displayName}.
            </Typography>
            <Typography variant="h2" className='text-black' noWrap component="div">
              <Avatar alt="Remy Sharp" src={user.photoURL} />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            backgroundColor: "#24252A"
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Logo Section */}
          <Toolbar sx={{ backgroundColor: "#24252A", width: 179 }}>
            <Typography sx={{ fontSize: 12.3, fontWeight: 600 }} noWrap component="div">
              <span className='text-[#0088a9] '>HOTEL <FontAwesomeIcon icon={faBellConcierge} /> BOOKINGS</span>
            </Typography>
          </Toolbar>
          {/* <Divider sx={{ backgroundColor: "gray" }} /> */}
          {/* Links Section */}
          <List sx={{ backgroundColor: "#24252A", height: '100vh' }}>
            <Box
              sx={{
                width: 150,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 2,
              }}
            >
              <Box sx={{ marginLeft: -0.5 }}>
                <Link to="/adminhome" className="adminHome focus:text-[#0088A9] m-2">
                  <HomeIcon sx={{ color: 'white', marginRight: 1 }}  className="hover:text-[#0088A9]"/>
                  Home
                </Link>
              </Box>
              <Box sx={{ display: 'flex', marginLeft: -0.5 }}>
                <Link to="/newroom" className="links m-2">
                  <AddHomeIcon sx={{ color: 'white', marginRight: 1 }} className="hover:text-[#0088A9]" />
                  Add Room
                </Link>
              </Box>
              <Box sx={{ display: 'flex', marginLeft: -0.5, }}>
                <Link to="/bookedrooms" className="links m-2">
                  <MenuBookIcon sx={{ color: 'white', marginRight: 1 }} className="hover:text-[#0088A9]" />
                  Bookings
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                width: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                marginTop: 40,
              }}
            >
              <Divider sx={{ backgroundColor: "gray", marginBottom: 2 }} />
              <Box sx={{ display: 'flex',marginLeft: -0.5 }} className='active'>
                <Link to="/profile" className='links m-2' >
                  <AccountCircleIcon sx={{ color: 'white', marginRight: 1 }} className="hover:text-[#0088A9]" ></AccountCircleIcon>
                  Profile
                </Link>
              </Box>
              <Box sx={{ display: 'flex',marginLeft: -0.5 }} className="hover:text-[#0088A9]">
                <Link to="/login" className="contactus links m-2" onClick={signOut}>
                  <ExitToAppIcon sx={{ color: 'white', marginRight: 1 }} className="hover:text-[#0088A9]" />
                  Sign Out
                </Link>
              </Box>
            </Box>
          </List>
        </Drawer>
      </Paper>
    </Box>
  )
}

export default AdminNavbar