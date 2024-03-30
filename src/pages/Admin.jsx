import React, { useEffect, useState } from 'react';
import Logo from '../assets/LOGO.png';
import './Admin.css';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const Admin = () => {
    const [eventData, setEventData] = useState([]);

    const readData = async () => {
        const querySnapshot = await getDocs(collection(db, "Events"));
        const uniqueEventData = new Set();
        querySnapshot.forEach((doc) => {
            uniqueEventData.add(doc.data());
        });

        setEventData([...uniqueEventData]);
    }

    console.log(eventData);

    useEffect(() => {
        readData();
    }, [])

  return (
    <div className='admin'>
        <div className='admin-top'>
            <Link to="/"><img src={Logo} alt="logo" /></Link>
            <button>Logout</button>
        </div>

        <div className='admin-nav'>
            <button value='requests'>Requests</button>
        </div>

        <div className='admin-components'>
            {eventData.map(data => {
               return <Requests
                    name={data.eventName}
                    date={data.date}
                    venue={data.locationName}
                    email={data.eventManager}
                />
            })}
        </div>
    </div>
  )
}

export default Admin

const Requests = ({name, date, venue, email}) => {
    return (
        <div className='admin-requests'>
            <div>
                <p>{name}</p>
                <p>{date}</p>
                <p>{venue}</p>
            </div>

            <p>No of tickets : 100</p>

            <p>{email}</p>

            <button>Approve</button>
            <button>Reject</button>
            <button>See more</button>
        </div>
    )
}