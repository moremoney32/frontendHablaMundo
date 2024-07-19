import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { InformationUser } from "../../../repeatableComponents/atomes/information/InformationUser"
import { faCableCar, faCircleMinus, faCommentDots, faUser } from "@fortawesome/free-solid-svg-icons"
import "./mainRightHome.css"
import { IconesInformations } from "../../../repeatableComponents/atomes/iconesInformation/IconesInformations"
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const MainRightHome = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/user', { state: { filter: 'Abonné(e)' } });
    };
    const handleNavigateTheme = () => {
        navigate('/theme', { state: { filter: "etat" } });
    };
    return (
        <div className="parent_main">
            <div>
                <HeaderTitleMain h1="Tableau de bord" h2="Habla Mundo" />
            </div>
            <div className="sous_parent_main_home">
                <div className="sous_parent_main_home1">
                    <NavLink to="/user" className="nav_link"><InformationUser defaultClassName="icons_user_img" user="Utilisateurs inscrits" icon={faUser} number="300" className="color_home" /></NavLink>
                    <div onClick={handleNavigate} className="nav_link"><InformationUser defaultClassName="icons_user_img1" user="Utilisateurs abonnés" icon={faUser} number="290" className="color_home1" /></div>
                    <NavLink to="/theme" className="nav_link"><InformationUser defaultClassName="icons_user_img2" user="Thématiques" icon={faCircleMinus} number="1000" className="color_home2" /></NavLink>
                    <NavLink to="/message" className="nav_link"><InformationUser defaultClassName="icons_user_img3" user="Messages reçus" icon={faCommentDots} number="10" className="color_home3" /></NavLink>
                </div>
                <div className="sous_parent_main_home2">
                    <div className="title_main_home">
                        <span className="h3_home">Thématiques</span>
                        <div className="update_theme_home">
                            <span>+</span>
                            <span className="update_home" onClick={handleNavigateTheme}>Ajouter une thématique</span>
                        </div>
                    </div>
                    <div className="main_home">
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                        <IconesInformations defaultClassName="icones_users_informations" icon={faCableCar} theme="Verbes reguliers" />
                    </div>
                    <NavLink to="/theme" className="voir_plus"><span>Voir plus</span></NavLink>

                </div>
                <div className="sous_parent_main_home3">
                    <span className="h3_home">Notifications</span>
                    <div className="parent_notifications_home">

                        <div className="notifications_message">
                            <FontAwesomeIcon icon={faCommentDots} className="icons_comments" />
                            <div className="parents_message_notifications">
                                <span className="new_message">Gaelle tamho has sent you</span>
                                <span>a message</span>

                            </div>
                        </div>

                        <div className="notifications_message">
                            <FontAwesomeIcon icon={faCommentDots} className="icons_comments" />
                            <div className="parents_message_notifications">
                                <span className="new_message">Gaelle tamho has sent you</span>
                                <span>a message</span>

                            </div>
                        </div>

                        <div className="notifications_message">
                            <FontAwesomeIcon icon={faCommentDots} className="icons_comments" />
                            <div className="parents_message_notifications">
                                <span className="new_message">Gaelle tamho has sent you</span>
                                <span>a message</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}