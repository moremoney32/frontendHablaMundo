import { MainRightHome } from "../../components/componentNotRetulables/mainRight/mainRightHome/MainRightHome"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./home.css"

export const Home = ()=>{
    return(
        <div>
             <Header/>
             <div className="parent_home">
             <SideBar/>
             <MainRightHome/>
             </div>
        </div>
    )
}