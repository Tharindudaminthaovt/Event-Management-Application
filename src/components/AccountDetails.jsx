import React, { useEffect, useState } from 'react';
import '../pages/Profile.css';
import userimg from '../assets/user.png'
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AccountDetails = ({name, email, nic, address, contactNumber, userType}) => {

  return (
    <div className='account-details'>
        {/* address, email, nic, usertype, organization, contact number, userimage  */}

        <img src={userimg} alt="profile-image" />

        <div className='account-details-dt'>
            <div>
                <h4>Name</h4>
                <p>{name}</p>
            </div>

            <div>
                <h4>Email</h4>
                <p>{email}</p>
            </div>

            <div>
                <h4>NIC</h4>
                <p>{nic}</p>
            </div>

            <div>
                <h4>Address</h4>
                <p>{address}</p>
            </div>

            <div>
                <h4>Contact Number</h4>
                <p>{contactNumber}</p>
            </div>

            <div>
                <h4>User Type</h4>
                <p>{userType}</p>
            </div>
        </div>
        
        <button>Edit</button>
    </div>
  )
}

export default AccountDetails