import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';



const EditRoom = ({ closeEdit, selectedRoom }) => {

    const [imageUpload, setImageUpload] = useState();
    const [hotel, setHotel] = useState(selectedRoom.hotel);
    const [title, setTitle] = useState(selectedRoom.title);
    const [description, setDescription] = useState(selectedRoom.description);
    const [address, setAddress] = useState(selectedRoom.address);
    const [price, setPrice] = useState(selectedRoom.price);
    const [numberOfPeople, setNumberOfPeople] = useState(selectedRoom.numberOfPeople);
    const [contact, setContact] = useState(selectedRoom.contact);
    const [numberOfRooms, setNumberOfRooms] = useState(selectedRoom.numberOfRooms);
    const [roomType, setRoomType] = useState(selectedRoom.roomType);
    const [bedType, setBedType] = useState(selectedRoom.bedType);
    const [roomImage, setRoomImage] = useState(selectedRoom.roomImage)
    const [imageUrl, setImageUrl] = useState(selectedRoom.imageUrl);
    // const [] = useState(selectedRoom.);

    // View and delete room section
    const [rooms, setRooms] = useState([]);

    // const hotelRoomRef = doc(db, "hotelRooms");

    const getRooms = async () => {

        try {

            const data = await getDoc(collection(db, "hotelRooms"));
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), id: doc.id,
            }));
            
            setRooms(filteredData);
        } catch (err) {
            console.error(err);
        }
        
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
            await updateDoc(doc(db, "hotelRooms", selectedRoom.id), room);
            console.log("Room updated")

        } catch (error) {
            console.log(selectedRoom.id)
            // console.log(rooms)
            console.log("Error updating room: ", error)
        }



        // await updateDoc(hotelRoomRef, {
        //     ...room
        // })
    }

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <div className="w-screen h-screen bg-sky-950 fixed flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-2xl m-[30px] text-white ">Add New Room</h3>
                <div>
                    <form className="flex flex-col items-center justify-center bg-slate-300" >
                        <div className="flex flex-row items-center justify-center m-auto">
                            <div className="left-side w-[450px] flex flex-col mx-10 my-10">
                                <img className="image" src={roomImage} alt="" />
                                <input className="my-0" type="file" onChange={(e) => setRoomImage(e.target.files)} />
                                <label className="text-base font-medium mx-0 my-2 mr-[30px]">Hotel</label>
                                <input
                                    type="text"
                                    placeholder=" Enter title..."
                                    value={hotel}
                                    onChange={(e) => setHotel(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2 mr-[30px]">Title</label>
                                <input
                                    type="text"
                                    placeholder=" Enter title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Description</label>
                                <input
                                    type="text"
                                    placeholder=" Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Address</label>
                                <input
                                    type="text"
                                    placeholder=" Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Price</label>
                                <input
                                    type="text"
                                    placeholder=" Enter price..."
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Max People</label>
                                <input
                                    type="text"
                                    placeholder=" Enter number of people"
                                    value={numberOfPeople}
                                    onChange={(e) => setNumberOfPeople(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Contact</label>
                                <input
                                    type="text"
                                    placeholder=" Enter contact details..."
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Number of rooms</label>
                                <input
                                    type="number"
                                    placeholder=" Enter contact details..."
                                    value={numberOfRooms}
                                    onChange={(e) => setNumberOfRooms(e.target.value)}
                                    required
                                />
                                <label className="text-base font-medium mx-0 my-2.5">Room type:</label>
                                <select onChange={(e) => setRoomType(e.target.value)} value={roomType} className="w-[360px] h-[30px]">
                                    <option>Standard Double Room</option>
                                    <option>Suite</option>
                                    <option>Deluxe Room</option>
                                    <option>Accessible Room</option>
                                </select>
                                <label className="text-base font-medium mx-0 my-2.5">Bed type:</label>
                                <select onChange={(e) => setBedType(e.target.value)} value={bedType} className="w-[360px] h-[30px]">
                                    <option>Double Bed</option>
                                    <option>2 Beds</option>
                                    <option>King Bed</option>
                                    <option>Queen Bed</option>
                                </select>

                            </div>
                        </div>
                        <div className="flex flex-row justify-evenly items-start w-[450px] ">
                            <button className=" font-bold rounded-md bg-sky-950 w-[100px] text-white mx-0 my-10" onClick={updateRoom}>Update</button>
                            <button className=" font-bold rounded-md bg-sky-950 w-[100px] text-white mx-0 my-10" onClick={closeEdit}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default EditRoom