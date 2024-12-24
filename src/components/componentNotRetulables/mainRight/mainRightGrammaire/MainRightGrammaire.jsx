import { useEffect, useRef, useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { snackbbar } from "../../../../helpers/snackbars";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { SketchPicker } from 'react-color';
import gras from "../../../../assets/icons/gras.png";
import italique from "../../../../assets/icons/italique.png";
import link from "../../../../assets/icons/link.png";
import underline from "../../../../assets/icons/underline.png";
import list from "../../../../assets/icons/list.png";
import police from "../../../../assets/icons/police.png";
import upload from "../../../../assets/icons/upload.png";

// import "../mainRightUsers/mainRightUsers.css"
// import "../mainRightMessages/mainRightMessages.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom"
import search from "../../../../assets/icons/search.png";
import remove from "../../../../assets/icons/remove.png";
import next from "../../../../assets/icons/next.png";
import state from "../../../../assets/icons/state.png";
import { icons } from '../../../../helpers/icons';
import { Select } from "../../select/Select";
import { useForm } from 'react-hook-form';
import { fetchData } from "../../../../helpers/fetchData";
import { SelectLanguages } from "../../select/SelectLanguages";
import { fetchDataGet } from "../../../../helpers/fetchDataGet";
import { formatTime } from "../../../../helpers/formatDate";
import { fetchDelete } from "../../../../helpers/fetchDelete";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import infos from "../../../../assets/icons/infos.svg";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { fetchDataPut } from "../../../../helpers/fetchDataPut";
import { useSearchGrammar } from "../../../../customsHooks/userSearchGrammar";
import { useSearchWords } from "../../../../customsHooks/useSearchWords";
import { snackBarss } from "../../../../helpers/snackbarss";

export const MainRightGrammaire = () => {
    const [etat, setEtat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('#ED4C5C');
    const [showPicker, setShowPicker] = useState(false);
    const [etatSousTheme, setEtatSousTheme] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionVisibleGrammar, setOptionVisibleGrammar] = useState(false);
    const [optionVisibleVisibility, setOptionVisibleVisibility] = useState(false);
    const [optionName, setOptionName] = useState("Plus récents");
    const [optionNameGrammar, setOptionNameGrammar] = useState("A1");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [rotateIconGrammar, setRotateIconGrammar] = useState(false);
    const [levelSearch, setLevelSearch] = useState(true);
    const [etatSearch, setEtatSearch] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [dataWords, setDataWords] = useState([]);
    const [optionVisibleLanguages, setOptionVisibleLanguages] = useState(false);
    const [optionNameLanguages, setOptionNameLanguages] = useState("Anglais");
    const [optionNameVisibility, setOptionNameVisibility] = useState("Non");
    const [rotateIconLanguages, setRotateIconLanguages] = useState(false);
    const [rotateIconVisility, setRotateIconVisibility] = useState(false);
    const [rotateIconVisilityGrammar, setRotateIconVisibilityGrammar] = useState(false);
    const [resultAllThematiques, setResultAllThematiques] = useState([]);
    const [searchResults, searchElementUserName] = useSearchNames(dataUser);
    const [searchResultsGrammar, searchElementUserNameGrammar] = useSearchGrammar(resultAllThematiques);
    const [searchResultsWords, searchElementUserNameWords] = useSearchWords(dataWords);

    /******edit Name */
    const [crossword_id, setCrossword_id] = useState("");
    const [thematique_id, setThematique_id] = useState("");
    const [editingId, setEditingId] = useState(null); // ID de l'élément en édition
    const [editingData, setEditingData] = useState({ name: "", color: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [titleGrammaire, setTitleGrammaire] = useState("");
    const [thématique, setThématiques] = useState("");
    const [words, setWords] = useState("");
    const [select, setSelect] = useState(false);
    const [selectWords, setSelectWords] = useState(false);
    const itemsPages = 10;
    const totalPages = Math.ceil(dataUser?.length / itemsPages);
    const startIndex = (currentPage - 1) * itemsPages
    const dataCurrent = dataUser?.slice(startIndex, startIndex + itemsPages)
    const selectRefGrammar = useRef(null)
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [etatEdit, setEtatEdit] = useState(false);
    const [content, setContent] = useState(null);
    const [snackBarData, setSnackBarData] = useState({
        message: '',
        image: null,
        timeToHide: 3000,
        isVisible: false,
      });
      const handleCloseSnackBar = () => {
        setSnackBarData((prev) => ({ ...prev, isVisible: false }));
      };
    const handleChangePages = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }
    // /*****fin editName */
    let message1 = "Demande prise en compte"
    let message2 = "Demande non prise en compte"
    const [thematiques, setThematiques] = useState([
        { id: 1, thematique: '', crossword: '', words: [] },
    ]);
    const selectRef = useRef(null);
    const selectRefLanguages = useRef(null);
    const selectRefVisibility = useRef(null);
    const dataSelectStatus = ["Ordre Aphabétique", "Plus récents", "Moins récents"];
    const dataSelectLevel = ["A1", "A2", "B1", "B2"]
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
            const compareDate = dataUser.sort((a, b) => {
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
            const compareDate = dataUser.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            console.log(compareDate)
            setResultAllThematiques(compareDate)
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
        setEtat(false)
    }
   
    useEffect(() => {
        fetchDataGet("https://www.develop.habla-mundo.com/api/v1/lessons").then((result) => {
            console.log(result)
            setDataUser(result?.data)
        })
    }, [])
    useEffect(() => {
        fetchDataGet("https://www.backend.habla-mundo.com/api/v1/themes")
            .then((result) => {
                console.log(result);
                const transformedResponse = result
                    .sort((a, b) => a.name.localeCompare(b.name)) // Sort by name
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
        const userId = {
            id: id
        }
        setSelect(false);
        setThématiques(theme)
        setValue('thématique', theme);
        fetchData("https://www.backend.habla-mundo.com/api/v1/theme", userId).then((result) => {
            console.log(result)
            setDataWords(result)
            // return setSousThematiques(result)  
        })

    };
    const handleChildClickWords = (words, id) => {
        setCrossword_id(id);
        setSelectWords(false);
        setWords(words);
        setValue('words', words);
    };
    
    
    const onSubmit = async (data) => {
        setLoading(true)
        try {
           
            const dataSend = {
                title: data.title,
                level: optionNameGrammar,
                description: data.reponse,
                crossword_id: crossword_id,
                thematique_id: thematique_id,
            };
            const response = await fetchData("https://www.develop.habla-mundo.com/api/v1/lessons", dataSend);
            console.log(response)
            if (response.message === "La leçon existe déjà avec cette combinaison."){
                setSnackBarData({
                    message: 'Cette leçon existe déjà',
                    image: , // Ajoutez le chemin de l'image si nécessaire
                    timeToHide: 3000,
                    isVisible: true,
                  });
            } else if (response.message === "Leçon créée avec succès"){
                setSnackBarData({
                    message: 'Demande prise en compte',
                    image:,
                    timeToHide: 3000,
                    isVisible: true,
                  });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Leçons de grammaire" />
                <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une leçon</span>
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
                    defautClassNameOption="option"
                    defautClassName="select" />
            </div>

            <div className="alls_thematics">
                {/* Liste des thématiques */}
                {levelSearch && dataCurrent?.reverse().slice().map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_grammaire"
                    >
                        <span
                            className="parent_icons_thematics_child2 color_grammaire"
                        >
                            {result.title}
                        </span>
                        <span className="parent_icons_thematics_child2">
                            {result.words_count} Mots
                        </span>
                        <span className="parent_icons_thematics_child2">
                            créé {formatTime(result.created_at)}
                        </span>
                        <div className="parent_icons_grammaire_child2">
                            <div className="child-grammaire">
                                <span className="nameDetails">
                                    Details
                                </span>
                                <img src={next} alt="next_words" className="next_words" />
                            </div>
                            <img src={remove} alt="remove_words" className="remove_words" />
                        </div>
                    </div>
                ))}
                {etatSearch && searchResults?.map((result) => (
                    <div
                        key={result.id}
                        className="sous_alls_grammaire"
                    >
                        <span
                            className="parent_icons_thematics_child2 color_grammaire"
                        >
                            {result.title}
                        </span>
                        <span className="parent_icons_thematics_child2">
                            {result.words_count} Mots
                        </span>
                        <span className="parent_icons_thematics_child2">
                            créé {formatTime(result.created_at)}
                        </span>
                        <div className="parent_icons_grammaire_child2">
                            <div className="child-grammaire">
                                <span className="nameDetails">
                                    Details
                                </span>
                                <img src={next} alt="next_words" className="next_words" />
                            </div>
                            <img src={remove} alt="remove_words" className="remove_words" />
                        </div>

                    </div>
                ))}  
            </div>
            <div className="pagination">
                {levelSearch ? <span className="pagination_nbrs_pages">{dataCurrent?.length}/{dataUser?.length} Leçons</span> : <span className="pagination_nbrs_pages">{searchResults.length}/{dataUser.length} Utilisateurs</span>}
                <div className="direction_icons">
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="icons_pagination"
                        onClick={() => handleChangePages(currentPage - 1)}
                    />
                    <div className="counter">
                        {[...Array(totalPages)].map((_, index) => (
                            <span
                                key={index}
                                className={currentPage === index + 1 ? "active_page" : "non_active"}
                                onClick={() => handleChangePages(index + 1)}
                            >
                                {index + 1}
                            </span>
                        ))}
                    </div>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="icons_pagination"
                        onClick={() => handleChangePages(currentPage + 1)}
                    />
                </div>
            </div>

            <div className="sous_parent_main_thematique">
                {etat && <div id="masqueTheme"></div>}
                {etat && <form id="answer_client_theme_grammaire" onSubmit={handleSubmit(onSubmit)}>
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
    </div>

    <div className="answer_client_theme2">
        <div className="space-signup">
            <label htmlFor="thématique">Thématique</label>
            <input 
                type="text" 
                name="thématique" 
                defaultValue={thématique} 
                {...register("thématique", { required: "La thématique est obligatoire" })} 
                onChange={(e) => {
                    searchElementUserNameGrammar(e.target.value);
                    setSelect(true);
                    register('thématique').onChange(e); // Access onChange from register
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

        <div className="space-signup">
            <label htmlFor="words">Mot croisés</label>
            <input 
                type="text" 
                name="words" 
                defaultValue={words} 
                {...register("words", { required: "Le mot croisé est obligatoire" })} 
                onChange={(e) => {
                    searchElementUserNameWords(e.target.value);
                    setSelectWords(true);
                    register('words').onChange(e); // Access onChange from register
                }} 
            />
            {errors.words && <span className="error">{errors.words.message}</span>}

            {selectWords && (
                <div className="optionGrammar1">
                    {searchResultsWords.map((infosUsers) => {
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
            {errors.reponse && <span className="error">{errors.reponse.message}</span>}
        </div>
    </div>

    {loading?<button type="submit" className="button_theme">En cours ...</button>:<button type="submit" className="button_theme">Génerer les phrases</button>}
</form>}
{snackBarData.isVisible && (
        <snackBarss
          message={snackBarData.message}
          image={snackBarData.image}
          timeToHide={snackBarData.timeToHide}
          onClose={handleCloseSnackBar}
        />
      )}
            </div>
        </div>
    )
}

