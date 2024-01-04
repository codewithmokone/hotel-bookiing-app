import { Box } from '@mui/material'
import React from 'react'
import { Navbar } from 'react-bootstrap'
import Header from '../../components/HeroSec'
import Service from '../../components/Service'
import Footer from '../../components/Footer'

function PaymentSuccessful() {

    return (
        <Box
            sx={{
                width: { xs: 400, sm: 786, md: '100vw' },
                margin: 'auto',
                backgroundColor: 'whitesmoke'
            }}
        >
            <Navbar />
            <Header />
            <Box
                sx={{
                    width: { xs: 400, sm: 786, md: 1024 },
                    display: 'flex',
                    flexDirection: { xs: 'column' },
                    justifyContent: { xs: 'center' },
                    backgroundColor: "white",
                    marginBottom: { xs: 10 }
                }}
                className=' justify-center items-center m-auto'
            >
                <h4>Payment Successful.</h4>
            </Box>
            <Service />
            <Footer />
        </Box>
    )
}

export default PaymentSuccessful
