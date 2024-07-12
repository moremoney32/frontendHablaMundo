import "./mainRightComptes.css"
import photo from "../../../assets/images/photo.png"
import checkpictures from "../../../assets/images/checkpictures.png"
import edit from "../../../assets/icons/edit.png"
import { useState } from "react"
export const MainRightComptes = ({ changePicture, files }) => {
    const [data, setData] = useState({
        firstName: "tamho",
        lastName: "gaelle",
        email: "jugalux@gmail.com"
    })
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
            if (JSON.stringify(data) !== JSON.stringify(originalData)) {
                console.log(data)
            }
        }
        setIsEditable(!isEditable);
    }
    return (
        <div className="parent_main">
          <div className="sous_parent_main_comptes">
          
                  <div className="sous_parent_main1">
                    {files ? <img src={URL.createObjectURL(files)} alt="" className="update_file" /> : <img src={photo} alt="photo" />}
                    <label>
                        <input type="file" accept=".jpg,.jpeg,.png" name="file" style={{ display: "none" }} onChange={changePicture} />
                        <img src={checkpictures} alt="picture" className="checkpictures" />
                    </label>
                </div>
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
                            <label htmlFor="firstName">Nom</label>
                            <input type="text" name="firstName" value={data.firstName} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="lastName">Prenom</label>
                            <input type="text" name="lastName" value={data.lastName} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                </div>
                <div className="sous_parent_main3">
                    <a href="#">Termes et condition d'utilsation</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
            </div> 
        </div>
    )
}