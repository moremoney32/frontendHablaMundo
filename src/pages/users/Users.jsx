

import { useEffect } from "react"
import { MainRightUsers } from "../../components/componentNotRetulables/mainRight/mainRightUsers/MainRightUsers"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./users.css"
import { useNavigate } from "react-router-dom"

export const Users = ()=>{
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
                <MainRightUsers/>
             </div>
        </div>
    )
}