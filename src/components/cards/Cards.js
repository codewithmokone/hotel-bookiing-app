import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../config/firebase'; // importing database from config file
import { collection, getDocs } from 'firebase/firestore'; // Firebase functions
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ViewRoom from '../ViewRoom';
import { Box, Paper, Typography } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';

export const Cards = () => {

    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState('')
    const [openModal, setOpenModal] = useState(false)


    const hotelRoomsRef = collection(db, "hotelRooms");
    const { dispatch } = useContext(CartContext);
    const { user } = useUserAuth();


    // Handles viewing the room details
    const handleView = (room) => {
        try {
            let selectedRoom = room;
            setData(selectedRoom);
        } catch (err) {
            console.log(err)
        }
        setOpenModal(true)
    }

    // Handles reserve room function
    const reserveRoom = (room) => {

        dispatch({ type: 'ADD_TO_CART', id: room.id, room })
        alert("room added to bookings")
    }

    // Handles fetching the rooms from firestore 
    const getRooms = async () => {

        try {
            const data = await getDocs(hotelRoomsRef);

            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id,
            }));
            setRooms(filteredData);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRooms();
    }, []);

    if (user) {
        return (
            <>
                {rooms.map((room, id) => (
                    <Paper sx={{ marginTop: 2 }} elevation={5}>
                        <Box
                            sx={{
                                width: { xs: 380, sm: 640, md: 640 },
                                height: { xs: 180, sm: 180, md: 180 }
                            }}
                            className=" overflow-hidden flex flex-row justify-center bg-white mb-1 " key={id}
                        >
                            {/* Image section */}
                            <Box
                                sx={{

                                }}
                                className=" w-[40%] h-full">
                                <img className="w-[100%] h-full" src={room.roomImage} alt='roomImage' />
                            </Box>
                            {/* Details section */}
                            <Box className="w-[56%] justify-center items-center ml-6 mt-1">
                                <Box>
                                    <Box>
                                        <Typography
                                            sx={{ fontSize: { xs: 16 }, fontWeight: 600, color: "#0088a9" }}
                                            variant="h6"
                                            component="h2"
                                            className=" text-sky-60"
                                        >{room.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12 },
                                                marginTop: { xs: 1 },
                                            }}
                                        >{room.introDescr}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12 },
                                                marginTop: { xs: 1 },
                                            }}
                                        >Room Type: {room.roomType}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12 },
                                                marginTop: { xs: 1 },
                                            }}
                                        ><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12 },
                                                marginTop: { xs: 1 },
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: { xs: 12 },
                                                marginTop: { xs: 1 },
                                            }}
                                        >Price: R {room.price}.00
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: { xs: 240 }, display: 'flex', justifyContent: 'space-between' }}>
                                        <button className=" text-sky-600 p-1" onClick={() => handleView(room)}>View More</button>
                                        <button className=" text-sky-600 p-1 mr-[40px]" onClick={() => reserveRoom(room)}>Reserve</button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ))}
                {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
            </>
        )
    } else {
        return (
            <>
                {rooms.map((room, id) => (
                    <>
                        <Paper sx={{ marginTop: 2 }} elevation={5}>
                            <Box
                                sx={{
                                    width: { xs: 380, sm: 640, md: 640 },
                                    height: { xs: 180, sm: 180, md: 180 }
                                }}
                                className="flex flex-row justify-center bg-white " key={id}
                            >
                                {/* Image section */}
                                <Box
                                    className="w-[40%] h-full">
                                    <img className="w-[100%] h-full" src={room.roomImage} alt='roomImage' />
                                </Box>
                                {/* Details section */}
                                <Box className="w-[56%] justify-center items-center ml-2 mt-1">
                                    <Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 14, sm: 16, md: 16 },
                                                    fontWeight: 600,
                                                    color: "#0088a9"
                                                }}
                                                variant="h6"
                                                component="h2"
                                                className=" text-sky-60"
                                            >{room.title}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 12.5, sm: 14, md: 14 },
                                                    marginTop: { xs: 1, md: 0.5 },
                                                }}
                                            >{room.introDescr}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 12.5, sm: 14, md: 14 },
                                                    marginTop: { xs: 1, md: 0.5 },
                                                }}
                                            >Room Type: {room.roomType}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', width: { xs: 195, sm: 280, md: 280 }, justifyContent: 'space-between', marginLeft: { sm: -0.1, md: -0.1 } }}>
                                            <Typography
                                                sx={{ fontSize: { xs: 12.5, sm: 14, md: 14 }, marginTop: { xs: 1, md: 0.5 }, }}
                                            ><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 12.5, sm: 14, md: 14 },
                                                    marginTop: { xs: 1, sm: 0.5, md: 0.5 },
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {/* <Typography sx={{ fontSize: { xs: 12,md:14 }, marginTop: { xs: 1 }}}>Price: R {room.price}.00</Typography> */}
                                        </Box>
                                        <Box sx={{ width: { xs: 200, sm: 300, md: 300 }, display: 'flex', justifyContent: 'space-between', marginLeft: { sm: -0.1, md: -0.1 } }}>
                                            <Typography sx={{ fontSize: { xs: 12.5, sm: 14, md: 14 }, marginTop: { xs: 1 } }}>Price: R {room.price}.00</Typography>
                                            <button className=" text-sky-600 p-1" onClick={() => handleView(room)}>View More</button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </>
                ))
                }
                {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
            </>
        )

    }


}

export default Cards; 
