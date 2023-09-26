import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';

const UpdateRoom = () => {

    const { id } = useParams(); // Get the room ID from the URL

    const [rooms, setRooms] = useState([]);
    const [formData, setFormData] = useState('')
    const [imageUpload, setImageUpload] = useState();
    const [hotel, setHotel] = useState(rooms.hotel);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [contact, setContact] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bedType, setBedType] = useState('');
    const [roomImage, setRoomImage] = useState('')
    const [imageUrl, setImageUrl] = useState('');

    // const hotelRoomRef = doc(db, "hotelRooms");

    // const getRooms = async () => {

    //     try {

    //         const data = await getDoc(collection(db, "hotelRooms"));
    //         const filteredData = data.docs.map((doc) => ({
    //             ...doc.data(), id: doc.id,
    //         }));
            
    //         setRooms(filteredData);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const navigate = useNavigate()

    const closeUpdate = () => {
        navigate('/adminhome')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...rooms,
            [name]: value,
        });
    };

    // Update room  function
    const updateRoom = async (e) => {
        e.preventDefault();

        const room = {
            hotel,
            title,
            description,
            address,
            price,
            numberOfPeople,
            contact,
            numberOfRooms,
            roomType,
            bedType,
            roomImage
        }

        try {
            // Update room in collection
            await updateDoc(doc(db, "hotelRooms", id), room);
            console.log("Room updated")

        } catch (error) {
            console.log(id)
            // console.log(rooms)
            console.log("Error updating room: ", error)
        }



        // await updateDoc(hotelRoomRef, {
        //     ...room
        // })
    }

    const fetchRoomData = async () => {
        try {
            const roomDocRef = doc(db, 'hotelRooms', id);
            const roomDocSnapshot = await getDoc(roomDocRef);

            if (roomDocSnapshot.exists()) {
                const roomData = {id: roomDocSnapshot.id, ...roomDocSnapshot.data() };
                setRooms(roomData)
                setFormData(roomData)
            } else{
                console.error('Room not found');
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {

        fetchRoomData();

    }, [id]);

    return (
        <div className="w-screen bg-sky-950 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-2xl m-[30px] text-white ">Update Room</h3>
                <div>
                    <form className="flex flex-col items-center justify-center bg-slate-300" >
                        <div className="flex items-center justify-center m-auto">
                            <div className="left-side w-[900px] flex flex-col mx-10 my-10">
                                <img className="image" src={rooms.roomImage} alt="" />
                                <input className="my-0" type="file" onChange={(e) => setRoomImage(e.target.files)} />
                                <label className="text-base font-medium mx-0 my-2 mr-[30px]">Hotel</label>
                                <input
                                    type="text"
                                    placeholder=" Enter title..."
                                    name='hotel'
                                    value={formData.hotel}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2 mr-[30px]">Title</label>
                                <input
                                    type="text"
                                    placeholder=" Enter title..."
                                    value={rooms.title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Description</label>
                                <input
                                    type="text"
                                    placeholder=" Enter description"
                                    value={rooms.description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Address</label>
                                <input
                                    type="text"
                                    placeholder=" Enter address"
                                    value={rooms.address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Price</label>
                                <input
                                    type="text"
                                    placeholder=" Enter price..."
                                    value={rooms.price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Max People</label>
                                <input
                                    type="text"
                                    placeholder=" Enter number of people"
                                    value={rooms.numberOfPeople}
                                    onChange={(e) => setNumberOfPeople(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Contact</label>
                                <input
                                    type="text"
                                    placeholder=" Enter contact details..."
                                    value={rooms.contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Number of rooms</label>
                                <input
                                    type="number"
                                    placeholder=" Enter contact details..."
                                    value={rooms.numberOfRooms}
                                    onChange={(e) => setNumberOfRooms(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Room type:</label>
                                <select onChange={(e) => setRoomType(e.target.value)} value={rooms.roomType} className="w-[360px] h-[30px]">
                                    <option>Standard Double Room</option>
                                    <option>Suite</option>
                                    <option>Deluxe Room</option>
                                    <option>Accessible Room</option>
                                </select>
                                <label className="text-base font-medium mx-0 my-2.5">Bed type:</label>
                                <select onChange={(e) => setBedType(e.target.value)} value={rooms.bedType} className="w-[360px] h-[30px]">
                                    <option>Double Bed</option>
                                    <option>2 Beds</option>
                                    <option>King Bed</option>
                                    <option>Queen Bed</option>
                                </select>

                            </div>
                        </div>
                        <div className="flex flex-row justify-evenly items-start w-[450px] ">
                            <button className=" font-bold rounded-md bg-sky-950 w-[100px] text-white mx-0 my-10" onClick={updateRoom}>Update</button>
                            <button className=" font-bold rounded-md bg-sky-950 w-[100px] text-white mx-0 my-10" onClick={closeUpdate}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default UpdateRoom