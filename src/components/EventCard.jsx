import React, { useEffect, useState } from 'react';
import './EventCard.css';
import img from '../assets/cover.png';
import star from '../assets/Star.png';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';


const EventCard = ({date, month, rating, image, title, location, click, mainDateDisplay, mainDetailsPadding, eventId }) => {
  const [id, setID] = useState("");

  const setId = async () => {
    setID(eventId);
  }

  useEffect(() => {
    setId()
  }, [])

  return (
    <div className='eventcard' onClick={click}>

        <div className='eventcard--main'>

          <div className='eventcard--main-details' style={{ paddingLeft: mainDetailsPadding }}>
            <div className='eventcard--main-date' style={{ display: mainDateDisplay }}>
                {date} <br /> {month}
              </div>

              <div className='eventcard--main-rating'>
                <span>{rating}</span>
                <img src={star} alt="ratings-icon" />
              </div>
          </div>

            <img className='eventcard--poster' src={img} alt="event-poster" />
        </div>

        <h3>{title}</h3>
        <p>{location}</p>
        <p>Rs. 500</p>
    </div>
   
  )
}
EventCard.propTypes = {
  mainDateDisplay: PropTypes.string.isRequired,
  mainDetailsPadding:PropTypes.string.isRequired,
};

export default EventCard
