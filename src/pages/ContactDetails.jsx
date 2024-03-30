import React, { useEffect, useState } from 'react'
import back from '../assets/arrow.png';
import { Link } from 'react-router-dom';
import './Login.css';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ContactDetails = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        address: "",
        contact: "",
        email: sessionStorage.email,
        username: "",
        userType: "",
        nic: "",
    })

    const navigate = useNavigate();

    const handleSignIn = () => {

            addDoc(collection(db, "Users"), {
                username: userDetails.name,
                email: userDetails.email,
                NIC: userDetails.nic,
                address: userDetails.address,
                contactNum: userDetails.contact,
                userType: userDetails.userType,
            })
            .then(function() {
                console.log("Document successfully written")
                navigate('/')
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    const handleChange = (e) => {
        setUserDetails(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name] : e.target.value
            }
        })
    }

    const cancelSignUp = async () => {
        await signOut(auth);
        sessionStorage.removeItem("email");
        navigate('/');
    }

    useEffect(() => {
        
    }, [])

  return (
    <div className='contactDetails'>
        <div>
            <button className='back-btn-details' onClick={cancelSignUp}><Link><img src={back} alt="" /></Link></button>
            <h1>Enter your details</h1>

            <p>Name</p>
            <input type="text" name='name' onChange={handleChange}/>

            <br />

            <p>Contact Number</p>
            <input type="number"  name='contact' onChange={handleChange}/>

            <br />

            <p>NIC</p>
            <input type="number" name='nic' onChange={handleChange}/>

            <br />

            <p>Address</p>
            <input type="text" name='address' onChange={handleChange}/>

            <br />

            <p>Sign in as a</p>
            <select name="userType" id="userType" onChange={handleChange}>
                <option value=""></option>
                <option value="customer">Customer</option>
                <option value="event manager">Event Manager</option>
            </select>

            <br />

            <button onClick={handleSignIn}>Register</button>
        </div>

    </div>
  )
}

export default ContactDetails