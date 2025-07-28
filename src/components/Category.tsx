import { useAppContext } from "../hooks/useAppContext"
import { useParams, useNavigate } from "react-router"

export const Category : React.FC =() => {
  const {booksData} = useAppContext()
  const {category} = useParams()
  const navigate = useNavigate();
  

  const filteredCategory = booksData?.filter((item : any) => {
    return item.category === category
  })

const handleBookInfo = ( id : number) => {
    navigate(`/books/bookInfo/${id}`)

  }
  
  return(
    <> 
     <section className="flex flex-row flex-wrap gap-4  mt-8">


        {filteredCategory && filteredCategory.map((book: any) => (
          <div key={book.ID} className="w-[45%] bg-white p-4  rounded-lg
           shadow-md flex " >

            <img src={book.thumbnail || ""} alt={book.title} className="w-56 h-48
             object-cover rounded-t-lg" />

            <span className="px-4 flex flex-col ">
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-500">{book.category}</p>
              <p>{book.rating} change it</p>
              <p className="text-gray-600">{book.description}</p>

              <button className="bg-orange-400 rounded-lg
               px-3 py-1 mt-auto w-fit  font-semibold hover:cursor-pointer" onClick={() => handleBookInfo(book.ID)}>Read more</button>


            </span>
          </div>
        ))}
      </section>
    </>
  )
}