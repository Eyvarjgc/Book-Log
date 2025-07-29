import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";


export const FavoriteContext = createContext<any>(null)

const VITE_API_URL = import.meta.env.VITE_API_URL 

export const FavoriteProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const [userFavorite, setUserFavorite] = useState<any[]>([])
    const [userFavoriteError, setUserFavoritError] = useState<boolean>(false)
    const [userFavoriteLoading, setUserFavoriteLoading] = useState()

    const token = localStorage.getItem('Token')
  
  const fetchFavorites = async() => {
    
    try {
      const {data} = await axios.get(`${VITE_API_URL}/books/favorite`, 
        {
          headers:{Authorization: `Bearer ${token}`}
        }
      )

      
      setUserFavorite(data.data)
      

    } catch (error) {
      console.log(error);
      setUserFavoritError(true)
    }
  }
  
  useEffect(() => {
    fetchFavorites()
  }, [])

  const addFavorite = async(ID: string) => {
    try {
      
      const {data} = await axios.post(`${VITE_API_URL}/books/addFavorite/${ID}`, {},
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      )

      console.log(data.data[0]);
      
      setUserFavorite(prev => [...prev, data.data[0]])
      

    } catch (error : any) {
      console.log(error);
      setUserFavoritError(true)
    }
  }

  const removeFavorite  = async(ID : string) => {
    try {
      
      await axios.delete(`${VITE_API_URL}/books/removeFavorite/${ID}`,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      )
      
      
      setUserFavorite((prev : any[]) => prev.filter((item : any) => String(item.ID) !== String(ID)))
      
    } catch (error : any) {
      console.log(error);
      setUserFavoritError(true)
    }
  }




  const VALUES = {
    userFavorite, setUserFavorite,
    userFavoriteError,setUserFavoritError,
    userFavoriteLoading,setUserFavoriteLoading,
    addFavorite,removeFavorite
  }


  return <FavoriteContext.Provider value={VALUES}>
    {children}
  </FavoriteContext.Provider>

}