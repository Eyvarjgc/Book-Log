import { Outlet } from "react-router"
import { useAppContext } from "../hooks/useAppContext"
import { useEffect } from "react"
import { Link } from "../components/Navbar/Link"
import importImages from "../utils/ImportImages"

export const AdminPanel: React.FC = () => {
  const { userInfo } = useAppContext()

  useEffect(() => {
    
  }, [])
  

  return (

    <div className="">
 

      <div className='pl-12  hidden md:block w-1/5 fixed '>
      <h1 className='font-black text-4xl leading-tight mt-8 '>Admin Panel </h1>
      <nav className="mt-8 flex flex-col gap-6 x mb-8">

      <Link path="/" icon={importImages.homeIconActive} alternativeIcon={importImages.homeIconActive} >Go back home</Link>
      <Link path="/AdminPanel/bookList" icon={importImages.bookLists} alternativeIcon={importImages.bookLists} >List of Books</Link>
      <Link path="/AdminPanel/addBook" icon={importImages.saveBook} alternativeIcon={importImages.saveBook} >Add Book</Link>
      <Link path="/AdminPanel/deleteBook" icon={importImages.deleteBook} alternativeIcon={importImages.deleteBook}  >Delete Book</Link>

      </nav>
      </div>
     <div className='min-h-dvh pl-12 pr-12 bg-orange-100 w-4/5 h-full ml-[20%] pt-12'>
        <Outlet />
      </div>
    
    </div>
  )
}