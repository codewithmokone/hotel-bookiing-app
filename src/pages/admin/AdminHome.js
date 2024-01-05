import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import AdminNavbar from '../../components/navbar/AdminNavbar';
import CustomTypography from '../../components/CustomTypography';

const AdminHome = () => {

    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();

    const navigate = useNavigate();
    const storage = getStorage();

    // handles getting data from firestore
    const getRooms = async () => {
        const querySnapshot = await getDocs(collection(db, "hotelRooms"));
        const rooms = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setRooms(rooms);
    }

    // Handles the edit function
    const handleEdit = id => {
        const [room] = rooms.filter(room => room.id === id);
        setSelectedRoom(room);
        navigate(`/editroom/${id}`);
    };

    // handles deleting a room
    const handleDelete = async (id) => {

        try {
            const hotelRooms = doc(db, "hotelRooms", id);
            await deleteDoc(hotelRooms);

            const roomIndex = rooms.findIndex(room => room.id === id);
            if (roomIndex !== -1) {
                const updatedRooms = [...rooms];
                updatedRooms.splice(roomIndex, 1);
                setRooms(updatedRooms);
            }

            const desertRef = ref(storage, 'hotelImages/' + id);
            await deleteObject(desertRef);
            console.log("File deleted Succefully")
        } catch (err) {
            console.log("An error occured")
        };
    }

    useEffect(() => {
        getRooms()
    }, []);

    return (
        < Box
            sx={{
                width: { sm: 700, md: '100vw' },
                margin: 'auto'
            }}
            className="bg-[#ececec] min-h-screen"
        >
            <header className=" block h-auto">
                <AdminNavbar />
            </header>
            <main className=" flex flex-col justify-center items-center ml-56 h-auto bg-[#ececec] w-100vw">
                <Box className='flex justify-center items-center'>
                    <CustomTypography variant='h6' component="h6" text="List of rooms" />
                </Box>
                <Box className='flex flex-col m-auto mb-[60px]'>
                    {rooms ? (
                        rooms.map((room, i) => (
                            <Card elevation={5} key={i}
                                sx={{
                                    width: 800,
                                    height: 100,
                                    marginTop: 3,
                                    marginLeft: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <CardMedia
                                    sx={{ height: 100, width: "100%" }}
                                    image={room.roomImage}
                                    title={room.title}
                                />
                                <CardContent sx={{ width: '150%', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ width: '100%', borderBottom: 1, fontWeight: 700, marginTop: -1 }} gutterBottom variant="h6" component="Box">{room.title}</Typography>
                                    <Typography sx={{ width: '100%', marginBottom: 1 }} variant="body2" color="text.secondary">{room.introDescr}</Typography>
                                </CardContent>
                                <CardContent sx={{ width: '50%' }}>
                                    <Typography sx={{ width: '100%', fontWeight: 800 }} variant="body2" color="text.secondary">R {room.price}.00</Typography>
                                </CardContent>
                                <CardActions sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button label="Edit" onClick={() => { handleEdit(room.id) }}>Edit</Button>
                                    <Button label="Delete" onClick={() => handleDelete(room.id)}>Delete</Button>
                                </CardActions>
                            </Card>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Loading...</td>
                        </tr>
                    )}
                </Box>
            </main>
        </Box >
    )
}

export default AdminHome