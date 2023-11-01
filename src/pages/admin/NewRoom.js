import React, { useEffect, useState } from 'react';
import '../../styles/adminhome.css';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';


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
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const navigate = useNavigate()

    const imageListRef = ref(storage, "hotelImages/")

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
                checkInTime: checkInDate,
                checkOutTime: checkOutDate,
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

            alert('Successful');

            navigate('/adminhome');

        } catch (err) {
            console.log("Error uploading an image. ", err)
        }
    })

    return (
        <div className='home-container min-h-screen bg-gray-400'>
            <header className='flex flex-col '>
                <AdminNavbar />
                <Header />
            </header>
            <div className="admin-main-section  w-[1024px] h-full flex flex-col items-center bg-gray-300 m-auto">

                <h3 className="text-[#0088a9] text-2xl m-[30px]">Add New Room</h3>

                <form className="flex flex-row justify-center items-center border-2 w-[600px]" >
                    <div className="w-[450px] flex flex-col justify-center items-center ">
                        <img className="image" src={imageUrl} alt="" />
                        <input className="my-0" required type="file" multiple onChange={(e) => { setFile(e.target.files[0]) }} />
                        <label className="label text-base font-medium mx-0 my-2 mr-[30px]">Hotel</label>
                        <input
                            type="text"
                            size='normal'
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter title..."
                            onChange={(e) => setHotel(e.target.value)}
                            required
                        />
                        <TextField
                            label="Title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            size='small'
                            variant="filled"
                            color="secondary"
                            type="text"
                            sx={{ mb: 3, width: 600 }}
                            fullWidth
                            value={title}
                        />
                        <TextField
                            label="Short Description"
                            onChange={(e) => setIntroDescr(e.target.value)}
                            required
                            size='small'
                            variant="filled"
                            color="primary"
                            type="text"
                            sx={{ mb: 3, width: 600, color: 'white' }}
                            fullWidth
                            value={introDescr}
                        />
                      
                        {/* <label className="label text-base font-medium mx-0 my-2.5">Short Description</label>
                        <input
                            type="text"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter description"
                            onChange={(e) => setIntroDescr(e.target.value)}
                            required
                        /> */}
                        <label className="label text-base font-medium mx-0 my-2.5">Description</label>
                        <input
                            type="text"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Address</label>
                        <input
                            type="text"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter address"
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Price</label>
                        <input
                            type="text"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter price..."
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Max People</label>
                        <input
                            type="text"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter number of people"
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Contact</label>
                        <input
                            type="number"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter contact details..."
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Number of rooms</label>
                        <input
                            type="number"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            placeholder=" Enter number of rooms..."
                            onChange={(e) => setNumberOfRooms(e.target.value)}
                            required
                        />
                        <label className="">Facilities</label>
                        <div className="flex flex-col ml-[-75px] justify-start">
                            <div className="flex flex-row ml-[-260px] justify-center items-center ">
                                <input
                                    type="checkbox"
                                    checked={wifi}
                                    onChange={() => setWifi(!wifi)}
                                />
                                <p>WiFi</p>
                            </div>
                            <div className="flex flex-row ml-[-260px] justify-center items-center ">
                                <input

                                    type="checkbox"
                                    checked={tv}
                                    onChange={() => setTv(!tv)}
                                />
                                <p >TV</p>
                            </div>
                            <div className="flex flex-row ml-[-260px] justify-center items-center ">
                                <input
                                    type="checkbox"
                                    checked={airConditioning}
                                    onChange={() => setAirConditioning(!airConditioning)}
                                />
                                <p>Air Conditioning</p>
                            </div>
                        </div>
                        {/* <label className="label text-base font-medium mx-0 my-2.5">Check-In Date</label>
                        <input
                            type="date"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            onChange={(e) => setCheckInDate(e.target.value)}
                            required
                        />
                        <label className="label text-base font-medium mx-0 my-2.5">Check-Out Date</label>
                        <input
                            type="date"
                            className='rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            required
                        /> */}
                        <label className="label text-base font-medium mx-0 my-2.5">Room type:</label>
                        <select onChange={(e) => setRoomType(e.target.value)} required className="w-[600px] h-[30px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]">
                            <option>Family Deluxe</option>
                            <option>Singles Deluxe</option>
                            <option>Couples Deluxe</option>
                        </select>
                        <label className="label text-base font-medium mx-0 my-2.5">Bed type:</label>
                        <select onChange={(e) => setBedType(e.target.value)} required className="w-[600px] h-[30px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]">
                            <option>2 Single Beds</option>
                            <option>Double Bed</option>
                            <option>King Bed</option>
                            <option>Queen Bed</option>
                        </select>
                        <button className=" text-white font-bold p-1 rounded-md bg-[#0088a9] w-[300px] mx-0 my-10" onClick={handleAdd}>Send</button>
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminHome;