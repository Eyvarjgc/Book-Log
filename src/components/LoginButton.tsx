import { useNavigate } from "react-router"



export const LoginButton : React.FC = () => {
  const navigate = useNavigate()
  return(
    <div className=" rounded-3xl p-1 sm:p-2 flex gap-3 bg-white text-sm sm:text-xl ">

      <button  className='p-1 text-black px-2 py-1  sm:px-6 sm:py-2 hover:cursor-pointer font-bold hover:bg-gray-100 rounded-xl' onClick={() => {
        navigate('/Login')
        }} >Log In</button>  


      <button  className='bg-orange-500 text-white px-2 py-1  sm:px-6 sm:py-2 hover:cursor-pointer font-bold rounded-xl hover:bg-orange-400 ' onClick={() => {
        navigate('/sign up')
        }} >Sign Up</button>  

    
    </div>
  )


}