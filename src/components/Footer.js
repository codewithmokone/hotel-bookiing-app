import React from 'react';
import '../styles/footer.css';

export const Footer = () => {
    return (
        <footer>
            <div className='sb_footer section_padding bg-gray-300'>
                <div className='sb_footer-links'>
                    <div className='sb_footer-links-div'>
                        <h4 className="text-lg font-medium">For Business</h4>
                        <a href="#">
                            <p>Car Hire</p>
                        </a>
                        <a href="#">
                            <p>Resorts</p>
                        </a>
                        <a href="#">
                            <p>Places of interest</p>
                        </a>
                    </div>
                    
                    <div className='sb_footer-links-div'>
                        <h4 className="text-lg font-medium">Social media</h4>
                        <div>
                            <p><img src="" alt="" /></p>
                            <p><img src="" alt="" /></p>
                            <p><img src="" alt="" /></p>
                            <p><img src="" alt="" /></p>
                        </div>
                    </div>
                </div>
                <hr />

                <div className="sb_footer-below">
                    <div className="sb_footer-copyright">
                        <p>
                            @{new Date().getFullYear()}. All right reserved.
                        </p>
                    </div>
                    <div className="sb_footer-copyright-opt">
                        <a href='#'><div><p>Terms & Conditions</p></div></a>
                        <a href='#'><div><p>Privacy</p></div></a>
                        <a href='#'><div><p>Security</p></div></a>
                    </div>
                </div>
                <div className=" bg-sky-950 h-[5px] w-[1024px] "></div>
            </div>
        </footer>
    )
}

export default Footer;