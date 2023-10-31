import React from 'react'
import Header from '../components/HeroSec'
import Footer from '../components/Footer'
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import Navbar from '../components/navbar/Navbar'


function ContactUs() {
    return (
        <>
            <header className='w-[1024px] flex flex-col'>
                <Navbar />
                <Header />
            </header>
            <main className=' w-[1024px] h-[100vh] justify-center items-center'>
                <div>
                    <h3 className='text-center'>Let's get in touch.</h3>
                </div>
                <div className='flex justify-center items-center mt-6 '>
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
                    <Grid container spacing={3} sx={{ width: '80%', marginLeft:12, backgroundColor: 'white'}}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Address line 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Address line 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="State/Province/Region"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="Zip / Postal code"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="country"
                                name="country"
                                label="Country"
                                fullWidth
                                autoComplete="shipping country"
                                variant="standard"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                label="Use this address for payment details"
                            />
                        </Grid> */}
                        <Button>Send</Button>
                    </Grid>
                    
                </div>

            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default ContactUs

