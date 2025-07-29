import React from "react";
import {Link} from '../components/Navbar/Link'
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useAppContext } from "../hooks/useAppContext.tsx";
import Cookies  from "js-cookie";
// ICONS
import importImages from '../utils/ImportImages.tsx'



export const Navbar : React.FC = () => {
  const {setTokenCredential , userInfo,setUserInfo} = useAppContext()
  

  const [click, setClick] = useState<boolean>(false)
  const handleLogout = () => {
    setTokenCredential(null)
    googleLogout()
    localStorage.removeItem('Token')
    Cookies.remove('refresh_token')
    setUserInfo(null)
    } 

  return (
    <>
      <nav className="mt-8 ">
          <p className="text-gray-500 font-bold opacity-80">Menu</p>

        <ul className="flex flex-col gap-6 mt-4 mb-8">
          <Link path="/" icon={importImages.homeIcon } alternativeIcon={importImages.homeIconActive} >Discover</Link>
          <Link path="/categories" icon={importImages.categoryIcon } alternativeIcon={importImages.categoryIconActive} >Categories</Link>
          <Link path="/favorite" icon={importImages.favoriteIcon } alternativeIcon={importImages.favoriteIconActive} >Favorite</Link>
        </ul>
        <hr />
        {userInfo && 
            
        <ul className="my-8 flex flex-col gap-6">
          {/* <Link path="/settings" icon={importImages.settingsIcon } alternativeIcon={importImages.settingsIconActive} >Settings</Link> */}

          <button  onClick={() => {setClick( !click ); handleLogout()}} >
          <div className="flex items-center align-middle gap-3  tracking-wide">
          <img src={click ? importImages.logoutIconActive : importImages.logoutIcon } alt='Logout Img' className={
            click ? "bg-orange-500 bg-opacity-50 rounded-xl p-2 w-8 h-8" 
            : "bg-gray-200 bg-opacity-50 rounded-xl p-2 w-8 h-8"
            } />

            
            <p className={click ? "text-black font-bold" : "text-gray-600"}>Log out</p>
            </div>

            
          </button>
        </ul>
        }
        <hr />





      </nav>
    </>
  )
}