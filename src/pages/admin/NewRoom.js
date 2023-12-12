import React, { useState } from 'react';
import '../../styles/adminhome.css';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Alert, Box } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';


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
            <header className='flex flex-col '>
              <AdminNavbar />
            </header>
            <Box 
            sx={{
                backgroundColor:'smokewhite'
            }}
            className="admin-main-section h-full flex flex-col items-center m-auto">
                <h3 className="text-[#0088a9] text-2xl m-[20px]">Add New Room</h3>
                <form className="flex flex-row justify-center items-center w-[600px]" onSubmit={handleAdd} >
                    <Box className="w-[450px] flex flex-col justify-center items-center ">
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
                        <label className="label text-base font-medium mx-0 mt-4 mr-[30px]">Hotel</label>
                        <input
                            className='block border h-[40px] '
                            onChange={(e) => setHotel(e.target.value)}
                            required
                            type="text"
                            placeholder=' Hotel'
                            value={hotel}
                        />
                        <label className="label text-base font-medium mx-0 mt-3 mr-[30px]">Title</label>
                        <input
                            className='border h-[40px]'
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            type="text"
                            placeholder=' Title'
                            value={title}
                        />
                        <label className="label text-base font-medium mt-3 ">Short Descr</label>
                        <input
                            className='block border h-[40px]'
                            onChange={(e) => setIntroDescr(e.target.value)}
                            required
                            type="text"
                            placeholder=' Intro Description'
                            value={introDescr}
                        />
                        <label className="label text-base font-medium mt-3">Description</label>
                        <input
                            type="text"
                            className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mt-3">Address</label>
                        <input
                            type="text"
                            className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter address"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <label className="mt-3 label text-base font-medium">Price</label>
                        <input
                            type="number"
                            className='border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter price..."
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mt-3">Max People</label>
                        <input
                            type="text"
                            className='border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter number of people"
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mt-3">Contact</label>
                        <input
                            type="number"
                            className='border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter contact details..."
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mt-3">Number of rooms</label>
                        <input
                            type="number"
                            className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter number of rooms..."
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            required
                        />
                        <label className="ml-[-140px] font-semibold m-[10px] w-[100%]">Facilities</label>
                        <Box className="border flex flex-col justify-start items-start w-[300px] mt-2 ">
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
                            <label className='border flex flex-row ml-[-8px] mt-2 w-[150px]'><input
                                type="checkbox"
                                checked={airConditioning}
                                onChange={() => setAirConditioning(!airConditioning)}
                            />Air Conditioning</label>
                        </Box>
                        <label className="label text-base font-medium mt-3">Room type:</label>
                        <select onChange={(e) => setRoomType(e.target.value)} required className="w-[600px] h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]">
                            <option>Family Deluxe</option>
                            <option>Singles Deluxe</option>
                            <option>Couples Deluxe</option>
                        </select>
                        <label className="label text-base font-medium mt-3">Bed type:</label>
                        <select onChange={(e) => setBedType(e.target.value)} required className="w-[600px] h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]">
                            <option>2 Single Beds</option>
                            <option>Double Bed</option>
                            <option>King Bed</option>
                            <option>Queen Bed</option>
                        </select>
                        <button className=" text-white font-bold p-1 rounded-md bg-[#0088a9] w-[300px] mx-0 my-10" type='submit'>Send</button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default AdminHome;