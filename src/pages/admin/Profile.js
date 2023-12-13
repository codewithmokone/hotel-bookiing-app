import React, { useState } from 'react';
import '../../styles/adminhome.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import InputComponent from '../../components/InputComponent';
import { getAuth, updateProfile } from "firebase/auth";
import { useUserAuth } from '../../components/context/UserAuthContext';

function Profile() {

  const { user } = useUserAuth();
  console.log("User profile: ", user);

  const [fullName, setFullName] = useState(user.displayName)
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState(user.phoneNumber);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState([]);

  const navigate = useNavigate()

  // handle for adding a room
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
        <h3 className="text-[#0088a9] text-2xl m-[20px]">Update Profile</h3>
        <form className="flex justify-center items-center w-[600px]" onSubmit={handlesProfileUpdate} >
          <Box className="flex flex-col justify-center items-center ">
            <Box className='flex flex-col justify-center items-center'>
              <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 200, height: 200 }} />
              <input
                className="border w-[230px] mt-4"
                required
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
            <button className=" text-white font-bold p-1 rounded-md bg-[#0088a9] w-[300px] mx-0 my-10" type='submit'>Update</button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Profile
