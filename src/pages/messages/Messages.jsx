
import { MainRightMessages } from "../../components/componentNotRetulables/mainRight/mainRightMessages/MainRightMessages"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./messages.css"

export const Messages = ()=>{
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