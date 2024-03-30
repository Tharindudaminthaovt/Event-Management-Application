import React from 'react';
import Nav from './Nav';

const TicketConfirmation = () => {

  return (
    <div>
        <Nav />
        <div className='ticket-confirmation'>

            <div className='ticket-confirmation-left-main'>
                <div className='ticket-confirmation-left'>
                    <div className='ticket-c-left-top'>
                        <h3>Event name</h3>
                        <p>Date</p>
                        <p>Venue</p>
                        <p>time</p>
                    </div>
                    
                    <div className='ticket-c-left-price'>
                        <div>
                            <p>Ticket Type x 1</p>
                            <p className='ticket-c-bold'>Rs.2000</p>
                        </div>

                        <div>
                            <p>Booking fee</p>
                            <p className='ticket-c-bold'>Rs.0</p>
                        </div>
                    </div>

                    <div>
                        <h3>Total</h3>
                        <h3>Rs.2000</h3>
                    </div>
            </div>

                <button>Proceed to Pay</button>
            </div>

            <div className='ticket-confirmation-right'>
                <div className='ticket-confirmation-pickup'>
                    <h1>How to pick up your tickets</h1>

                    <div className='ticket-confirmation-pick-option'>
                        <input type="radio" name='option' id='option1'/>
                        <label htmlFor="option1">option 01</label>
                    </div>

                    <div className='ticket-confirmation-pick-option'>
                        <input type="radio" name='option' id='option2'/>
                        <label htmlFor="option2">option 02</label>
                    </div>
                </div>

                <div className='ticket-confirmation-instructions'>
                    <h1>Instructions</h1>
                    
                    <ul>
                        <li>Instruction 1</li>
                        <li>Instruction 2</li>
                        <li>Instruction 3</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default TicketConfirmation