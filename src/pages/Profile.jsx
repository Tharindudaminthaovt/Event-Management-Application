import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import './Profile.css';
import AccountDetails from '../components/AccountDetails';
import Bookings from '../components/Bookings';
import Settings from '../components/Settings';
import AddEvent from '../components/AddEvent';
import PendingReq from '../components/PendingReq';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Profile = () => {
    const [isManager, setIsManager] = useState(true);
    const [currentComponent, setCurrentComponent] = useState("account");

    const navigate = useNavigate();

    const changeCurrentComponent = (e) => {
        if(currentComponent != e.target.value) {
            setCurrentComponent(e.target.value);
        }
    }

    const handleLogout = async () => {

        await signOut(auth);
        sessionStorage.removeItem("email");
        navigate('/')
    }

    const [userData, setUserData] = useState([]);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        nic: "",
        address: "",
        contactNumber: "",
        userType: ""
    })

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        /* console.log(doc.id, " => ", doc.data()); */
            setUserData(prevData => [...prevData, doc.data()])
        });
    }

    const addProfielData = () => {
        for(let i = 0; i < userData.length; i++) {
            if(userData[i].email == sessionStorage.email) {
                setProfileInfo({
                    name: userData[i].username,
                    email: sessionStorage.email,
                    nic: userData[i].NIC,
                    address: userData[i].address,
                    contactNumber: userData[i]. contactNum,
                    userType: userData[i]. userType
                })

                if(userData[i].userType == "event manager"){
                    setIsManager(true)
                } else {
                    setIsManager(false)
                }
            }
        }
    }


    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        addProfielData();
    }, [userData])

  return (
    <div className='profile'>
        <Nav />
        <div className='profile-details'>
            <div className='profile-left-navigation'>
                <div>
                    <button onClick={changeCurrentComponent} value="account">Account details</button>
                    <button onClick={changeCurrentComponent} value="history">Booking History</button>
                    <button onClick={changeCurrentComponent} value="settings">Settings</button>
                    {isManager ? <button onClick={changeCurrentComponent} value="add">Add Event</button> : <></>}
                    {isManager ? <button onClick={changeCurrentComponent} value="pending">Pending event requests</button> : <></>}
                </div>
                
                <button className='profile-signout' onClick={handleLogout}>Sign out</button>
            </div>

            <div className='profile-right'>
                {
                    currentComponent == "account" ? <AccountDetails 
                        name={profileInfo.name}
                        nic={profileInfo.nic}
                        address={profileInfo.address}
                        contactNumber={profileInfo.contactNumber}
                        userType={profileInfo.userType}
                        email={profileInfo.email}
                    /> 
                    : currentComponent == "history" ? <Bookings />
                    : currentComponent == "settings" ? <Settings />
                    : currentComponent == "add" ? <AddEvent />
                    : currentComponent == "pending" ? <PendingReq />
                    : <></>
                }
            </div>
        </div>
        
    </div>
  )
}

export default Profile