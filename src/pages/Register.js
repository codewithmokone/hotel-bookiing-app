import React, { useState } from 'react';
// import '../../src/components/modal/stryle.css'
import { useUserAuth } from '../components/context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('');

        try {
            await signUp(email, password);
            navigate("/login");
            alert("Signed up successfully");
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        } 
    }   

    const handleClose = () => {
        navigate('/')
    }

    return (
        <div className="modalBackground w-screen h-screen bg-[#24252A] fixed flex justify-center items-center">
            <div  className="modalContainer flex flex-col items-center justify-center rounded bg-white  w-[500px] h-[500px]">
                <p>{error}</p>
                <button className="fixed top-1 bg-[#0088a9] p-2 rounded-xl text-white right-2" onClick={handleClose}> X </button>
                <h2 className="font-black text-2xl mt-4 mb-2 text-[#0088a9] ">Register</h2>
                <form className="adminLogin-form flex flex-col items-center justify-center w-80" onSubmit={handleSubmit}>
                    <label  className="w-72 m-1 font-medium" for="email">Email:</label>
                    <input 
                        className="mb-5 h-8 w-72 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="email" 
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label  className="w-72 m-1 font-medium" for="password">Password:</label>
                    <input
                        className="mb-5 h-8 w-72 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="password" 
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-white rounded-md h-8 mt-1 bg-[#0088a9] font-bold w-56 ">Register</button>
                </form>
                <p className="mt-[10px] mb-[60px]">Already have an account? <Link to="/login" ><span className="text-[#0088a9] font-semibold mt-[-10px]">Sign In</span></Link></p>
            </div>
        </div>
    )
}

export default Register;