import React from 'react';
import '../styles/footer.css';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';
import { Box } from '@mui/material';


export const Footer = () => {
    return (
        <Box
            sx={{
                height: 250,
                width: { xs:400,sm: 786, md: 1024 },
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: '#24252A',
                borderBottom: 10,
                borderColor: 'rgba(0,136,169,1)',
                marginBottom:-20
            }}
            // className="footerContainer"
        >
            <div className="socialIcons">
                <a href=""> <AiFillFacebook /></a>
                <a href=""> <AiFillTwitterSquare /></a>
                <a href=""> <AiFillInstagram /></a>
            </div>
            <div className="footerTerms">
                <a href='#'><div><p>Terms & Conditions</p></div></a>
                <a href='#'><div><p>Privacy</p></div></a>
                <a href='#'><div><p>Security</p></div></a>
            </div>
            <div className="footerBotton ">
                <p>
                    @{new Date().getFullYear()}. All right reserved.
                </p>
            </div>
        </Box>
    )
}

export default Footer;