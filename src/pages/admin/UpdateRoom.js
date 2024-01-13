import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { Box } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import CustomTypography from '../../components/CustomTypography';
import CustomButton from '../../components/CustomButton';

const UpdateRoom = () => {

    const { id } = useParams(); // Get the room ID from the URL

    const navigate = useNavigate()

    // const [rooms, setRooms] = useState([]);
    const [roomImage, setRoomImage] = useState();

    const [formData, setFormData] = useState({
        hotel: '',
        title: '',
        introDescr: '',
        description: '',
        address: '',
        price: '',
        numberOfPeople: '',
        contact: '',
        numberOfRooms: '',
        roomType: '',
        bedType: ''
    });
  

    console.log(formData);

    // console.log(hotel);

    useEffect(() => {
        fetchRoomData();
    }, [id]);

    // Fetching data from firebase firestore
    const fetchRoomData = async () => {
        try {
            const roomDocRef = doc(db, 'hotelRooms', id);
            const roomDocSnapshot = await getDoc(roomDocRef);

            if (roomDocSnapshot.exists()) {
                const roomData = { id: roomDocSnapshot.id, ...roomDocSnapshot.data() };
                setFormData(roomData)
            } else {
                console.error('Room not found');
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Function for updating firebase firestore DB: "hotelRooms" with room ID.
    const updateRoom = async (e) => {
        e.preventDefault()

        try {
            const roomDocRef = doc(db, 'hotelRooms', id);
            await updateDoc(roomDocRef, formData);
            alert("Room has been updated.");
            navigate('/adminHome');
        } catch (err) {
            console.error('Error updating room:', err);
        }
    };

    return (
        <Box className='home-container min-h-screen m-auto bg-[#ececec]'
        >
            <header>
                <AdminNavbar />
            </header>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 30
                }}
            >
                <Box sx={{ marginTop: 4 }}>
                    <CustomTypography theme='heading' text="Update Room" />
                </Box>
                <form className="flex flex-col items-center justify-center">
                    <Box className="flex flex-col justify-center items-center ">
                        <Box className='w-[600px] flex flex-col justify-center items-center'>
                            <img className="image" src={formData.roomImage} alt="" />
                            <input className="w-[300px]" type="file" onChange={(e) => setRoomImage(e.target.files)} />
                        </Box>
                        <label className="text-base font-medium mx-0 my-2 mr-[30px] w-[600px]">Hotel</label>
                        <input
                            type="text"
                            placeholder=" Enter hotel..."
                            name='hotel'
                            value={formData.hotel}
                            onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2 mr-[30px] w-[600px]">Title</label>
                        <input
                            type="text"
                            name='Title'
                            placeholder=" Enter title..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            width="560px"
                        />
                        <label className=" text-base font-medium mx-0 mr-[30px] my-2.5 w-[600px]">Short Description</label>
                        <input
                            type="text"
                            name='Short Description'
                            value={formData.introDescr}
                            className='h-[40px] w-[900px]rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter description"
                            onChange={(e) => setFormData({ ...formData, introDescr: e.target.value })}
                            required
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Description</label>
                        <input
                            type="text"
                            name='Description'
                            placeholder=" Enter description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Address</label>
                        <input
                            type="text"
                            name='Address'
                            placeholder=" Enter address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Price</label>
                        <input
                            type="text"
                            name='Price'
                            placeholder=" Enter price..."
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Max People</label>
                        <input
                            type="text"
                            name='Max People'
                            placeholder=" Enter number of people"
                            value={formData.numberOfPeople}
                            onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Contact</label>
                        <input
                            type="text"
                            name='Contact'
                            placeholder=" Enter contact details..."
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Number of rooms</label>
                        <input
                            type="number"
                            name='Number of rooms'
                            placeholder=" Enter contact details..."
                            value={formData.numberOfRooms}
                            onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                            required
                            className='h-[40px]'
                        />
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]" >Room type:</label>
                        <select name='Room type:' onChange={(e) => setFormData({ ...formData, roomType: e.target.value })} value={formData.roomType} className="w-[600px] h-[40px] bg-white">
                            <option>Standard Double Room</option>
                            <option>Suite</option>
                            <option>Deluxe Room</option>
                            <option>Accessible Room</option>
                        </select>
                        <label className="text-base font-medium mx-0 my-2.5 w-[600px]">Bed type:</label>
                        <select name='Bed type:' onChange={(e) => setFormData({ ...formData, bedType: e.target.value })} value={formData.bedType} className="w-[600px] h-[40px] bg-white">
                            <option>Double Bed</option>
                            <option>2 Beds</option>
                            <option>King Bed</option>
                            <option>Queen Bed</option>
                        </select>
                    </Box>
                    <Box className="flex flex-row items-center ">
                        <CustomButton variant="contained" text="Update" onClick={updateRoom}/>
                    </Box>
                </form>
            </Box>
        </Box >
    )
}

export default UpdateRoom