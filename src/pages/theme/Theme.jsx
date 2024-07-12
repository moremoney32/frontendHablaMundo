
import { MainRightTheme } from "../../components/componentNotRetulables/mainRight/mainRightTheme/MainRightTheme"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./theme.css"

export const Theme = ()=>{
    return(
        <div>
             <Header/>
             <div className="parent_theme">
             <SideBar/>
             <MainRightTheme/>
             </div>
        </div>
    )
}