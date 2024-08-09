import { useNavigate } from "react-router-dom"
import { MainRightSousThematiques } from "../../components/componentNotRetulables/mainRight/mainRightSousThematiques/MainRightSousThematiques"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./sousThematique.css"
import { useEffect } from "react"
export const SousThematiques = ()=>{
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
              <MainRightSousThematiques/>
             </div> 
        </div>

    )
}