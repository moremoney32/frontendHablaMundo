
import { useNavigate } from "react-router-dom"
import { MainRightTheme } from "../../components/componentNotRetulables/mainRight/mainRightTheme/MainRightTheme"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import { useEffect } from "react"
import { MainConversions } from "../../components/componentNotRetulables/mainRight/mainConversations/MainConversations"

export const Conversation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(()=>{  
    if(!token){
        navigate("/")
    }

    },[])
    return (
        <div>
            <Header />
            <div className="parent_theme">
                <SideBar />
                <MainConversions />
            </div>
        </div>
    )
}