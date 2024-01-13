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
    const handleAdd = async (e) => {
        e.preventDefault()

        if(!hotel || !title || !description || !address || !contact || !price || !numberOfPeople || !numberOfRooms || !roomType || !bedType){
            alert('All fields must be filled.');
            return;
        }

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
    }

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
                <CustomTypography theme="heading" text="Add New Room" />
                <form className="flex justify-center items-center w-[600px]" onSubmit={handleAdd} >
                    <Box className="flex flex-col justify-center items-center ">
                        <Box className='flex flex-col justify-center items-center'>
                            <img className="image" src={file[0]} alt="" required />
                            <input
                                className="border w-[230px]"
                                required
                                type="file"
                                multiple
                                onChange={(e) => { setFile(e.target.files[0]) }}
                            />
                        </Box>
                        <Box className='flex flex-col mt-6 w-[580px]'>
                            <CustomTypography text="Hotel" />
                            <InputComponent
                                onChange={(e) => setHotel(e.target.value)}
                                required
                                type="text"
                                placeholder='Hotel'
                                theme='primary'
                                value={hotel}
                            />
                            <CustomTypography text="Title" />
                            <InputComponent
                                value={title}
                                required
                                type="text"
                                theme='primary'
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <CustomTypography text="Short Description" />
                            <InputComponent
                                onChange={(e) => setIntroDescr(e.target.value)}
                                required
                                type="text"
                                theme='primary'
                                placeholder='Intro Description'
                                value={introDescr}
                            />
                            <CustomTypography text="Full Description" />
                            <InputComponent
                                value={description}
                                type="text"
                                theme='primary'
                                placeholder="Enter description"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <CustomTypography text="Address" />
                            <InputComponent
                                type="text"
                                theme='primary'
                                className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                                placeholder="Enter address"
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <CustomTypography text="Price" />
                            <InputComponent
                                type="number"
                                placeholder="Enter price..."
                                onChange={(e) => setPrice(e.target.value)}
                                theme='primary'
                                required
                            />
                            <CustomTypography text="Max People" />
                            <InputComponent
                                type="number"
                                placeholder="Enter number of people"
                                onChange={(e) => setNumberOfPeople(e.target.value)}
                                theme='primary'
                                required
                            />
                            <CustomTypography text="Contact" />
                            <InputComponent
                                type="number"
                                placeholder="Enter contact number..."
                                onChange={(e) => setContact(e.target.value)}
                                theme='primary'
                                required
                            />
                            <CustomTypography text="Number of Rooms" />
                            <InputComponent
                                type="number"
                                placeholder="Enter number of rooms..."
                                onChange={(e) => setNumberOfRooms(e.target.value)}
                                theme='primary'
                                required
                            />
                            <Box
                                sx={{ width: 550, marginBottom: 4 }}
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
                            <CustomTypography text="Room Type" />
                            <select onChange={(e) => setRoomType(e.target.value)} required className="w-[560px] h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9] bg-white mb-6">
                                <option>Family Deluxe</option>
                                <option>Singles Deluxe</option>
                                <option>Couples Deluxe</option>
                            </select>
                            <CustomTypography text="Bed Type" />
                            <select onChange={(e) => setBedType(e.target.value)} required className="w-[560px] h-[40px] rounded focus:ring  bg-white">
                                <option>2 Single Beds</option>
                                <option>Double Bed</option>
                                <option>King Bed</option>
                                <option>Queen Bed</option>
                            </select>
                            <Box>
                                {/* <CustomButton variant="contained" text="Add Room" type='submit' /> */}
                                <Button sx={{}}  onClick={handleAdd}>Add Room</Button>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default AdminHome;