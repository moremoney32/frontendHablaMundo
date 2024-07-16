

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export const Select = ({dataSelectStatus,handleChildClick,changeIcon,optionVisible,rotateIcon,optionName,defautClassName,selectRef}) => {

    return (
        <div className={defautClassName}>
            <div className={`parent_abonnes ${rotateIcon ? 'focused' : ''}`} onClick={changeIcon} ref={selectRef}>
                <span>{optionName}</span>
                <FontAwesomeIcon icon={faAngleDown} className="icon_zIndex"  style={{transform: rotateIcon && "rotate(180deg)" }}/>
            </div>
            {optionVisible && (
                <div className="option">
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


