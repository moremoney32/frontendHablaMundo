
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import  "./iconesInformations.css"

export const IconesInformations = ({defaultClassName,icon,theme})=>{
    return(
        <div className={defaultClassName}>
             <span className="theme_projects">{theme}</span>
            <div className="sous_icons_infos">
                <span>25 mots croisés</span>
                <FontAwesomeIcon icon={icon} className="icons_project"/>
            </div>
        </div>
    )
}