import "./mainRightComptes.css"
import photo from "../../../assets/images/photo.png"
import checkpictures from "../../../assets/images/checkpictures.png"
import edit from "../../../assets/icons/edit.png"
import { useEffect, useState } from "react"
import { fetchDataGetToken } from "../../../helpers/fetchDataGetToken"
export const MainRightComptes = ({ changePicture, files }) =>{
    const token = localStorage.getItem("token")
    const [data,setData] = useState("")
    // const [data, setData] = useState({
    //     firstName: "tamho",
    //     lastName: "gaelle",
    //     email: "jugalux@gmail.com"
    // })
    useEffect(() =>{
        fetchDataGetToken("https://www.backend.habla-mundo.com/api/v1/user",token).then((result) =>{
            console.log(result)
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
            if (JSON.stringify(data) !== JSON.stringify(originalData)) {
                console.log(data)
            }
        }
        setIsEditable(!isEditable);
    }
    // const handleChangeInfos = () => {
    //     const dataSend ={
    //         id:id,
    //         name:theme2Ref.current.innerText
    //     }
    //     console.log(dataSend)
    //     setIsEditable(!isEditable);
    //     fetchDataPut("https://www.backend.habla-mundo.com/api/v1/crosswords",dataSend,token).then((result) => {
    //         console.log(result)
    //    }).catch((error)=>{
    //     console.log({messahge:error})
    //    })
    // };
    return (
        <div className="parent_main">
          <div className="sous_parent_main_comptes">
          
                  {/* <div className="sous_parent_main1">
                    {files ? <img src={URL.createObjectURL(files)} alt="" className="update_file" /> : <img src={photo} alt="photo" />}
                    <label>
                        <input type="file" accept=".jpg,.jpeg,.png" name="file" style={{ display: "none" }} onChange={changePicture} />
                        <img src={checkpictures} alt="picture" className="checkpictures" />
                    </label>
                </div> */}
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
                            <input type="text" name="firstName" value={data.first_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="lastName">Prenom</label>
                            <input type="text" name="lastName" value={data.first_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                </div>
                <div className="sous_parent_main3">
                    <a href="#">Thèmes et conditions d'utilisations</a>
                    <a href="#">Politique de confidentialité</a>
                </div>
            </div> 
        </div>
    )
}