import React from 'react'
import Facebook from '../headers/icon/facebook.svg'
import Instagram from '../headers/icon/instagram.svg'
import WhatsApp from '../headers/icon/whatsapp.svg'
import Address from '../headers/icon/address.svg'
import Contact from '../headers/icon/phone.svg'
import Mail from '../headers/icon/mail.svg'


function Footer() {
    return (
        <>
            <div className="footer">
            <div className="container row ">
                <div className="aboutus">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                       quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                       consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore .</p>
                        <ul className="sci">
                            <li><img style={{width: '25px'}} src={Facebook} alt={Facebook}/></li>
                            <li><img style={{width: '23px'}} src={Instagram} alt={Instagram}/></li>
                            <li><img style={{width: '23px'}} src={WhatsApp} alt={WhatsApp}/></li>
                        </ul>
                </div>
                <div className="quickLinks">
                    <h2>Quick Link</h2>
                    <ul>
                        <li><a>About</a></li>
                        <li><a>FAQ</a></li>
                        <li><a>Privacy Policy</a></li>
                        <li><a>Help</a></li>
                        <li><a>Terms & Conditions</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div className="info">
                    <h2>Contact Info</h2>
                    <ul>
                        <li>
                            <span><img style={{width: '28px', marginRight:'3px'}} src={Address} alt={Address}/></span>
                            <span>35I/J Mugbhat Cross Lane,<br/></span>
                             <span style={{marginLeft:'35px'}}> Girgaon, Charni Road,<br/></span>
                             <span style={{marginLeft:'35px'}}> Mumbai:400004.</span>
                        </li>
                        <li>
                                <p><a href="tel:8369313194"><img style={{width: '15px'}}  src={Contact} alt={Contact}/>+91 8369313194</a><br/>
                                <a href="tel:8369313194"><img style={{width: '15px'}}  src={Contact} alt={Contact}/>+91 8369313194</a></p>
                        </li>
                        <li>
                            <p><a href="mailto:Elegnate@outlook.com"><img style={{width: '18px', marginRight:'8px'}}  src={Mail} alt={Mail}/>Elegnate@outlook.com</a></p>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className=" copyright">
                    <p>Copyright © 2021 Elegnate. All Rights Reserved.</p>
                </div>
            </>
    );
}

export default Footer;