import React, { useState } from 'react';
import '../../styles/adminhome.css';
import { storage } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button } from '@mui/material';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import InputComponent from '../../components/InputComponent';
import { getAuth, updateProfile } from "firebase/auth";
import { useUserAuth } from '../../components/context/UserAuthContext';
import CustomTypography from '../../components/CustomTypography';
import CustomButton from '../../components/CustomButton';

function Profile() {

  const { user } = useUserAuth();
  console.log("User profile: ", user);

  const [fullName, setFullName] = useState(user.displayName)
  const [contact, setContact] = useState(user.phoneNumber);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState([]);

  const navigate = useNavigate()

  // Function for updarting the admin profile
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
        className="admin-main-section h-full flex flex-col items-center"
      >
        <CustomTypography theme="heading" text="Update Profile" />
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
            {/* <CustomTypography text='Full Name' className='label text-base font-medium' /> */}
            <InputComponent
              onChange={(e) => setFullName(e.target.value)}
              required
              type="text"
              placeholder='Full Name'
              width="560px"
              value={fullName}
            />
            <label className="label text-base font-medium mt-3">Contact No.</label>
            <InputComponent
              type="number"
              placeholder=" Enter contact details..."
              onChange={(e) => setContact(e.target.value)}
              width="560px"
              required
            />
            <CustomButton variant="contained" type='submit'>Update</CustomButton>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Profile
