import React, { useState } from 'react';
import './Schedule.css';
import Nav from '../components/Nav';
import EventCard from '../components/EventCard.jsx';
import '../components/EventCard.css'
import Footer from '../components/Footer.jsx';
import { db } from '../firebaseConfig'
import { getDocs,collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


const Schedule = () => {
  const[eventList,setEventList]=useState([]);

  const eventsCollectionRef=collection(db,"Events");
  const navigate = useNavigate();


    const getEventList= async()=>{
  try{

    const data=await getDocs(eventsCollectionRef);
    const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}))
    setEventList(filteredData)

  }catch(err){
    console.error(err);
  }
};
getEventList();

  const handleNavigate = () => {
    navigate('/event')
  }

  
 // Function to get the start and end dates of the current week
 const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, 6 for Saturday
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday
  const startOfWeek = new Date(today.setDate(diff));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // 6 days added for the end of the week
  return { start: startOfWeek, end: endOfWeek };
};

// Filter cardData to get events for the current week
const { start: startOfWeek, end: endOfWeek } = getCurrentWeekDates();



// Function to categorize events by date
const categorizeEventsByDate = () => {
  const categorizedEvents = {
    today: [],
    tomorrow: [],
    nextDays: {}
  };

  eventList.forEach((event) => {
    const eventDate = new Date(event.date);
    if (isSameDate(eventDate, new Date())) {
      categorizedEvents.today.push(event);
    } else if (isSameDate(eventDate, getNextDay())) {
      categorizedEvents.tomorrow.push(event);
    } else {
      const eventDateString = eventDate.toISOString().split('T')[0];
      if (!categorizedEvents.nextDays[eventDateString]) {
        categorizedEvents.nextDays[eventDateString] = [];
      }
      categorizedEvents.nextDays[eventDateString].push(event);
    }
  });

  return categorizedEvents;
};

// Function to check if two dates are on the same day
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Function to get the date of the next day
const getNextDay = () => {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  return nextDay;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
  const year = date.getFullYear();
  return `${day}, ${month}, ${year}`;
};

const { today, tomorrow, nextDays } = categorizeEventsByDate();

  return (
    <div>
    <Nav />
    <div className="content">
      <div className='home--cards-row'>
        <h1>Today</h1>
        <div className='home--cards'>
          {today.map((item, index) => (
            <EventCard 
              key={index}
              //date={item.date}
              //month={item.month}
              rating={item.rating}
              image={item.img}
              title={item.eventName}
              location={item.locationName}
             color="green"
             mainDateDisplay='none'
             mainDetailsPadding='2.5rem'
             price={item.price}
             click={handleNavigate}
            />
          ))}
        </div>
      </div>

      <div className='home--cards-row'>
        <h1>Tomorrow</h1>
        <div className='home--cards'>
          {tomorrow.map((item, index) => (
            <EventCard 
              key={index}
              // date={item.date}
              // month={item.month}
              rating={item.rating}
              image={item.img}
              title={item.eventName}
              location={item.locationName}
              color='default'
              mainDateDisplay='none'
              mainDetailsPadding='2.5rem'
              price={item.price}
              click={handleNavigate}
            />
          ))}
        </div>
      </div>

      {Object.entries(nextDays).map(([date, events]) => (
        <div className='home--cards-row' key={date}>
          <h1>{formatDate(date)}</h1>
          <div className='home--cards'>
            {events.map((item, index) => (
              <EventCard 
                key={index}
                // date={item.date}
                // month={item.month}
                rating={item.rating}
                image={item.img}
                title={item.eventName}
                location={item.locationName}
                mainDateDisplay='none'
                mainDetailsPadding='2.5rem'
                price={item.price}
                click={handleNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);
}
export default Schedule;
