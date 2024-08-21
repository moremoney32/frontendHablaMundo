
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import  "./iconesInformations.css"

export const IconesInformations = ({style,theme,updateCrosswords,crossword})=>{
    return(
        <div className="icones_users_informations" style={style} onClick={updateCrosswords}>
             <span className="theme_projects">{theme}</span>
            <div className="sous_icons_infos">
                <span>{crossword} Mots croisés</span>
            </div>
        </div>
    )
}