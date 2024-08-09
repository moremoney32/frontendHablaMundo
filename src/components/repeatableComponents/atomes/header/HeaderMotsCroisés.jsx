import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, useNavigate } from "react-router-dom"
import right from "../../../../assets/icons/right.svg"
import "./header.css"
import { useEffect, useRef, useState } from "react"
import { fetchDataPut } from "../../../../helpers/fetchDataPut"
import { fetchDelete } from "../../../../helpers/fetchDelete"
import { snackbbar } from "../../../../helpers/snackbars"

export const HeaderMotsCroisés = ({ theme1, theme2}) => {
    const [isEditable, setIsEditable] = useState(false)
    const [theme2Value, setTheme2Value] = useState(theme2);
    const id = JSON.parse(localStorage.getItem('id'));
    console.log(id)
    const token = localStorage.getItem('token');
    let theme2Ref = useRef(null);
    const navigate = useNavigate()
    const handleNavigateTheme = () => {
        navigate('/theme', { state: {filter: "etat"}});
    };

    const handleEditable = () => {
        setIsEditable(!isEditable);
    };
    const removeSousTheme = () => { 
        const dataSend ={
            id:id,
        }
        console.log(dataSend)
        fetchDelete("https://www.backend.habla-mundo.com/api/v1/crosswords",dataSend,token).then((result) =>{
            console.log(result)
            if (result.message === "the crossword is deleted") {
                snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 2000);
                setTimeout(() => {
                    navigate("/sousThematiques");
                }, 2000);
            }
       }).catch((error)=>{
        console.log({message:error})
       })
    };

    
    const handleChange = () => {
        const dataSend ={
            id:id,
            name:theme2Ref.current.innerText
        }
        console.log(dataSend)
        setIsEditable(!isEditable);
        fetchDataPut("https://www.backend.habla-mundo.com/api/v1/crosswords",dataSend,token).then((result) => {
            console.log(result)
       }).catch((error)=>{
        console.log({messahge:error})
       })
    };
    return (
        <div className="header_main">
            <div className="header_main_left">
                <span className="header_main_1" onClick={handleNavigateTheme}>Thématiques</span>
                <img src={right} className="header_main_2_icons_mots_croisés" />
                <NavLink to="/sousThematiques" className="nav_link"><span className="header_main_1-span">{theme1}</span> </NavLink>
                <img src={right} className="header_main_2_icons_mots_croisés" />
                {isEditable ?<span className="header_main_3" contentEditable ref={theme2Ref}>{theme2Value}</span>:<span className="header_main_3" disable>{theme2Value}</span>}
                {isEditable ? <button className="update_buton" onClick={handleChange}>Enregistrer</button> : <button className="update_buton" onClick={handleEditable}>Modifier</button>}
            </div>
            <button className="header_remove_worlds" onClick={removeSousTheme}>Supprimer le mot croisé</button>
        </div>
    )
}