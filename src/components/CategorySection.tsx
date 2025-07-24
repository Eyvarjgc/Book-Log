
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useNavigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";

import React, { useEffect } from "react";


export const CategorySection : React.FC = (category : string)  => {
  const {booksData} = useAppContext()

  const navigate = useNavigate();

  // Slider working
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
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,

          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          }
        }
      }) 
    }, [])


    const handleBookInfo = (e : React.MouseEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      navigate(`/books/bookInfo/${id}`)
    }

    const dataByCategory = booksData?.filter((item ) =>  {return item.category == category.category})  

  return (
    <div className="swiper w-full ">

      <div className="swiper-wrapper">
        {dataByCategory?.map((item, key) => (
          <div className="swiper-slide" key={key} onClick={(e) => {handleBookInfo(e, item.ID)
          }}>
            <div className="w-full   overflow-hidden rounded-3xl">
              <img 
                src={item.thumbnail} 
                alt={`Book ${key + 1}`} 
                className="w-24 sm:w-32 md:w-56  lg:w-96 lg:h-80 xl:w-56  object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>

  )
  
    



}

