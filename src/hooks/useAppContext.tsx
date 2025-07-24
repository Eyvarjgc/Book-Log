import { DataContext } from "./useContext"
import { FavoriteContext } from "./useFavoriteContext"
import { useContext } from "react"

export const useAppContext = () => {
  const dataContext = useContext(DataContext)
  const favoriteContext = useContext(FavoriteContext)


  return {...dataContext, ...favoriteContext }
}