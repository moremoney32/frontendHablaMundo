import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { InformationUser } from "../../../repeatableComponents/atomes/information/InformationUser"
import {  faCommentDots, faGripHorizontal, faUser,faAlphabetical, faSchool } from "@fortawesome/free-solid-svg-icons"
import "./mainRightHome.css"
import { IconesInformations } from "../../../repeatableComponents/atomes/iconesInformation/IconesInformations"
import { NavLink, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { fetchDataGet } from "../../../../helpers/fetchDataGet"
import { useNotifications } from "../NotificationsProvider"

export const MainRightHome = () => {
    const navigate = useNavigate();
    const[stat,setStat] = useState(null);
    const[taux,setTaux] = useState(null);
    const notificationsHeader = useNotifications();
    const [data, setData] = useState(notificationsHeader)
    useEffect(() =>{
        setData(notificationsHeader)
    },[notificationsHeader])
    // const [data, setData] = useState(() => {
    //     const storedData = localStorage.getItem('notificationsNews');
    //     return storedData ? JSON.parse(storedData) : [];
    // });
    const[resultAllThematiques,setResultAllThematiques] = useState(null);
    useEffect(() => {
        const eventSource= new EventSource('https://backend.habla-mundo.com/api/v1/listen-message');
        eventSource.addEventListener('message', (event) => {
            if (event.data === "nothing") {
                return;
            }
            else {
                const newMessages = JSON.parse(event.data);
                    setData(prevMessages => {
                        const updatedData = [...prevMessages, newMessages];
                        localStorage.setItem('notificationsNews', JSON.stringify(updatedData));
                    
                        // Émettre un événement personnalisé
                        const event = new Event('notificationsUpdated');
                        window.dispatchEvent(event);
                    
                        return updatedData;
                    });
            }

        });

        return () => {
            eventSource.close();
        };
    }, []);
  
    
  

    const handleNavigate = () => {
        navigate('/user');
    };
 
    const handleNavigateTheme = () => {
        navigate('/theme', { state: { filter: "etat", fromHome: true } });
    };
    const updateCrosswords = (id, name) => {
        const result = { id: id }
        const dataSend = { name: name }
        localStorage.setItem('result', JSON.stringify(result))
        localStorage.setItem('theme', JSON.stringify(dataSend));
        setTimeout(() => {
            navigate("/sousThematiques");
        }, 500);
    }
    let counter = 10
    // useEffect(() => {
    //     fetchDataGet("https://www.backend.habla-mundo.com/api/v1/themes").then((result) => {
    //         if(result<=counter){
    //             return   setResultAllThematiques(result)
    //         }
    //         else{
    //             result.slice(-counter)
    //             return  setResultAllThematiques(result)
    //         }
           
    //     })
    // }, [])
    useEffect(() => {
        fetchDataGet("https://www.backend.habla-mundo.com/api/v1/themes").then((result) => {
            if (result.length <= counter) {
                // Si le tableau a moins ou exactement "counter" éléments, afficher tout
                return setResultAllThematiques(result.reverse().slice());
            } else {
                // Sinon, afficher uniquement les 10 derniers éléments
                const lastItems = result.reverse().slice(-counter);
                return setResultAllThematiques(lastItems);
            }
        });
    }, [counter]);
    useEffect(() =>{
            fetchDataGet("https://www.backend.habla-mundo.com/api/v1/statistique").then((result) =>{
               // const pourcent = (result?.suscribes * 100) / result?.users
               //const pourcent = Math.ceil((result?.suscribes * 100) / result?.users);
                console.log(result)
               const pourcent = Math.floor((result?.suscribes * 100) / result?.users);
                setTaux(pourcent)
               return  setStat(result)
            })
    },[])

    return (
        <div className="parent_main">
            <div>
                <HeaderTitleMain h1="Tableau de bord" h2="Habla Mundo" />
            </div>
            <div className="sous_parent_main_home">
                <div className="sous_parent_main_home1">
                    <NavLink to="/user" className="nav_link"><InformationUser defaultClassName="icons_user_img" user="Utilisateurs inscrits" icon={faUser} number={stat?.users} className="color_home" /></NavLink>
                    <div onClick={handleNavigate} className="nav_link"><InformationUser defaultClassName="icons_user_img1" user="Abonnés Annuel" icon={faUser} number={stat?.abonneAnnuel} pourcent={`(${stat?.pourcentageAnnuel}%)`} className="color_home1" /></div>
                    <div onClick={handleNavigate} className="nav_link"><InformationUser defaultClassName="icons_user_img1" user="Abonnés Mensuel" icon={faUser} number={stat?.abonneMensuel} pourcent={`(${stat?.pourcentageMensuel}%)`} className="color_home1" /></div>
                    <NavLink to="/message" className="nav_link"><InformationUser defaultClassName="icons_user_img3" user="Messages reçus" icon={faCommentDots} number={stat?.nombres_messages} className="color_home3"/></NavLink>
                    <NavLink to="/theme" className="nav_link"><InformationUser defaultClassName="icons_user_img2" user="Thématiques" icon={faGripHorizontal} number={stat?.thematiques} className="color_home2"/></NavLink>
                    <InformationUser defaultClassName="icons_user_img2" user="Mots croisés" icon={faGripHorizontal} number={stat?.crosswords} className="color_home2" />
                    <InformationUser defaultClassName="icons_user_img1" user="Nombres de mots" icon={faSchool} number={stat?.words} className="color_home2" />
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
                        {
                            resultAllThematiques?.map((result)=>{
                                return(   
                                    <IconesInformations style={{ backgroundColor: result.color }}  theme={result.name} crossword={result.crosswords_count} key={result.id} updateCrosswords={() => updateCrosswords(result.id, result.name)}/>    
                                )
                            })
                        }
                        
                    </div>
                    <NavLink to="/theme" className="voir_plus"><span>Voir plus</span></NavLink>

                </div>
                <div className="sous_parent_main_home3">
                    <span className="h3_home">Notifications</span>
                    <div className="parent_notifications_home">
                        {
                            data?.map((info,index)=>{
                                return(
                                    <NavLink to="/message" className="nav_link" key={index}>
                                    <div className="notifications_message">
                                        <FontAwesomeIcon icon={faCommentDots} className="icons_comments" />
                                        <div className="parents_message_notifications">
                                            <span className="new_message">{info.username}</span>
                                            <span> a envoyer un message</span>
        
                                        </div>
                                    </div>
                                </NavLink>
                                )
                            })
                        } 
                    </div>
                </div>
            </div>

        </div>
    )
}