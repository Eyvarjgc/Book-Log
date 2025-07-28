import axios from "axios";
import { useState } from "react";


export function useAuthApi( ) {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const [loading] = useState<boolean>()


  const token  = localStorage.getItem('Token')
  console.log(token);


  const response = async(url : string, method : string) => {
    try {
      if(method === 'get'){
        
        const {data} = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
        setData(data.data)
      }else if(method == 'post'){

        const {data} = await axios.post(url, {}, {headers: {Authorization: `Bearer ${token}`}})
        
        setData(data.data)
      }


    } catch (error : any) {
      console.log(error);
      setError(error)
    }
  }

  // useEffect(() => {

  //   axios.get(url, {
  //   headers: { Authorization: `Bearer ${token}`}})
  //   .then(res => setData(res.data.result))
  //   .catch(err => console.log(err))

  // }, [])


  return {data, error, loading, response}
}