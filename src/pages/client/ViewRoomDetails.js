import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../components/context/CartContext';
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewRoomDetails = () => {

  const hotelRoomsRef = collection(db, "hotelRooms");
  const [rooms, setRooms] = useState([]);
  const [rating, setRating] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const navigate = useNavigate();

  // const data = useContext(CartContext);
  // console.log(data)

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

  // Function to check room availability
  const checkAvailability = () => {
    // Simulated availability data
    const availabilityData = rooms.availability; // Replace with your actual data structure

    // Check if check-in and check-out dates are valid
    if (checkInDate && checkOutDate) {
      // Check if the room is available for the selected dates
      const isRoomAvailable = availabilityData.some((availability) => {
        const start = new Date(availability.startDate);
        const end = new Date(availability.endDate);
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        return checkIn >= start && checkOut <= end;
      });

      setIsAvailable(isRoomAvailable);

      if (isRoomAvailable) {
        alert('Room is available for the selected dates!');
      } else {
        alert('Room is not available for the selected dates.');
      }
    } else {
      alert('Please select valid check-in and check-out dates.');
    }
  };

  const nav = () => {
    navigate("/")
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className=" h-screen w-screen flex items-center">
      <div className="m-auto flex flex-col items-center justify-center my-2 border border-gray-300 w-[960px] h-[600px]" key={rooms.id}>
        <div className="image-container w-[40%] h-[200px] m-[10px]">
          <img className="w-[800px] m-[10px] h-[200px]" src={rooms.roomImage} alt='roomImage' />

          <table className=" w-[250px]" >
            <th className="mb-4"><h3 className="font-bold text-xl mt-2 mb-3 mx-0 " >{rooms.title}</h3></th>
            <tr>
              <td><p className=" font-medium mb-2 ">{rooms.description}</p></td>
            </tr>
            <tr>
              <td><p className="text-xs font-bold mb-4">Room Type: {rooms.roomType}</p></td>
            </tr>
            <tr>
              <td><p><FontAwesomeIcon icon={faBed} className=" text-lg font-bold" /> : {rooms.bedType}</p></td>

            </tr>
            <tr>
              <td><p><FontAwesomeIcon icon={faUserGroup} className=" text-sm font-medium" /> : {rooms.numberOfPeople}</p></td>
            </tr>
            <tr>
              <td><p className="text-xs font-bold my-1">Price: R {rooms.price}.00</p></td>
            </tr>
            <tr>
              <td><p>Room Amenities:</p></td>
              <td> {rooms.wifi && <li>WiFi</li>}</td>
              <td> {rooms.tv && <li>TV</li>}</td>
              <td> {rooms.airConditioning && <li>Air Conditioning</li>}</td>
            </tr>
            <tr>
              <td><button className='bg-[#0088a9] text-white w-[140px] h-[25px] rounded ml-6' onClick={checkAvailability}>Check Availability</button></td>
              <td><button className=" text-sky-600 border p-1" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: rooms.id, rooms }) }}>Reserve</button></td>
              <td><button className=" text-sky-600 border p-1" onClick={nav}>Close</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewRoomDetails