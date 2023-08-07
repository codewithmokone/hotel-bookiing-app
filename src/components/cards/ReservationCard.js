import React from 'react';
import '../../styles/card.css'; // Importing css style
import { useState, useEffect } from 'react'; // React Hooks
import { db } from '../../config/firebase'; // importing database from config file
import { collection, getDocs } from 'firebase/firestore'; // Firebase functions



const ReservationCard = () => {

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


    useEffect(() => {
        getRooms();
    }, []);



    return (
        <>
            {rooms.map((room,id) => (
            <div className="border border-gray-200 w-[500px] flex justify-center" key={id}>
                <table className=" my-10 w-[300px]">
                    <th></th>
                    <tr>
                        <td><h6 className="text-lg font-semibold">Room Type:</h6></td>
                        <td>{room.roomType}</td>
                    </tr>
                    <tr>
                        <td><p className="font-semibold my-2">Check In:</p></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><p className="font-semibold my-2">Check Out:</p></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><p className="font-semibold my-2">Guest:</p></td>
                        <td>{room.numberOfPeople}</td>
                    </tr>
                    <tr>
                        <td><p className="font-semibold my-2">Amount:</p></td>
                        <td className="font-normal">{room.price}</td>
                    </tr>
                </table>
            </div>))}
        </>

    )
}

export default ReservationCard