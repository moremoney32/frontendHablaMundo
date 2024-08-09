
import { useNavigate } from "react-router-dom"
import { MainRightTheme } from "../../components/componentNotRetulables/mainRight/mainRightTheme/MainRightTheme"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./theme.css"
import { useEffect } from "react"

export const Theme = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    // useEffect(()=>{  
    // if(!token){
    //     navigate("/")
    // }

    // },[])
    return (
        <div>
            <Header />
            <div className="parent_theme">
                <SideBar />
                <MainRightTheme />
            </div>
        </div>
    )
}