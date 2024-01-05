import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, Typography } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import CustomTypography from '../../components/CustomTypography';
import CustomButton from '../../components/CustomButton';
import InputComponent from '../../components/InputComponent';

const UpdateRoom = () => {

    const { id } = useParams(); // Get the room ID from the URL

    const [rooms, setRooms] = useState([]);
    const [formData, setFormData] = useState('')
    const [hotel, setHotel] = useState(rooms.hotel);
    const [title, setTitle] = useState('');
    const [introDescr, setIntroDescr] = useState('')
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [contact, setContact] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bedType, setBedType] = useState('');
    const [roomImage, setRoomImage] = useState('')

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

    // Fetching data from firebase firestore
    const fetchRoomData = async () => {
        try {
            const roomDocRef = doc(db, 'hotelRooms', id);
            const roomDocSnapshot = await getDoc(roomDocRef);

            if (roomDocSnapshot.exists()) {
                const roomData = { id: roomDocSnapshot.id, ...roomDocSnapshot.data() };
                setRooms(roomData)
                setFormData(roomData)
            } else {
                console.error('Room not found');
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchRoomData();
    }, [id]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'whitesmoke',
                margin: 'auto'
            }}
        >
            <Box>
                <header>
                    <AdminNavbar />
                </header>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 60
                }}
            // className="m-auto"
            >
                <CustomTypography variant='h6' component="h6" text="Update Room" color='#0088a9' />
                <form className="flex flex-col items-center justify-center" onSubmit={updateRoom}>
                    <Box className="flex flex-col justify-center items-center ">
                        <Box className='w-[600px] flex flex-col justify-center items-center'>
                            <img className="image" src={rooms.roomImage} alt="" />
                            <input className="w-[300px]" type="file" onChange={(e) => setRoomImage(e.target.files)} />
                        </Box>
                        {/* <CustomTypography variant='subtitle2' component="subtitle2" text="Update Room" /> */}
                        <label className="text-base font-medium mx-0 my-2 mr-[30px] w-[600px]">Hotel</label>
                        <input
                            type="text"
                            placeholder=" Enter title..."
                            name='hotel'
                            value={formData.hotel}
                            onChange={handleChange}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2 mr-[30px] w-[600px]">Title</label>
                        <input
                            type="text"
                            placeholder=" Enter title..."
                            value={rooms.title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            width="560px"
                        />
                        <label className=" text-base font-medium mx-0 mr-[30px] my-2.5 w-[600px]">Short Description</label>
                        <input
                            type="text"
                            className='h-[40px] w-[900px]rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter description"
                            onChange={(e) => setIntroDescr(e.target.value)}
                            required
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Description</label>
                        <input
                            type="text"
                            placeholder=" Enter description"
                            value={rooms.description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Address</label>
                        <input
                            type="text"
                            placeholder=" Enter address"
                            value={rooms.address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Price</label>
                        <input
                            type="text"
                            placeholder=" Enter price..."
                            value={rooms.price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Max People</label>
                        <input
                            type="text"
                            placeholder=" Enter number of people"
                            value={rooms.numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Contact</label>
                        <input
                            type="text"
                            placeholder=" Enter contact details..."
                            value={rooms.contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Number of rooms</label>
                        <input
                            type="number"
                            placeholder=" Enter contact details..."
                            value={rooms.numberOfRooms}
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]" >Room type:</label>
                        <select onChange={(e) => setRoomType(e.target.value)} value={rooms.roomType} className="w-[600px] h-[40px]">
                            <option>Standard Double Room</option>
                            <option>Suite</option>
                            <option>Deluxe Room</option>
                            <option>Accessible Room</option>
                        </select>
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Bed type:</label>
                        <select onChange={(e) => setBedType(e.target.value)} value={rooms.bedType} className="w-[600px] h-[40px]">
                            <option>Double Bed</option>
                            <option>2 Beds</option>
                            <option>King Bed</option>
                            <option>Queen Bed</option>
                        </select>
                    </Box>
                    <Box className="flex flex-row items-center ">
                        <CustomButton variant="contained" type='submit'>Update</CustomButton>
                    </Box>
                </form>
            </Box>
        </Box >
    )
}

export default UpdateRoom