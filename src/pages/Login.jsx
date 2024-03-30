import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import google from '../assets/google.png';
import { auth ,provider } from '../firebaseConfig'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredentials);
      const user = userCredentials.user;
      sessionStorage.setItem("email", user.email);
      navigate('/');
    } catch (err){
      setError(err)
      console.log(error)
    }
    
  }

  const handleLoginGoogle = (e) => {
    e.preventDefault();
  
      try {
        signInWithPopup(auth, provider).then((data) => {
          sessionStorage.setItem("email", data.user.email);
          sessionStorage.setItem("name", data.user.displayName);
          navigate('/')
        })
        
      } catch(error) {
        alert(error)
      }
  }


  return (
    <div className='login-container'>
      <div className='login'>
        {/* <img src={Logo} alt="logo" /> */}
        <center><h1>Login</h1></center>

        <div className='login-form'>
          <p>Email</p>
          <input type="email" placeholder='Enter your email' name='email' onChange={(e) => {setEmail(e.target.value)}}/>

          <p>Password</p>
          <div>
            <input type="password" placeholder='Enter your password' name='password' onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <div className='login-links'>
            <a href=""><Link>Don't have an account?</Link></a>
            <a href=""><Link>Forgot password?</Link></a>
          </div>
        </div>

        <button className='login-button' onClick={handleLogin}>Login</button>

        <br />

        <button className='login-with-google' onClick={handleLoginGoogle}>Login with Google <img className='login-google' src={google} alt="google logo" /></button>
      </div>
    </div>
  )
}

export default Login