import { useState } from "react"
import { MainRightComptes } from "../../components/componentNotRetulables/mainRightComptes/MainRightComptes"
import { Header } from "../../components/repeatableComponents/atomes/header/Header"
import { SideBar } from "../../components/repeatableComponents/atomes/sideBar/SideBar"
import "./comptes.css"

export const Comptes = ()=>{
    const [file, setFile] = useState(null);
    const handlePictureChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const TypesImages = ["image/jpeg", "image/png", "image/jpg"];
          if (TypesImages.includes(selectedFile.type)) {
            console.log(selectedFile)
            setFile(selectedFile);
          } else {
            alert("Veuillez sélectionner un fichier au format .jpg, .jpeg ou .png.");
          }
        }
      };
    return(
        <div>
             <Header files={file}/>
             <div className="parent_comptes">
             <SideBar/>
              <MainRightComptes changePicture={handlePictureChange} files={file}/> 
             </div>
        </div>
    )
}