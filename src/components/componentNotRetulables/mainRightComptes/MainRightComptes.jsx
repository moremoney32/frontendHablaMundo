import "./mainRightComptes.css"
import edit from "../../../assets/icons/edit.png"
import { useEffect, useState } from "react"
import { fetchDataGetToken } from "../../../helpers/fetchDataGetToken"
import { fetchData } from "../../../helpers/fetchData"
import { snackbbar } from "../../../helpers/snackbars"
import infos from "../../../assets/icons/infos.svg"
export const MainRightComptes = () =>{
    const token = localStorage.getItem("token");
    const [data,setData] = useState("");
      let message1 = "Demande prise en compte"
    useEffect(() =>{
        fetchDataGetToken("https://www.backend.habla-mundo.com/api/v1/user",token).then((result) =>{
            setData(result)
        })
},[])
    const [originalData, setOriginalData] = useState({
        firstName: "tamho",
        lastName: "gaelle",
        email: "jugalux@gmail.com"
    })
    const [isEditable, setIsEditable] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }
    const handleEditable = () => {
        if (isEditable) {
                fetchData("https://www.backend.habla-mundo.com/api/v1/update/users/admin",data,token).then((response)=>{
                    if(response.message === "update successful"){
                        return snackbbar(document.querySelector("#body"), infos,message1, 2000)
                    }
                })
            }
        setIsEditable(!isEditable);
    }

    return (
        <div className="parent_main">
          <div className="sous_parent_main_comptes">
                <div className="sous_parent_main2">
                    <div className="sous_parent_main2_header">
                        <span className="info">Informations personnelles</span>
                        {!isEditable ? <div className="update_info_user" onClick={handleEditable}>
                            <img src={edit} alt="edit" />
                            <span>modifier</span>
                        </div> : <div className="update_info_user" onClick={handleEditable}>
                            <img src={edit} alt="edit" />
                            <span>Enregistrer</span>
                        </div>}
                    </div>
                    <div className="sous_parent_main2_main">
                        <div className="space_infos">
                            <label htmlFor="last_name">Nom</label>
                            <input type="text" name="last_name" value={data.last_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="first_name">Prenom</label>
                            <input type="text" name="first_name" value={data.first_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                </div>
                <div className="sous_parent_main3">
                    <a href="#">Thèmes et conditions d'utilisation</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
            </div> 
        </div>
    )
}