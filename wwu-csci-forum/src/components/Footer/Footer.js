import React from "react";
import './Footer.css'

const Footer = () => {
    return(
        <footer className="footer">
            <div className="footer-column">
                <h5 className="footer-heading">Contact Us</h5>
                <a href="mailto: roperc@wwu.edu" className="footer-link">Cooper Roper</a>
                <a href="mailto: singhg6@wwu.edu" className="footer-link">Gurkirat Singh</a>
                <a href="mailto: greenwr5@wwu.edu" className="footer-link">Ryan Greenwalt</a>
                <a href="mailto: craneg@wwu.edu" className="footer-link">Gavin Crane</a>
            </div>
        </footer>
    )
};

export default Footer;