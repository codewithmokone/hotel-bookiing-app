import React, { useState } from 'react';
// import '../../src/components/modal/stryle.css'
import { useUserAuth } from '../components/context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Alert, Box, Typography } from '@mui/material';
import InputComponent from '../components/InputComponent';
import CustomTypography from '../components/CustomTypography';

export const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    // Handles the signup function
    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            setErrorMessage('Email and password is required');
        }

        try {
            await signUp(email, password);
            navigate("/login");

            const docRef = await addDoc(collection(db, "userRole"), {
                userId: auth.currentUser.uid,
                role: "Client",
            });

            alert("Signed up successfully");

        } catch (e) {
            setErrorMessage("email and password is required.");
            console.log(e.message);
        }
    }

    // Handles closing the register modal
    const handleClose = () => {
        navigate('/')
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
                        marginTop: { xs: -0.2, sm: 1, md: 2 },
                        width: { xs: 320, sm: 380, md: 480 },
                    }}
                    className='flex justify-end items-end mb-10 w-[100%]'>
                    <button className="rounded-xl font-bold text-2xl text-[#0088a9] w-[20]" onClick={handleClose}> X </button>
                </Box>
                <Box sx={{ marginTop: { xs: -1, sm: -4, md: 0 } }}>
                    <CustomTypography theme="heading" text="Register" />
                </Box>
                <Box sx={{ marginTop: { xs: -8, sm: -6, md: -6 } }}>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <form className="adminLogin-form flex flex-col items-center justify-center w-80" onSubmit={handleSignUp}>
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
                            <button className="text-white rounded-md h-8 bg-[#0088a9] font-bold w-56 ">Register</button>
                        </Box>
                    </form>
                </Box>
                <Typography sx={{ marginTop: { xs: -6, sm: -6, md: 0 }, marginBottom: { xs: 6, sm: 6, md: 8 } }} className=" mb-[60px]">Already have an account? <Link to="/login" ><span className="text-[#0088a9] font-semibold mt-[-10px]">Sign In</span></Link></Typography>
            </Box>
        </Box>
    )
}

export default Register;