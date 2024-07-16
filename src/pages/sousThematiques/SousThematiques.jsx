import { MainRightSousThematiques } from "../../components/componentNotRetulables/mainRight/mainRightSousThematiques/MainRightSousThematiques"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./sousThematique.css"
export const SousThematiques = ()=>{
    return(
        <div>
             <Header/>
              <div className="parent_user">
              <SideBar/>
              <MainRightSousThematiques/>
             </div> 
        </div>

    )
}