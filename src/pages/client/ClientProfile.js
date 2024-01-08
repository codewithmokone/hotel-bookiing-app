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
import CustomTypography from '../../components/CustomTypography';

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'white',
                margin: 'auto'
            }}
            className='h-auto'
        >
            <Box>
                <header className="flex flex-col m-auto">
                    <Navbar />
                    <Header />
                </header>
            </Box>
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    backgroundColor: 'smokewhite',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto'
                }}>
                <main className="flex flex-col ">
                    <Box
                        sx={{
                            width: { xs: 400, sm: 786, md: 1024 },
                            height: { sm: 'auto', md: 'auto' },
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'smokewhite'
                        }}
                        className="border"
                    >
                        <Box
                            sx={{
                                backgroundColor: 'smokewhite',
                            }}
                            className="h-full flex flex-col items-center"
                        >
                            <CustomTypography theme="heading" text="Update Profile" />
                            {/* <h3 className="text-[#0088a9] text-2xl m-[20px]">Update Profile</h3> */}
                            <form className="flex justify-center items-center" onSubmit={handlesProfileUpdate} >
                                <Box className="flex flex-col justify-center items-center ">
                                    <Box
                                        sx={{
                                            width: { xs: 150, sm: 260, md: 260 }
                                        }}
                                        className='flex flex-col justify-center items-center'
                                    >
                                        <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 150, height: 150 }} />
                                        <input
                                            className="border w-[230px] mt-4"
                                            type="file"
                                            multiple
                                            onChange={(e) => { setFile(e.target.files[0]) }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: { xs: 350, sm: 560, md: 560 },
                                        }}
                                    >
                                        <label className="block text-base font-medium mt-4 ml-4">Full Name</label>
                                        <InputComponent
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                            type="text"
                                            placeholder='Full Name'
                                            value={fullName}
                                        />
                                    </Box>
                                    <Box sx={{ width: { xs: 350, sm: 560, md: 560 } }}>
                                        <label className="block text-base font-medium mt-4 ml-4">Contact No.</label>
                                        <InputComponent
                                            type="number"
                                            placeholder="Enter contact details..."
                                            onChange={(e) => setContact(e.target.value)}
                                            required
                                        />
                                    </Box>
                                    <Button sx={{ backgroundColor: '#0088a9', marginTop: 5, marginBottom: 5 }} variant="contained" type='submit'>Update</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </main>
            </Box>
            <Box
                sx={{
                    width: { xs: 400,sm:786,md:1024 },
                }} >
                <Footer />
            </Box>
        </Box>
    )
}

export default ClientProfile
