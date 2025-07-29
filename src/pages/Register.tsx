import React, { useEffect } from 'react';
import { useState } from 'react';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios'
// import { useGoogleLogin } from '@react-oauth/google';

import { useNavigate } from 'react-router';
import { useAppContext } from '../hooks/useAppContext';

export const Register : React.FC = () => {
  const { setTokenCredential, signCurrentState } = useAppContext()
  
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>();
  const [PasswordError, setPasswordError] = useState<string>();
  
  const [password, setPassword] = useState<string>("");

  const [errorHandle,setErrorHandle] = useState(null);
  const navigate = useNavigate()

  // const isPasswordValid = validatePassword()
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

  // Backend Register Function
  const register = async() => {


    try {
      const response = await axios.post(`${VITE_API_URL}/register`, 
        {
          //  username:  userName,
            email: email,
           password: password,
         },{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials : true
         }
      )
      console.log(response);
      
      setTokenCredential(response.data.token)
      localStorage.setItem('Token', response.data.token)
      navigate('/')
    } catch (error : any) {
      setErrorHandle(error.response?.data.error)

    }
  }

  const handleSubmit =  () => {
    const isEmailValid = validateEmail(email ?? '')
    const isPasswordValid = validatePassword(password)
    // const isUserNameValid = userName && userName.length >= 3
    
    // if(!userName || userName.length < 3) {
    //   setUsernameError('Please enter a valid name')
    //   return
    // }
    if(!isEmailValid || !isPasswordValid) { 
      return ''
    }
    if(isEmailValid && isPasswordValid ) {
      register()
    }
  }

  useEffect(() => {
    setErrorHandle(null)
  }, [signCurrentState])


  return (
    <div className='h-screen w-screen flex items-center justify-items-center bg-orange-100'>
    <div className='w-[90%] sm:w-1/3 h-fit mx-auto rounded-4xl px-12 py-6 bg-white shadow-2xl'>
      <h1 className='font-black text-4xl leading-tight text-center'>Create an account</h1> 

    {/* GOOGLE REGISTER DEACTIVATED */}
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

      {/* <label htmlFor="username" className='leading-tight font-black mb-2'>Name</label>
      <input id='username' type="text" placeholder="Type name" onChange={(e) => {setUserName(e.currentTarget.value); 
        
      }} className='rounded-xl border px-6 py-2 ' />
      <p className='text-red-500 text-left mt-2'>{userNameError && <p> {userNameError} </p>}</p> */}



      <label htmlFor="email" className='leading-tight font-black mb-2 mt-5'>Email</label>
      <input id='email' type="Type Email" placeholder="Email" onChange={(e) => {;
        setEmail(e.currentTarget.value)
      }}  className='rounded-xl border px-6 py-2 ' />
      <p className='text-red-500 text-left mt-2'>{emailError && <p> {emailError} </p>}</p>


      <label htmlFor="password" className='leading-tight font-black mb-2 mt-5'>Password</label>
      <input id='password' type="password" placeholder="Password" onChange={(e) => {setPassword(e.currentTarget.value)}}  className='rounded-xl border px-6 py-2 flex '/>

      <p className='text-red-500 text-left mt-2'>{PasswordError && <p> {PasswordError} </p>}</p>


    {errorHandle === 'Email already exists' && <p className='text-center text-md mt-5'>{errorHandle},Please
    <span className='hover:cursor-pointer  text-amber-500 font-bold' onClick={() => {navigate('/Login')}}> Log in here</span> </p>}


      <button type="submit" className='bg-orange-500 text-white px-3 py-2.5 sm:px-6 sm:py-3  mb-2 mt-5 hover:cursor-pointer rounded-xl font-bold text-xl'>Create an account</button> 

    </form>
 
    

    <p className='text-center font-bold '>Already have any account? 
    <span className='hover:cursor-pointer  text-amber-500 ' onClick={() => {navigate('/Login')}}> Log in here</span></p> 


    </div>

    </div>

  )
  

}
