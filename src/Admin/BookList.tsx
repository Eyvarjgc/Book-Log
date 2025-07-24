import axios from "axios";
import { useEffect, useState } from "react"

const VITE_API_URL = import.meta.env.VITE_API_URL  

export const BookList: React.FC = () => {
  const [bookList, setBookList] = useState<any[]>([])

  const getBooks = async()=> {
    const token = localStorage.getItem('Token')
    try {
      const {data} = await axios.get(`${VITE_API_URL}/admin/bookList`, {
        headers:{Authorization: `Bearer ${token}`},
        withCredentials: true
      })

      setBookList(data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  useEffect(() => {
    getBooks()
  }, [])
  


  return(
    <>
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 text-left hover:cursor-pointer" >ID</th>
      <th className="px-4 py-2 text-left">Title</th>
      <th className="px-4 py-2 text-left">Category</th>
      <th className="px-4 py-2 text-left">Author</th>
      <th className="px-4 py-2 text-left">Thumbnail</th>
    </tr>
  </thead>
  <tbody>
    {bookList && bookList.map((item: any) => (
      <tr key={item.ID} className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-2">{item.ID}</td>
        <td className="px-4 py-2">{item.title}</td>
        <td className="px-4 py-2">{item.category}</td>
        <td className="px-4 py-2">{item.author}</td>
        <td className="px-4 py-2">
          <img
            src={item.thumbnail || ""}
            alt={item.title}
            className="w-16 h-20 object-cover rounded"
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </>
  )
}