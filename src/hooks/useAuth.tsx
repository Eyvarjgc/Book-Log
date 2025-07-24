
import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL

export const useAuth = async() => {
  try {
    const token = localStorage.getItem("Token");
    if (!token) throw new Error("No token");

    const response = await axios.get(
      `${VITE_API_URL}/api/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log(response);
    
    return response;
    
  } catch (error) {
    console.log(error);
    
  }

}