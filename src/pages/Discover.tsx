import React, {useEffect} from "react";

import importImages from "../utils/ImportImages";
import { useApiBooks } from "../hooks/useApiBooks";
import { Books } from "../components/Books";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router";

const VITE_API_URL = import.meta.env.VITE_API_URL 


export const Discover : React.FC = () => {
  const { data: categories  } = useApiBooks(`${VITE_API_URL}/books/categories`)
  const { data: books } = useApiBooks(`${VITE_API_URL}/books`)
  const {booksData, setBooksData} = useAppContext()
  const navigate = useNavigate();

  useEffect(() => {
    setBooksData(books)
    
  }, [books]);
  
  
  

  return (
    <>
      <div className=" mx-auto px-4 ">
        <span className="flex flex-row gap-2 items-center justify-between align-middle my-8">
          <h1 className=" font-extralight sm:font-semibold text-xl sm:text-2xl text-center sm:text-left">Book Recomendation</h1>
          {/* <button className="bg-white px-4 py-1 flex flex-row align-middle gap-2 rounded-lg">
            <p className="text-md font-semibold">View all</p>
            <p className="text-md font-semibold">&gt;</p>
          </button> */}
        </span>


        <Books data={booksData}/>


        <span className="flex flex-row gap-2 items-center justify-between align-middle mt-8">
          <h1 className="font-extralight sm:font-semibold text-xl sm:text-2xl  sm:text-left" >Book Category</h1>
          <button className="hover:cursor-pointer" onClick={()=>{navigate('/category')}}>
          <img src={importImages.categoryIcon} alt="Category icon"
           className="bg-white bg-opacity-50 rounded-xl p-2 w-10 h-10"
           />
          </button>
        </span>

        <div className="swiper w-full mt-8 mb-12 ">
          <div className="swiper-wrapper">
            {categories?.map((item : any) => (
              <div className="swiper-slide" key={item.ID} >
             <div onClick={() => {navigate(`/category/${item.name}`)}}
              className="swiper-slide max-h-30 max-w-80 rounded-3xl bg-cover bg-center bg-no-repeat flex items-end p-4 text-white relative transition-all  "
              style={{ backgroundImage: `url(${item.image})` }}>
                <span className="bg-black w-full h-full absolute top-0 left-0 opacity-20 rounded-3xl z-20 "></span>
                    <p className={item.name.length > 10 ? " bg-opacity-60 p-2 rounded-md font-black text-[7px] md:text-xl z-50" : "bg-opacity-60 p-2 rounded-md font-black text-[10px] md:text-2xl z-50"}>{item.name}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  )
}