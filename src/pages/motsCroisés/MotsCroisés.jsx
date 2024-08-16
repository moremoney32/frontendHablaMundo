import { useNavigate } from "react-router-dom"
import { MainMotsCroisés } from "../../components/componentNotRetulables/mainRight/mainMotsCroisés/MainMotsCroisés"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import { useEffect } from "react"

export const MotsCroisés = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(()=>{  
    if(!token){
        navigate("/")
    }

    },[])
    return(
        <div>
             <Header/>
              <div className="parent_user">
              <SideBar/>
              <MainMotsCroisés/>
             </div> 
        </div>

    )
}