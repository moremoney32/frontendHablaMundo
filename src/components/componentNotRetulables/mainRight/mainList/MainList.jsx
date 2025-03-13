import React, { useState, useEffect, useRef } from 'react';
import search from "../../../../assets/icons/search.png";
import "./mainList.css";
import { HeaderTraduction } from '../../../repeatableComponents/atomes/header/HeaderTraduction';
import removeTraduction from "../../../../assets/icons/removeTraduction.png";
import downTraduction from "../../../../assets/icons/downTraduction.png";
import { fetchData } from '../../../../helpers/fetchData';
import { snackbbar } from '../../../../helpers/snackbars';
import { useNavigate } from "react-router-dom";
import infos from "../../../../assets/icons/infos.svg";
import closePopup from "../../../../assets/icons/closePopup.png";
import { Popup } from '../../../repeatableComponents/atomes/popup/Popup';
import { fetchDelete } from '../../../../helpers/fetchDelete';
import { PopupRemove } from '../../../repeatableComponents/atomes/popup/PopupRemove';
import { HeaderTitleMain } from '../../../repeatableComponents/atomes/header/HeaderTitleMain';
import { Select } from '../../select/Select';
import { ButtonMainLeft } from '../../../repeatableComponents/atomes/button/ButtonMainLeft';
import { fetchDataGetToken } from '../../../../helpers/fetchDataGetToken';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const MainList = () => {
    const checkRef = useRef(null);
    const checkColor = useRef(null);
    const [check, setCheck] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingCheck, setLoadingCheck] = useState(false);
    const [data, setData] = useState([]);
    // const [firstIndexComments, setFirstIndexComments] = useState(0);
    // const [lastIndexComments, setLastIndexComments] = useState(8);
    // const containUseref = useRef(null)
    const token = localStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1); 
    const [editedData, setEditedData] = useState({});
    const [totalPages, setTotalPages] = useState(1); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [debouncedSearch, setDebouncedSearch] = useState("");
   
   
    

    const fetchData = async (page, searchQuery) => {
        console.log(`Fetching data... Page: ${page}, Search: ${searchQuery}`);
        try {
            const url = `https://www.backend.habla-mundo.com/api/v1/liste_mots_thematiques?page=${page}&search=${searchQuery}`;
            console.log("URL:", url);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const result = await response.json();
            console.log("API Response:", result);
    
            if (result && result.data) {
                setData(result.data.sort((a, b) => a.text.localeCompare(b.text)));
                setTotalPages(result.last_page);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Erreur API :", error);
        }
    };
    useEffect(() => {
        fetchData(currentPage, debouncedSearch);
    }, [currentPage, debouncedSearch]);

    //  Générer les numéros de pages pour la pagination
    const generatePageNumbers = () => {
        const pages = [];
        if (totalPages <= 12) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // Toujours afficher 1 à 10

        if (currentPage > 12) {
            pages.push("..."); // Afficher "..." si on est loin des premières pages
        }

        pages.push(totalPages - 1, totalPages); // Toujours afficher les 2 dernières pages

        return pages;
    };
    // /****intersection observer messages */
    // useEffect(() => {
    //     if (containUseref.current && lastIndexComments < data?.length) {
    //         const observer = new IntersectionObserver((entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     setLastIndexComments((prevIndex) => {
    //                         // je charge 8 éléments
    //                         const nextIndex = prevIndex + 8;
    //                         if (nextIndex <= data?.length) {
    //                             return nextIndex;
    //                         } else {
    //                             return data?.length; //  max d'éléments restants
    //                         }
    //                     });
    //                 }
    //             });
    //         }, {
    //             root: null,
    //             rootMargin: "0px",
    //             threshold: 1.0
    //         });

    //         observer.observe(containUseref.current);

    //         return () => {
    //             if (containUseref.current) {
    //                 observer.unobserve(containUseref.current);
    //             }
    //         };
    //     }
    // }, [containUseref.current, lastIndexComments, data?.length]);
    //fin intersection

   
   
    // const fetchDuplicates = async (page, searchQuery) => {ic c etait sans filtre sur les doublons
    //     setLoadingCheck(true);
    //     try {
    //         const url = `https://www.backend.habla-mundo.com/api/v1/liste_mots_boublons?page=${page}&search=${searchQuery}`;
    //         const response = await fetch(url, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });
    
    //         const result = await response.json();
    //         console.log("Résultat API (doublons) :", result);
    
    //         if (result && result.data) {
    //             setData(result.data.sort((a, b) => a.text.localeCompare(b.text)));
    //             setTotalPages(result.last_page);
    //         } else {
    //             setData([]);  // Aucune donnée trouvée
    //             setTotalPages(1);
    //         }
    //     } catch (error) {
    //         console.error("Erreur API (doublons) :", error);
    //     }
    //     setLoadingCheck(false);
    // };
    
    const fetchDuplicates = async (page, searchQuery) => {
        setLoadingCheck(true);
        try {
            const url = `https://www.backend.habla-mundo.com/api/v1/liste_mots_boublons?page=${page}&search=${searchQuery}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            const result = await response.json();
            console.log("Résultat API (doublons) :", result);
    
            if (result && result.data) {
                //  Étape 1 : Filtrer uniquement les objets contenant `text`
                const filteredData = result.data.filter((item) => item.text);
    
                //  Étape 2 : Trier les résultats par ordre alphabétique (`text`)
                const sortedData = filteredData.sort((a, b) => a.text.localeCompare(b.text));
    
                //  Étape 3 : Trouver les vrais doublons (mêmes `text` répétés plusieurs fois)
                const wordCount = {};
                sortedData.forEach((word) => {
                    wordCount[word.text] = (wordCount[word.text] || 0) + 1;
                });
    
                //  Étape 4 : Ne garder que les entrées qui apparaissent plus d'une fois (vrais doublons)
                const duplicatesOnly = sortedData.filter((word) => wordCount[word.text] > 1);
    
                //  Étape 5 : Mise à jour des données et de la pagination
                setData(duplicatesOnly);
                setTotalPages(result.last_page);
            } else {
                setData([]); // Aucune donnée trouvée
                setTotalPages(1);
            }
        } catch (error) {
            console.error("Erreur API (doublons) :", error);
        }
        setLoadingCheck(false);
    };
    
   
    const handleCkeckPosition = async () => {
        const checkPosition = checkRef.current;
        const checkColorRef = checkColor.current;
        const newCheckState = !check;
        setCheck(newCheckState);
        setLoadingCheck(true);
    
        checkPosition.style.transition = "background 0.7s ease";
        checkColorRef.style.transition = "color 0.3s ease, transform 0.3s ease";
    
        if (newCheckState) {
            checkPosition.style.background = "#24D26D";
            checkColorRef.style.color = "black";
            checkColorRef.style.transform = "translateX(20px)";
            checkColorRef.style.background = "white";
    
            await fetchDuplicates(currentPage, debouncedSearch);
        } else {
            checkPosition.style.background = "rgba(0, 0, 0, 0.08)";
            checkColorRef.style.color = "white";
            checkColorRef.style.transform = "translateX(-1px)";
            checkColorRef.style.background = "white";
    
            await fetchData(currentPage, debouncedSearch);
        }
    
        setLoadingCheck(false);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);
    
    useEffect(() => {
        if (check) {
            fetchDuplicates(currentPage, debouncedSearch);
        } else {
            fetchData(currentPage, debouncedSearch);
        }
    }, [currentPage, check, debouncedSearch]);  
    
     
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // 🔄 Réinitialiser la recherche si l'input est vide
    useEffect(() => {
        if (searchQuery === "") {
            setCurrentPage(1);
            fetchData(1, ""); // Recharge la liste par défaut
        }
    }, [searchQuery]);
 
    
    
    
    
    /****fin de la logique du switch */

    const handleEdit = (index, field, value) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });

        setEditedData((prevEdited) => ({
            ...prevEdited,
            [index]: { ...prevEdited[index], [field]: value },
        }));
    };

    const handleSave = async () => {
        // if (Object.keys(editedData).length === 0) {
        //     alert("Aucune modification à sauvegarder.");
        //     return;
        // }
        console.log("data",data)

        
        const sendData = {
            data:data
        }
        console.log(sendData)
        try {
            setLoading(true)
            const response = await fetch(
                `https://www.backend.habla-mundo.com/api/v1/save_words`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(sendData),
                }
              
            );
            const result = await response.json();
            console.log("result",result);
            if(result.status === 200){
                snackbbar(document.querySelector("#body"), infos, "mise à jour effectuée", 2000);
                await fetchData(currentPage, debouncedSearch);
            }
            
        } catch (error) {
            console.log(error)
            
        }finally{
            setLoading(false)
        }
    };


    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Liste de mots" />
            </div>
            <div className="sous_parent_main_users_header_list">
                <div className="sous_parent_main_users_header_input_list">
                    <input type="text" className="input_users" placeholder="Rechercher un mot,une liste de mots ou une thématique" name="checkValue" value={searchQuery}
                        onChange={handleSearchChange} />
                    <div className="parent_search_users">
                        <img src={search} alt="" className="search_users" />
                    </div>
                </div>
                <div className="parent_circle_position" ref={checkRef}>
                    <span className="child_circle_position" onClick={handleCkeckPosition} ref={checkColor}></span>
                </div>
                <span>Doublons</span>
                {loading?<button className='saveButton'>En Cours ...</button>:<button className='saveButton' onClick={handleSave}>Sauvegarder</button>}
            </div>
            <div className='sous_parent_main_users_information-child1'>
                <span>Français</span>
                <span>Anglais</span>
                <span>Thématiques</span>
                <span>Mots croisés</span>
            </div>
            {data.length > 0 ? (
                    data.map((word, index) => (
                        <div key={index} className="sous_parent_main_users_information-child2">
                            {/* Editable: Mot Français */}
                            <div
                                className="user_adress_mail_list color_french"
                                contentEditable
                                // suppressContentEditableWarning={true}
                                onBlur={(e) => handleEdit(index, "text", e.target.innerText)}
                            >
                                {word.text}
                            </div>

                            {/* Editable: Mot Anglais */}
                            <div
                                className="user_adress_mail_list color_english"
                                contentEditable
                                // suppressContentEditableWarning={true}
                                onBlur={(e) => handleEdit(index, "traduction", e.target.innerText)}
                            >
                                {word.traduction}
                            </div>

                            {/* Non modifiables */}
                            <div className="user_adress_mail_list color_theme">{word.name}</div>
                            <div className="user_adress_mail_list color_crossword">{word.Crossword}</div>
                        </div>
                    ))
                ) : (
                    <p className="loading">Chargement des mots...</p>
                )}
           
            <div className="pagination">
                <span className="pagination_nbrs_pages">
                    {currentPage} / {totalPages} Pages
                </span>
                <div className="direction_icons">
                    {/* 🔹 Bouton page précédente */}
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="icons_pagination"
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    />

                    {/* 🔹 Numéros des pages */}
                    <div className="counter">
                        {generatePageNumbers().map((page, index) => (
                            <span
                                key={index}
                                className={currentPage === page ? "active_page" : "non_active"}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </span>
                        ))}
                    </div>

                    {/* 🔹 Bouton page suivante */}
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        className="icons_pagination"
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    />
                </div>
            </div>
        </div>
    )

};


