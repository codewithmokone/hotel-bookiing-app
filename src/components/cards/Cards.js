import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../config/firebase'; // importing database from config file
import { collection, getDocs } from 'firebase/firestore'; // Firebase functions
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ViewRoom from '../ViewRoom';
import { Box, Hidden, Paper, Typography } from '@mui/material';
import { useUserAuth } from '../context/UserAuthContext';

export const Cards = () => {

    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState('')
    const [openModal, setOpenModal] = useState(false)


    const hotelRoomsRef = collection(db, "hotelRooms");
    const { dispatch } = useContext(CartContext);
    const { user } = useUserAuth();

    const navigate = useNavigate();

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
                    <Paper elevation={5}>
                        <Box
                            sx={{
                                width: { xs: 300, sm: 640, md: 640 },
                                height: { xs: 240, sm: 240, md: 250 }
                            }}
                            className=" overflow-hidden flex flex-row justify-center my-4 border bg-white mb-1 " key={id}>
                            <Box className="image-container w-[40%] h-[200px] m-[10px]">
                                <img className="w-[300px] m-[10px] h-[200px]" src={room.roomImage} alt='roomImage' />
                            </Box>
                            <Box className="w-[55%] justify-center items-center ml-6 mt-1">
                                <table className=" w-[250px]" >
                                    <tbody>
                                        <tr>
                                            <th className="mb-4"><h3 className="font-bold text-xl text-sky-600 mt-2 mb-1 mx-0 " >{room.title}</h3></th>
                                        </tr>
                                        <tr>
                                            <td><p className=" font-medium mb-1 h-[55px] w-[250px]">{room.introDescr}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-xs font-bold mb-2">Room Type: {room.roomType}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}</p></td>
                                            <td><p><FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="text-xs font-bold">Price: R {room.price}.00</p></td>
                                        </tr>
                                        <tr>
                                            <td><button className=" text-sky-600 p-1" onClick={() => handleView(room)}>View More</button></td>
                                            <td><button className=" text-sky-600 p-1" onClick={() => reserveRoom(room)}>Reserve</button></td>
                                        </tr>
                                    </tbody>
                                </table>
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
                        <Hidden smDown>
                            <Paper elevation={5}>
                                <div className=" overflow-hidden flex flex-row justify-center my-4 w-[620px] h-[240px]  m-2" key={id}>
                                    <div className="image-container w-[40%] h-[190px] m-[10px]">
                                        <img className="w-[300px] m-[10px] h-[200px]" src={room.roomImage} alt='roomImage' />
                                    </div>
                                    <div className="w-[55%] justify-center items-center ml-6 mt-2">
                                        <table className=" w-[250px] h-[100%]" >
                                            <tbody>
                                                <tr>
                                                    {/* <th className="mb-4"><h3 className="font-bold text-xl text-sky-600 mt-2 mb-1 mx-0 " >{room.hotel}</h3></th> */}
                                                </tr>
                                                <tr>
                                                    <th className="mb-4"><h6 className="font-bold text-xl mt-1 mb-1" >{room.title}</h6></th>
                                                </tr>
                                                <tr>
                                                    <td><p className=" font-medium mb-1 ">{room.introDescr}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p className="text-xs font-bold mb-2">Room Type: {room.roomType}</p></td>
                                                </tr>
                                                <tr className='flex justify-between'>
                                                    <td><p><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}</p></td>
                                                    <td><p><FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}</p></td>
                                                </tr>
                                                <tr className='flex justify-between items-center'>
                                                    <td><p className="text-xs font-bold my-1">Price: R {room.price}.00</p></td>
                                                    <td><button className=" text-sky-600 p-1 ml-50" onClick={() => handleView(room)}>View More</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Paper>
                        </Hidden>
                        <Hidden smUp>
                            <Paper
                                sx={{
                                    width: { xs: 380 },
                                    height: { xs: 200 }

                                }}

                                elevation={5}>
                                <Box className=" overflow-hidden flex flex-row justify-center my-4 h-[260px]  m-2" key={id}>
                                    <Box className="image-container w-[40%] h-[190px] m-[10px]">
                                        <img className="w-[150px] m-[10px] h-[150px]" src={room.roomImage} alt='roomImage' />
                                    </Box>
                                    <Box className="w-[55%] justify-center items-center mt-2 ml-2">
                                        <table className=" w-[250px] h-[100%]" >
                                            <tbody>
                                                <tr>
                                                    {/* <th className="mb-4"><h3 className="font-bold text-xl text-sky-600 mt-2 mb-1 mx-0 " >{room.hotel}</h3></th> */}
                                                </tr>
                                                <tr>
                                                    <th className="mb-2"><h6 className="font-bold text-xl mt-[-12px]" >{room.title}</h6></th>
                                                </tr>
                                                <tr>
                                                    <td><Typography sx={{ width: { xs: 180 }, fontSize: { xs: 14 }, marginTop: -4 }} >{room.introDescr}</Typography ></td>
                                                </tr>
                                                <tr>
                                                    <td><Typography sx={{ fontSize: { xs: 12 }, marginTop: -2 }} className="text-xs font-bold">Room Type: {room.roomType}</Typography></td>
                                                </tr>
                                                <tr className='flex items-center'>
                                                    <td><Typography sx={{ fontSize: { xs: 12 }, }}><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}</Typography></td>
                                                    <td><Typography sx={{ fontSize: { xs: 12 }, marginLeft: 6 }}><FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}</Typography></td>
                                                </tr>
                                                <tr className='flex items-center'>
                                                    <td><Typography sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, }} className="text-xs font-bold my-1">Price: R {room.price}.00</Typography></td>
                                                    <td><button className=" text-sky-600 p-1 ml-[30px]" onClick={() => handleView(room)}>View More</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Box>
                                </Box>
                            </Paper>
                        </Hidden>
                    </>


                ))
                }
                {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
            </>
        )

    }


}

export default Cards; 
