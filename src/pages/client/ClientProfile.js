import React, { useState } from 'react';
import Header from '../../components/HeroSec';
import Footer from '../../components/Footer';
import { db, storage } from '../../config/firebase';
import Navbar from '../../components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Avatar, Box, Button } from '@mui/material';
import { useUserAuth } from '../../components/context/UserAuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';

function ClientProfile() {

    const { user } = useUserAuth();

    // console.log("User profile: ", user);

    const [fullName, setFullName] = useState(user.displayName)
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState(user.phoneNumber);
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState([]);

    const navigate = useNavigate()

    // Function for updarting the user profile
    const handlesProfileUpdate = (async (e) => {
        e.preventDefault()

        const imageRef = ref(storage, `userProfileImage/${file[0] + v4()}`)
        try {
            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
            console.log('Image Uploaded');

            const auth = getAuth();
            updateProfile(auth.currentUser, {
                displayName: fullName,
                photoURL: url,
                phoneNumber: contact
            }).then(() => {
                console.log("Profile updated.")
            }).catch((error) => {
                console.log("Error updating profile: ", error)
            });

            //  const docRef = await addDoc(collection(db, "hotelRooms"), {
            //      displayName: fullName,
            //      address: address,
            //      contact: contact,
            //      photoUrl: url
            //  });

            setFullName('')
            setAddress('')
            setContact('')
            setImageUrl('')

            console.log('Successful');
            <Alert severity="success">Profile updated Successful</Alert>

            navigate('/clienthome');

        } catch (err) {
            console.log("Error uploading an image. ", err)
        }
    })

    return (
        <Box className=' home-container bg-[gray] block h-auto m-0'>
            <header className="flex flex-col w-[1024px] m-auto">
                <Navbar />
                <Header />
            </header>
            <main className="main bg-white flex flex-col w-[1024px] m-auto ">
                <Box
                    sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        height: { sm: 'auto', md: 'auto' },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                        justifyContent: 'center', alignItems: 'center', margin: 'auto',
                        backgroundColor: 'smokewhite'
                    }}
                    className="border"
                >
                    <Box
                        sx={{
                            backgroundColor: 'smokewhite',
                        }}
                        className="admin-main-section h-full flex flex-col items-center">
                        <h3 className="text-[#0088a9] text-2xl m-[20px]">Update Profile</h3>
                        <form className="flex justify-center items-center w-[600px]" onSubmit={handlesProfileUpdate} >
                            <Box className="flex flex-col justify-center items-center ">
                                <Box className='flex flex-col justify-center items-center'>
                                    <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 200, height: 200 }} />
                                    <input
                                        className="border w-[230px] mt-4"
                                        type="file"
                                        multiple
                                        onChange={(e) => { setFile(e.target.files[0]) }}
                                    />
                                </Box>
                                <label className="label text-base font-medium mt-4">Full Name</label>
                                <InputComponent
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    type="text"
                                    placeholder='Full Name'
                                    width="560px"
                                    value={fullName}
                                />
                                <label className="label text-base font-medium mt-3">Address</label>
                                <InputComponent
                                    type="text"
                                    width="560px"
                                    className='block border h-[40px] rounded focus:outline-none focus:ring focus:ring-[#0088a9]'
                                    placeholder=" Enter address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <label className="label text-base font-medium mt-3">Contact No.</label>
                                <InputComponent
                                    type="number"
                                    placeholder=" Enter contact details..."
                                    onChange={(e) => setContact(e.target.value)}
                                    width="560px"
                                    required
                                />
                                <Button sx={{ backgroundColor: '#0088a9', marginTop: 5, marginBottom: 5 }} variant="contained" type='submit'>Update</Button>
                                {/* <button className=" text-white font-bold p-1 rounded-md bg-[#0088a9] w-[300px] mx-0 my-10" type='submit'>Update</button> */}
                            </Box>
                        </form>
                    </Box>
                </Box>
            </main>
            <footer className='m-auto'>
                <Footer />
            </footer>
        </Box>
    )
}

export default ClientProfile
