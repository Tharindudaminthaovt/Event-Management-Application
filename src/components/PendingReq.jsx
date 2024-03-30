import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PendingReq = () => {
  const [pending, setPending] = useState([]);

  const getpendingdata = async () => {
    const querySnapshot = await getDocs(collection(db, "Events"));
    const uniqueEventData = new Set();
    querySnapshot.forEach((doc) => {
      uniqueEventData.add(doc.data());
    })

    setPending([...uniqueEventData]);
  }

  useEffect(() => {
    getpendingdata();
  }, [])

  console.log(pending)
  return (
    <div className='pendingreq-card'>
        <h1>Your pending event requests</h1>
        
        {pending.map((data) => {
          if(data.eventManager == sessionStorage.email && data.pending == true) {
            return <RequestItem 
              name={data.eventName}
              date={data.date}
              venue={data.locationName}
            />
          }
        })}
        
    </div>
  )
}

export default PendingReq

const RequestItem = ({name, date, venue}) => {
    return(
        <div className='booking-item'>
      <div>
        <h4>{name}</h4>
        <p>{date}</p>
        <p>{venue}</p>
      </div>

      <div>
        <h4>No of tickets types</h4>
        <p>2</p>
      </div>

      <div>
        <h4>Request ID</h4>
        <p>1112</p>
      </div>

        <div>
            <button>Delete</button>

            <button>See more</button>
        </div>    
    
    </div>
    )
}