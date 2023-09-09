import React, { useState, useEffect } from 'react';

// Components import
import NewRoomNavbar from '../../components/navbar/NewRoomNavbar';
import HeroSec from '../../components/HeroSec';
import Footer from '../../components/Footer';
import ViewModal from '../../components/modal/ViewModal';

// Firebase import
import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import EditRoom from './EditRoom';

const AdminHome = () => {

    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();
    const [openViewModal, setViewModal] = useState(false)


    const navigate = useNavigate();
    const storage = getStorage();

    const closeEdit = () => {
        setViewModal(false);
    }

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

            const desertRef = ref(storage, 'hotelImages');
            deleteObject(desertRef).then(() => {
                console.log("File deleted Succefully")
            })
        } catch (err) {
            console.log("An error occured")
        };
    }

    useEffect(() => {
        getRooms()
    }, [rooms]);

    return (
        <>
            {/* {openViewModal && <EditRoom selectedRoom={selectedRoom} handleDelete={handleDelete} closeEdit={closeEdit} />} */}
            <div className="flex flex-col justify-center items-center m-0">
                <header className='flex flex-col'>
                    <NewRoomNavbar signOut={logout} />
                    <HeroSec />
                </header>
                <main className="m-0 w-[1024px] flex flex-row justify-center h-[400px] bg-gray-300">
                    <table className="striped-table my-4 mx-8 w-[1024px] border h-[200px]">
                        <thead>
                            <tr className="border-b-2 border-t-2 border-sky-600 text-left ">
                                <th className="border">Image</th>
                                <th className="border">Hotel</th>
                                <th className="border">Title</th>
                                <th className="border">Descrip</th>
                                <th className="border">No. Of Ppl</th>
                                <th className="border">Price</th>
                                <th className="border">No. Of Rooms</th>
                                <th className="border">Room Type</th>
                                <th colSpan={2} className="">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {rooms ? (
                                rooms.map((room, i) => (
                                    <tr key={room.id} className="my-6 flx flex-row justify-evenly border">
                                        <td className="border"><img src={room.roomImage} className="w-[50px] h-[50px]"/></td>
                                        <td className="border">{room.hotel}</td>
                                        <td className="border">{room.title}</td>
                                        <td className="border">{room.description}</td>
                                        <td className="border">{room.numberOfPeople}</td>
                                        <td className="border">{room.price}</td>
                                        <td className="border">{room.numberOfRooms}</td>
                                        <td className="border">{room.roomType} </td>
                                        <td className="text-right">
                                            <button
                                                onClick={() => { handleEdit(room.id) }}
                                                className="button muted-button mr-2"
                                            >Edit
                                            </button>
                                        </td>
                                        <td className="text-left">
                                            <button
                                                onClick={() => handleDelete(room.id)}
                                                className="button muted-button"
                                            >Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>Loading...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    )
}

export default AdminHome