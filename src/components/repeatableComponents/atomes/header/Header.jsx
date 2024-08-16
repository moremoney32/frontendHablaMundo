import  "./header.css"
import hablamundo from "../../../../assets/logos/hablamundo.png"
import checklist from "../../../../assets/icons/checklist.png"
import notifications from "../../../../assets/icons/notifications.png"
import photo from "../../../../assets/images/photo.png"
import { useEffect } from "react"
export const Header = ({files})=>{
    // useEffect(()=>{

    // },[JSON.parse(localStorage.getItem("notificationsNews"))])
    return(
        <div className='header'>
            <div className="header_left">
                {/* <img src={checklist} alt="checklist" /> */}
                <img src={hablamundo} alt="hablamundo" />
            </div>
            <div className="header_right">
                <div className="parent_notifications">
                <img src={notifications} alt="notifications" className="notifications_img"/>
                {/* {
                    JSON.parse(localStorage.getItem("notificationsNews"))?.lenght>0 &&(
                        <span className="counter_notifications">{JSON.parse(localStorage.getItem("notificationsNews")).lenght}</span>

                    )
                } */}
                {/* <span className="counter_notifications">{JSON.parse(localStorage.getItem("notificationsNews")).lenght}</span> */}
                </div>
                {/* {files ? <img src={URL.createObjectURL(files)} alt="" className="photo_profil"/> :<img src={photo} alt="photo" className="photo_profil"/>} */}
            </div>
        </div>
    )
}