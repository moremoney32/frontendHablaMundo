import {faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import  "./header.css"

export const HeaderSousThematiques = ()=>{
    return (
        <div className="header_main">
            <span className="header_main_1">Thématiques</span>
            <FontAwesomeIcon icon={faAngleRight} className="header_main_2_icons"/>
            <span className="header_main_3">Les fruits</span>
        </div>
    )
}