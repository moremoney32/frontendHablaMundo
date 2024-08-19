// import  "./header.css"
// import hablamundo from "../../../../assets/logos/hablamundo.png"
// import checklist from "../../../../assets/icons/checklist.png"
// import notifications from "../../../../assets/icons/notifications.png"
// import photo from "../../../../assets/images/photo.png"
// import { useEffect } from "react"
// export const Header = ({files})=>{
// console.log(JSON.parse(localStorage.getItem("notificationsNews")))
//     return(
//         <div className='header'>
//             <div className="header_left">
//                 {/* <img src={checklist} alt="checklist" /> */}
//                 <img src={hablamundo} alt="hablamundo" />
//             </div>
//             <div className="header_right">
//                 <div className="parent_notifications">
//                 <img src={notifications} alt="notifications" className="notifications_img"/>
//              {
//                     JSON.parse(localStorage.getItem("notificationsNews"))?.length>0 &&(
//                         <span className="counter_notifications">{JSON.parse(localStorage.getItem("notificationsNews")).length}</span>

//                     )
//                 } 
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import "./header.css";
import hablamundo from "../../../../assets/logos/hablamundo.png";
import notifications from "../../../../assets/icons/notifications.png";

export const Header = () => {
    const [notificationsCount, setNotificationsCount] = useState(() => {
        // Initialiser avec les données du localStorage
        return JSON.parse(localStorage.getItem("notificationsNews"))?.length || 0;
    });

    useEffect(() => {
        // Fonction pour mettre à jour les notifications
        const updateNotifications = () => {
            const storedNotifications = JSON.parse(localStorage.getItem("notificationsNews")) || [];
            setNotificationsCount(storedNotifications.length);
        };

        // Ajouter un écouteur pour l'événement personnalisé
        window.addEventListener('notificationsUpdated', updateNotifications);

        // Nettoyage : retirer l'écouteur lorsque le composant est démonté
        return () => {
            window.removeEventListener('notificationsUpdated', updateNotifications);
        };
    }, []);

    return (
        <div className='header'>
            <div className="header_left">
                <img src={hablamundo} alt="hablamundo" />
            </div>
            <div className="header_right">
                <div className="parent_notifications">
                    <img src={notifications} alt="notifications" className="notifications_img" />
                    {
                        notificationsCount > 0 && (
                            <span className="counter_notifications">{notificationsCount}</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
