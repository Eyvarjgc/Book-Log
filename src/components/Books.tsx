import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useApiBooks } from "../hooks/useApiBooks";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { type BookType } from "../type";

const VITE_API_URL = import.meta.env.VITE_API_URL

type BookProps = {
  data: BookType[]
}


export const Books : React.FC<BookProps> = ( { data }  )  => {
  
  const navigate = useNavigate();
  const {  loading, error } = useApiBooks(`${VITE_API_URL}/books`)


    useEffect(() => {
      new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,

        modules: [Navigation, Pagination],
        breakpoints: {
          250:{
            slidesPerView: 2,
            spaceBetween: 1,
          },
          350:{
            slidesPerView: 3,
            spaceBetween: 3,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,

          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 25,

          },
          1280: {
            slidesPerView: 5,
            spaceBetween:25,

          }
        }
      }) 
    }, [])

   const handleBookInfo = (e : React.MouseEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      navigate(`/books/bookInfo/${id}`)
    }

    
    
    
   
  return (
   <div className="swiper w-full ">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

          <div className="swiper-wrapper ">
            {data?.map((item : any, key) => (
                          <div
                            className="swiper-slide"
                            key={key}
                           onClick={(e) => {handleBookInfo(e, item.ID)
          }}>
                            <div className="w-full   overflow-hidden rounded-3xl hover:cursor-pointer">
                              <img 
                                src={item.thumbnail} 
                                alt={`Book ${key + 1}`} 
                                className="w-24 sm:w-32 md:w-64  lg:w-52 lg:h-80  xl:w-56   object-cover transition-all"
                              />
                            </div>
                          </div>
                        ))}
          </div>
        </div>

  )
  
    



}

