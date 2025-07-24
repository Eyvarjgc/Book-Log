import './index.css'
import { useEffect , useState} from 'react'
import axios from 'axios'

import { Navbar } from './pages/Navbar'
import { Outlet } from 'react-router';
import { Search } from './components/Search';
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router';
import { LoginButton } from './components/LoginButton';
import { useAppContext } from './hooks/useAppContext';
import sideBar from '/public/sideBar.png'

const VITE_API_URL = import.meta.env.VITE_API_URL 

function App() {

  const {tokenCredential, setUserInfo, userInfo,
     userFavoriteError,
    setUserFavoritError} = useAppContext()
  // const {data, loading, error, response} = useAuthApi()


  const navigate = useNavigate()
  const [location, setLocation] = useState<string>('')
  const locationURL = useLocation()
  const [tokenError, setTokenError] = useState<string>('')

  const [activeSideBar, setActiveSideBar] = useState<boolean>(false)


  // Auth the user and Refresh token
  // useEffect(() => {
  //   const fetchProfile = async() => {
  //     const token = localStorage.getItem("Token");
      
  //     if(!token) {
  //       setTokenError('No token');
  //       return;
  //     }
  //     try {
        
  //       const response = await axios.get(
  //         `${VITE_API_URL}/auth/profile`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //           withCredentials: true,
  //         } 
  //       );
        
  //       setUserInfo(response.data.user)

  //     } catch (error : any) {
  //       console.log(error.response?.data.data.message);
  //       setTokenError(error.response?.data.data.message)
        

  //     }
  //   }
   
  //   fetchProfile()


  // },[])


    useEffect(() => {
    const fetchProfile = async() => {
      const token = localStorage.getItem("Token");
      
      if(!token) {
        setTokenError('No token');
        return;
      }
      try {
        
        const response = await axios.get(
          `${VITE_API_URL}/auth/profile`,
          {
            headers: {Authorization: `Bearer ${token}`},
            withCredentials: true,
          } 
        );
        
        setUserInfo(response.data.user)

      } catch (error : any) {
        console.log(error.response?.data.data);
        setTokenError(error.response?.data.data)
        

      }
    }
   
    fetchProfile()


  },[])

  // useEffect(() => {
  //   const fetchToken = async ()=> {
      

  //         try {
  //           const {data} =await axios.post(
  //             `${VITE_API_URL}/auth/refresh`,
  //           {},
  //           { withCredentials: true }
  //         );
  //         // localStorage.setItem("Token", data.access_token);

  //         const retry = await axios.get(
  //         `${VITE_API_URL}/auth/profile`,
  //         {
  //           headers: { Authorization: `Bearer ${data.access_token}` },
  //           withCredentials: true
  //         }
  //       );
  //         setTokenError('')
  //         setUserFavoritError(false)
  //         setUserInfo(retry.data.user)
  //         } catch (error : any) {
  //           console.log(error.response?.data);
  //           localStorage.removeItem("Token");
  //           setUserInfo(null);
  //         }

       
  //   }


  //   fetchToken()
  // },[tokenError || userFavoriteError])


  const splittedEmail = userInfo?.email.split("@")[0]

  

  useEffect(() => {
    const newLocation = locationURL.pathname.split('/')[1]
    if(newLocation === '') return setLocation('Discover')
    
    setLocation(newLocation)
  }, [locationURL.pathname])


  // const AdminComprobation = userInfo?.role == 'admin' && <button onClick={() => {navigate('/AdminPanel')}} className='bg-orange-500 
  // text-white px-3 py-1 sm:px-6 sm:py-2 rounded-xl hover:cursor-pointer  font-bold text-sm sm:text-xl'>Admin</button>

  return (
    <>

    <section className='flex flex-row relative '>
      {/* Left SIDE (Navbar) */}
      {activeSideBar && <div className=' pl-12 pr-8 sm:pr-28 md:block w-full h-full  md:w-1/5 absolute sm:fixed bg-orange-100 z-50 '>

      <div className='flex align-middle  items-center  mt-8 w-full  justify-between'>


        <h1 className='font-black text-3xl leading-tight'>Books </h1>
        <button className=""><img src={sideBar} alt="" onClick={() => setActiveSideBar((prev: boolean) => !prev)}
      className='w-10 p-1 rounded-xl hover:bg-gray-500/30
      hover:cursor-pointer  transition-all block md:hidden'  /></button>

      </div>
      
        <Navbar />
      </div>}
      

      {/* Right SIDE (Content) */}
      <div className={ activeSideBar == false ? ` transition-all min-h-dvh pl-4 pr-4 sm:pl-12 sm:pr-12 bg-orange-100 w-full h-full 
       z-40`

        :  `min-h-dvh pl-4 pr-4 sm:pl-12 sm:pr-12 bg-orange-100 xl:w-4/5 h-full sm:ml-[20%] transition-all
         z-40`} >



        <section className=' flex flex-row align-middle justify-between  
           mt-8 px-4 py-2 '>
          <h1 className='font-black text-md sm:text-4xl leading-tight  
          capitalize h-fit'>{location} </h1>


          <section className='flex items-center gap-4'>
          {userInfo ? <p className='uppercase'>{splittedEmail} </p>  : 
            <LoginButton /> }
          </section>

          {/* <button className='flex flex-row gap-2 items-center h-fit '>
            <img src="https://avatars.githubusercontent.com/u/110841178?v=4" 
            alt="" className='w-12 h-12 rounded-full'/>
            <p>Car</p>
          </button> */}

        </section>

        <Search handleSideBar={setActiveSideBar} />

        <Outlet />



      </div>

    </section>


    </>
  )
}

export default App
