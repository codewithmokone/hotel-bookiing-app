import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // React Hooks
import { db } from '../../config/firebase'; // importing database from config file
import { collection, getDocs } from 'firebase/firestore'; // Firebase functions
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';



export const SearchCard = ({ filterResults }) => {

    const hotelRoomsRef = collection(db, "hotelRooms");
    const [rooms, setRooms] = useState(filterResults);
    const [rating, setRating] = useState(null);

    const navigate = useNavigate();

    const { dispatch } = useContext(CartContext);

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

    const nav = () => {
        navigate("/viewroomdetails")
    }

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <>
            {filterResults.map((room, id) => (
                <Paper>
                    <div className=" overflow-hidden flex flex-row justify-center my-2 border border-gray-300 w-[650px] h-[260px]" key={id}>
                        <div className="image-container w-[40%] h-[200px] m-[10px]">
                            <img className="w-[300px] m-[10px] h-[200px]" src={room.roomImage} alt='roomImage' />
                        </div>
                        <div className="w-[55%] justify-center items-center ml-6 mt-1">
                            <table className=" w-[250px]" >
                                <tr>
                                    <th className="mb-4"><h3 className="font-bold text-xl text-sky-600 mt-2 mb-1 mx-0 " >{room.hotel}</h3></th>
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
                                <tr>
                                    <td><p><FontAwesomeIcon icon={faBed} className=" text-sky-600 text-lg font-bold" /> : {room.bedType}</p></td>
                                    <td><p><FontAwesomeIcon icon={faUserGroup} className=" text-sky-600 text-sm font-medium" /> : {room.numberOfPeople}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="text-xs font-bold my-1">Price: R {room.price}.00</p></td>
                                </tr>
                                <tr>
                                    <td><button className=" text-sky-600 border p-1" onClick={nav}>View More</button></td>
                                    <td><button className=" text-sky-600 border p-1" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: room.id, room }) }}>Add</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </Paper>
            ))
            }
        </>
    )
}

export default SearchCard; 
