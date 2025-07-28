import React from "react";
// import { useAuthApi } from "../hooks/useAuthApi";
import { useNavigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";

import nofavorites from '../assets/noFavorites.png'
import nofavoriteshided from '../assets/nofavoriteHided.png'


export const Favorite : React.FC = () => {
  // const { data: books, loading, error } = useAuthApi('http://localhost:5000/books/favorite')
  // const { data: books, loading, error, response } = useAuthApi()

  const { userFavorite, tokenCredential } = useAppContext()
  
  const navigate = useNavigate()

   const handleBookInfo = (e: React.MouseEvent<any>, id : number) => {
      e.preventDefault()
      navigate(`/books/bookInfo/${id}`)
  
  
    }
    
  return (
    <div className="flex flex-row flex-wrap gap-4 mt-8">
      {tokenCredential ? (  userFavorite.length > 0 ? 
      userFavorite.map((book: any) => (
          <div key={book.books.ID} className="w-full sm:w-[45%] bg-white p-4  rounded-lg
           shadow-md flex " >

            <img src={book.books.thumbnail || '' } alt={book.books.title} className="w-40 h-36 sm:w-56 sm:h-48
             object-cover rounded-t-lg" />

            <span className="px-4 flex flex-col ">
              <h2 className="text-md sm:text-xl font-bold">{book.books.title}</h2>
              <p className="text-sm sm:text-md text-gray-500">{book.books.category}</p>
              <p>Rating: {book.rating} </p>
              <p className="text-sm md:text-md text-gray-600 hidden sm:block">{book.books.description}</p>

              <button className="bg-orange-400 rounded-lg
               px-2 py-0.5 md:px-3 md:py-1 mt-auto w-fit  font-semibold hover:cursor-pointer" onClick={(evt) => handleBookInfo(evt, book.books.ID)}>Read more</button>


            </span>
          </div>)) 
        :  <div className="flex flex-col items-center justify-center gap-4 w-full h-full  mt-8">
          <img src={nofavorites} alt="" className="w-[150px] h-24 sm:w-[500px] sm:h-52"/>

          <span className="font-medium text-sm sm:text-3xl leading-tight mt-8">

          <p>There's nothing here... you should add your first favorite</p>
          
          </span>
        </div> ) 
        
        : <div className="flex flex-col items-center justify-center gap-4 w-full h-full  mt-8">
          <img src={nofavoriteshided} alt="" className="w-[150px] h-24 sm:w-[500px] sm:h-52"/>

          <span className="font-medium text-sm sm:text-3xl leading-tight mt-8">

          <p>shhh... I think your books are hiding from you</p>
          <p className="text-center ">You should <a onClick={() => {navigate('/login')}} className="text-yellow-500
           font-semibold hover:cursor-pointer  ">log In</a> </p>
          </span>
        </div> }
    
    </div>
  )
}