import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useUserAuth } from '../components/context/UserAuthContext';
import { auth } from '../config/firebase';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { logIn } = useUserAuth(); // Importing login logic from useContext

    const navigate = useNavigate();

    // Handles closing the login modal
    const closeLoginPage =() => {
        navigate('/')
    }

    // Handles the login function 
    const handleLogin = async (e) => {
        e.preventDefault()

        setError("");

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

            if(userRole === "Admin"){
                navigate("/adminhome")
            }else if(userRole === "Client"){
                navigate("/clienthome")
            }else{
                alert("Please enter the correct email/password")
            }
                
            // if (uid.user && uid.user.uid) {
            //     if (auth.currentUser.uid != null) {
            //         console.log("Login log: ",auth.currentUser.uid, userRole)
            //         if (auth.currentUser.uid === userRole) {
            //             navigate("/adminhome")
            //         } else {
            //             navigate("/clienthome")
            //         }
            //     }
            // } else {
            //     console.log("User doesn't exist")
            // }

        } catch (err) {
            // setError()
            console.log(err.message);
        }
    }

    return (
        <div className="w-screen h-screen bg-[#24252A] fixed flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded bg-white w-[500px] h-[500px]">
                <div className="flex justify-end items-end mt-[-40px] mb-10 mr-2 w-[99%]">
                <button className="rounded-xl font-bold text-2xl text-[#0088a9] w-[20]" onClick={closeLoginPage}> X </button>
                </div>
                <h1 className=" text-center font-black text-2xl mb-2 text-[#0088a9] mt-[60px]" >Login</h1>
                <form className=" flex flex-col items-center justify-center w-80" onSubmit={handleLogin}>
                    <label
                        htmlFor="email"
                        className="w-60 font-medium m-1"
                    >Email:</label>
                    <input
                        className="mb-4 w-60 h-8 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="email"
                        placeholder=" Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label
                        className="w-60 font-medium m-1 "
                        htmlFor="password"
                    >Password:</label>
                    <input
                        className="mb-4 h-8 w-60 rounded focus:outline-none focus:ring focus:ring-[#0088a9]"
                        type="password"
                        placeholder=" Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-white rounded-md h-8 mt-2 font-extrabold w-56 bg-[#0088a9] hover:bg-[]">Login</button>
                </form>
                {error && <span className=" text-red-600 ">{error}</span>}
                <p className="mt-2 mb-10 ">Don't have an account? <Link to="/register"><span className="text-[#0088a9] no-underline font-semibold">Register</span></Link></p>
            </div>
        </div>
    )
}

export default Login