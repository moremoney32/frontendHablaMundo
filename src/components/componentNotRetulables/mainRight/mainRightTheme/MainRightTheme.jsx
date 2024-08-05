import { useEffect, useRef, useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { snackbbar } from "../../../../helpers/snackbars"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { SketchPicker } from 'react-color';
import "./mainRightTheme.css"
import "../mainRightUsers/mainRightUsers.css"
import "../mainRightMessages/mainRightMessages.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom"
import search from "../../../../assets/icons/search.png";
import remove from "../../../../assets/icons/remove.png";
import state from "../../../../assets/icons/state.png";
import { icons } from '../../../../helpers/icons';
import { Select } from "../../select/Select";
import { useForm } from 'react-hook-form';
import { faAngleRight, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../../../helpers/fetchData";
import { SelectLanguages } from "../../select/SelectLanguages";
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
    const [optionVisibleLanguages, setOptionVisibleLanguages] = useState(false);
    const [optionNameLanguages, setOptionNameLanguages] = useState("Anglais");
    const [rotateIconLanguages, setRotateIconLanguages] = useState(false);
    const [thematiques, setThematiques] = useState([
        { id: 1,thematique:'', crossword: '', words: [] },
    ]);
    const [loading, setLoading] = useState(false);
    const selectRef = useRef(null);
    const selectRefLanguages = useRef(null);
    const dataSelectStatus = ["Plus récents", "Moins récents"];
    const dataSelect = ["Anglais"];
    const location = useLocation();
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    console.log(token)
    const changeIcon = () => {
        const select = selectRef.current;
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
    const changeIconLanguages = () => {
        const select = selectRefLanguages.current;
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            console.log(rotateIcon)
            // Deuxième clic : masquer les options
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisibleLanguages(false);
        } else {
            console.log(rotateIcon)
            // Premier clic : afficher les options
            // console.log(selectRef.current.classList.toggle("bottomRaduisNone"))
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisibleLanguages(true);
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
    const handleChildClickLanguages = (value) => {
        const select = selectRefLanguages.current
        setOptionNameLanguages(value);
        setOptionVisibleLanguages(false);
        setRotateIconLanguages(!rotateIcon);
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
    const onSubmit = async (data, event) => {
        event.preventDefault();
        console.log(data); 
       console.log(icons[selectedIconIndex].name);
        if (data) {
            const dataSend ={
                name: data.thematique,
                 color: color,
                 icon: icons[selectedIconIndex].name,
                 dataCrossword:thematiques
            }
            console.log(dataSend) 
            setEtatSousTheme(true);
            setLoading(true);

            try {
                const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/themes", dataSend, token);
                console.log(result);

                if (result.message === "the thematics is created") {
                    snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 2000);
                    localStorage.setItem('theme', JSON.stringify(dataSend));

                    // Attendre que la snackbar disparaisse avant de rediriger
                    setTimeout(() => {
                        navigate("/sousThematiques");
                    }, 2000);
                }
                if (result.message === "Erreur de l'IA. Veuillez reessayer!!!") {
                    snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 4000);
                }
            } catch (error) {
                setEtat(true);
                console.log({ message: error.message });
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        console.log(location.state);

        if (location.state?.filter) {
            setEtat(true)
        }
    }, [location.state]);
    const handleAddChip = (id, newChip) => {
        const newThematiques = thematiques.map(thematique => {
            if (thematique.id === id) {
                thematique.words.push(newChip);
            }
            return thematique;
        });
        setThematiques(newThematiques);
    };

    const handleRemoveChip = (id, chipIndex) => {
        const newThematiques = thematiques.map(thematique => {
            if (thematique.id === id) {
                thematique.words = thematique.words.filter((_, index) => index !== chipIndex);
            }
            return thematique;
        });
        setThematiques(newThematiques);
    };
    const handleAddThematique = () => {
        setThematiques([...thematiques, { id: thematiques.length + 1, crossword: '', words: [] }])
    }
    const handleRemoveThematique = (id) => {
        setThematiques(thematiques.filter((theme) => theme.id !== id));
    };
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
                    defautClassName="select"/>
            </div>

            <div className="alls_thematics">
                <div className="sous_alls_thematics">
                    <div className="parent_icons_thematics">
                        <FontAwesomeIcon icon={faUserAlt} className="parent_icons_thematics_child1" />
                        <span className="parent_icons_thematics_child2">Verbes Irreguliers</span>
                    </div>
                    <span className="parent_icons_thematics_span">25 Mots croisés</span>
                    <span className="parent_icons_thematics_span">Crée le 20/30/2020</span>
                    <div className="parent_messages3_thematics">
                        <span className="repondre_thematic">Mots croisés</span>
                        <FontAwesomeIcon icon={faAngleRight} className="next" />
                    </div>
                    <img src={remove} alt="remove_words" className="remove_words" />
                </div>

            </div>

            <div className="sous_parent_main_thematique">

                {etat && <div id="masqueTheme"></div>}
                {etat && <form id="answer_client_theme" onSubmit={handleSubmit(onSubmit)} onClick={handleClickOutside}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
                    <span className="title">CREATION DE LA THEMATIQUE</span>
                    <div className="answer_client_theme2">
                        <div className="answer_client_theme2_child1">
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Nom de la thématique</label>
                                <input type="text" placeholder="Entrer le nom de la thematique" name="thematique" {...register("thematique", { required: "Veuillez entrer une question" })}/>
                                {errors.thematique && <span className="error_theme">{errors.thematique.message}</span>}
                            </div>
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Langue de la traduction</label>
                                <SelectLanguages
                                    dataSelectStatus={dataSelect}
                                    changeIcon={changeIconLanguages}
                                    handleChildClick={handleChildClickLanguages}
                                    selectRef={selectRefLanguages}
                                    optionName={optionNameLanguages}
                                    optionVisible={optionVisibleLanguages}
                                    rotateIcon={rotateIconLanguages}
                                    icon={state} />

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
                                <img src={search} alt="" className="search_theme"/>
                            </div>
                        </div>
                    </div>
                    <div className="answer_client_theme4">
                        {filteredIcons.map((icon, index) => {
                            return (
                                    <FontAwesomeIcon icon={icon.icon} onClick={() => handleIconClick(index)}
                                        className="icons_font_awesome"
                                        style={selectedIconIndex === index ? { backgroundColor: color, color: 'white', borderRadius: '5px' } : {}} key={index}/>
                            )
                        })}
                    </div>
                     <span className="title">CREATION DE LA SOUS THEMATIQUE</span>
                    <div className="parent_contenair_sous_thematique">
                        {
                            thematiques?.map((sousThemes) => {
                                return (
                                    <div className="contenair_sous_thematique" key={sousThemes.id}>
                                        <div className="parent_sous_thematique">
                                            <div className="space_contenair">
                                                <label htmlFor="sous_thematique">Sous thématique</label>
                                                <input type="text" placeholder="Entrer le nom de la sous thématique" name={`crossword-${sousThemes.id}`}   {...register(`crossword-${sousThemes.id}`)}
                                                onChange={(e) => {
                                                    const updatedFormations = [...thematiques];
                                                    const updatedFormation = updatedFormations.find((f) => f.id === sousThemes.id);
                                                    updatedFormation.crossword = e.target.value;
                                                    setThematiques(updatedFormations);
                                                    register(`crossword-${sousThemes.id}`).onChange(e); // Access onChange from register
                                                  }}/>
                                            </div>
                                            <div className="space_contenair">
                                                <label htmlFor="">liste des mots de la sous-thématique</label>
                                                {
                                                    <div className="option_chips">
                                                        {sousThemes.words.map((chip, index) => (
                                                            <div key={index} className="chip">
                                                                <span>{chip}</span>
                                                                <FontAwesomeIcon icon={faClose} className="close_chips" onClick={() => handleRemoveChip(sousThemes.id, index)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                }
                                                <textarea className="textarea_sous_thematique" placeholder="Entrer un mot" onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleAddChip(sousThemes.id, e.target.value);
                                                        e.target.value = '';
                                                    }
                                                }}></textarea>
                                            </div>
                                        </div>
                                        <div className="add_remove">
                                            {
                                                sousThemes.id !== 1 && (
                                                    <div className="parent_remove" onClick={() => handleRemoveThematique(sousThemes.id)}>
                                                        <img src={remove} alt="" className="remove_add" />
                                                        <span>remove</span>
                                                    </div>
                                                )
                                            }

                                            <span className="element_none">0</span>
                                            <div className="add_theme">
                                                <span>+</span>
                                                <span onClick={handleAddThematique}>Ajouter une sous-thématique</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> 

                    {loading ? (<button className="button_theme">Patientez svp ...</button>) : (<button className="button_theme">Générer les traductions</button>)} 
                </form>}

            </div>
        </div>
    )
}
