import { useCallback, useEffect, useRef, useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import gras from "../../../../assets/icons/gras.png";
import italique from "../../../../assets/icons/italique.png";
import link from "../../../../assets/icons/link.png";
import underline from "../../../../assets/icons/underline.png";
import list from "../../../../assets/icons/list.png";
import police from "../../../../assets/icons/police.png";
import upload from "../../../../assets/icons/upload.png";
import infos from "../../../../assets/icons/infos.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom"
import search from "../../../../assets/icons/search.png";
import remove from "../../../../assets/icons/remove.png";
import next from "../../../../assets/icons/next.png";
import { Select } from "../../select/Select";
import { useForm } from 'react-hook-form';
import { fetchData } from "../../../../helpers/fetchData";
import { fetchDataGet } from "../../../../helpers/fetchDataGet";
import { formatTime } from "../../../../helpers/formatDate";
import { fetchDelete } from "../../../../helpers/fetchDelete";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
import { faAngleLeft, faAngleRight, faEdit, faSearch, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSearchGrammar } from "../../../../customsHooks/userSearchGrammar";
import { useSearchWords } from "../../../../customsHooks/useSearchWords";
import { snackbbar } from "../../../../helpers/snackbars";
import { PopupRemove } from "../../../repeatableComponents/atomes/popup/PopupRemove";
import closePopup from "../../../../assets/icons/closePopup.png";
import "../mainRightAllTraduction/mainRightAllTraduction.css"
import { Pagination } from "../../../repeatableComponents/atomes/pagination/Pagination";
import "./mainRightGrammaire.css"
import { useSearchGrammarTheme } from "../../../../customsHooks/userSearchGrammarTheme";

export const MainRightGrammaire = () => {
    const [etat, setEtat] = useState(false);
    const [etatB, setEtatB] = useState(false);
    const [loading, setLoading] = useState(false);
    const [masqueRemove, setMasqueRemove] = useState(false);
    const [userThemeId, setUserThemeId] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionVisibleGrammar, setOptionVisibleGrammar] = useState(false);
    const [optionVisibleVisibility, setOptionVisibleVisibility] = useState(false);
    const [optionName, setOptionName] = useState("Ordre Aphabétique");
    const [optionNameGrammar, setOptionNameGrammar] = useState("A1");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [rotateIconWords, setRotateIconWords] = useState(false);
    const [rotateIconGrammar, setRotateIconGrammar] = useState(false);
    const [levelSearch, setLevelSearch] = useState(true);
    const [etatSearch, setEtatSearch] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [dataWords, setDataWords] = useState([]);
    const [idLesson, setIdLesson] = useState("");
    const [optionVisibleLanguages, setOptionVisibleLanguages] = useState(false);
    const [rotateIconVisility, setRotateIconVisibility] = useState(false);
    const [rotateIconVisilityGrammar, setRotateIconVisibilityGrammar] = useState(false);
    const [resultAllThematiques, setResultAllThematiques] = useState([]);
    const [searchResults, searchElementUserName] = useSearchNames(dataUser);
    const [searchResultsGrammar, searchElementUserNameGrammar] = useSearchGrammar(resultAllThematiques);
    const [searchThemeGrammar, searchElementTheme] = useSearchGrammarTheme(dataUser);
    const [searchResultsWords, searchElementUserNameWords] = useSearchWords(dataWords);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    /******edit Name */
    //   const [crossword_id, setCrossword_id] = useState("");
    const [thematique_id, setThematique_id] = useState("");
    const [titleGrammaire, setTitleGrammaire] = useState("");
    const [thématique, setThématiques] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [words, setWords] = useState("");
    const [select, setSelect] = useState(false);
    const [selectWords, setSelectWords] = useState(false);
    const itemsPages = 10;
    const selectRefGrammar = useRef(null)
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [crossword_id, setCrossword_id] = useState([]);
    const [content, setContent] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    // const [etatRemove, setEtatRemove] = useState(false);
    const handleChangePages = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }


    const selectRef = useRef(null);
    const selectWordsRef = useRef(null);
    const selectRefLanguages = useRef(null);
    const selectRefVisibility = useRef(null);
    const dataSelectStatus = ["Ordre Aphabétique", "Plus récents", "Moins récents"];
    const dataSelectLevel = ["A1", "A2", "B1", "B2"]
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    /******edit Name */
    const [etatEdit, setEtatEdit] = useState(false);
    const [editingId, setEditingId] = useState(null); // ID de l'élément en édition
    const [editingData, setEditingData] = useState({ title: "" });

    // Fonction pour ouvrir la popup avec les données actuelles
    const handleEdit = (id, title) => {
        console.log(title)
        setEditingId(id);
        setEditingData({ title });
        setEtatEdit(true);
        console.log(editingData)
    };
    // Fonction pour sauvegarder les changements

    const handleSave = async () => {
        const updatedDataUser = [...dataUser].map((item) =>
            item.thematique_id === editingId
                ? { ...item, title: editingData.title }
                : item
        );

        setDataUser(updatedDataUser);

        const dataSend = {
            title: editingData.title,
            thematique_id: editingId,
        }
        try {
            const response = await fetchData(
                "lesson/update_title",
                dataSend,
                token
            );
            console.log(response)
            if (response.status === 200) {
                snackbbar(document.querySelector('#body'), infos, 'Demande prise compte', 3000);
                setEtatEdit(false);
            }
        } catch (error) {
            console.error(error);
        }

        // Fermer la popup
    };

    // Fonction pour fermer la popup
    const handleClose = () => {
        setEtatEdit(false);
        setEditingId(null);
    };
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

    useEffect(() => {
        if (location.state?.fromHome && location.state?.filter === "etatB") {
            setEtatB(true);
            setEtat(true);
        }
    }, [location.state]);
    const changeIconGrammar = () => {
        const select = selectRefGrammar.current;
        setRotateIconGrammar(!rotateIconGrammar);
        if (rotateIconGrammar) {
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisibleGrammar(false);
        } else {
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisibleGrammar(true);
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
        if (value === "Ordre Aphabétique") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            const compareAphabetiques = dataUser.sort((a, b) => a.title.localeCompare(b.title))
            return setResultAllThematiques(compareAphabetiques)
        }
        if (value === "Moins récents") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            const compareDate = dataUser.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateA - dateB;
            });
            return setResultAllThematiques(compareDate)
        }
        if (value === "Plus récents") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            const compareDate = dataUser.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            return setResultAllThematiques(compareDate)
        }
    };
    const handleChildClickGrammar = (value) => {
        if (value === "A1") {
            const select = selectRefGrammar.current
            setOptionNameGrammar(value);
            setOptionVisibleGrammar(false);
            setRotateIconGrammar(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
        if (value === "A2") {
            const select = selectRefGrammar.current
            setOptionNameGrammar(value);
            setOptionVisibleGrammar(false);
            setRotateIconGrammar(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
        if (value === "B1") {
            const select = selectRefGrammar.current
            setOptionNameGrammar(value);
            setOptionVisibleGrammar(false);
            setRotateIconGrammar(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
        if (value === "B2") {
            const select = selectRefGrammar.current
            setOptionNameGrammar(value);
            setOptionVisibleGrammar(false);
            setRotateIconGrammar(!rotateIcon);
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
    };
    const grasText = () => {
        document.execCommand('bold', false, null);
    };

    const underlineText = () => {
        document.execCommand('underline', false, null);
    };

    const italiqueText = () => {
        document.execCommand('italic', false, null);
    };

    const linkText = () => {
        const url = prompt("Entrez l'URL du lien:");
        if (url) {
            document.execCommand('createLink', false, url);
        }
    };

    const listText = () => {
        document.execCommand('insertUnorderedList', false, null);
    };

    const changeFontSize = (size) => {
        document.execCommand('fontSize', false, size);
    };

    useEffect(() => {
        if (textareaRef.current) {
            const handleInput = () => {
                const text = textareaRef.current.innerText;
                setContent(text);
                setValue('reponse', text, { shouldValidate: false });
            };
            const div = textareaRef.current;
            div.addEventListener('input', handleInput);
            return () => {
                div.removeEventListener('input', handleInput);
            };
        }
    }, [setValue]);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                if (textareaRef.current) {
                    const div = document.createElement('div');
                    div.innerHTML = `<a href="${fileContent}" target="_blank" rel="noopener noreferrer">${file.name}</a>`;

                    textareaRef.current.appendChild(div);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const checkTheme = () => {
        setEtat(true)
    }
    const close = () => {
        setEtat(false);
        if (etatB) {
            navigate(-1);
        }
    };


    const fetchDataByUrl = (url) => {
        fetchDataGet(url)
            .then((result) => {
                console.log(result);
                // const sortedData = result.data.sort( 
                //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
                // );
                const sortedData = result.data
                    ? result.data.sort((a, b) => a.title.localeCompare(b.title))
                    : [];
                const uniqueData = Array.from(
                    new Map(sortedData.map((item) => [item.title, item])).values()
                );
                console.log(uniqueData)

                setDataUser(uniqueData);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    };



    useEffect(() => {
        const initialUrl = "lessons"
        fetchDataByUrl(initialUrl)
    }, [])

    useEffect(() => {
        fetchDataGet("themes")
            .then((result) => {
                console.log(result);
                const transformedResponse = result
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => ({
                        id: item.id,
                        name: item.name,
                    }));

                setResultAllThematiques(transformedResponse);
                console.log(transformedResponse);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
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



    const onSubmit = async (data) => {
        const htmlContent = textareaRef.current.innerHTML;
        data.reponse = htmlContent;
        console.log(htmlContent)

        setLoading(true)
        try {

            const dataSend = {
                title: data.title,
                level: optionNameGrammar,
                description: htmlContent,
                crossword_ids: crossword_id,
                thematique_id: thematique_id,
            };
            console.log(dataSend)
            const response = await fetchData("lessons", dataSend, token);
            console.log(response)
            if (response.status === 422) {
                return snackbbar(document.querySelector("#body"), infos, "Cette leçon existe déjà", 3000);

            } else if (response.status === 201) {
                return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000), navigate("/AllTraduction")
            }
            else if (response.message === "The description field is required.") {
                return snackbbar(document.querySelector("#body"), infos, "Description obligatoire", 3000)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDetails = (id) => {
        localStorage.setItem("idThematiqueTraduction", id);
        navigate("/AllTraduction");
        // setTimeout(() => {
        //     // navigate("/sousThematiques");
        //     window.open("/AllTraduction", "_blank");
        // }, 500);
    }

    const closeTheme = () => {
        setMasqueRemove(false)
    }
    const openPopup = (id) => {
        setMasqueRemove(true)
        setUserThemeId(id)
    }
    const handleThematique = async () => {
        setIsLoading(true);

        const data = {
            thematique_id: userThemeId
        };

        fetch('https://www.backend.habla-mundo.com/api/v1/lesson', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.status === 200) {
                    return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000), setMasqueRemove(false),
                        setTimeout(() => {
                            fetchDataByUrl("lessons");
                        }, 2000);
                }
            })
            .catch((error) => console.error('Erreur lors de la récupération des données :', error))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Grammaire" />
                {/* <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une leçon</span>
                </div> */}
            </div>
            {masqueRemove && <div id="masqueTheme"></div>}
            {/* {masqueRemove && <PopupRemove h1="Suppression de la lesson." closePopup={closePopup} text="Voulez-vous vraiment supprimer cette lesson?" TextRemove="Supprimer" removeLesson={handleThematique} closeLesson={closeTheme} />} */}
            {masqueRemove && (
                <PopupRemove
                    h1="Suppression de la leçon."
                    closePopup={closePopup}
                    text="Voulez-vous vraiment supprimer cette leçon ?"
                    TextRemove="Supprimer"
                    removeLesson={handleThematique}
                    isLoading={isLoading}
                />
            )}
            <div className="sous_parent_main_users_header">
                <div className="sous_parent_main_users_header_input">
                    <input type="text" className="input_users" placeholder="Rechercher une thématique ou une leçon de grammaire" name="checkValueThematique" onChange={(e) => {
                        const searchValue = e.target.value.toLowerCase();
                        setLevelSearch(false);
                        setEtatSearch(true)
                        searchElementTheme(searchValue);
                        if (e.target.value.length === 0) {
                            setLevelSearch(true);
                            setEtatSearch(false);
                        }
                    }} />
                    <FontAwesomeIcon
                        icon={faClose}
                        className="icons_close_list"
                        onClick={() => searchElementTheme("")}
                    />
                    <div className="parent_search_users">
                        <img src={search} alt="" className="search_users" />
                    </div>
                </div>
                {/* <Select
                    dataSelectStatus={dataSelectStatus}
                    changeIcon={changeIcon}
                    handleChildClick={handleChildClick}
                    selectRef={selectRef}
                    optionName={optionName}
                    optionVisible={optionVisible}
                    rotateIcon={rotateIcon}
                    defautClassNameOption="option"
                    defautClassName="select" /> */}
                <div className="update_theme1" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une leçon</span>
                </div>
            </div>

            <div className="alls_thematics-grammar">
                {/* Liste des thématiques */}
                {levelSearch && dataUser?.map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_grammaire1"
                    >
                        <span
                            className="parent_icons_thematics_child2 color_grammaire"
                            onClick={() => handleDetails(result.thematique_id)}>
                            {result.title}
                        </span>
                        <span className="parent_icons_thematics_child2">
                            {result.thematique_name}
                        </span>
                        <span className="sentences_grammar">
                            {result?.sentence_count} phrases
                        </span>
                        <span className="parent_icons_thematics_child2">
                            créé {formatTime(result.created_at)}
                        </span>
                        <div className="parent_icons_grammaire_child2">
                            <FontAwesomeIcon icon={faEdit} className="edit_icon_grammar" onClick={() => handleEdit(result.thematique_id, result.title)} />
                            <img src={remove} alt="remove_words" className="remove_words" onClick={() => openPopup(result.thematique_id)} />
                        </div>
                    </div>
                ))}
                {etatSearch && searchThemeGrammar?.map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_grammaire1"
                    >
                        <span
                            className="parent_icons_thematics_child2 color_grammaire"
                            onClick={() => handleDetails(result.thematique_id)}>
                            {result.title}
                        </span>
                        <span className="parent_icons_thematics_child2">
                            {result.thematique_name}
                        </span>
                        <span className="sentences_grammar">
                            {result.sentences.length} phrases
                        </span>
                        <span className="parent_icons_thematics_child2">
                            créé {formatTime(result.created_at)}
                        </span>
                        <div className="parent_icons_grammaire_child2">
                            {/* <div className="child-grammaire" onClick={() => handleDetails(result.thematique_id)}>
                                <span className="nameDetails">
                                    Details
                                </span>
                                <img src={next} alt="next_words" className="next_words" />
                            </div> */}
                            <FontAwesomeIcon icon={faEdit} className="edit_icon_grammar" onClick={() => handleEdit(result.thematique_id, result.title)} />
                            <img src={remove} alt="remove_words" className="remove_words" onClick={() => openPopup(result.thematique_id)} />
                        </div>

                    </div>
                ))}
            </div>
            {/* Popup modale */}
            {etatEdit && (
                <div className="modal">
                    <div className="modal_content">
                        <div className="headerEdit">
                            <span className="title">MODIFIER LA LECON</span>
                        </div>
                        <div className="paletteEdit">
                            <input
                                className="inputEdit"
                                type="text"
                                value={editingData.title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    console.log("Nouvelle saisie :", newTitle);
                                    setEditingData((prev) => ({ ...prev, title: newTitle }));
                                }}
                            />
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

            <div className="sous_parent_main_thematique">
                {etat || etatB ? (<div id="masqueTheme"></div>) : null}
                {etat || etatB ? (<form id="answer_client_theme_grammaire" onSubmit={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
                    <span className="title">CREATION D'UNE LECON DE GRAMMAIRE</span>
                    <div className="answer_client_theme2">
                        <div className="space-signup">
                            <label htmlFor="title">Titre de la grammaire</label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={titleGrammaire}
                                {...register("title", { required: "Le titre est obligatoire" })}
                                onChange={(e) => {
                                    setTitleGrammaire(e.target.value);
                                }}
                            />
                            {errors.title && <span className="error">{errors.title.message}</span>}
                        </div>

                        <div className="space-signup">
                            <label htmlFor="level">Niveau</label>
                            <Select
                                dataSelectStatus={dataSelectLevel}
                                changeIcon={changeIconGrammar}
                                handleChildClick={handleChildClickGrammar}
                                selectRef={selectRefGrammar}
                                optionName={optionNameGrammar}
                                optionVisible={optionVisibleGrammar}
                                rotateIcon={rotateIconGrammar}
                                defautClassNameOption="optionGrammar"
                                defautClassName="selectGrammar" />
                        </div>
                        <div className="space-signup">
                            <label htmlFor="thématique">Thématique</label>
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
                            {errors.thématique && <span className="error">{errors.thématique.message}</span>}

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
                    </div>

                    <div className="answer_client_theme3">
                        <div className="space_contenair contenair_phrases">
                            <label htmlFor="">Phrases Françaises</label>
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
                        <div className="space_contenair contenair_phrases">
                            <label htmlFor="">Phrases Anglaises</label>
                            <div className="parent_textarea">
                                <textarea className="textarea_sous_thematique" placeholder="Entrer un phrase anglaise" onKeyDown={(e) => {
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
                        {/* <div className="space-signup">
                            <label htmlFor="thématique">Thématique</label>
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
                            {errors.thématique && <span className="error">{errors.thématique.message}</span>}

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
                        </div> */}

                        {/* <div className="space-signup" onClick={handleSelectJuridictions} ref={selectWordsRef}>
                            <label htmlFor="words">Listes de mots</label>
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
                            <FontAwesomeIcon icon={faAngleDown} className="iconWords" style={{ transform: rotateIconWords && "rotate(180deg)" }} />
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
                        </div> */}
                    </div>

                    <div className="description">
                        <label htmlFor="reponse">Leçon de grammaire</label>
                        <div className="sous_description">
                            <div className="sous_description_img">
                                <img src={gras} alt="" className="img_profession" onClick={grasText} />
                                <img src={underline} alt="" className="img_profession" onClick={underlineText} />
                                <img src={italique} alt="" className="img_profession" onClick={italiqueText} />
                                <img src={police} alt="" className="img_profession" onClick={() => changeFontSize(4)} />
                                <img src={link} alt="" className="img_profession link" onClick={linkText} />
                                <img src={upload} alt="" className="img_answer_profession upload" onClick={handleUploadClick} />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />

                                <img src={list} alt="" className="img_profession list" onClick={listText} />
                            </div>
                            <div
                                className="textarea"
                                contentEditable="true"
                                placeholder="Saisissez la leçon de grammaire ici"
                                ref={textareaRef}
                            ></div>
                            <input
                                type="hidden"
                                name="reponse"
                                value={content}
                                {...register("reponse")}
                            />
                            {errors.reponse && <span className="errorGrammar">{errors.reponse.message}</span>}
                        </div>
                    </div>

                    {loading ? <button type="submit" className="button_theme">En cours ...</button> : <button type="submit" className="button_theme">Génerer les phrases</button>}
                </form>) : null}
            </div>
        </div>
    )
}

