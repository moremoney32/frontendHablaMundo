

import { useEffect, useState } from "react";
import "./header.css";
import hablamundo from "../../../../assets/logos/hablamundo.png";
import {useNavigate} from "react-router-dom"
import notifications from "../../../../assets/icons/notifications.png";
import { useNotifications } from "../../../componentNotRetulables/mainRight/NotificationsProvider";

export const Header = () => {
    const navigate = useNavigate()
    const notificationsHeader = useNotifications();
    const [notificationsCount, setNotificationsCount] = useState(notificationsHeader);
     useEffect(() =>{
     return   setNotificationsCount(notificationsHeader);
     },[notificationsHeader])

    const notificationsImg= ()=>{
        navigate("/message")
    }

    return (
        <div className='header'>
            <div className="header_left">
                <img src={hablamundo} alt="hablamundo" />
            </div>
            <div className="header_right">
                {/* <div className="parent_notifications">
                   <img src={notifications} alt="notifications" className="notifications_img" onClick={notificationsImg}/>
                 {
                        notificationsCount?.length > 0 && (
                            <span className="counter_notifications">{notificationsCount.length}</span>
                        )
                    } 
                </div> */}
            </div>
        </div>
    );
};
