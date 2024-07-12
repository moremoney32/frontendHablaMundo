import "./button.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ButtonMainLeft = ({icons,name,defaultClassName,isActive})=>{
    return(
        <div className='button_main_left'>
                <FontAwesomeIcon icon={icons}    className={`${defaultClassName} ${isActive ? 'icon_active' : ''}`} />
                <span>{name}</span>
        </div>
    )
}