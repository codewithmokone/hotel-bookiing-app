import React, { useState } from 'react';
import '../../styles/adminhome.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import InputComponent from '../../components/InputComponent';
import CustomTypography from '../../components/CustomTypography';
import CustomButton from '../../components/CustomButton';


export const AdminHome = () => {

    // const [room, setRoom] = useState('');;
    const [hotel, setHotel] = useState('')
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [introDescr, setIntroDescr] = useState('')
    const [description, setDescription] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [roomType, setRoomType] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [contact, setContact] = useState('');
    const [bedType, setBedType] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState([]);
    const [wifi, setWifi] = useState(false);
    const [tv, setTv] = useState(false);
    const [airConditioning, setAirConditioning] = useState(false);

    const navigate = useNavigate()

    // handle for adding a room
    const handleAdd = (async (e) => {
        e.preventDefault()

        const imageRef = ref(storage, `hotelImages/${file[0] + v4()}`)
        try {
            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
            console.log('Image Uploaded');

            const docRef = await addDoc(collection(db, "hotelRooms"), {
                hotel: hotel,
                title: title,
                introDescr: introDescr,
                description: description,
                address: address,
                contact: contact,
                price: price,
                numberOfPeople: numberOfPeople,
                numberOfRooms: numberOfRooms,
                roomType: roomType,
                bedType: bedType,
                amenities: {
                    wifi,
                    tv,
                    airConditioning,
                },
                roomImage: url
            });

            setHotel('')
            setTitle('')
            setDescription('')
            setAddress('')
            setContact('')
            setPrice('')
            setNumberOfPeople('')
            setNumberOfRooms('')
            setRoomType('')
            setBedType('')
            setImageUrl('')

            console.log('Successful');
            <Alert severity="success">Room Added Successfully</Alert>

            navigate('/adminhome');

        } catch (err) {
            console.log("Error uploading an image. ", err)
        }
    })

    return (
        <Box className='home-container min-h-screen m-auto bg-[#ececec]'>
            <header>
                <AdminNavbar />
            </header>
            <Box
                sx={{
                    backgroundColor: 'smokewhite',
                    marginLeft: 30,
                }}
                className="admin-main-section h-full flex flex-col items-center">
                <CustomTypography variant='h6' component="h6" text="Add New Room" />
                {/* <Paper> */}
                <form className="flex justify-center items-center w-[600px]" onSubmit={handleAdd} >
                    <Box className="flex flex-col justify-center items-center ">
                        <Box className='flex flex-col justify-center items-center'>
                            <img className="image" src={imageUrl} alt="" required />
                            <input
                                className="border w-[230px]"
                                required
                                type="file"
                                multiple
                                onChange={(e) => { setFile(e.target.files[0]) }}
                            />
                        </Box>
                        <label className="label text-base font-medium mt-4">Hotel</label>
                        <InputComponent
                            onChange={(e) => setHotel(e.target.value)}
                            required
                            type="text"
                            placeholder='Hotel'
                            width="560px"
                            value={hotel}
                        />
                        <label className="label text-base font-medium mx-0 mt-3 mr-[30px]">Title</label>
                        <InputComponent
                            value={title}
                            required
                            type="text"
                            width="560px"
                            placeholder='Title'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="block label text-base font-medium mt-3 ">Short Descr</label>
                        <InputComponent
                            className='block border h-[40px]'
                            onChange={(e) => setIntroDescr(e.target.value)}
                            required
                            type="text"
                            width="560px"
                            placeholder='Intro Description'
                            value={introDescr}
                        />
                        <label className="label text-base font-medium mt-3">Description</label>
                        <InputComponent
                            value={description}
                            type="text"
                            width="560px"
                            placeholder="Enter description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mt-3">Address</label>
                        <InputComponent
                            type="text"
                            width="560px"
                            className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder="Enter address"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <label className="mt-3 label text-base font-medium">Price</label>
                        <InputComponent
                            type="number"
                            placeholder="Enter price..."
                            onChange={(e) => setPrice(e.target.value)}
                            width="560px"
                            required
                        />
                        <label className="label text-base font-medium mt-3">Max People</label>
                        <InputComponent
                            type="number"
                            placeholder="Enter number of people"
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            width="560px"
                            required
                        />
                        <label className="label text-base font-medium mt-3">Contact</label>
                        <InputComponent
                            type="number"
                            placeholder="Enter contact details..."
                            onChange={(e) => setContact(e.target.value)}
                            width="560px"
                            required
                        />
                        <label className="label text-base font-medium mt-3">Number of rooms</label>
                        <InputComponent
                            type="number"
                            placeholder="Enter number of rooms..."
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            width="560px"
                            required
                        />
                        <Box
                            sx={{ width: 550 }}
                            className=" flex flex-col justify-start items-start mt-2 "
                        >
                            <Box sx={{ width: 250 }}>
                            <label className="label text-base font-medium mt-3 ml-[-140px] m-[20px] w-[100%]">Facilities</label>
                            </Box>
                            
                            <label className='ml-[-16px] flex flex-row w-[100px]'><input
                                type="checkbox"
                                checked={wifi}
                                onChange={() => setWifi(!wifi)}
                            />Wifi</label>
                            <label className='flex flex-row ml-[-20px] mt-2 w-[100px]'><input
                                type="checkbox"
                                checked={tv}
                                onChange={() => setTv(!tv)}
                            />TV</label>
                            <label className=' flex flex-row ml-[-8px] mt-2 w-[150px]'><input
                                type="checkbox"
                                checked={airConditioning}
                                onChange={() => setAirConditioning(!airConditioning)}
                            />Air Conditioning</label>
                        </Box>
                        <label className="label text-base font-medium mt-3">Room type:</label>
                        <select onChange={(e) => setRoomType(e.target.value)} required className="w-[560px] h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9] bg-white">
                            <option>Family Deluxe</option>
                            <option>Singles Deluxe</option>
                            <option>Couples Deluxe</option>
                        </select>
                        <label className="label text-base font-medium mt-3">Bed type:</label>
                        <select onChange={(e) => setBedType(e.target.value)} required className="w-[560px] h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9] bg-white">
                            <option>2 Single Beds</option>
                            <option>Double Bed</option>
                            <option>King Bed</option>
                            <option>Queen Bed</option>
                        </select>
                        <CustomButton variant="contained" type='submit'>Add Room</CustomButton>
                        {/* <Button sx={{ backgroundColor: '#0088a9', marginTop: 5, marginBottom: 5 }} variant="contained" type='submit'>Add</Button> */}
                    </Box>
                </form>
                {/* </Paper> */}
            </Box>
        </Box>
    )
}

export default AdminHome;