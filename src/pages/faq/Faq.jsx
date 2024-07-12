import { MainRightFaq } from "../../components/componentNotRetulables/mainRight/mainRightFaq/MainRightFaq"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./faq.css"

export const Faq = ()=>{
    return(
        <div>
             <Header/>
             <div className="yellow">
             <SideBar/>
             <MainRightFaq/>
             </div>
        </div>
    )
}