import { useNavigate } from "react-router-dom"
import { MainRightTheme } from "../../components/componentNotRetulables/mainRight/mainRightTheme/MainRightTheme"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { useEffect } from "react"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import { MainRightGrammaire } from "../../components/componentNotRetulables/mainRight/mainRightGrammaire/MainRightGrammaire"
import { MainList } from "../../components/componentNotRetulables/mainRight/mainList/MainList"

export const List = () => {
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
                <MainList/>
            </div>
        </div>
    )
}