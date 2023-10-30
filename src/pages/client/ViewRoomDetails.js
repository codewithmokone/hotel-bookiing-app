import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../components/context/CartContext';
import { faBed, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewRoomDetails = () => {
  const [rooms, setRooms] = useState([]);
  const hotelRoomsRef = collection(db, "hotelRooms");
  const [rating, setRating] = useState(null);

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
              <td> {wifi && <li>WiFi</li>}</td>
              <td> {tv && <li>TV</li>}</td>
              <td> {airConditioning && <li>Air Conditioning</li>}</td>
            </tr>
            <tr>
              <td><button className=" text-sky-600 border p-1" onClick={nav}>Close</button></td>
              <td><button className=" text-sky-600 border p-1" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: rooms.id, rooms }) }}>Reserve</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ViewRoomDetails