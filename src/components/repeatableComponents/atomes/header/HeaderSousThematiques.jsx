import {faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import  "./header.css"

export const HeaderSousThematiques = ({theme})=>{  
    const navigate = useNavigate() 
     const handleNavigateTheme = () => {
    navigate('/theme', { state: { filter: "etat" } });
};
    return (
        <div className="header_main_sous_thematique">
            <span className="header_main_1" onClick={handleNavigateTheme}>Thématiques</span>
            <FontAwesomeIcon icon={faAngleRight} className="header_main_2_icons"/>
            <span className="header_main_3">{theme}</span>
        </div>
    )
}