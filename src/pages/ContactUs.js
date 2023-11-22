import React, { useState } from 'react'
import Header from '../components/HeroSec'
import Footer from '../components/Footer'
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import Navbar from '../components/navbar/Navbar'


function ContactUs() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className='bg-[#F5F5F5] h-fit flex flex-col items-center'>
            <header className='w-[1024px] flex flex-col'>
                <Navbar />
                <Header />
            </header>
            <main className=' w-[1024px] h-full bg-white justify-center items-center'>
                <div className=''>
                    <h3 className='text-center'>Let's get in touch.</h3>
                </div>
                {/* <div className=' w-[800px] flex flex-row justify-between items-center m-auto '>
                    <div>
                        <h5>Address</h5>
                        <p>486 Lynnwood</p>
                        <p>Pretoria </p>
                    </div>
                    <div>
                        <h5>Contact</h5>
                        <p>Bookins@mail.com</p>
                        <p>+277 458 9658</p>
                    </div>
                    <div>
                        <h5>Follow Us</h5>
                        <p>facebook</p>
                        <p>twitter</p>
                    </div>
                </div> */}
                {/* <div className='flex flex-col justify-center items-center mt-16'>
                    <Paper elevation={5} sx={{width:800, height:550}}>
                        <form className='flex flex-col justify-center items-center mt-10' >
                            <label className='w-[75%]'>Full Name:</label>
                            <input
                                className='block border h-[40px] my-2'
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                placeholder=' Name and surname'
                                value={name}
                            />
                            <label className='w-[75%]'>Email:</label>
                            <input
                                className='block border h-[40px] my-2'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="email"
                                value={email}
                                placeholder=' you@mail.com'
                            />
                            <label className='w-[75%]'>Contact number:</label>
                            <input
                                className='block border h-[40px] my-2'
                                onChange={(e) => setContact(e.target.value)}
                                required
                                type="number"
                                placeholder=' Contact'
                                value={contact}
                            />
                            <label className='w-[75%]'>Message:</label>
                            <textarea
                                name="postContent" 
                                rows={4} cols={79} 
                                className='border w-[1000] border-[#0088a9]'
                                placeholder=' Message'
                                onChange={(e) => setContact(e.target.value)}
                            />
                            <div className='flex flex-row justify-center items-center '>
                                <button type="submit" className='w-[100px] h-[40px] rounded bg-[#0088a9] mt-6 text-[white]'>Send</button>
                            </div>
                        </form>
                    </Paper>
                </div> */}
                <div className='flex items-center ml-20 mb-10'>
                    <div className=' '>
                        <div>
                            <h7 className="font-bold">Address:</h7>
                            <p className='text-sm'>486 Lynnwood</p>
                            <p className='text-sm mt-[-12px]'>Pretoria </p>
                        </div>
                        <div>
                            <h7 className="font-bold">Contact:</h7>
                            <p className='text-sm'>Bookins@mail.com</p>
                            <p className='text-sm mt-[-12px]'>+277 458 9658</p>
                        </div>
                        <div>
                            <h7 className="font-bold">Follow Us:</h7>
                            <p className='text-sm'>facebook</p>
                            <p className='text-sm mt-[-12px]'>twitter</p>
                        </div>
                    </div>
                    <div className=' justify-center items-center mt-12 ml-[-140px]'>
                        <form className='w-[900px] flex flex-col justify-center items-center'>
                            <div className='block my-2'>
                                <label className='block  my-1'>First Name:</label>
                                <input
                                    required
                                    id="firstName"
                                    name="firstName"
                                    className='w-[400px] border'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='block'>
                                <label className='block  my-1'>Last Name:</label>
                                <input
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="First name"
                                    className='w-[400px] border'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className='block my-2'>
                                <label className='block my-1'>Email:</label>
                                <input
                                    required
                                    id="firstName"
                                    name="firstName"
                                    label="First name"
                                    className='w-[400px] border'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='block'>
                                <label className='block my-1'>Subject:</label>
                                <input
                                    required
                                    id="firstName"
                                    name="firstName"
                                    className='w-[400px] border'
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className='block my-2'>
                                <label className='block my-1'>Message:</label>
                                <textarea
                                    required
                                    id="firstName"
                                    name="firstName"
                                    className='w-[400px] border'
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <button className='w-[150px] h-[35px] bg-[#0088a9] rounded-xl text-white'>Send</button>
                        </form>
                    </div>
                </div>
            </main>
            <footer className='m-auto'>
                <Footer />
            </footer>
        </div>
    )
}

export default ContactUs

