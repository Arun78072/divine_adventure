import React from "react";
import {
  FooterWrapper,
  FooterContainer,
  FooterBrand,
  FooterLinks,
  FooterBottom,
} from "./Footer.styles";
import { MapContainer } from './Footer.styles';
import { FaXTwitter, FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer className='container'>
        <FooterBrand>
          <h2>DEVINE ADVENTURE</h2>
          <p>
            Empowering explorers with unforgettable tour & travel experiences. Trusted travel experts for your every destination.
          </p>
          <h3>FOLLOW US</h3>
          <div className="social-icons">
            
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
          <a href="#" className="back-to-top">↑ Back to Top</a>
        </FooterBrand>

        <FooterLinks>
          <div className="column">
            <h4>Site Map</h4>
            <ul>
              <li><a href="#">Homepage</a></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Holiday Packages</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="map-column">
           <h2>Office Location</h2>
           <p><strong>Divine Adventure Holidays Tour & Travels</strong></p>
           <p>Main Square, Near Bus Stand Road,<br />Dharamshala, Himachal Pradesh 176215</p>
           <p><strong>Contact:</strong> </p>
           <div className="contact_details">
            <div>
              <FaWhatsapp />
              <a
                href="https://wa.me/919459575748"
                target="_blank"
                rel="noopener noreferrer"
              >
                9459575748
              </a>
            </div>
            <div>
              <FaPhoneAlt />
              <a href="tel:+919459575748">9459575748</a>
            </div>
          </div>

           <p><strong>Email:</strong> divineadventureholidays35@gmail.com</p>
           <p><strong>Working Hours:</strong> 24 - Hours</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27004.26370366919!2d76.29856557617885!3d32.21681318823619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b50df65bd7311%3A0x3e08bdb100c6dc10!2sDharamshala%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1751264635107!5m2!1sen!2sin"
             
            ></iframe>
          </div>
        </FooterLinks>
        
      </FooterContainer>

      <FooterBottom>
        &copy; {new Date().getFullYear()} Divine Adventure Holidays Tour & Travels. All Rights Reserved.
      </FooterBottom>
    </FooterWrapper>
  );
}
