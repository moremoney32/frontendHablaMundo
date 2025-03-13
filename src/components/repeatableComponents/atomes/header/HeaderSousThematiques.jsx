import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import "./header.css"
import { useRef, useState } from "react"
import { fetchDataPut } from "../../../../helpers/fetchDataPut"
import { snackbbar } from "../../../../helpers/snackbars"
import infos from "../../../../assets/icons/infos.svg"

export const HeaderSousThematiques = ({ theme, updateSousThematique }) => {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
     const token = localStorage.getItem('token');
     const resultValue = JSON.parse(localStorage.getItem('result'))
     let message1 = "Demande prise en compte"
    let theme2Ref = useRef(null);
    const handleNavigateTheme = () => {
        navigate('/theme', { state: { filter: "etat" } });
    };
    
    const handleEditable = () => {
        setIsEditable(!isEditable);
    };
    const handleChange = () => {
        
        const dataSend = {
            id:resultValue.id,
            name:theme2Ref.current.innerText
        }
        console.log(dataSend)
        setIsEditable(!isEditable);
        fetchDataPut("themes",dataSend,token).then((result) => {
            console.log(result)
            if(result.message === "successful update"){
                snackbbar(document.querySelector("#body"),infos,message1, 2000);  
            }
       }).catch((error)=>{
        console.log({messahge:error})
       })
    };
    return (
        <div className="header_main_sous__parent_thematique">
            <div className="header_main_sous_thematique">
                <span className="header_main_1" onClick={handleNavigateTheme}>Thématiques</span>
                <FontAwesomeIcon icon={faAngleRight} className="header_main_2_icons" />
                {isEditable ?<span className="header_main_3" contentEditable ref={theme2Ref}>{theme}</span>:<span className="header_main_3" disable>{theme}</span>}
                {isEditable ? <button className="update_buton" onClick={handleChange}>Enregistrer</button> : <button className="update_buton" onClick={handleEditable}>Modifier</button>}
            </div>
            {/* <div className="update_theme_sous_thematique">
                <span>+</span>
                <span onClick={updateSousThematique}>Ajouter une sous thématique</span>
            </div> */}

        </div>
    )
}