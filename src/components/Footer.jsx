import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import logo from '../assets/LOGO.png';
import facebook from '../assets/facebook.png';
import twitter from '../assets/twitter.png';

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer--details'>
            <div className='footer--details-popular'>
                <h4>Popular events</h4>
                <a href="">Link 1</a>
                <a href="">Link 2</a>
                <a href="">Link 3</a>
            </div>
            <div className='footer--details-pages'>
                <h4>Pages</h4>
                <a href=""><Link to="/">Home</Link></a>
                <a href=""><Link to='/search'>Search</Link></a>
                <a href=""><Link to='/schedule'>Schedule</Link></a>
                <a href=""><Link to='/contactus'>Contact Us</Link></a>
            </div>

            <div className='footer--details-social'>
                <img src={logo} alt="logo" />
                <div className='footer--social-icons'>
                    <a href=""><img src={facebook} alt="" /></a>
                    <a href=""><img src={twitter} alt="" /></a>
                </div>
                <a href=''>contact@gmail.com</a>
            </div>
        </div>

        <p>All rights reserved &copy;</p>
    </div>
  )
}

export default Footer