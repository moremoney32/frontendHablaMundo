import  "./header.css"
import hablamundo from "../../../../assets/logos/hablamundo.png"
import checklist from "../../../../assets/icons/checklist.png"
import notifications from "../../../../assets/icons/notifications.png"
import photo from "../../../../assets/images/photo.png"
export const Header = ({files})=>{
    return(
        <div className='header'>
            <div className="header_left">
                <img src={checklist} alt="checklist" />
                <img src={hablamundo} alt="hablamundo" />
            </div>
            <div className="header_right">
                <div className="parent_notifications">
                <img src={notifications} alt="notifications" />
                </div>
                {files ? <img src={URL.createObjectURL(files)} alt="" className="photo_profil"/> :<img src={photo} alt="photo" className="photo_profil"/>}
            </div>
        </div>
    )
}