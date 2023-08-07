import React from 'react'
import '../../components/modal/stryle.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore'
import { useUserAuth } from '../../components/context/UserAuthContext';
import { auth } from '../../config/firebase';


const LoginModal = ({ closeLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();
    const navigate = useNavigate();


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
        <div className="w-screen h-screen bg-sky-600 fixed flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded bg-white w-[500px] h-[500px]">
                <div className="w-full bg-sky-400">
                <button className="fixed top-1 bg-stone-700 p-3 rounded-xl text-sky-200 right-2" onClick={() => {closeLogin()}}> X </button>
                </div>
                
                <h1 className=" text-center font-black text-2xl mb-10">Login</h1>
                <form className=" flex flex-col items-center justify-center w-80 " onSubmit={handleLogin}>
                    <label
                        htmlFor="email"
                        className="w-72 font-medium"
                    >Email:</label>
                    <input
                        className="mb-5 w-72 h-8"
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label
                        className="w-72 font-medium"
                        htmlFor="password"
                    >Password:</label>
                    <input
                        className="mb-5 h-8 w-72"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="text-white rounded-md h-8 mt-5 bg-sky-950 font-extrabold w-56 ">Login</button>
                </form>
                {error && <span className=" text-red-600 ">{error}</span>}
                <p className="mt-6">Don't have an account? <Link to="/register"><span className="text-sky-800 font-semibold">Register</span></Link></p>
            </div>
        </div>
    )
}

export default LoginModal