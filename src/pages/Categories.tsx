import React, { useEffect } from "react"

import { useAppContext } from "../hooks/useAppContext";
import { useApiBooks } from "../hooks/useApiBooks";
import { type BookType } from "../type" ;
import { CategorySection } from "../components/CategorySection";
import { useNavigate } from "react-router";

const VITE_API_URL = import.meta.env.VITE_API_URL

export const Categories : React.FC = ()  => {
  const {booksData, setBooksData} = useAppContext()
  const {data: books} = useApiBooks<BookType[]>(`${VITE_API_URL}/books`)
  const navigate = useNavigate();

  useEffect(() => {
    setBooksData(books)
    
  }, [books]);

  const categoriesLabel = Array.from(
    new Set(booksData?.map((item) => {return item.category}))
  )

  return (
    <div className="mx-auto px-4">
      {categoriesLabel.map((item) => {
        return <>
            <span className="flex flex-row gap-2 items-center justify-between align-middle my-8 ">
          <h1 className="font-semibold text-2xl">{item}</h1>
          
          <button className="bg-white px-4 py-1 flex flex-row align-middle gap-2 rounded-lg hover:bg-orange-500 transition-all" onClick={()=>{navigate(`/category/${item}`)}}>
            <p className="text-md font-semibold hover:cursor-pointer ">View all</p>
            <p className="text-md font-semibold">&gt;</p>
          </button>
        </span>

          <CategorySection category={item} />

        </>
      })}

      
    </div>

  )
  
    



}
