import { useEffect } from "react"
import { MainRightFaq } from "../../components/componentNotRetulables/mainRight/mainRightFaq/MainRightFaq"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./faq.css"
import { useNavigate } from "react-router-dom"

export const Faq = ()=>{
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
             <div className="yellow">
             <SideBar/>
             <MainRightFaq/>
             </div>
        </div>
    )
}