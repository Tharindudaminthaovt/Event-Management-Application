import React, { useEffect, useState } from 'react';
import './Tickets.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import arrow from '../assets/arrow.png';
import plus from '../assets/plus.png';
import minus from '../assets/minus.png';
import { useNavigate } from 'react-router-dom';

const TicketSelection = () => {
    const navigate = useNavigate();
    const [ticketsCount, setTicketCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState(0);
    const [amount, setAmount] = useState(0);

    const plusFunc = () => {
        setTicketCount(ticketsCount + 1)
    }

    const minusFunc = () => {
        ticketsCount != 0  ? setTicketCount(ticketsCount -1) : alert("Cannot reduce 0");
    }

    const handleNavigate = () => {
        navigate('/ticketconfirmation')
    }

    const handleChange = (e) => {
        setSelectedItem(e.target.value);
    }   

    console.log(selectedItem)

    useEffect(() => {
        setAmount(selectedItem * ticketsCount)
    }, [ticketsCount, selectedItem])

  return (
    <div className='ticket-selection'>
        <Nav />

        <Link to='/event'><img src={arrow} alt="back arrow" className='backbtn' /></Link>

        <div className='tickets-select'>
            <div className='ticket-selection-main'>
                <h2>Select preferred ticket</h2>

                <div className='ticket-selection-card'>
                    <div>
                        <input type="radio" name='option1' id='selection' value={1000} onChange={handleChange}/>
                        <h3>Option 01</h3>
                    </div>
                    
                    <h3>rs.1000</h3>
                </div>

                <div className='ticket-selection-card'>
                    <div>
                        <input type="radio" name='option1' id='selection' value={2000} onChange={handleChange}/>
                        <h3>Option 02</h3>
                    </div>
                    
                    <h3>rs.2000</h3>
                </div>

                <div className='ticket-selection-card'>
                    <div>
                        <input type="radio" name='option1' id='selection' value={3000} onChange={handleChange}/>
                        <h3>Option 03</h3>
                    </div>
                    
                    <h3>rs.3000</h3>
                </div>

                <div className='select-tickets-count'>
                        <p>Number of tickets</p>
                        <button className='plus-and-minus' onClick={minusFunc}><img src={minus} alt="" /></button>
                        <p>{ticketsCount}</p>
                        <button className='plus-and-minus' onClick={plusFunc}><img src={plus} alt="" /></button>
                </div>

            </div>

            <div className='ticket-selection-summery'>
                <h2>Ticket Summery</h2>

                <div className='ticket-summery-details'>
                    <div className='ticket-summery-details-top'>
                        <h3>Event name</h3>
                        <p>Wed, 01 Apr, 2025</p>
                        <p>5pm onwards</p>
                        <p>Location</p> 
                    </div>
                    
                    <hr />

                    <div className='ticket-summery-details-bottom'>
                        <div>
                            <p>Option 01</p>
                            <p>{ticketsCount} x Rs.{selectedItem}</p>
                        </div>

                        <div>
                            <h3>Total</h3>
                            <h4>Rs. {amount}</h4>
                        </div>
                    </div>
                </div>

                <button onClick={handleNavigate}>Proceed to checkout</button>
            </div>
        </div>


    </div>
  )
}

export default TicketSelection