import React from "react";
import './Footer.css'

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-column">
                <h5 className="footer-heading">About Us</h5>
                <p>About Westerns CS Forum</p>
                <p>Trust &amp; Safety</p>
                <p>Accessibities</p>
                <p>Terms of Services</p>
                <p>Privacy Policy</p>
            </div>
            <div className="footer-column">
                <h5 className="footer-heading">Contact Us</h5>
                <a href="roperc@wwu.edu" className="footer-link">Cooper Roper</a>
                <a href="#.edu" className="footer-link">Gurkirat Singh</a>
                <a href="greenwr5@wwu.edu.edu" className="footer-link">Ryan Greenwalt</a>
                <a href="craneg@wwu.edu" className="footer-link">Gavin Crane</a>
            </div>
        </footer>
    )
};

export default Footer;