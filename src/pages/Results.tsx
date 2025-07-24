import React, {useEffect} from "react";
import { useApiBooks } from "../hooks/useApiBooks";
import { useParams } from "react-router";

import { useNavigate } from "react-router";
import img from '../assets/placeholder.png'
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL 

export const Results : React.FC = () => {
  const { data: books, loading, error, setData } = useApiBooks('')
  const navigate = useNavigate();


  let {title} = useParams()

  if (!title) {
    title = '';
  }
  const valueToSearch = title.split('=')[1]
  
  useEffect(() => {
    const getData = async (url: string) => {
      try {
      const data = await axios.get(url)

        setData(data.data.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    getData(`${VITE_API_URL}/results?title=${valueToSearch}`) 
    
    
  }, [valueToSearch]) 

  const handleBookInfo = (e: React.MouseEvent<HTMLDivElement>, id : number) => {
    e.preventDefault()
    navigate(`/books/bookInfo/${id}`)


  }

  return (
    <>
      <section className="flex flex-row flex-wrap gap-4  mt-8">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}


        {books && books?.map((book: any) => (
          <div key={book.ID} className="w-[45%] bg-white p-4  rounded-lg
           shadow-md flex " >

            <img src={book.thumbnail || img} alt={book.title} className="w-56 h-48
             object-cover rounded-t-lg" />

            <span className="px-4 flex flex-col ">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-500">{book.category}</p>
              <p>{book.rating} change it</p>
              <p className="text-gray-600">{book.description}</p>

              <button className="bg-orange-400 rounded-lg
               px-3 py-1 mt-auto w-fit  font-semibold hover:cursor-pointer" onClick={(e) => handleBookInfo(e, book.ID)}>Read more</button>


            </span>
          </div>
        ))}
      </section>

    </>
  )
}