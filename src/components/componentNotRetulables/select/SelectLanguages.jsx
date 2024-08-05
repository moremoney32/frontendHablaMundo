import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export const SelectLanguages = ({dataSelectStatus,handleChildClick,changeIcon,icon,optionVisible,rotateIcon,optionName,defautClassName,selectRef}) => {

    return (
        <div className={defautClassName}>
            <div className={`parent_abonnes_language ${rotateIcon ? 'focused' : ''}`} onClick={changeIcon} ref={selectRef}>
                <span>{optionName}</span>
                <img src={icon} className="icon_language_img"/>
                <FontAwesomeIcon icon={faAngleDown} className="icon_language"  style={{transform: rotateIcon && "rotate(180deg)" }}/>
            </div>
            {optionVisible && (
                <div className="option_language">
                    {
                        dataSelectStatus.map((changeGender,index)=>{
                            return(
                                <span key={index} onClick={() => handleChildClick(changeGender)}>
                                {changeGender}
                            </span>
                            )
                        })
                    }
                </div>
            )}
        </div>
    )
}