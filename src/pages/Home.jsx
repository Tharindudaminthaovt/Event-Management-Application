import React, { useEffect, useState } from 'react';
import './Home.css';
import Nav from "../components/Nav.jsx";
import ImageSlider from '../components/ImageSlider.jsx';
import EventCard from '../components/EventCard.jsx';
import Footer from '../components/Footer.jsx';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [slides, setSlides] = useState([
    {url: "https://mytickets.lk/contents/events/poster/Aluth%20kalawak%20event%20banner.jpg", header: "bravo"},
    {url: "https://pbs.twimg.com/media/DbE6yNvUwAAVucH.jpg:large", header: "bravo"},
  ]);

  const [events, setEvents] = useState([]);

  const [cardData, setCardData] = useState([{
    date: "29",
    month: "Feb",
    rating: "4.8",
    img: "../assets/cover.png",
    Title: "example event",
    location: "colombo",
    category: "musical"
  },
  {
    date: "29",
    month: "Feb",
    rating: "4.8",
    img: "../assets/cover.png",
    Title: "example event",
    location: "colombo",
    category: "musical"
  },
  {
    date: "29",
    month: "Feb",
    rating: "4.8",
    img: "../assets/cover.png",
    Title: "example event",
    location: "colombo",
    category: "musical"
  },
  {
    date: "29",
    month: "Feb",
    rating: "4.8",
    img: "../assets/cover.png",
    Title: "example event",
    location: "colombo",
    category: "musical"
  },
  {
    date: "29",
    month: "Feb",
    rating: "4.8",
    img: "../assets/cover.png",
    Title: "example event",
    location: "colombo",
    category: "musical"
  },]);

  const navigate = useNavigate();

  const eventCount = (cat) => {
    let count = 0;
    for(let i = 0; i < events.length; i++) {
      if(events[i].data.Category == cat) {
        count++
      }
    }

    return count;
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

  const handleNavigate = () => {
    navigate('/event')
  }

  console.log(events)

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div>
      <Nav />
      
      <ImageSlider slides={slides}/>

      <div className='home--cards-row'>
        {eventCount("Musical") !=0 ? <h1>Musical Events</h1> : <></>}
        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Musical"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              location={item.data.locationName}
              image={item.data.eventPoster}
              click={handleNavigate}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("Comedy show") !=0 ? <h1>Comedy Shows</h1> : <></>}
        
        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Comedy show"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              image={item.data.eventPoster}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("Workshop") !=0 ? <h1>Workshops</h1> : <></>}
        
        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Workshop"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              image={item.data.eventPoster}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("Performance") !=0 ? <h1>Performences</h1> : <></>}

        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Performance"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              image={item.data.eventPoster}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("Conferences") !=0 ? <h1>Conferences</h1> : <></>}

        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Conferences"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              image={item.data.eventPoster}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("Award show") !=0 ? <h1>Award Shows</h1> : <></>}
        
        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "Award show"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              image={item.data.eventPoster}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <div className='home--cards-row'>
      {eventCount("other") !=0 ? <h1>Other</h1> : <></>}

        <div className='home--cards'>
        {events.map((item) => {
          if(item.data.Category == "other"){
            return <EventCard 
              key={item.id}
              eventId={item.id}
              date={item.data.date}
              rating={""}
              title={item.data.eventName}
              location={item.data.locationName}
            />
          }
        })}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home