import { useEffect, useRef, useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { SketchPicker } from 'react-color';
import "./mainRightTheme.css"
import "../mainRightUsers/mainRightUsers.css"
import "../mainRightMessages/mainRightMessages.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom"
import search from "../../../../assets/icons/search.png";
import { icons } from '../../../../helpers/icons';
import { Select } from "../../select/Select";
import { useForm } from 'react-hook-form';
import { faAngleRight, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../../../helpers/fetchData";
export const MainRightTheme = () => {
    const [etat, setEtat] = useState(false);
    const [color, setColor] = useState('#ED4C5C');
    const [showPicker, setShowPicker] = useState(false);
    const [etatSousTheme, setEtatSousTheme] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIconIndex, setSelectedIconIndex] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionName, setOptionName] = useState("Plus récents");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [loading, setLoading] = useState(false);
    const selectRef = useRef(null);
    const dataSelectStatus = ["Plus récents", "Moins récents"];
    const dataSelect = ["Anglais"]
    const location = useLocation()
    const changeIcon = () => {
        const select = selectRef.current
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            console.log(rotateIcon)
            // Deuxième clic : masquer les options
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisible(false);
        } else {
            console.log(rotateIcon)
            // Premier clic : afficher les options
            // console.log(selectRef.current.classList.toggle("bottomRaduisNone"))
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    const handleChildClick = (value) => {
        const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
    };

    const handleIconClick = (index) => {
        setSelectedIconIndex(index);
        const iconColor = {
            icon: icons[index].name,
            color: color
        };

        let storedIcons = JSON.parse(localStorage.getItem('selectedIconColors')) || [];
        storedIcons.push(iconColor);
        localStorage.setItem('selectedIconColors', JSON.stringify(storedIcons));
    };

    const filteredIcons = icons.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const checkTheme = () => {
        setEtat(true)
    }
    const close = () => {
        setEtat(false)
    }
    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };


    const togglePicker = () => {
        setShowPicker(!showPicker);
    };
    const handleClickOutside = (event) => {
        if (!event.target.closest('.parent_palette_color')) {
         setShowPicker(false)
        }
      };

    const handleInputChange = (e) => {
        setColor(e.target.value);
        if (e.target.value === '') {
            setShowPicker(true);
        } else {
            setShowPicker(false);
        }
    };
    const onSubmit = (data,event) => {
        event.preventDefault();
        console.log(data)
        console.log(icons[selectedIconIndex].name)
        if (data) {
            const themeColor = {
                theme: data.thematique,
                color: color,
                icon:icons[selectedIconIndex].name
            };
            setEtatSousTheme(true)
            setEtat(false)
            localStorage.setItem('theme', JSON.stringify(themeColor));
            setLoading(true)
            fetchData("https://www.backend.habla-mundo.com/api/v1/generate-words",themeColor).then((result)=>{
                console.log(result)
                  
                //   if(result.message === "Utilisateur créé avec succès"){
                //     return dispatch(setAuth(result)),snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.message, 5000),navigate("/login")
                //   }
                //   else if(result.messageError === 'cet email existe deja veuillez changer d adresse'){
                //      snackbbar(document.querySelector("#body"), "../../icons/info.svg", result.messageError, 5000)
                //   }
                //   else if(result.message === 'Erreur lors de lenvoi de le-mail de confirmation'){
                //     return alert("probleme de connexion")
                //   }
                  
                 })
                 .catch((error) => {
                    setEtat(true)
                  console.log({message:error.message});
                  
                }).finally(()=>{
                  setLoading(false)
                })

        }
    }
    useEffect(() => {
        console.log(location.state);
        
        if (location.state?.filter) {
            setEtat(true)
        }
    }, [location.state]);
    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Thématiques" />
                <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une thématique</span>
                </div>
            </div>
            <div className="sous_parent_main_users_header">
                    <div className="sous_parent_main_users_header_input">
                        <input type="text" className="input_users" placeholder="Rechercher une thématique" name="checkValueThematique" />
                        <div className="parent_search_users">
                            <img src={search} alt="" className="search_users" />
                        </div>
                    </div>
                    <Select
                        dataSelectStatus={dataSelectStatus}
                        changeIcon={changeIcon}
                        handleChildClick={handleChildClick}
                        selectRef={selectRef}
                        optionName={optionName}
                        optionVisible={optionVisible}
                        rotateIcon={rotateIcon}
                        defautClassName="select" />
                </div>
              
                    <div className="alls_thematics">
                        <div className="sous_alls_thematics">
                            <div className="parent_icons_thematics">
                                <FontAwesomeIcon icon={faUserAlt} className="parent_icons_thematics_child1"/>
                                <span className="parent_icons_thematics_child2">Verbes Irreguliers</span>
                            </div>
                            <span className="parent_icons_thematics_span">25 Mots croisés</span>
                            <span className="parent_icons_thematics_span">Crée le 20/30/2020</span>
                            <div className="parent_messages3_thematics">
                                <span className="repondre_thematic">Mots croisés</span>
                                <FontAwesomeIcon icon={faAngleRight} className="next" />
                            </div>
                        </div>

                    </div>
                
            <div className="sous_parent_main_thematique">

                {etat && <div id="masqueTheme"></div>}
                {etat && <form id="answer_client_theme" onSubmit={handleSubmit(onSubmit)} onClick={handleClickOutside}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
                    <h1 className="answer_client_theme1">CREATION DE LA THEMATIQUE</h1>
                    <div className="answer_client_theme2">
                        <div className="answer_client_theme2_child1">
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Nom de la thématique</label>
                                <input type="text" placeholder="Entrer le nom de la thematique" name="thematique" {...register("thematique", { required: "Veuillez entrer une question" })} />
                                {errors.thematique && <span className="error_theme">{errors.thematique.message}</span>}
                            </div>
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Langue de la traduction</label>
                                <Select />
                            </div>
                        </div>
                        <div className="answer_client_theme2_child2">
                            <label htmlFor="">Couleur</label>
                            <span className="circle" style={{ backgroundColor: color }}></span>
                            <input type="text" value={color}
                                onChange={handleInputChange}
                                onFocus={() => setShowPicker(true)} />
                            {showPicker && (
                                 <div className="parent_palette_color">
                                     {/* <FontAwesomeIcon icon={faClose} className="close_color" style={{ color: color }} onClick={togglePicker} /> */}
                                    <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                                </div> 
                            )}
                        </div>

                    </div>
                    <div className="answer_client_theme3">
                        <label htmlFor="">Icone:</label>
                        <div className="answer_client_theme3_parent_input">
                            <input type="text" placeholder="Rechercher une icone" value={searchTerm}
                                onChange={handleSearchChange} />
                            <div className="answer_client_theme3_search">
                                <img src={search} alt="" className="search_theme" />
                            </div>
                        </div>
                    </div>
                    <div className="answer_client_theme4">
                        {filteredIcons.map((icon, index) => {
                            return (
                                <div key={index} className="icon-item">
                                    <FontAwesomeIcon icon={icon.icon} onClick={() => handleIconClick(index)}
                                        className="icons_font_awesome"
                                        style={selectedIconIndex === index ? { backgroundColor: color, color: 'white', borderRadius: '5px' } : {}} />
                                </div>
                            )
                        })}
                    </div>
                    {loading?(<button className="button_theme">Patientez svp ...</button>):(<button className="button_theme">Génerer les mots croisés</button>)}
                </form>}

            </div>
        </div>
    )
}
