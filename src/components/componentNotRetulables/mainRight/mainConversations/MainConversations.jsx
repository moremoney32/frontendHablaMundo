
import { useEffect, useRef, useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { snackbbar } from "../../../../helpers/snackbars"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { SketchPicker } from 'react-color';
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
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from "../../../../helpers/fetchData";
import { SelectLanguages } from "../../select/SelectLanguages";
import { fetchDataGet } from "../../../../helpers/fetchDataGet";
import { formatTime } from "../../../../helpers/formatDate";
import { fetchDelete } from "../../../../helpers/fetchDelete";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
import infos from "../../../../assets/icons/infos.svg";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { fetchDataPut } from "../../../../helpers/fetchDataPut";
import { useCallback } from "react";
import { useSearchGrammar } from "../../../../customsHooks/userSearchGrammar";
export const MainConversions = () => {
    const [dataUser, setDataUser] = useState([]);
    const [thématique, setThématiques] = useState("");
    const [resultAllThematiques, setResultAllThematiques] = useState([]);
    const [searchResultsGrammar, searchElementUserNameGrammar] = useSearchGrammar(resultAllThematiques);
    const [select, setSelect] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [etat, setEtat] = useState(false);
    const selectWordsRef = useRef(null);
    const [thematique_id, setThematique_id] = useState("");
    const [titleGrammaire, setTitleGrammaire] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [words, setWords] = useState("");
    const [selectWords, setSelectWords] = useState(false);
    const selectRefGrammar = useRef(null)
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [crossword_id, setCrossword_id] = useState([]);
    const [color, setColor] = useState('#ED4C5C');
    const [showPicker, setShowPicker] = useState(false);
    const [etatSousTheme, setEtatSousTheme] = useState(false);
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionVisibleVisibility, setOptionVisibleVisibility] = useState(false);
    const [optionName, setOptionName] = useState("Ordre Aphabétique");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [rotateIconWords, setRotateIconWords] = useState(false);
    const [rotateIconGrammar, setRotateIconGrammar] = useState(false);
    const [levelSearch, setLevelSearch] = useState(true);
    const [etatSearch, setEtatSearch] = useState(false);
    const [dataWords, setDataWords] = useState([]);
    const [optionVisibleLanguages, setOptionVisibleLanguages] = useState(false);
    const [optionNameLanguages, setOptionNameLanguages] = useState("Anglais");
    const [optionNameVisibility, setOptionNameVisibility] = useState("Non");
    const [rotateIconLanguages, setRotateIconLanguages] = useState(false);
    const [rotateIconVisility, setRotateIconVisibility] = useState(false);
     const itemsPages = 10;
       const [dataConversations, setDataConversations] = useState([]);
    const [searchResults, searchElementUserName] = useSearchNames(dataConversations);
   
    /******edit Name */
    const [etatEdit, setEtatEdit] = useState(false);
    const [editingId, setEditingId] = useState(null); // ID de l'élément en édition
    const [editingData, setEditingData] = useState({titre: ""});
    const [contextMenu, setContextMenu] = useState(null); // Stocke les coordonnées du clic droit
    const [selectedId, setSelectedId] = useState(null); // Stocke l'ID de la thématique cliquée
    const [selectedName, setSelectedName] = useState(null); // Stocke le nom de la thématique
    const token = localStorage.getItem("token")

    // Fonction pour ouvrir la popup avec les données actuelles
    const handleEdit = (id, titre) => {
        console.log(id)
        setEditingId(id);
        setEditingData({ titre});
        setEtatEdit(true);
    };

    // Fonction pour sauvegarder les changements
    const handleSave = async () => {
        setDataConversations((prev) =>
            prev.map((item) =>
                item.id_conversation === editingId
                    ? { ...item, titre: editingData.titre }
                    : item
            )
        );
        const dataSend = {
            conversation_id: editingId,
            titre: editingData.titre,
        }
        console.log(dataSend)
        try {
            const response = await fetchData(
                "conversation/update",
                dataSend,
                token
            );
            console.log(response)
            if (response.status === 200) {
                snackbbar(document.querySelector('#body'), infos, 'Mise à jour réussie', 3000);
                setEtatEdit(false);
            }
        } catch (error) {
            console.error(error);
        }

        // Fermer la popup
    };

    const handleChildClickTheme = (theme, id) => {
        setThematique_id(id)
        localStorage.setItem("idThematiqueTraduction", id)
        const userId = {
            id: id
        }
        setSelect(false);
        setDataWords([])
        setThématiques(theme)
        setValue('thématique', theme);
        fetchData("theme", userId).then((result) => {
            console.log(result)
            return setDataWords(result)
        })
    };

    const handleSelectJuridictions = () => {
        let select = selectWordsRef.current
        setRotateIconWords(!rotateIconWords);
        if (rotateIconWords) {
            select.style.borderBottomRightRadius = "10px";
            select.style.borderBottomLeftRadius = "10px";
            setSelectWords(false);
        } else {
            select.style.borderBottomRightRadius = "0px";
            select.style.borderBottomLeftRadius = "0px";
            setSelectWords(true);
        }
    }
    const handleChildClickWords = (value, id) => {
        if (!words.includes(value)) {
            // Ajouter la nouvelle juridiction à celles déjà sélectionnées, séparées par des virgules
            setWords(prevJuridictions => prevJuridictions ? `${prevJuridictions}, ${value}` : value);
            setCrossword_id(prevIds => [...prevIds, id]);
        }
        setSelectWords(false);
    };


    // Fonction pour fermer la popup
    const handleClose = () => {
        setEtatEdit(false);
        setEditingId(null);
    };


    /*****fin editName */
    let message1 = "Demande prise en compte"
    let message2 = "Demande non prise en compte"
    const [thematiques, setThematiques] = useState([
        { id: 1, thematique: '', crossword: '', words: [] },
    ]);
    const [loading, setLoading] = useState(false);
    const selectRef = useRef(null);
    const selectRefLanguages = useRef(null);
    const selectRefVisibility = useRef(null);
    const dataSelectStatus = ["Ordre Aphabétique", "Plus récents", "Moins récents"];
    const dataSelectVisibility = ["Non", "Oui"];
    const dataSelect = ["Anglais"];
    const location = useLocation();
    const navigate = useNavigate();
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
    const handleChildClick = useCallback((value) => {
        if (value === "Ordre Aphabétique") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            const compareAphabetiques = resultAllThematiques.sort((a, b) => a.name.localeCompare(b.name))
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
            const compareDate = resultAllThematiques.sort((a, b) => {
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
            const compareDate = resultAllThematiques.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            console.log(compareDate)
            setResultAllThematiques(compareDate)
        }
    }, [selectValue])
    useEffect(() => {
        handleChildClick(selectValue)
    }, [selectValue])
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

    const checkTheme = () => {
        setEtat(true)
    }
    const close = () => {
        setEtat(false)
        setThematique_id("")
        setCrossword_id([])
        setThematiques("")
        setWords("")
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
        if (e.target.value.length >= 0) {
            setShowPicker(true);
        } else {
            setShowPicker(false);
        }
    };
    useEffect(() => {
        fetchDataGet("themes").then((result) => {
            console.log(result)
            const response = result.sort((a, b) => a.name.localeCompare(b.name))
            setResultAllThematiques(response)
        })
    }, [])
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "https://www.backend.habla-mundo.com/api/v1/get_thematique_conversation_list", 
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`
                }
              }
            );
    
            if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Données récupérées :", data);
            setDataConversations(data.data[0])
            
          } catch (error) {
            console.error("Erreur lors de la récupération :", error);
          }
        };
    
        fetchData();
      }, []);
    let checkVisibility;
    const onSubmit = async (data) => {

        setLoading(true)
        try {

            const dataSend = {
                crossword_id: crossword_id,
                thematique_id: thematique_id,
            };
            console.log(dataSend)
            const response = await fetchData("conversations_add", dataSend, token);
            console.log(response)
            //  if (response.status === 422) {
            //      return snackbbar(document.querySelector("#body"), infos, "Cette leçon existe déjà", 3000);

            //  } else if (response.status === 201) {
            //      return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000), navigate("/AllTraduction")
            //  }
            //  else if (response.message === "The description field is required.") {
            //      return snackbbar(document.querySelector("#body"), infos, "Description obligatoire", 3000)
            //  }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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
        // updatedFormation.words = Array.from(new Set(updatedFormation.words.map(word => word.toLowerCase())))
        //     .map(lowercaseWord =>
        //         updatedFormation.words.find(word => word.toLowerCase() === lowercaseWord)
        //     );

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
        fetchDelete("themes", dataSend, token).then((result) => {
            // console.log(result)
            if (result.message === "the thematique is deleted") {
                //snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 4000);
                snackbbar(document.querySelector("#body"), infos, message1, 4000);
                setResultAllThematiques(result.thematique);
                return fetchDataGet("themes").then((result) => {
                    console.log(result)
                    const response = result.sort((a, b) => a.name.localeCompare(b.name))
                    setResultAllThematiques(response)
                })
            }
        }).catch((error) => {
            console.log({ messahge: error })
        })
    };
    const updateCrosswords = (id, name) => {
         setTimeout(() => {
    navigate("/conversationDetails", {
      state: { 
        id: id, 
        name: name 
      }
    });
  }, 500);
    }
    // const updateCrosswords = (id, name) => {
    //     const result = { id };
    //     const dataSend = { name };
    //     localStorage.setItem("result", JSON.stringify(result));
    //     localStorage.setItem("theme", JSON.stringify(dataSend));

    //     navigate("/sousThematiques"); 
    // }
    console.log("conversations",dataConversations)
    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Conversations" />
                {/* <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une thématique</span>
                </div> */}
            </div>
            <div className="sous_parent_main_users_header">
                <div className="sous_parent_main_users_header_input">
                    <input type="text" className="input_users" placeholder="Rechercher une conversation" name="checkValueThematique" onChange={(e) => {
                        const searchValue = e.target.value.toLowerCase();
                        setLevelSearch(false);
                        setEtatSearch(true);
                        searchElementUserName(searchValue);
                        if (e.target.value.length === 0) {
                            setLevelSearch(true);
                            setEtatSearch(false)
                        }
                        // register("checkValue").onChange(e);
                    }} />
                    <FontAwesomeIcon
                        icon={faClose}
                        className="icons_close_list"

                    />
                    <div className="parent_search_users">
                        <img src={search} alt="" className="search_users" />
                    </div>
                </div>

                <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une conversation</span>
                </div>
            </div>

            <div className="alls_thematics">
                {/* Liste des thématiques */}
                {levelSearch && dataConversations?.map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_thematicss"
                    >
                         <span
                                className="parent_icons_thematics_child2"
                                onClick={() => updateCrosswords(result.id, result.titre)}
                            >
                                {result?.titre}
                            </span>
                        <div className="parent_icons_thematics">
                            <span
                                className="parent_icons_thematics_child2"
                            >
                                {result?.name}
                            </span>
                        </div>
                        <span className="parent_icons_thematics_span">
                            {result?.words_count}mots
                        </span>
                        <span className="parent_icons_thematics_span">
                            {result?.conversation_count} Conversations
                        </span>
                        <span className="parent_icons_thematics_span">
                            créé {formatTime(result?.created_at)}
                        </span>
                        <FontAwesomeIcon icon={faEdit} className="edit_icon" onClick={() => handleEdit(result.id_conversation, result.titre)} />
                        <div className="parent_icons_thematics_span">
                            <img src={remove} alt="remove_words" className="remove_words" onClick={() => removeTheme(result.id)} />
                        </div>
                    </div>
                ))}
                {etatSearch && searchResults?.map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_thematics"
                    >
                        <div className="parent_icons_thematics">
                            <span
                                className="parent_icons_thematics_child2"
                                style={{ color: result.color }}
                            >
                                {result.name}
                            </span>
                        </div>
                        <span className="parent_icons_thematics_span">
                            {result.crosswords_count} Listes de mots
                        </span>
                        <span className="parent_icons_thematics_span">
                            {result.words_count} Mots
                        </span>
                        <span className="parent_icons_thematics_span">
                            créé {formatTime(result.created_at)}
                        </span>
                        <FontAwesomeIcon icon={faEdit} className="edit_icon" onClick={() => handleEdit(result.id_conversation, result.titre)} />
                        <div className="parent_icons_thematics_span">
                            <img src={remove} alt="remove_words" className="remove_words" onClick={() => removeTheme(result.id)} />
                        </div>
                    </div>
                ))}

                {/* Popup modale */}
                {etatEdit && (
                    <div className="modal">
                        <div className="modal_content">
                            <div className="headerEdit">
                                <span className="title">MODIFIER LE TITRE DE LA CONVERSATION</span>
                            </div>
                            <div className="paletteEdit">
                                <input
                                    className="inputEdit"
                                    type="text"
                                    value={editingData.titre}
                                    onChange={(e) =>
                                        setEditingData((prev) => ({ ...prev, titre: e.target.value }))
                                    }
                                />
                                {/* <SketchPicker
                                    color={editingData.color}
                                    onChangeComplete={(color) =>
                                        setEditingData((prev) => ({ ...prev, color: color.hex }))
                                    }
                                /> */}
                            </div>
                            <div className="modal_actions">
                                <button onClick={handleClose} className="cancel_button">
                                    Annuler
                                </button>
                                <button onClick={handleSave} className="save_button">
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="sous_parent_main_thematique">
                {etat ? (<div id="masqueTheme"></div>) : null}
                {etat ? (<form id="answer_client_theme_grammaire" onSubmit={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
                    <span className="title">CREATION D'UNE CONVERSATION</span>
                    <div className="answer_client_theme2">
                        <div className="space-signup">
                            <label htmlFor="thématique">TITRE DE LA CONVERSATION</label>
                            <input
                                type="text"
                                name="thématique"
                                defaultValue={thématique}
                                {...register("thématique", { required: "La thématique est obligatoire" })}
                                onBlur={() => {
                                    setTimeout(() => setSelect(false), 200);
                                }}
                                onChange={(e) => {
                                    searchElementUserNameGrammar(e.target.value);
                                    setSelect(true);
                                    register('thématique').onChange(e);
                                }}
                            />
                            {/* {errors.thématique && <span className="error">{errors.thématique.message}</span>} */}

                            {select && (
                                <div className="optionGrammar1">
                                    {searchResultsGrammar.map((infosUsers) => {
                                        return (
                                            <span key={infosUsers.id} onClick={() => handleChildClickTheme(infosUsers.name, infosUsers.id)}>
                                                {infosUsers.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="space-signup" onClick={handleSelectJuridictions} ref={selectWordsRef}>
                            <label htmlFor="words">Thématique</label>
                            <input
                                type="text"
                                name="words"
                                value={words}
                                onChange={(e) => {
                                    setWords(e.target.value)
                                    register('words').onChange(e);
                                    if (words.length === 1) {

                                        setCrossword_id([])
                                    }
                                    console.log(words)
                                }}
                            />
                            <FontAwesomeIcon icon={faAngleDown} className="iconWords" />
                            {errors.words && <span className="error">{errors.words.message}</span>}

                            {selectWords && (
                                <div className="optionGrammar1">
                                    {dataWords.map((infosUsers) => {
                                        return (
                                            <span key={infosUsers.id} onClick={() => handleChildClickWords(infosUsers.name, infosUsers.id)}>
                                                {infosUsers.name}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space_contenair contenair_phrases">
                            <label htmlFor="">Liste des phrases de la  conversation</label>
                            <div className="parent_textarea">
                                <textarea className="textarea_sous_thematique" placeholder="Entrer une phrase française" onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        // handleAddChip(sousThemes.id, e.target.value);
                                        e.target.value = '';
                                    }
                                }}>
                                </textarea>
                                {/* <div className="option_chips">
                                    {sousThemes.words.map((chip, index) => (
                                        <div key={index} className="chip">
                                            <span>{chip}</span>
                                            <FontAwesomeIcon icon={faClose} className="close_chips" onClick={() => handleRemoveChip(sousThemes.id, index)} />
                                        </div>
                                    ))}
                                </div> */}
                                <span className="nbre_words">Listes de phrases:</span>

                            </div>
                        </div>



                    {loading ? <button type="submit" className="button_theme">En cours ...</button> : <button type="submit" className="button_theme">Génerer les phrases</button>}
                </form>) : null}
            </div>
        </div>
    )
}

