import React, { useState } from 'react'
import Header from '../components/HeroSec'
import Footer from '../components/Footer'
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import Navbar from '../components/navbar/Navbar'


function ContactUs() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [message, setMessage] = useState('')

    return (
        <div className='bg-[#F5F5F5]'>
            <header className='w-[1024px] flex flex-col'>
                <Navbar />
                <Header />
            </header>
            <main className=' w-[1024px] h-[100vh] bg-white m-auto justify-center items-center'>
                <div className=''>
                    <h3 className='text-center'>Let's get in touch.</h3>
                </div>
                <div className=' w-[800px] flex flex-row justify-between items-center m-auto '>
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
                </div>
                <div className='flex flex-col justify-center items-center mt-16'>
                    <Paper elevation={5} sx={{width:800, height:600}}>
                        <form className='flex flex-col justify-center items-center mt-28' >
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
                </div>
            </main>
            <footer className='m-auto'>
                <Footer />
            </footer>
        </div>
    )
}

export default ContactUs

