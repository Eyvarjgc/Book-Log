import { useEffect, useState} from "react";
import { CallApi } from "./CallApi";
import axios from "axios";


export function useApiBooks (url : string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const getData = async (url : string) => {
    try {
      setLoading(true)
      
      const data = await CallApi(url)
      
      setData(data.data)
      console.log(data);
      

      setLoading(false)
  
    } catch (error: any) {
      setError(error)
    }
    finally{
      setLoading(false)
    }
  }



 useEffect(() => {
  axios.get(url)
  .then(res => setData(res.data.data))
  .catch(err => setError(err))
  .finally(() => setLoading(false) )

 },[url])

  return {data, loading, error, getData, setData }
}



// export function useApiBooks (url : string) {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string>()

//   const getData = async (url : string) => {
//     try {
//       setLoading(true)
      
//       const data = await CallApi(url)
      
//       setData(data.data)
//       console.log(data);
      

//       setLoading(false)
  
//     } catch (error: any) {
//       setError(error)
//     }
//     finally{
//       setLoading(false)
//     }
//   }
    


//  useEffect(() => {
//   getData(url)
//  },[url])

//   return {data, loading, error, getData}
// }