import { HeaderSousThematiques } from "../../../repeatableComponents/atomes/header/HeaderSousThematiques"
import "./mainRightSousThematiques.css";
import "../mainRightUsers/mainRightUsers.css";
import search from "../../../../assets/icons/search.png";
import { Select } from "../../select/Select";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../../../helpers/fetchData";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { CardSousThematique } from "./cardSousThematiques";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
import remove from "../../../../assets/icons/remove.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { snackbbar } from "../../../../helpers/snackbars";


export const MainRightSousThematiques = () => {
    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = useForm();
    const dataSelectStatus = ["Ordre Aphabétique","Plus récents","Moins récents"]
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionName, setOptionName] = useState("Ordre Aphabétique");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [openSousThemes, setOpenSousThemes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sousThematiques, setSousThematique] = useState(null);
    const [searchResults, searchElementUserName] = useSearchNames(sousThematiques);
    const [thematiques, setThematiques] = useState([
        { id: 1, thematique: '', crossword: '', words: [] },
    ]);
    const [etat, setEtat] = useState(false);
    const [level, setLevel] = useState(true);
    const dataValue = JSON.parse(localStorage.getItem('theme'))
    const resultValue = JSON.parse(localStorage.getItem('result'))
    const token = localStorage.getItem('token')
    const navigate =useNavigate();
    useEffect(() => {
        const id = {
            id: resultValue.id
        }
        fetchData("https://www.backend.habla-mundo.com/api/v1/theme",id).then((result) => {
            console.log(result)
             setSousThematique(result)
        })
    }, [])
    const sortAlphabet= (sousThematiques) => {
        return sousThematiques.sort((a, b) => a.name.localeCompare(b.name));
      };
    const selectRef = useRef(null);
    const changeIcon = () => {
        const select = selectRef.current
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            // Deuxième clic : masquer les options
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisible(false);
        } else {
            // Premier clic : afficher les options
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    const handleChildClick = (value) => {
        if(value = "Ordre Aphabétique"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareAphabetiques =   sousThematiques.sort((a, b) => a.name.localeCompare(b.name))
           return setSousThematique(compareAphabetiques)
        }
        if(value = "Moins récents"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareAphabetiques =   sousThematiques.sort((a, b) => b.name.localeCompare(a.name))
           return setSousThematique(compareAphabetiques)
        }
        if(value = "Plus récents"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareDate =   sousThematiques.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA - dateB;
          });  
           return setSousThematique(compareDate)
        }
       
    };
    const handleWordls = async(id,name)=>{
        const dataId = {
            id:id
        }
        try {
            const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/word",dataId,token);
            console.log(result)
            localStorage.setItem('datas', JSON.stringify(result));
            localStorage.setItem('name', JSON.stringify(name));
            localStorage.setItem('id', JSON.stringify(id));
            navigate("/motsCroisés");
        } catch (error) {
            console.log({ message: error.message });
        } 
    }
    const updateSousThematique= () =>{
      setOpenSousThemes(true);
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
    const handleAddThematique = () => {
        setThematiques([...thematiques, { id: thematiques.length + 1, crossword: '', words: [] }])
    }
    const close = () => {
        setOpenSousThemes(false)
    }
    
    const handleRemoveChip = (id, chipIndex) => {
        const newThematiques = thematiques.map(thematique => {
            if (thematique.id === id) {
                thematique.words = thematique.words.filter((_, index) => index !== chipIndex);
            }
            return thematique;
        });
        setThematiques(newThematiques);
    };
    const onSubmit =  async (data) => {
        //setLoading(true)
        console.log(data)
        console.log(thematiques)
        for (let i = 0; i < thematiques.length; i++) {
            const sousThemes = thematiques[i];
            console.log(sousThemes)
            if (sousThemes.crossword.length  === 0) {
                console.log(true)
                 const messageCrosswords = "la sous thématique  ne doit pas etre vide."
                 return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg",messageCrosswords, 10000);
            }
            if (sousThemes.words.length % 25 !== 0 || sousThemes.words.length === 0) {
                const messages = `Le nombre de mots dans la sous thématique "${sousThemes.crossword}" doit être un multiple de 25.`
                return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", messages, 10000);
            }    
        }
        if (data) {
            const dataSend = {
                thematique_id:resultValue.id,
                dataCrossword: thematiques
            }
            console.log(dataSend)
            setLoading(true);
            try {
                const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/themes", dataSend, token);
                if (result.message === "the thematics is created") {
                    snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 2000);
                    // localStorage.setItem('theme', JSON.stringify(dataSend));
                    // localStorage.setItem('result', JSON.stringify(result));

                    
                    setTimeout(() => {
                        fetchData("https://www.backend.habla-mundo.com/api/v1/theme",{id:resultValue.id}).then((result) => {
                            console.log(result)
                             setSousThematique(result)
                        })
                        setOpenSousThemes(false)
                       
                    }, 2000);
                }
                if (result.message === "Erreur de l'IA. Veuillez reessayer!!!") {
                    return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 7000);
                }
            } catch (error) {
                // setEtat(true);
                console.log({message:error})
            } finally {
                setLoading(false);
            }
        }
        
    }
    return (
        <div className="parent_main">
            <div className="parent_header_sous_thematiques">
                <HeaderSousThematiques theme={dataValue.name} updateSousThematique={updateSousThematique}/>
            </div>
            {/*  */}
            {openSousThemes && <div id="masqueSousTheme"></div>}
            {openSousThemes && <form id="answer_client_theme" onSubmit={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
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
                                                    }} />
                                            </div>
                                            <div className="space_contenair">
                                                <label htmlFor="">liste des mots de la sous-thématique</label>
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
            {/*  */}
             <div className="sous_parent_main_sous_theme">
                <div className="sous_parent_main_users_header">
                    <div className="sous_parent_main_users_header_input">
                        <input type="text" className="input_users" placeholder="Rechercher une sous thématique" name="checkValue" onChange={(e) => {
                            setLevel(false);
                            setEtat(true)
                            searchElementUserName(e.target.value);
                            if (e.target.value.length === 0) {
                                setLevel(true);
                                setEtat(false)
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
                        defautClassName="select"/>
                </div>
                <div className="sous_parent_main_users_main">
                    {
                       level && sousThematiques?.map((thematique) => {
                        console.log(thematique.id)
                            return (
                                <CardSousThematique name={thematique?.name} key={thematique?.id}  created={thematique.created_at}  onClick={() => handleWordls(thematique.id,thematique.name)}/>
                            )
                        })
                    }
                    {
                       etat && searchResults?.map((thematique) => {
                            return (
                                <CardSousThematique name={thematique?.name} key={thematique?.id}  created={thematique.created_at}  onClick={() => handleWordls(thematique.id,thematique.name)}/>
                            )
                        })
                    }   
                </div>
            </div> 
        </div>
    )
}
