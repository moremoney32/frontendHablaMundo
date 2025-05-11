import React, { useState, useEffect } from 'react';
import "./mainRightAllTraduction.css"
import "./mainRightAllTraduction.css"
import { HeaderTraduction } from '../../../repeatableComponents/atomes/header/HeaderTraduction';
import removeTraduction from "../../../../assets/icons/removeTraduction.png"
import downTraduction from "../../../../assets/icons/downTraduction.png"
import reset from "../../../../assets/icons/reset.png"
import { fetchData } from '../../../../helpers/fetchData';
import { snackbbar } from '../../../../helpers/snackbars';
import { useNavigate } from "react-router-dom";
import infos from "../../../../assets/icons/infos.svg";
import closePopup from "../../../../assets/icons/closePopup.png";
import { Popup } from '../../../repeatableComponents/atomes/popup/Popup';
import { fetchDelete } from '../../../../helpers/fetchDelete';
import { PopupRemove } from '../../../repeatableComponents/atomes/popup/PopupRemove';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainRightAllTraduction = () => {
    const navigate = useNavigate()
    const [levels, setLevels] = useState([]);
    const [title, setTitle] = useState("");
    const [idPopup, setIdPopup] = useState("");
    const [loading, setLoading] = useState(null);
    const [masque, setMasque] = useState(false);
    const [masqueRemove, setMasqueRemove] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingButtonRemove, setLoadingButtonRemove] = useState(false);
    const [expandedLevel, setExpandedLevel] = useState(null);
    const token = localStorage.getItem("token");
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    // Fonction de toggle pour les descriptions
    const toggleDescription = (levelIndex) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [levelIndex]: !prev[levelIndex]
        }));
    };
    console.log(token)

    useEffect(() => {
        fetch('https://www.backend.habla-mundo.com/api/v1/lesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: localStorage.getItem("idThematiqueTraduction") }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result?.data) {
                    console.log(result?.data)
                    return setLevels(result?.data),
                        setTitle(result?.title)
                }
                else if (result.status === 404) {
                    return navigate("/grammaire")
                }

            })
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }, []);

    const toggleLevel = (index) => {
        setExpandedLevel(expandedLevel === index ? null : index);
    };

    const handleEdit = (levelIndex, sentenceIndex, value) => {
        const updatedLevels = [...levels];
        updatedLevels[levelIndex].sentences[sentenceIndex].traduction = value.trim();
        setLevels(updatedLevels);
    };
    const handleEditContent = (levelIndex, sentenceIndex, value) => {
        const updatedLevels = [...levels];
        updatedLevels[levelIndex].sentences[sentenceIndex].content = value.trim();
        setLevels(updatedLevels);
    };
    // const addSentence = (levelIndex, lessonId) => {
    //     const updatedLevels = [...levels];
    //     const lastIndex = updatedLevels[levelIndex].sentences.length;
    //     const newSentence = {

    //         content: "",
    //         traduction: "",
    //         lesson_id: lessonId
    //     };
    //     updatedLevels[levelIndex].sentences.push(newSentence);
    //     setLevels(updatedLevels);
    // };
    const addSentence = (lessonId) => {
        const dataSend = {
            lesson_id: lessonId
        }
        fetchData("generate_more_sentences", dataSend, token).then((response) => {
            console.log(response)
            return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000), setLevels(response?.data)
        })
    };

    const handleSave = async (sentences, idThematique, levelIndex, level, description, lessonId) => {
        console.log(lessonId)
        const updatedSentences = sentences.filter((sentence) => sentence.traduction.trim() !== "");

        const data = {
            sentences: updatedSentences,
            id: idThematique,
            description: description,
            level: level,
            lesson_id: lessonId
        };
        console.log(data);
        setLoading(levelIndex)
        try {
            const result = await fetchData("sentence/update", data, token)
            if (result.status === 200) {
                return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000);
            }

        } catch (error) {
        } finally {
            setLoading(null)
        }
    };
    const handleMasque = (idLevel) => {
        setMasque(true)
        setIdPopup(idLevel)
    }
    const handleRemoveMasque = () => {
        navigate("")
    }
    const closeLesson = () => {
        setMasque(false)
    }
    const closeTheme = () => {
        setMasqueRemove(false)
    }

    const handleLesson = () => {

        const data = {
            lesson_id: idPopup
        }
        console.log(data)
        fetch("https://www.backend.habla-mundo.com/api/v1/lesson", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression de l\'élément');
                }
                return response.json();
            })
            .then(result => {
                if (result.status === 200) {
                    snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000);
                    setTimeout(() => {
                        fetch('https://www.backend.habla-mundo.com/api/v1/lesson', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ id: localStorage.getItem("idThematiqueTraduction") }),
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                setMasque(false)
                                console.log(result)
                                if (result?.data) {
                                    return setLevels(result?.data),
                                        setTitle(result?.title)
                                }
                                else if (result.status === 404) {
                                    return navigate("/grammaire")
                                }
                            })
                            .catch((error) => console.error('Erreur lors de la récupération des données :', error));

                    }, 2000)


                }
            })
            .catch(error => {
                console.log(error);
            });

    }
    const handleThematique = async () => {
        const data = {
            thematique_id: localStorage.getItem("idThematiqueTraduction")
        }
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
                setMasque(false)
                console.log(result)
                if (result.status === 404) {
                    snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000);
                    return navigate("/grammaire")
                }
            })
            .catch((error) => console.error('Erreur lors de la récupération des données :', error));
    }

    const resetSentence = async (sentenceId, lessonId, wordId) => {
        try {
            const url = "https://www.backend.habla-mundo.com/api/v1/add_single_sentence";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sentence_id: sentenceId,
                    lesson_id: lessonId,
                    word_id: wordId
                }),
            });

            const result = await response.json();
            console.log("Réponse API (reset) :", result);

            if (response.ok) {
                return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 3000), setLevels(result?.data)

            } else {
                snackbbar(document.querySelector("#body"), infos, "Erreur lors de la réinitialisation !", 3000);
            }
        } catch (error) {
            console.error("Erreur lors de la réinitialisation :", error);
            alert("Une erreur est survenue !");
        }
    };
  
    const copyText = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            snackbbar(document.querySelector("#body"), infos, "copier !", 3000);
            
          })
          .catch((err) => {
            console.error("Erreur lors de la copie :", err);
            alert("Erreur lors de la copie");
          });
      };
      


    return (
        <div className="parent_main">
            <HeaderTraduction theme={title} />
            {masque && <div id="masqueTheme"></div>}
            {masqueRemove && <div id="masqueTheme"></div>}
            {masque && <Popup h1="Suppression de la Grammaire" closePopup={closePopup} text="Voulez-vous vraiment supprimer cette leçon de grammaire?" TextRemove="Supprimer" removeLesson={handleLesson} closeLesson={closeLesson} />}
            {masqueRemove && <PopupRemove h1="Suppression de toutes les lessons" closePopup={closePopup} text="Voulez-vous Vraiment supprimer toutes les lessons" TextRemove="Supprimer" removeLesson={handleThematique} closeLesson={closeTheme} />}
            <div className="parent_traduction">
                <div className="child_traduction">
                    {
                        levels.map((level, levelIndex) => {
                            return (
                                // <div className="sous_child_traduction1" key={levelIndex}>
                                //     {/* <span className="sous_child_traduction_span">{level.description}</span> */}
                                //     <p className="sous_child_traduction_span" dangerouslySetInnerHTML={{ __html: level.description }} contentEditable
                                //         suppressContentEditableWarning
                                //         onBlur={(e) => {
                                //             const updatedLevels = [...levels];
                                //             // Capturer le contenu HTML pour conserver les styles
                                //             updatedLevels[levelIndex].description = e.currentTarget.innerHTML.trim();
                                //             setLevels(updatedLevels); // Met à jour le state pour ce niveau spécifique
                                //         }} />
                                //     <FontAwesomeIcon icon={faEdit} className='write_traduction' onClick={(e) => {
                                //         // Trouve le parent le plus proche avec la classe
                                //         const parentDiv = e.currentTarget.closest('.sous_child_traduction1');
                                //         // Sélectionne le paragraphe dans ce parent
                                //         const pElement = parentDiv.querySelector('.sous_child_traduction_span');
                                //         setTimeout(() => {
                                //             copyText(pElement.innerText);
                                //           }, 100);
                                //         // Copie le texte brut sans le HTML
                                        
                                //     }} />
                                //     <img src={removeTraduction} className='remove_traduction' onClick={() => handleMasque(level.id)} />

                                // </div>


                                <div className="sous_child_traduction1" key={levelIndex}>
                                {/* En-tête cliquable pour le toggle */}
                                <div 
                                    className="description-header"
                                    onClick={() => toggleDescription(levelIndex)}
                                >
                                    <span>Description du niveau {level.level_name}</span>
                                    <img
                                        src={downTraduction}
                                        className={`toggle-arrow ${
                                            expandedDescriptions[levelIndex] ? 'rotated' : ''
                                        }`}
                                        alt="Toggle description"
                                    />
                                </div>
        
                                {/* Contenu conditionnel */}
                                {expandedDescriptions[levelIndex] && (
                                    <>
                                        <p 
                                            className="sous_child_traduction_span"
                                            dangerouslySetInnerHTML={{ __html: level.description }}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => {
                                                const updatedLevels = [...levels];
                                                updatedLevels[levelIndex].description = 
                                                    e.currentTarget.innerHTML.trim();
                                                setLevels(updatedLevels);
                                            }}
                                        />
                                        <FontAwesomeIcon 
                                            icon={faEdit} 
                                            className='write_traduction' 
                                            onClick={(e) => {
                                                const parentDiv = e.currentTarget.closest('.sous_child_traduction1');
                                                const pElement = parentDiv.querySelector('.sous_child_traduction_span');
                                                setTimeout(() => {
                                                    copyText(pElement.innerText);
                                                }, 100);
                                            }} 
                                        />
                                        <img 
                                            src={removeTraduction} 
                                            className='remove_traduction' 
                                            onClick={() => handleMasque(level.id)} 
                                        />
                                    </>
                                )}
                            </div>
                            )
                        })
                    }
                </div>


                <div className="sous_child_traduction2">
                    {levels.map((level, levelIndex) => (
                        <div key={levelIndex} className="level-section">
                            <div className="level-header" onClick={() => toggleLevel(levelIndex)}>
                                <span className="level-header_name">{level.level_name}</span>
                                <img
                                    src={downTraduction}
                                    className={`downTraduction ${expandedLevel === levelIndex ? 'rotated' : ''}`}
                                    alt="Toggle"
                                />
                            </div>
                            {expandedLevel === levelIndex && (
                                <div className="sentences-container">
                                    {level.sentences?.map((sentence, sentenceIndex) => (
                                        <div key={sentence.id} className="sentence-block">
                                            <div className="french-sentence">
                                                <span className="sentenceIndex">{sentenceIndex + 1}</span>
                                                <span className="sentence" contentEditable
                                                    suppressContentEditableWarning
                                                    onBlur={(e) =>
                                                        handleEditContent(levelIndex, sentenceIndex, e.currentTarget.textContent)
                                                    }>{sentence.content}</span>
                                                <img src={reset} alt="" className='reset' onClick={() => resetSentence(sentence.id, sentence.lesson_id, sentence.word_id)} />
                                            </div>
                                            <div className="english-translation">
                                                <div
                                                    className="editSentences"
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onBlur={(e) =>
                                                        handleEdit(levelIndex, sentenceIndex, e.currentTarget.textContent)
                                                    }
                                                >
                                                    {sentence.traduction}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {level.sentences?.length < 350 && (
                                        <div className="add-sentence-button" onClick={() => addSentence(level.lesson_id)}>
                                            <span></span>
                                            <span className='plusTraduction'>+</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <button
                                className="save-button"
                                onClick={() =>
                                    handleSave(level.sentences, localStorage.getItem("idThematiqueTraduction"), levelIndex, level.level_name, level.description, level.lesson_id)
                                }
                                disabled={loading === levelIndex}
                            >
                                {loading === levelIndex ? "En cours..." : "Sauvegarder"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


