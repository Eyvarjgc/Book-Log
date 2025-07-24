
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useApiBooks } from "../hooks/useApiBooks";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Props  {
  data : []
}

export const Books : React.FC<Props> = ({data})  => {
  const navigate = useNavigate();
  const {  loading, error } = useApiBooks()


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
            {data?.map((item, key) => (
              <div className="swiper-slide" key={key} onClick={(e) => {handleBookInfo(e, item.ID)
              }}>
                <div className="w-full   overflow-hidden rounded-3xl">
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

