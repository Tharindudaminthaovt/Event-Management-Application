import React, { useState, useRef } from 'react';
import Nav from '../components/Nav';
import './Contact.css';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const [data, setData] = useState({
    name: "",
    reason: "",
    email: "",
    contact: "",
    subject : ""
  })

  const handleChange = (e) => {
    setData(prevData => {
      return {
        ...prevData,
        [e.target.name] : e.target.value 
      }
    })
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_tgv32zu', 'template_8jsjotc', form.current, {
        publicKey: 'user_1EmyOwyigoDrWYCxMtTkJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("Successfully sent the message!");

          setData({
            name: "",
            reason: "",
            email: "",
            contact: "",
            subject : ""
          })

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  }

  return (
    <div>
      <Nav />
      <form ref={form} onSubmit={sendEmail}>
        <div className='contact'>
          <h2>Contact Us</h2>

            <div>
              <p>Reason</p>
              <input type="text" name='reason' value={data.reason} onChange={handleChange}/>
            </div>


            <div className='contact-mid'>
              <div>
                <p>Name (name of your organization)</p>
                <input type="text" name='name' value={data.name} onChange={handleChange}/>
              </div>
              
              <div>
                <p>Email</p>
                <input type="email" name='email' value={data.email} onChange={handleChange}/>
              </div>
              
              <div>
                <p>Contact Number</p>
                <input type="text" name='contact' value={data.contact} onChange={handleChange}/>
              </div>
            </div>

            <div>
              <p>Subject</p>
              <textarea name="subject" id="" cols="30" rows="10" value={data.subject} onChange={handleChange}></textarea>
            </div>

            <button type='submit'>Submit</button>
        </div>
      </form>
      

    </div>
  )
}

export default Contact
