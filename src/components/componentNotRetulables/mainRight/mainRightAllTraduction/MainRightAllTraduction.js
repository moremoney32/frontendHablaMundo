import React, { useState, useEffect } from 'react';
import "./mainRightAllTraduction.css"
import "./mainRightAllTraduction.css"
import { HeaderTraduction } from '../../../repeatableComponents/atomes/header/HeaderTraduction';
import removeTraduction from "../../../../assets/icons/removeTraduction.png"
import downTraduction from "../../../../assets/icons/downTraduction.png"
import { fetchData } from '../../../../helpers/fetchData';
import { snackbbar } from '../../../../helpers/snackbars';
import { useNavigate } from "react-router-dom";
import infos from "../../../../assets/icons/infos.svg";
import closePopup from "../../../../assets/icons/closePopup.png";
import { Popup } from '../../../repeatableComponents/atomes/popup/Popup';
import { fetchDelete } from '../../../../helpers/fetchDelete';
import { PopupRemove } from '../../../repeatableComponents/atomes/popup/PopupRemove';

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

    useEffect(() => {
        fetch('https://www.develop.habla-mundo.com/api/v1/lesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: localStorage.getItem("idThematiqueTraduction") }),
        })
            .then((response) => response.json())
            .then((result) => {
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
    const addSentence = (levelIndex) => {
        const updatedLevels = [...levels];
        const lastIndex = updatedLevels[levelIndex].sentences.length;
        const newSentence = {
            id: `new-${Date.now()}`,
            content: "",
            traduction: "",
        };
        updatedLevels[levelIndex].sentences.push(newSentence);
        setLevels(updatedLevels);
    };

    const handleSave = async (sentences, idThematique, levelIndex, level, description,lessonId) => {
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
            const result = await fetchData("https://www.develop.habla-mundo.com/api/v1/sentence/update", data,token)
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
        fetch("https://www.develop.habla-mundo.com/api/v1/lesson", {
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
                        fetch('https://www.develop.habla-mundo.com/api/v1/lesson', {
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
        fetch('https://www.develop.habla-mundo.com/api/v1/lesson', {
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

    return (
        <div className="parent_main">
            <HeaderTraduction theme={title} />
            {masque && <div id="masqueTheme"></div>}
            {masqueRemove && <div id="masqueTheme"></div>}
            {masque && <Popup h1="Suppression de la Grammaire" closePopup={closePopup} text="Voulez-vous Vraiment supprimer cette leçon de grammaire" TextRemove="Supprimer" removeLesson={handleLesson} closeLesson={closeLesson} />}
            {masqueRemove && <PopupRemove h1="Suppression de toutes les lessons" closePopup={closePopup} text="Voulez-vous Vraiment supprimer toutes les lessons" TextRemove="Supprimer" removeLesson={handleThematique} closeLesson={closeTheme} />}
            <div className="parent_traduction">
                <div className="child_traduction">
                    {
                        levels.map((level, levelIndex) => {
                            return (
                                <div className="sous_child_traduction1" key={levelIndex}>
                                    {/* <span className="sous_child_traduction_span">{level.description}</span> */}
                                    <p className="sous_child_traduction_span" dangerouslySetInnerHTML={{ __html: level.description }} contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            const updatedLevels = [...levels];
                                            // Capturer le contenu HTML pour conserver les styles
                                            updatedLevels[levelIndex].description = e.currentTarget.innerHTML.trim();
                                            setLevels(updatedLevels); // Met à jour le state pour ce niveau spécifique
                                        }} />
                                    <img src={removeTraduction} className='remove_traduction' onClick={() => handleMasque(level.id)} />

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
                                    {level.sentences?.length < 25 && (
                                        <div className="add-sentence-button" onClick={() => addSentence(levelIndex)}>
                                            <span></span>
                                            <span className='plusTraduction'>+</span>
                                        </div>
                                    )}
                                </div>
                            )}
                            <button
                                className="save-button"
                                onClick={() =>
                                    handleSave(level.sentences, localStorage.getItem("idThematiqueTraduction"), levelIndex, level.level_name, level.description,level.lesson_id)
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


