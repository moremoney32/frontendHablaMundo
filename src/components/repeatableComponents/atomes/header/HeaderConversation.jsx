import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import "./header.css"

export const HeaderConversation = ({ theme, removeSousTheme}) => {
    const navigate = useNavigate();
    const handleNavigateTheme = () => {
        navigate('/conversation');
    };
    

    return (
        <div className="header_main_sous__parent_thematique">
            <div className="header_main_sous_thematique">
                <span className="header_main_1" onClick={handleNavigateTheme}>Conversation</span>
                <FontAwesomeIcon icon={faAngleRight} className="header_main_2_icons" />
                <span className="header_main_3" >{theme}</span>
            </div>
            <button className="header_remove_worlds1" onClick={removeSousTheme}>Supprimer la conversation</button>

        </div>
    )
}