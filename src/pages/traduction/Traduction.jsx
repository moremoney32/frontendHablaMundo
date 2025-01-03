

import { useEffect } from "react"
import { MainRightUsers } from "../../components/componentNotRetulables/mainRight/mainRightUsers/MainRightUsers"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./traduction.css"
import { useNavigate } from "react-router-dom"
import { MainRightAllTraduction } from "../../components/componentNotRetulables/mainRight/mainRightAllTraduction/MainRightAllTraduction"

export const Traduction = ()=>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    useEffect(()=>{  
    if(!token){
        navigate("/");
    }

    },[])
    return(
        <div>
             <Header/>
             <div className="parent_user">
                <SideBar/>
                <MainRightAllTraduction/>
             </div>
        </div>
    )
}