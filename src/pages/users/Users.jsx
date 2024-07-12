

import { MainRightUsers } from "../../components/componentNotRetulables/mainRight/mainRightUsers/MainRightUsers"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./users.css"

export const Users = ()=>{
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