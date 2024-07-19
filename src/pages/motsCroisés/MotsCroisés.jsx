import { MainMotsCroisés } from "../../components/componentNotRetulables/mainRight/mainMotsCroisés/MainMotsCroisés"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"

export const MotsCroisés = ()=>{
    return(
        <div>
             <Header/>
              <div className="parent_user">
              <SideBar/>
              <MainMotsCroisés/>
             </div> 
        </div>

    )
}