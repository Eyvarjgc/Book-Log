import React, { useEffect, useState } from "react";
import { useApiBooks } from "../hooks/useApiBooks";
import { useParams } from "react-router";
import importImages from "../utils/ImportImages";
import { useAppContext } from "../hooks/useAppContext";

const VITE_API_URL = import.meta.env.VITE_API_URL

export const BookInfo : React.FC = () => {
  let {ID} = useParams()

  const { data: books, loading, error } = useApiBooks(`${VITE_API_URL}/books/bookInfo/${ID}`)
  const {addFavorite, userFavorite, removeFavorite, userInfo} = useAppContext()
  const [isFavorite, setIsfavorite ]= useState<boolean>()

  

  const handleSaveClick = (ID : string) => {
    if(isFavorite){
      removeFavorite(ID)

    }else{
      addFavorite(ID)

    }
  }


  useEffect(() => {
    console.log(userFavorite.filter((item : any) => {
      return item.ID === ID
    }) )

    console.log(userFavorite);
    
    const favoriteComp = userFavorite?.some((fav : any) => fav?.ID  === ID || fav?.book_id === ID )
    
    setIsfavorite(favoriteComp)
    
  }, [userFavorite])
  
 
  // {books && books?.map((book: any) =>  (

  //         <div key={book.id} className="w-full h-full p-4 bg-white  rounded-lg 
  //          shadow-md flex gap-4 sm:gap-12 flex-wrap md:flex-nowrap">


  //             <img className="w-56 md:w-80 h-full mx-auto 
  //              object-cover rounded-t-lg" src={book.thumbnail} alt={book.title}  />


  //           <span className="px-12 flex flex-col w-full flex-wrap">
  //             <span className="flex flex-row justify-between  items-center">
  //               <h2 className={`font-serif  ${book.title.length > 13 ? 'text-xl sm:text-4xl' : 'text-sm sm:text-6xl' } `}>{ book.title  }</h2>
  //               {tokenCredential && 
  //               <img src={isFavorite  ? importImages.savedIconActive : importImages.savedIcon} alt="" className="hover:cursor-pointer w-8 h-8 " onClick={
  //                 () => {handleSaveClick(book.ID);}}/>
  //               }
  //             </span>

  //             <span className="flex gap-4 items-center font-light text-md text-center sm:text-2xl my-10">
                
  //             <p className="text-yellow-500 ">By {book.author}</p>
  //             <p>|</p>
  //             <p>Rating: {book.rating} </p>
  //             </span>

  //             <p className="text-gray-600 text-md md:text-lg font-medium">{book.longerDescription}</p>


  //             <span className="flex flex-row gap-4 mt-auto py-12 justify-between items-center text-md sm:text-2xl">
  //             <p className="">Stock: {book.stock}</p>

  //             <div className="flex gap-8 items-center">

  //             <p className="font-semibold ">${book.discountPercentage}</p>
              
  //              </div>

  //              </span>

  //           </span>
  //         </div>
  //       ))}

  return (
    <>
      <section className="flex flex-row flex-wrap gap-4  mt-8">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}



        {books && (
           <div key={books.id} className="w-full h-full p-4 bg-white  rounded-lg 
           shadow-md flex gap-4 sm:gap-12 flex-wrap md:flex-nowrap">


              <img className="w-56 md:w-80 h-full mx-auto 
               object-cover rounded-t-lg" src={books?.thumbnail || ""} alt={books.title}  />


            <span className="px-12 flex flex-col w-full flex-wrap">
              <span className="flex flex-row justify-between  items-center">
                <h2 className={`font-serif  ${books.title.length > 13 ? 'text-xl sm:text-4xl' : 'text-sm sm:text-6xl' } `}>{ books.title  }</h2>
                {userInfo && 
                <img src={isFavorite  ? importImages.savedIconActive : importImages.savedIcon} alt="" className="hover:cursor-pointer w-8 h-8 " onClick={
                  () => {handleSaveClick(books.ID);}}/>
                }
              </span>

              <span className="flex gap-4 items-center font-light text-md text-center sm:text-2xl my-10">
                
              <p className="text-yellow-500 ">By {books.author}</p>
              <p>|</p>
              <p>Rating: {books.rating} </p>
              </span>

              <p className="text-gray-600 text-md md:text-lg font-medium">{books.longerDescription}</p>


              <span className="flex flex-row gap-4 mt-auto py-12 justify-between items-center text-md sm:text-2xl">
              <p className="">Stock: {books.stock}</p>

              <div className="flex gap-8 items-center">

              <p className="font-semibold ">${books.discountPercentage}</p>
              
               </div>

               </span>

            </span>
          </div>
        )}

        
      </section>

    </>
  )
}