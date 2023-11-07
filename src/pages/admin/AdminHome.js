import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Material ui components
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

// Firebase imports
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";

// Components imports
import HeroSec from '../../components/HeroSec';
import Footer from '../../components/Footer';
import AdminNavbar from '../../components/navbar/AdminNavbar';

const AdminHome = () => {

    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();
    const [openViewModal, setViewModal] = useState(false)


    const navigate = useNavigate();
    const storage = getStorage();

    const closeEdit = () => {
        setViewModal(false);
    }

    // Handles login out the user
    const logout = async () => {
        try {
            await signOut(auth)
            alert('signed Out');
        } catch (err) {
            console.error(err);
        }
    }

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
        <>
            {/* {openViewModal && <EditRoom selectedRoom={selectedRoom} handleDelete={handleDelete} closeEdit={closeEdit} />} */}
            <div className="home-container bg-[#F5F5F5] block h-auto m-auto">
                <header className='flex flex-col'>
                    <AdminNavbar />
                    <HeroSec />
                </header>
                <main className="w-[1024px] flex flex-col justify-center m-auto min-h-[50vh] bg-white">
                    <div className='flex justify-center items-center'>
                        <h5 className='mt-6 font-bold text-[#0088a9]'>List of rooms</h5>
                    </div>
                    <div className='flex flex-col m-auto mb-[60px]'>
                        {rooms ? (
                            rooms.map((room, i) => (
                                <Card elevation={5} key={i} sx={{ width: 800, height: 100, marginTop: 3, marginLeft: 2, display: 'flex', flexDirection: 'row' }}>
                                    <CardMedia
                                        sx={{ height: 100, width: "100%" }}
                                        image={room.roomImage}
                                        title={room.title}
                                    />
                                    <CardContent sx={{ width: '150%', height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography sx={{ width: '100%', borderBottom: 1, fontWeight: 700, marginTop: -1 }} gutterBottom variant="h6" component="div">{room.title}</Typography>
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
                    </div>
                </main>
                <footer className='m-auto'>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default AdminHome