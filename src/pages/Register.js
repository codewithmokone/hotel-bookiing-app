import React, { useState } from 'react';
// import '../../src/components/modal/stryle.css'
import { useUserAuth } from '../components/context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Box } from '@mui/material';

export const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    // Handles the signup function
    const handleSignUp = async (e) => {
        e.preventDefault()

        setError('');

        try {
            await signUp(email, password);
            navigate("/login");
           
            const docRef = await addDoc(collection(db, "userRole"), {
                userId: auth.currentUser.uid,
                role: "Client",
            });

            alert("Signed up successfully");

        } catch (e) {
            setError(e.message);
            console.log(e.message);
        } 
    }

    // Handles closing the register modal
    const handleClose = () => {
        navigate('/')
    }

    return (
        <Box 
        sx={{}}
        className="modalBackground w-screen h-screen bg-[#24252A] fixed flex justify-center items-center"
        >
            <Box  
            sx={{
                width:{xs:400, sm:400, md:500},
                height:{}
            }}
            className="modalContainer flex flex-col items-center justify-center rounded bg-white  w-[500px] h-[500px]">
                <p>{error}</p>
                <div className='flex justify-end items-end mt-[-14px] mb-10 mr-[30px] w-[100%]'>
                <button className="rounded-xl font-bold text-2xl text-[#0088a9] w-[20]" onClick={handleClose}> X </button>
                </div>
                <h2 className="font-black text-2xl mt-4 mb-4 text-[#0088a9] ">Register</h2>
                <form className="adminLogin-form flex flex-col items-center justify-center w-80" onSubmit={handleSignUp}>
                    <label  className="block w-80 m-1 font-medium" for="email">Email:</label>
                    <input 
                        className="mb-3 h-10 w-80 rounded border focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="email" 
                        placeholder=" Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label  className="w-80 m-1 font-medium" for="password">Password:</label>
                    <input
                        className="mb-5 border h-10 w-80 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="password" 
                        placeholder=" Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-white rounded-md h-8 mt-1 bg-[#0088a9] font-bold w-56 ">Register</button>
                </form>
                <p className="mt-[10px] mb-[60px]">Already have an account? <Link to="/login" ><span className="text-[#0088a9] font-semibold mt-[-10px]">Sign In</span></Link></p>
            </Box>
        </Box>
    )
}

export default Register;