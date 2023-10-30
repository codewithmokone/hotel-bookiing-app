import React, { useContext, useState, useEffect } from 'react';
import { db, storage } from '../../config/firebase'; // importing database from config file
import { collection, getDocs } from 'firebase/firestore'; // Firebase functions
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import ViewRoom from '../ViewRoom';

export const Cards = () => {

    const hotelRoomsRef = collection(db, "hotelRooms");

    const [rooms, setRooms] = useState([]);
    const [data, setData] = useState('')
    const [roomImage, setRoomImage] = useState('');
    const [rating, setRating] = useState(null);
    const [openModal, setOpenModal] = useState(false)

    const navigate = useNavigate();

    // const data = useContext(CartContext);
   
    const { dispatch } = useContext(CartContext);

    const handleNav = () => {
        navigate("/roomview")
    }
   
    const handleView = (room) => {
        try {
            let selectedRoom = room;
            setData(selectedRoom);
        }catch (err){
            console.log(err)
        }
        setOpenModal(true)
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

    return (
        <>
            {rooms.map((room, id) => (
                <div className=" overflow-hidden flex flex-row justify-center my-2 border w-[640px] h-[260px] shadow-sm bg-white shadow-black m-2 mb-1 border-white" key={id}>
                    <div className="image-container w-[40%] h-[200px] m-[10px]">
                        <img className="w-[300px] m-[10px] h-[200px]" src={room.roomImage} alt='roomImage' />
                    </div>
                    <div className="w-[55%] justify-center items-center ml-6 mt-1">
                        <table className=" w-[250px]" >
                            <tbody>
                            <tr>
                                <th className="mb-4"><h3 className="font-bold text-xl text-sky-600 mt-2 mb-1 mx-0 " >{room.hotel}</h3></th>
                            </tr>
                            <tr>
                                <th className="mb-4"><h6 className="font-bold text-xl mt-1 mb-1" >{room.title}</h6></th>
                            </tr>
                            <tr>
                                <td><p className=" font-medium mb-1 ">{room.description}</p></td>
                            </tr>
                            <tr>
                                <td><p className="text-xs font-bold mb-2">Room Type: {room.roomType}</p></td>
                            </tr>
                            <tr>
                                <td><p><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}</p></td>
                                <td><p><FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}</p></td>
                            </tr>
                            <tr>
                                <td><p className="text-xs font-bold my-1">Price: R {room.price}.00</p></td>
                            </tr>
                            <tr>
                                <td><button className=" text-sky-600 border p-1" onClick={() => handleView(room)}>View More</button></td>
                                <td><button className=" text-sky-600 border p-1" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: room.id, room }) }}>Add</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))
            }
            {openModal && <ViewRoom data={data} setOpenModal={setOpenModal} />}
        </>
    )
}

export default Cards; 
