import React, { useState } from 'react'
import Header from '../components/HeroSec'
import Footer from '../components/Footer'
import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import Navbar from '../components/navbar/Navbar'


function ContactUs() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSendEmail = async () => {
        try {

            if (!firstName || !lastName || !email || !subject || !message) {
                setErrorMessage("Please fill all the fields.");
                return;
            }

            const response = await fetch('https://hotel-booking-nodejs.onrender.com/send-contactus-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    subject,
                    message,
                }),
            });

            if (response.ok) {

                // console.log('Email sent successfully!');
                alert("Message sent successfully!")
                // setSuccessMessage("Email sent successfully!");
                // setErrorMessage('');

            } else {
                // Handle errors, if any
                console.error('Error sending email:', response.statusText);
                setSuccessMessage("");
                setErrorMessage('Error sending email');
            }
        } catch (error) {
            console.error('Error sending email:', error.message);
        }
    }

    return (
        <Box
            sx={{

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
            }}
            className='h-fit'
        >
            <Navbar />
            <Header />
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    display: "flex",
                    flexDirection: { xs: 'column', sm: 'column', md: 'column' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke'
                }}
                className=' h-full'
            >
                <Box className='mt-6'>
                    <h3 className='text-center font-semibold text-["green"]'>Let's get in touch.</h3>
                </Box>
                <Box
                    sx={{
                        width: { xs: 400, sm: 786, md: 1024 },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: "column", md: "column" },
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    className='flex items-center mb-10'>
                    <Box
                        sx={{
                            width: { xs: 400, sm: 786, md: 1024 },
                            display: 'flex',
                            flexDirection: { xs: 'row', sm: 'row', md: 'row' },
                            marginTop: { xs: 3, sm: 5 },
                            justifyContent: { xs: "space-evenly", sm: "space-evenly" },
                        }}
                    >
                        <div>
                            <h6 className="font-bold">Address:</h6>
                            <p className='text-sm'>486 Lynnwood</p>
                            <p className='text-sm mt-[-12px]'>Pretoria </p>
                        </div>
                        <div>
                            <h6 className="font-bold">Contact:</h6>
                            <p className='text-sm'>Bookins@mail.com</p>
                            <p className='text-sm mt-[-12px]'>+277 458 9658</p>
                        </div>
                        <div>
                            <h6 className="font-bold">Follow Us:</h6>
                            <p className='text-sm'>facebook</p>
                            <p className='text-sm mt-[-12px]'>twitter</p>
                        </div>
                    </Box>
                    <Box
                        sx={{
                            width: { xs: 400, sm: 786 },
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 5,
                        }}
                    // className=' justify-center items-center mt-12 ml-[-140px]'
                    >
                        <form className='flex flex-col justify-center items-center'>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            {successMessage && <Alert severity="success">{successMessage}</Alert>}
                            <Box className="block my-2">
                                <label className='block  my-1'>First Name:</label>
                                <input
                                    required
                                    id="firstName"
                                    name="firstName"
                                    type='text'
                                    className='w-[400px] border'
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Box>
                            <Box className='block'>
                                <label className='block  my-1'>Last Name:</label>
                                <input
                                    required
                                    id="lastName"
                                    name="lastName"
                                    label="Last name"
                                    type='text'
                                    className='w-[400px] border'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Box>
                            <Box className='block my-2'>
                                <label className='block my-1'>Email:</label>
                                <input
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type='email'
                                    className='w-[400px] border'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box className='block'>
                                <label className='block my-1'>Subject:</label>
                                <input
                                    required
                                    id="subject"
                                    name="subject"
                                    type='text'
                                    className='w-[400px] border'
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </Box>
                            <Box className='block my-2'>
                                <label className='block my-1'>Message:</label>
                                <textarea
                                    required
                                    id="message"
                                    name="message"
                                    type='text'
                                    className='w-[400px] border h-[80px]'
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Box>
                            <button
                                onClick={handleSendEmail}
                                className='w-[150px] h-[35px] bg-[#0088a9] rounded-xl text-white mt-6' >
                                Send
                            </button>
                        </form>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

export default ContactUs

