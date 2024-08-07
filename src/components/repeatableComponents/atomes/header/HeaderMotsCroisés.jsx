import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import right from "../../../../assets/icons/right.svg"
import "./header.css"

export const HeaderMotsCroisés = ({ theme1, theme2 }) => {
    const navigate = useNavigate()
    const handleNavigateTheme = () => {
        navigate('/theme', { state: { filter: "etat" } });
    };
    const updateName =() => {
        console.log(true)
    };
    return (
        <div className="header_main">
            <div className="header_main_left">
                <span className="header_main_1" onClick={handleNavigateTheme}>Thématiques</span>
                <img src={right} className="header_main_2_icons_mots_croisés" />
                <NavLink to="/sousThematiques" className="nav_link"><span className="header_main_1-span">{theme1}</span> </NavLink>
                <img src={right} className="header_main_2_icons_mots_croisés" />
                <span className="header_main_3" contentEditable>{theme2}</span>
                <button className="update_buton" onClick={updateName}>Modifier</button>
            </div>
            <button className="header_remove_worlds">Supprimer le mot croisé</button>
        </div>
    )
}