import { useEffect } from "react"
import { MainRightHome } from "../../components/componentNotRetulables/mainRight/mainRightHome/MainRightHome"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./home.css"
import {useNavigate } from "react-router-dom"


export const Home = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(()=>{  
    if(!token){
        navigate("/")
    }

    },[])
    useEffect(()=>{

    },[JSON.parse(localStorage.getItem("notificationsNews"))])
    return(
        <div>
             <Header counterLength= {JSON.parse(localStorage.getItem("notificationsNews"))}/>
             <div className="parent_home">
             <SideBar/>
             <MainRightHome/>
             </div>
        </div>
    )
}