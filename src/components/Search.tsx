import React from "react";

import importImages from "../utils/ImportImages";
import { useNavigate } from "react-router";
import sideBar from '/public/sideBar.png'

// import { useAppContext } from "../hooks/useAppContext";

export const Search : React.FC = ({ handleSideBar }) => {
  // const { searchValue, setSearchValue } = useAppContext();
  const [searchInput, setSearchInput] = React.useState<string>('');

  let navigate = useNavigate()  


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    setSearchInput(e.currentTarget.value)
  }

  
   

  return (
    <div className="flex flex-row gap-4 px-4 mt-4 sm:mt-0">
      {/* BUTTONs */}
      <button className=""><img src={sideBar} alt="" onClick={() => handleSideBar((prev: boolean) => !prev)}
      className='w-10 p-1 rounded-xl hover:bg-gray-500/30
      hover:cursor-pointer  transition-all'  /></button>


      <form action="" className="w-4/5 sm:w-fit bg-white flex px-2 py-1 sm:px-8 sm:py-2 rounded-3xl flex-row 
        gap-12 items-center "
        
        onSubmit={(e) => {
      if (searchInput.trim() !== '') {
        console.log(`/results/title=${searchInput}`);
        
        navigate(`/results/title=${searchInput}`);
      } else {
        navigate('/');
      }
    }}>
     

      <span className="flex flex-row gap-2 items-center ">
        <img src={importImages.searchIcon} alt="" className="w-6 h-6 "/>
        <input type="text" placeholder="Add the name of the book you like" className="
        focus:outline-none font-light placeholder:text-[10px] sm:placeholder:text-md lg:placeholder:text-[12px]" onChange={handleSearch} value={searchInput} />
      </span>



      <input type="button" value="Search" className="bg-orange-500 hidden sm:block text-white px-6 py-2 rounded-xl hover:cursor-pointer  font-bold
      " />
      </form>

</div>
  )
}
