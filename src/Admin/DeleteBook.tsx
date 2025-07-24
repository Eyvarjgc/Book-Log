import React, { useState } from "react"
import axios from "axios"

const VITE_API_URL = import.meta.env.VITE_API_URL 

export const DeleteBook: React.FC = () => {
  const [form, setForm ] = useState({
    ID: "",
    title: "",
    author: ""
  })
  const [validateResponse, setValidateResponse] = useState<any>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const  submitValues = async (e: React.FormEvent, data : any) => {
    e.preventDefault()
    const token = localStorage.getItem('Token')

    try {
      const response = await axios.delete(`${VITE_API_URL}/admin/deleteBook`,  {
        headers: {
          Authorization: `Bearer ${token}`
        },
         data: {
        source: data }
      });

      console.log(response);
      setValidateResponse(response?.data?.message)

    } catch (error) {
      console.log(error.response);
      setValidateResponse(error?.response?.data?.error)
    }

  }

  return(
    <>
      <form onSubmit={(e) => {submitValues(e, form)}} className="max-w-fit mx-auto p-12  bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Delete a Book</h2>

      <input
        className="w-full border p-2 rounded"
        name="ID"
        placeholder=" Books ID"
        value={form.ID}
        onChange={handleChange}
        required
        />
      <input type="text"
        className="w-full border p-2 rounded"
        name="title"
        placeholder="Book's title"
        value={form.title}
        onChange={handleChange}
        required
      />

        <input
          className="w-full border p-2 rounded"
          name="author"
          placeholder="Book's author"
          value={form.author}
          onChange={handleChange}
          required
        />
      
     {validateResponse  && (<p 
      className="text-center text-red-500 font-bold"> {validateResponse}</p>  )}
      
      <button className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:cursor-pointer w-full font-bold">
        Save Book
      </button>
      </form>

    </>
  )
}