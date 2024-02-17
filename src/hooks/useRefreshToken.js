import axiosInstance from "../api/axiosInstance"
import useAuth from "./useAuth"

export default function useRefreshToken() {
    const {setAuth} = useAuth()

    const refreshAccessToken = async()=>{
        const refreshToken = localStorage.getItem('myValue');

        const response = await axiosInstance.post("/auth/token/refresh/")
    }
 


  return (
    <div>useRefreshToken</div>
  )
}
