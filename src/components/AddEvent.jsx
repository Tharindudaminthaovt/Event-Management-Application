import React, { useEffect, useState } from 'react';
import plus from '../assets/plus.png';
import { db, storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { set } from "firebase/database";

const AddEvent = () => {
  const [noOfTicketTypes, setNoOfTicketTypes] = useState(1);
  const [banner, setBanner] = useState();
  const [poster, setPoster] = useState();
  const [bannerRef, setBannerRef] = useState('');
  const [posterRef, setPosterRef] = useState('');
  const [idText, setIdText] = useState('');
  const [dataset, setDataset] = useState({
    name: "",
    date:  "",
    category: "",
    startingTime: "",
    about: "",
    locationText: "",
    locationLink: "",
    pending: true,
    eventManager: sessionStorage.email,
  });

  const [ticketDataArray, setTicketDataArray] = useState([]);

  const numberOfTickets = () => {
    setNoOfTicketTypes(noOfTicketTypes + 1)
  }

  console.log(banner)
  console.log(poster)

  const handleRequest = () => {
    const storageRef = ref(storage, banner.name);
    uploadBytes(storageRef, banner).then((snapshot) => {
      console.log("Successfully uploaded");
      getDownloadURL(storageRef).then((url) => {
        setBannerRef(url)
      })
      console.log(bannerRef)
    })

    const storageRef2 = ref(storage, poster.name);
    uploadBytes(storageRef2, poster).then((snapshot) => {
      console.log("Successfully uploaded poster");
      getDownloadURL(storageRef2).then((url) => {
        setPosterRef(url)
      })
      console.log(posterRef)
    })

    addDoc(collection(db, "Events"), {
      Category: dataset.category,
      about: dataset.about,
      date: dataset.date,
      eventBanner: bannerRef,
      eventPoster: posterRef,
      eventName: dataset.name,
      location: dataset.locationLink,
      locationName: dataset.locationText,
      time: dataset.startingTime,
      pending: true,
      eventManager: dataset.eventManager
    })
    .then(function() {
      console.log("document successfully written")
    })
    .catch((error) => {
      console.log(error)
    })

  }

  const renderComponents = () => {
    const components = [];
    for (let i = 0; i < noOfTicketTypes; i++) {
      components.push(<AddTicketType key={i} />);
    }
    return components;
  }

  const handleChange = (e) => {
    setDataset(prevData => {
      return {
          ...prevData,
          [e.target.name] : e.target.value
      }
  })
  }

  console.log(dataset)

  useEffect(() => {
    renderComponents
  }, [noOfTicketTypes])

  return (
    <div className='add-event'>
      {/* Category, Terms, about, date, event banner, event poster, event name, location(in text), google maps location, time */}

      {/* Ticket types, ticket prices, starting ticket number, ending ticket number */}
      <h1>Event Request</h1>

      <div className='add-event-form'>
        <div>
          <p>Event Name</p>
          <input type="text" placeholder='Enter your event name' name='name' onChange={handleChange}/>
        </div>

        <div>
          <p>Event Date</p>
          <input type="date" name='date' onChange={handleChange}/>
        </div>

        <div>
          <p>Category</p>
          <select name="category" id="" onChange={handleChange}>
            <option value="">Select event category</option>
            <option value="Comedy show">Comedy show</option>
            <option value="Musical">Musical</option>
            <option value="Workshop">Workshop</option>
            <option value="Performance">Performance</option>
            <option value="Conference">Coference</option>
            <option value="Award show">Award show</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <p>Starting Time</p>
          <input type="time" name='startingTime' onChange={handleChange}/>
        </div>

        <div>
          <p>About</p>
          <textarea name="about" id="" cols="70" rows="10" onChange={handleChange}></textarea>
        </div>

        <div>
          <p>Location(In text)</p>
          <input type="text" placeholder='Enter event location' name='locationText' onChange={handleChange}/>
        </div>

        <div>
          <p>Location (Google maps link)</p>
          <input type="text" placeholder='Enter google maps location' name='locationLink' onChange={handleChange}/>
        </div>

        <div>
          <p>Event Banner</p>
          <input type="file" name='banner' accept='/image/*' onChange={(e) => {
            if(e?.target?.files == null) return
            setBanner(e?.target?.files[0]);
          }}/>
        </div>

        <div>
          <p>Event poster</p>
          <input type="file" name='poster' accept='/image/*' onChange={(e) => {
            if(e?.target?.files == null) return
            setPoster(e?.target?.files[0]);
          }}/>
        </div>
        
      </div>

      <div className='add-event-tickets'>
        <h3>Add Ticket types</h3>
        
        {renderComponents()}

        <div className='add-event-tickets-plus'>
          <p>Add another ticket type</p>
          <button onClick={numberOfTickets}><img src={plus} alt="add icon" /></button>
        </div>
        
      </div>

      <button className='add-event-request' onClick={handleRequest}>Request to post the event</button>

    </div>
  )
}

export default AddEvent

const AddTicketType = () => {
  return (
    <div className='add-event-tickets-form'>
    <div>
      <p>Ticket type name</p>
      <input type="text" placeholder='Ticket type name'/>
    </div>

    <div>
      <p>Ticket price</p>
      <input type="number" placeholder='Price'/>
    </div>

    <div>
      <p>Starting Ticket number</p>
      <input type="number" placeholder='Starting number of the tickets'/>
    </div>
    
    <div>
      <p>Ending Ticket Number</p>
      <input type="number" placeholder='Ending ticket number'/>
    </div>
  </div>
  )
}