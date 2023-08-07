import React from 'react';
import '../../styles/card.css'; // Importing css style
import { useState, useEffect } from 'react'; // React Hooks
import { db } from '../../config/firebase'; // importing database from config file
import { collection, getDocs, deleteDoc,doc } from 'firebase/firestore'; // Firebase functions
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const AdminCards = ({ openViewModal }) => {

    const [rooms, setRooms] = useState([]);
    const hotelRoomsRef = collection(db, "hotelRooms");

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

    const deleteRoom = async (id) => {
        const hotelRooms = doc(db, "hotelRooms", id);
        await deleteDoc(hotelRooms);
    }


    useEffect(() => {
        getRooms();
    }, []);

    return (
        <>
            {rooms.map((room, id) => (
                <div className="card-item flex flex-row justify-center my-5" key={id}>
                    <div className="image-container">
                        <img src={room.roomImage} alt='roomImage' />
                    </div>
                    <div className="Details">
                        <div className="card-body">
                            <h3 className=" font-bold text-xl mt-6 mb-3 mx-0 " >{room.title}</h3>
                        </div>
                        <div className="card-body">
                            <p className=" font-medium mb-5 ">{room.description}</p>
                        </div>
                        <div className="card-body">
                            <p className="text-xs font-bold mt-3">Room Type: {room.roomType}</p>
                        </div>
                        <div className="card-body">
                            <ul className=" flex flex-row justify-between w-56 mt-2 mb-4 ">
                                <li className=" text-xs font-bold mt-3 "><FontAwesomeIcon icon={faBed} className=" text-lg" /> : {room.bedType}</li>
                                <li className=" text-xs font-bold mt-3 "><FontAwesomeIcon icon={faUserGroup} className=" text-sm" /> : {room.numberOfPeople}</li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <p className="text-xs font-bold mt-3">Price: R {room.price}.00</p>
                        </div>

                        <div className=" ml-20 mr-20 mt-4 flex justify-evenly ">
                            <button className="text-orange-500" onClick={() => {openViewModal(true)}}>
                                View Room
                            </button>
                            <button className=" text-orange-500" onClick={() => {deleteRoom(room.id)}}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AdminCards; 
