
import { useNavigate } from "react-router-dom"
import { MainRightMessages } from "../../components/componentNotRetulables/mainRight/mainRightMessages/MainRightMessages"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./messages.css"
import { useEffect } from "react"

export const Messages = ()=>{
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    // useEffect(()=>{  
    // if(!token){
    //     navigate("/")
    // }

    // },[])
    return(
        <div>
             <Header/>
             <div className="parent_message">
             <SideBar/>
             <MainRightMessages/>
             </div>
        </div>
    )
}