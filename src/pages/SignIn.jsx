import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import google from '../assets/google.png';
import { auth, provider } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [error, setError] = useState('');

  const [googleuser, setGoogleUser] = useState('');

  const navigator = useNavigate();

  const handleSignIn  = async (e) => {
    e.preventDefault();

    if(password == secondPassword) {
      try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        sessionStorage.setItem("email", user.email);
        navigator('/contactdetails');

      } catch(error) {
        setError(error)
        alert(error);
      }
    } else {
      alert("Passwords does not match");
      setPassword('')
      setSecondPassword('')
    }
  }

  const handleGoogleSignin = (e) => {
    e.preventDefault();

    try {
      signInWithPopup(auth, provider).then((data) => {
        setGoogleUser(data.user.email)
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("name", data.user.displayName);
        navigator('/contactdetails')
      })
      
    } catch(error) {
      alert(error)
    }
  }

  return (
    <div className='login-container'>
        <div className='login'>
        {/* <img src={Logo} alt="logo" /> */}
        <center><h1>Sign In</h1></center>

        <div className='login-form'>
          <p>Email</p>
          <input type="email" placeholder='Enter your email' name='email' onChange={(e) => {setEmail(e.target.value)}}/>

          <p>Password</p>
          <div>
            <input type="password" placeholder='Enter your password' name='password' onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <p>Re-enter password</p>
          <input type="password" placeholder='Re-enter your password' onChange={(e) => {setSecondPassword(e.target.value)}}/>

        </div>

        <div className='show-password'>
            <input type="checkbox" name='showpw' id='showpw'/>
            <label htmlFor="showpw">Show password</label>
        </div>

        <button className='login-button' onClick={handleSignIn}>Sign In</button>

        <br />

        <button className='login-with-google' onClick={handleGoogleSignin}>Sign In with Google <img className='login-google' src={google} alt="google logo" /></button>
        </div>
    </div>
  )
}

export default SignIn