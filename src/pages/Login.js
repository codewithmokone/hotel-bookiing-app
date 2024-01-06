import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useUserAuth } from '../components/context/UserAuthContext';
import { auth } from '../config/firebase';
import { Alert, Box, Typography } from '@mui/material';
import CustomTypography from '../components/CustomTypography';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { logIn } = useUserAuth(); // Importing login logic from useContext

    const navigate = useNavigate();

    // Handles closing the login modal
    const closeLoginPage = () => {
        navigate('/')
    }

    // Handles the login function 
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setErrorMessage("email and passord required.")
        }

        try {
            let uid = await logIn(email, password);

            let userId = auth.currentUser.uid

            let userRole = "";

            const userRef = query(collection(db, "userRole"), where("userId", "==", userId));
            const querySnapshot = await getDocs(userRef);

            querySnapshot.forEach((doc) => {
                userRole = (doc.data().role)
            })

            console.log({ uid: auth.currentUser.uid, userRole })

            if (userRole === "Admin") {
                navigate("/adminhome")
            } else if (userRole === "Client") {
                navigate("/clienthome")
            } else {
                setErrorMessage("Please enter the correct email/password")
            }

        } catch (error) {
            // setError()
            console.log(error.message);
            const errorCode = error.code
            // Handle the error code
            if(errorCode === 'auth/wrong-password') {
                setErrorMessage("Please enter the correct email/password")
            }else if(errorCode === 'auth/user-not-found'){
                setErrorMessage("User doesn't exist.")
            }
        }
    }

    return (
     
        <Box className="modalBackground w-screen h-screen bg-[#24252A] fixed flex justify-center items-center">
            <Box
                sx={{
                    width: { xs: 340, sm: 400, md: 500 },
                    height: { xs: 440, md: 500 }
                }}
                className=" flex flex-col items-center justify-center rounded bg-white">
                <Box
                    sx={{
                        marginTop: {xs:-0.2, sm: 1, md: 2 },
                        width: {xs:320, sm: 380, md: 480 },
                    }}
                    className='flex justify-end items-end mb-10 w-[100%]'>
                    <button className="rounded-xl font-bold text-2xl text-[#0088a9] w-[20]" onClick={closeLoginPage}> X </button>
                </Box>
                <Box sx={{ marginTop: { xs: -1, sm: -4, md: 0 } }}>
                <CustomTypography theme="heading" text="Login" />
                </Box>
                <Box sx={{ marginTop: { xs: -8, sm: -6, md: -4 } }}>
                    {errorMessage && <Box sx={{ marginTop: { xs: 8, sm: 6, md: 4 } }}><Alert severity="error">{errorMessage}</Alert></Box> }
                    <form className="adminLogin-form flex flex-col items-center justify-center w-80" onSubmit={handleLogin}>
                        <label className="block w-80 m-1 font-medium" for="email">Email:</label>
                        <input
                            className="mb-3 h-10 w-80 rounded border focus:outline-none focus:ring focus:ring-[#0088a9]"
                            type="email"
                            placeholder=" Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        // required
                        />
                        <label className="w-80 m-1 font-medium" for="password">Password:</label>
                        <input
                            className="mb-5 border h-10 w-80 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                            type="password"
                            placeholder=" Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        // required
                        />
                        <Box sx={{ marginTop: { xs: -2, sm: -2, md: 0 } }}>
                            <button className="text-white rounded-md h-8 bg-[#0088a9] font-bold w-56 ">Login</button>
                        </Box>
                    </form>
                </Box>
                <Typography sx={{ marginTop: { xs: -6, sm: -6, md: 0 }, marginBottom: { xs: 6, sm: 6, md: 8 } }} className=" mb-[60px]">Already have an account? <Link to="/Register" ><span className="text-[#0088a9] font-semibold mt-[-10px]">Sign Up</span></Link></Typography>
            </Box>
        </Box>
    )
}

export default Login