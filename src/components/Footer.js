import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiFillFacebook, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai';


export const Footer = () => {
    return (
        <footer>
            <div className="footerContainer">
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

                <div className="footerBotton">
                    <p>
                        @{new Date().getFullYear()}. All right reserved.
                    </p>
                </div>
                <div className="hrDiv bg-sky-950 h-[5px] w-[1024px] "></div>
            </div>
        </footer>
    )
}

export default Footer;