import React from 'react'
// import '../components/modal/stryle.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore'
import { useUserAuth } from '../components/context/UserAuthContext';
import { auth } from '../config/firebase';


const Login = ( ) => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { logIn } = useUserAuth();

    const navigate = useNavigate();

    const closeLoginPage =() => {
        navigate('/')
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        setError("");

        try {
            let uid = await logIn(email, password);

            let userRole = "empty";

            const userRef = query(collection(db, "userRole"), where("userID", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(userRef);

            querySnapshot.forEach((doc) => {
                userRole = (doc.data().userID)
            })

            console.log({ uid: auth.currentUser.uid, userRole })

            if (uid.user && uid.user.uid) {
                if (auth.currentUser.uid != null) {
                    if (auth.currentUser.uid === userRole) {
                        navigate("/adminhome")
                    } else {
                        navigate("/clienthome")
                    }
                }
            } else {
                console.log("User doesn't exist")
            }

        } catch (err) {
            // setError()
            console.log(err.message);
        }
    }

    return (
        <div className="w-screen h-screen bg-[#24252A] fixed flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded bg-white w-[500px] h-[500px]">
                <div className="w-full bg-sky-400">
                <button className="fixed top-1 bg-[#0088a9] p-[7px] rounded-xl text-white right-2" onClick={closeLoginPage}> X </button>
                </div>
                <h1 className=" text-center font-black text-2xl mb-2 text-[#0088a9]" >Login</h1>
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