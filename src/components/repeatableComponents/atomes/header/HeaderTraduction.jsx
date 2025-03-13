import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import infos from "../../../../assets/icons/infos.svg"
import "./header.css"
import { snackbbar } from "../../../../helpers/snackbars"
import { fetchData } from "../../../../helpers/fetchData"

export const HeaderTraduction = ({ theme }) => {
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(false);
    let theme2Ref = useRef(null);
    const token = localStorage.getItem("token")
    console.log(token)
    const handleNavigateTheme = () => {
        navigate('/grammaire');
    };
    const handleNavigateSousTheme = () => {
        navigate('/grammaire', { state: { filter: "etatB", fromHome: true } });
    };
    const handleEditable = () => {
        setIsEditable(!isEditable);
    };
    const handleChange = () => {
        const dataSend = {
            title: theme2Ref.current.innerText,
            thematique_id: parseInt(localStorage.getItem("idThematiqueTraduction"))

        }
        console.log(dataSend)
        setIsEditable(!isEditable);
            fetchData("lesson/update_title",dataSend,token).then((result) => {
                console.log(result)
                if(result.status === 200){
                    snackbbar(document.querySelector("#body"),infos,"Demande prise en compte", 2000);  
                }
           }).catch((error)=>{
            console.log({messahge:error})
           })
    };
    return (
        <div className="header_main_sous__parent_thematique">
            <div className="header_main_sous_thematique">
                <span className="header_main_1" onClick={handleNavigateTheme}>Grammaire</span>
                <FontAwesomeIcon icon={faAngleRight} className="header_main_2_icons" />
                {/* <span className="header_main_3">{theme}</span> */}
                {isEditable ? <span className="header_main_3" contentEditable ref={theme2Ref}>{theme}</span> : <span className="header_main_3" disable>{theme}</span>}
                {isEditable ? <button className="update_buton" onClick={handleChange}>Enregistrer</button> : <button className="update_buton" onClick={handleEditable}>Modifier</button>}
            </div>
            <button className="header_remove_worlds" onClick={handleNavigateSousTheme}>Ajouter un niveau</button>
        </div>
    )
}