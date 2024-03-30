import React, { useState, useEffect } from 'react';
import './Event.css';
import Nav from '../components/Nav';
import background from '../assets/background.png';
import cover from '../assets/cover.png';
import Footer from '../components/Footer';
import amaradewa from '../assets/amaradewa.jpg';
import TicketSelection from '../components/TicketSelection';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig.jsx';

const Event = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({
        name: "",
        venue: "",
        time: "",
        about: "",
        location: "",
        locationLink: "",
        banner: "",
        poster: ""
    });

    const handleNavigate = () => {
        navigate('/ticketselection')
    }

    const getEvents = async () => {
        const querySnapshot = await getDocs(collection(db, "Events"));
        const uniqueEventData = new Set();
    
        querySnapshot.forEach((doc) => {
          uniqueEventData.add({
            id: doc.id,
            data: doc.data()
          })
        })
    
        setEvents([...uniqueEventData])
    }

    useEffect(() => {
        getEvents();
    },[])

  return (
    <div className='event'>
        <Nav />

        <div className='event--top'>
            <img src={background} alt="event banner" className='event--top-banner'/>

            <img src={cover} alt="event poster" className='event--top-poster'/>
        </div>

        <h1>Event name</h1>

        <div className='event--top-details'>

            <div className='event--top-details-main'>
                <div className='event--top-details-1'>
                    <p><span>Date: </span>01/01/2024</p>
                    <p><span>Venue: </span>colombo</p>
                    <p><span>Time: </span>7pm onwards</p>    
                    <p>price</p>
                </div>
                
                <p className='event--top-details-2'><span>About event: </span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
            </div>

            <button onClick={handleNavigate}>BUY TICKETS</button>
        </div>

        <h1>Artists</h1>

        <div className='event--mid-details'>
            <div className='event-artists-row'>
                <div className='event--mid-details-artist'>
                    <img src={amaradewa} alt="artist" />
                    <p>Name</p>
                </div>

                <div className='event--mid-details-artist'>
                    <img src={amaradewa} alt="artist" />
                    <p>Name</p>
                </div>

                <div className='event--mid-details-artist'>
                    <img src={amaradewa} alt="artist" />
                    <p>Name</p>
                </div>
            </div>

            <div className='event--mid-details-location'>
                <h4>address</h4>
                <div></div>
            </div>
        </div>

        <div className='event--bottom-details'>
            <h3>Terms and conditions</h3>
            <ul>
                <li>list item 1</li>
                <li>list item 2</li>
                <li>list item 3</li>
            </ul>
        </div>

        <Footer />
    </div>
  )
}

export default Event