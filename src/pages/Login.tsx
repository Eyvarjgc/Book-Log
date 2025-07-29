import React, { useEffect } from 'react';
import { useState } from 'react';
const VITE_API_URL = import.meta.env.VITE_API_URL;
// import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

import { useNavigate } from 'react-router';
import { useAppContext } from '../hooks/useAppContext';

export const Login : React.FC = () => {
  const { setTokenCredential, signCurrentState } = useAppContext()
  
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [errorHandle,setErrorHandle] = useState(null);
  const navigate = useNavigate()

    const [PasswordError, setPasswordError] = useState<string>();
    const [emailError, setEmailError] = useState<string>();

  // const GoogleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async codeResponse => {
  //       console.log(codeResponse);
  //       const tokens = await fetch(
  //           'http://localhost:5000/auth/google', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ code: codeResponse })
  //           });

  //       console.log(tokens);
  //   },
  //   onError: errorResponse => console.log(errorResponse),
  // });

  // Backend Login Function
  const Login = async() => {
    try {
      const response = await axios.post(`${VITE_API_URL}/login`, { 
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      
      setTokenCredential(response.data.token)
      localStorage.setItem('Token', response.data.token)
      navigate('/')

      
    } catch (error: any) {
      console.log(error.response);
      
      setErrorHandle(error.response?.data.error)
    }
  }
  const validateEmail = (email : string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return false;
        }
        setEmailError('');
        return true;
    };

   const validatePassword = (password : string) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return false;
        }
        // Add more complex password rules (e.g., special characters, numbers)
        setPasswordError('');
        return true;
    };

  const handleSubmit =  () => {
    const isEmailValid = validateEmail(email ?? '')
    const isPasswordValid = validatePassword(password)

    
    
    if(!isEmailValid || !isPasswordValid) { 
      console.log('not valid');
      
    }
    if(isEmailValid && isPasswordValid) {
      Login()
    }
  }
  


  useEffect(() => {
    setErrorHandle(null)
  }, [signCurrentState])

  

  return (
    <div className='h-screen w-screen flex items-center justify-items-center bg-orange-100'>
      <div className=" w-[90%] sm:w-1/3 px-6 py-3  h-fit mx-auto rounded-4xl sm:px-12 sm:py-6 bg-white shadow-2xl">

      <h1 className='font-black text-4xl leading-tight text-center'>Login</h1>

      {/* GOOGLE LOGIN DEADTIVATED */}
      {/* <button
              onClick={() => GoogleLogin()}
              className="w-full border px-4 py-2  flex items-center gap-2 hover:cursor-pointer  rounded-xl  text-xl mx-auto my-4 justify-center "
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                className="w-5"
              />
              Sign in with Google
      </button>
    <p className='text-center text-2xl'>or</p> */}

    <form action="" onSubmit={(e) => {e.preventDefault(); handleSubmit() ;}}
      className='flex flex-col'>

      <label htmlFor="email" className='leading-tight font-black mb-2'>Email</label>
      <input id='email' type="Type Email" placeholder="Email" onChange={(e) => {setEmail(e.currentTarget.value)}}  className='rounded-xl border px-6 py-2 ' />
      <p className='text-red-500 text-left mt-2'>{emailError && <p> {emailError} </p>}</p>


      <label htmlFor="password" className='leading-tight font-black mb-2 mt-5'>Password</label>
      <input id='password' type="password" placeholder="Password" onChange={(e) => {setPassword(e.currentTarget.value)}}  className='rounded-xl border px-6 py-2 '/>
      <p className='text-red-500 text-left mt-2'>{PasswordError && <p> {PasswordError} </p>}</p>

      {/* {errorHandle === 'User does not exists' && <p className='text-center text-md mt-5'>{errorHandle},Please */}
      {errorHandle  && <p className='text-center text-md mt-5'>{errorHandle},Please

    <span className='hover:cursor-pointer  text-amber-500 font-bold' onClick={() => {navigate('/sign up')}}> <br /> Create an account</span> </p>}
          <button type="submit" className='bg-orange-500 text-white px-6 py-3  mb-2 mt-5 hover:cursor-pointer rounded-xl font-bold text-xl'>Login</button> 
    </form>



    <p className='text-center font-bold '>Dont't have any account?
    <span className='hover:cursor-pointer  text-amber-500 ' onClick={() => {navigate('/sign up')}}> Sign up here</span></p> 
 



      </div>

    </div>

  )
  

}
