
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
import { faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../../../helpers/fetchData";
import { SelectLanguages } from "../../select/SelectLanguages";
import { fetchDataGet } from "../../../../helpers/fetchDataGet";
import { formatTime } from "../../../../helpers/formatDate";
import { fetchDelete } from "../../../../helpers/fetchDelete";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
export const MainRightTheme = () => {
    const [etat, setEtat] = useState(false);
    const [color, setColor] = useState('#ED4C5C');
    const [showPicker, setShowPicker] = useState(false);
    const [etatSousTheme, setEtatSousTheme] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionVisibleVisibility, setOptionVisibleVisibility] = useState(false);
    const [optionName, setOptionName] = useState("Ordre Aphabétique");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [levelSearch, setLevelSearch] = useState(true);
    const [etatSearch, setEtatSearch] = useState(false);
    const [optionVisibleLanguages, setOptionVisibleLanguages] = useState(false);
    const [optionNameLanguages, setOptionNameLanguages] = useState("Anglais");
    const [optionNameVisibility, setOptionNameVisibility] = useState("Non");
    const [rotateIconLanguages, setRotateIconLanguages] = useState(false);
    const [rotateIconVisility, setRotateIconVisibility] = useState(false);
    const [resultAllThematiques, setResultAllThematiques] = useState(null);
    const [searchResults, searchElementUserName] = useSearchNames(resultAllThematiques);
    const [thematiques, setThematiques] = useState([
        { id: 1, thematique: '', crossword: '', words: [] },
    ]);
    const [loading, setLoading] = useState(false);
    const selectRef = useRef(null);
    const selectRefLanguages = useRef(null);
    const selectRefVisibility = useRef(null);
    const dataSelectStatus =  ["Ordre Aphabétique","Plus récents","Moins récents"];
    const dataSelectVisibility = ["Non", "Oui"];
    const dataSelect = ["Anglais"];
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const changeIcon = () => {
        const select = selectRef.current;
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisible(false);
        } else {
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    const changeIconVisibility = () => {
        const selectVisibility = selectRefVisibility.current;
        setRotateIconVisibility(!rotateIconVisility);
        if (rotateIconVisility) {
            selectVisibility.style.borderBottomRightRadius = "5px"
            selectVisibility.style.borderBottomLeftRadius = "5px"
            setOptionVisibleVisibility(false);
        } else {
            selectVisibility.style.borderBottomRightRadius = "0px"
            selectVisibility.style.borderBottomLeftRadius = "0px"
            setOptionVisibleVisibility(true);
        }
    };
    const changeIconLanguages = () => {
        const select = selectRefLanguages.current;
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            console.log(rotateIcon)
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisibleLanguages(false);
        } else {
            console.log(rotateIcon)
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisibleLanguages(true);
        }
    };
    const handleChildClick = (value) => {
        if(value === "Ordre Aphabétique"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareAphabetiques =   resultAllThematiques.sort((a, b) => a.name.localeCompare(b.name))
        console.log(compareAphabetiques)
           return setResultAllThematiques(compareAphabetiques)
        }
        if (value === "Moins récents") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
         const compareDate =   resultAllThematiques.sort((a, b) => {
                // Convertir les chaînes de caractères en objets Date
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
               // difference
                return dateA - dateB;
              });
              console.log(compareDate)
              setResultAllThematiques(compareDate)
        }
        if (value === "Plus récents") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
         const compareDate =   resultAllThematiques.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
              });
              console.log(compareDate)
              setResultAllThematiques(compareDate)
        }
    };
    const handleChildClickLanguages = (value) => {
        const select = selectRefLanguages.current
        setOptionNameLanguages(value);
        setOptionVisibleLanguages(false);
        setRotateIconLanguages(!rotateIcon);
        select.style.borderBottomRightRadius = "5px";
        select.style.borderBottomLeftRadius = "5px";
    };
    const handleChildClickVisibility = (value) => {
        const selectVisibility = selectRefVisibility.current
        setOptionNameVisibility(value);
        setOptionVisibleVisibility(false);
        setRotateIconVisibility(!rotateIconVisility);
        selectVisibility.style.borderBottomRightRadius = "5px";
        selectVisibility.style.borderBottomLeftRadius = "5px";
    };

    // const handleIconClick = (index) => {
    //     setSelectedIconIndex(index);
    //     const iconColor = {
    //         icon: icons[index].name,
    //         color: color
    //     };

    //     let storedIcons = JSON.parse(localStorage.getItem('selectedIconColors')) || [];
    //     storedIcons.push(iconColor);
    //     localStorage.setItem('selectedIconColors', JSON.stringify(storedIcons));
    // };

    // const filteredIcons = icons.filter(icon =>
    //     icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };
    const checkTheme = () => {
        setEtat(true)
    }
    const close = () => {
        setEtat(false)
    }
    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.parent_palette_color')) {
            setShowPicker(false)
        }
    };

    const handleInputChange = (e) => {
        setColor(e.target.value);
        if (e.target.value.length>=0) {
            setShowPicker(true);
        } else {
            setShowPicker(false);
        }
    };
    useEffect(() => {
        fetchDataGet("https://www.backend.habla-mundo.com/api/v1/themes").then((result) => {
            const response = result.sort((a, b) => a.name.localeCompare(b.name))
            setResultAllThematiques(response)
        })
    }, [])
    let checkVisibility;
    const onSubmit = async (data, event) => {
        event.preventDefault();
        if (optionNameVisibility === "Non") {
            checkVisibility = optionNameVisibility
            checkVisibility = 0
        }
        else if (optionNameVisibility === "Oui") {
            checkVisibility = optionNameVisibility
            checkVisibility = 1
        }
        for (let i = 0; i < thematiques.length; i++) {
            const sousThemes = thematiques[i];
            if (sousThemes.crossword.length  === 0) {
                const messageCrossword = ` la sous thématique  ne doit pas etre vide.`
                return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", messageCrossword, 4000);
            }
            if (sousThemes.words.length % 25 !== 0 || sousThemes.words.length === 0) {
                const messages = `Le nombre de mots dans la sous thématique "${sousThemes.crossword}" doit être un multiple de 25.`
                return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", messages, 4000);
            }
        }
        if (data) {
            const dataSend = {
                name: data.thematique,
                color: color,
                visibility: checkVisibility,
                // icon: icons[selectedIconIndex].name,
                dataCrossword: thematiques
            }
            setEtatSousTheme(true);
            setLoading(true);

            try {
                const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/themes", dataSend, token);
                if (result.message === "the thematics is created") {
                    snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 2000);
                    localStorage.setItem('theme', JSON.stringify(dataSend));
                    localStorage.setItem('result', JSON.stringify(result));

                    // Attendre que la snackbar disparaisse avant de rediriger
                    setTimeout(() => {
                        navigate("/sousThematiques");
                    }, 2000);
                }
                if (result.message === "Erreur de l'IA. Veuillez reessayer!!!") {
                    return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 7000);
                }
            } catch (error) {
                setEtat(true);
                console.log({message:error})
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (location.state?.fromHome && location.state?.filter) {
            setEtat(true);
        }
    }, [location.state]);

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

    const handleAddChip = (id, value) => {
        const updatedFormations = [...thematiques];
        const updatedFormation = updatedFormations.find((f) => f.id === id);

        // Séparer les mots par les virgules
        const chips = value.split(',')
            .map(chip => chip.trim())
            .filter(chip => chip);

        // doublons
        updatedFormation.words = [...updatedFormation.words, ...chips];
        updatedFormation.words = Array.from(new Set(updatedFormation.words.map(word => word.toLowerCase())))
            .map(lowercaseWord =>
                updatedFormation.words.find(word => word.toLowerCase() === lowercaseWord)
            );

        setThematiques(updatedFormations);
    };
    const handleRemoveThematique = (id) => {
        setThematiques(thematiques.filter((theme) => theme.id !== id));
    };
    const removeTheme = (id) => {
        const dataSend = {
            id: id
        }
        console.log(id)
        fetchDelete("https://www.backend.habla-mundo.com/api/v1/themes", dataSend, token).then((result) => {
            console.log(result)
            if (result.message === "the thematique is deleted") {
                snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 4000);
                setResultAllThematiques(result.thematique);
            }
        }).catch((error) => {
            console.log({ messahge: error })
        })
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
                    <input type="text" className="input_users" placeholder="Rechercher une thématique" name="checkValueThematique" onChange={(e) => {
                        setLevelSearch(false);
                        setEtatSearch(true)
                        searchElementUserName(e.target.value);
                        if (e.target.value.length === 0) {
                            setLevelSearch(true);
                            setEtatSearch(false)
                        }
                        register("checkValue").onChange(e);
                    }} />
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
                {levelSearch && resultAllThematiques?.map((result) => {
                   
                        return (
                            <div className="sous_alls_thematics" key={result.id}>
                                <div className="parent_icons_thematics">
                                    <span className="parent_icons_thematics_child2" style={{ color: result.color }}  onClick={() => updateCrosswords(result.id, result.name)}>{result.name}</span>
                                </div>
                                <span className="parent_icons_thematics_span">{result.crosswords_count} Mots croisés</span>
                                <span className="parent_icons_thematics_span"> créé {formatTime(result.created_at)}</span>
                                <div className="parent_icons_thematics_span">
                                <img src={remove} alt="remove_words" className="remove_words" onClick={() => removeTheme(result.id)} />
                                </div>
                                
                            </div>
                        );
                  
                })}
                {etatSearch && searchResults?.map((result) => {
                        return (
                            <div className="sous_alls_thematics" key={result.id}>
                                <div className="parent_icons_thematics">
                                    <span className="parent_icons_thematics_child2" style={{ color: result.color }}  onClick={() => updateCrosswords(result.id, result.name)}>{result.name}</span>
                                </div>
                                <span className="parent_icons_thematics_span">{result.crosswords_count} Mots croisés</span>
                                <span className="parent_icons_thematics_span"> créé {formatTime(result.created_at)}</span>
                                <div className="parent_icons_thematics_span">
                                <img src={remove} alt="remove_words" className="remove_words" onClick={() => removeTheme(result.id)} />
                                </div>
                                
                            </div>
                        );
                    
                })}
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
                                <input type="text" placeholder="Entrer le nom de la thematique" name="thematique" {...register("thematique", { required: "Veuillez entrer une question" })} />
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
                        <div className="visibility">
                            <label htmlFor="">Gratuit</label>
                            <Select
                                dataSelectStatus={dataSelectVisibility}
                                selectRef={selectRefVisibility}
                                changeIcon={changeIconVisibility}
                                handleChildClick={handleChildClickVisibility}
                                optionName={optionNameVisibility}
                                optionVisible={optionVisibleVisibility}
                                rotateIcon={rotateIconVisility}
                                defautClassName="select" />
                        </div>

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
                                                        register(`crossword-${sousThemes.id}`).onChange(e);
                                                    }}/>
                                            </div>
                                            <div className="space_contenair">
                                                <label htmlFor=""> Liste de mots de la sous-thématique</label>
                                                <div className="parent_textarea">
                                                    <textarea className="textarea_sous_thematique" placeholder="Entrer un mot" onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddChip(sousThemes.id, e.target.value);
                                                            e.target.value = '';
                                                        }
                                                    }}>
                                                    </textarea>
                                                    <div className="option_chips">
                                                        {sousThemes.words.map((chip, index) => (
                                                            <div key={index} className="chip">
                                                                <span>{chip}</span>
                                                                <FontAwesomeIcon icon={faClose} className="close_chips" onClick={() => handleRemoveChip(sousThemes.id, index)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="nbre_words">Listes de mots:{sousThemes.words.length}</span>
                                                </div>
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
                                                <span onClick={handleAddThematique}>Ajouter une thématique/sous-thématique</span>
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

