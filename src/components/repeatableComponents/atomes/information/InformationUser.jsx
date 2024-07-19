
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import  "./information.css"

export const InformationUser = ({defaultClassName,icon,number,user,className})=>{
    return(
        <div className="parent_infos">
             <FontAwesomeIcon icon={icon} className={defaultClassName}/>
            <div className="parent_infos_right">
                <span className={className}>{number}</span>
                <span>{user}</span>
            </div>
        </div>
    )
}