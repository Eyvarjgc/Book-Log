import { useEffect, useState } from "react"

import axios from "axios"

const VITE_API_URL = import.meta.env.VITE_API_URL 

export const AddBook: React.FC = () => {
  const [body, setBody] = useState({
      title: "",
      description: "",
      longerDescription: "",
      discountPercentage: "",
      rating: "",
      stock: "" ,
      category: "",
      thumbnail: "",
      author: "",
    
  })
  const [validateResponse, setValidateResponse] = useState<any>(null)

    async function onSubmit(data : any){
      const token = localStorage.getItem('Token')

      try {
        const response = await axios.post(`${VITE_API_URL}/admin/addBokk`, data, {
          headers:{
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        setValidateResponse(response?.data?.message)
      } catch (error : any) {
        console.log(error);
        setValidateResponse(error?.response?.data?.error)
      }
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBody({...body, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e: React.FormEvent)=> {  
    e.preventDefault()

    onSubmit(body)
    console.log(body);
    
  }



  useEffect(() => {
    setTimeout(() => {
      setValidateResponse(null)
    }, 3000)

  },[validateResponse])
  return(
    <>
   <form onSubmit={handleSubmit} className="max-w-fit mx-auto p-12  bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <div className="flex flex-row gap-4">

      <input
        className="w-full border p-2 rounded"
        name="title"
        placeholder="Title"
        value={body.title}
        onChange={handleChange}
        required
        />
      <input
        className="w-full border p-2 rounded"
        name="author"
        placeholder="Author"
        value={body.author}
        onChange={handleChange}
        required
      />
        </div>

      <div className="flex flex-row gap-4">
        <input
          className="w-full border p-2 rounded"
          name="category"
          placeholder="Category"
          value={body.category}
          onChange={handleChange}
        />
      </div>
      <input
        className="w-full border p-2 rounded"
        name="thumbnail"
        placeholder="Thumbnail URL"
        value={body.thumbnail}
        onChange={handleChange}
      />
      <textarea
        className="w-full border p-2 rounded"
        name="description"
        placeholder="Short Description"
        value={body.description}
        onChange={handleChange}
        rows={2}
      />
      <textarea
        className="w-full border p-2 rounded"
        name="longerDescription"
        placeholder="Long Description"
        value={body.longerDescription}
        onChange={handleChange}
        rows={4}
      />
      <div className="flex flex-row gap-4">
        <input
          className="w-full border p-2 rounded"
          type="number"
          name="discountPercentage"
          placeholder="Discount Percentage"
          value={body.discountPercentage}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          name="rating"
          placeholder="Rating"
          value={body.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.01"
        />
         <input
        className="w-full border p-2 rounded"
        type="number"
        name="stock"
        placeholder="Stock"
        value={body.stock}
        onChange={handleChange}
      />
      </div>
     
      {validateResponse  && (<p 
      className="text-center text-red-500 font-bold"> {validateResponse}</p>  )}
      <button className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:cursor-pointer w-full font-bold">
        Save Book
      </button>
    </form>
    </>
  )
}