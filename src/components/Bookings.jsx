import React, { useState } from 'react'

const Bookings = () => {
  const [ticketCount, setTicketCount] = useState(1);

  return (
    <div className='bookings'>
      <h1>Your Tickets</h1>

      {ticketCount == 0 ? <h3>No tickets available</h3>
        : <div>
            <TicketItem />
            <TicketItem />
            <TicketItem />
            <TicketItem />
            <TicketItem />
           </div> 
      }

    </div>
  )
}

export default Bookings

const TicketItem = () => {
  return(
    <div className='booking-item'>
      <div>
        <h4>Event name</h4>
        <p>Date</p>
        <p>Venue</p>
      </div>

      <div>
        <h4>No of tickets</h4>
        <p>2</p>
      </div>

      <div>
        <h4>Ref No</h4>
        <p>1112</p>
      </div>

      <button>See more</button>
    </div>
  )
}
