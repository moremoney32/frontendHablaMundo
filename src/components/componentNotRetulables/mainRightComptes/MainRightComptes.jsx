import "./mainRightComptes.css"
import edit from "../../../assets/icons/edit.png"
import { useEffect, useState, useRef } from "react"
import { useForm } from 'react-hook-form';
import { fetchDataGetToken } from "../../../helpers/fetchDataGetToken"
import gras from "../../../assets/icons/gras.png";
import italique from "../../../assets/icons/italique.png";
import link from "../../../assets/icons/link.png";
import underline from "../../../assets/icons/underline.png";
import list from "../../../assets/icons/list.png";
import police from "../../../assets/icons/police.png";
import upload from "../../../assets/icons/upload.png";
import { fetchData } from '../../../helpers/fetchData';
import { snackbbar } from '../../../helpers/snackbars';
import infos from "../../../assets/icons/infos.svg";

export const MainRightComptes = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState("");
    const [loadingPolitique, setLoadingPolitique] = useState(false);
    const [loadingTermes, setLoadingTermes] = useState(false);
    const textareaRef = useRef(null);
    const [isEditable, setIsEditable] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [content, setContent] = useState({ politique: "", termes: "" });
    const politiqueRef = useRef(null);
    const termesRef = useRef(null);
    const fileInputRef = useRef(null);

    let message1 = "Demande prise en compte"
    useEffect(() => {
        fetchDataGetToken("user", token).then((result) => {
            console.log(result)
            setData(result)
        })
        fetch("https://www.backend.habla-mundo.com/api/v1/politiques")
            .then(response => response.json())
            .then(result => {
                const politique = result.find(item => item.title === "POLITIQUE")?.content || "";
                const termes = result.find(item => item.title === "TERMES")?.content || "";
                setContent({ politique, termes });

                if (politiqueRef.current) politiqueRef.current.innerHTML = politique;
                if (termesRef.current) termesRef.current.innerHTML = termes;
            })
            .catch(error => console.error("Erreur de chargement des données:", error));
    }, [])

    const handleInput = (type) => {
        setContent((prevContent) => ({
            ...prevContent,
            [type]: type === "politique" ? politiqueRef.current.innerHTML : termesRef.current.innerHTML,
        }));
    };
    const handleSave = async (type) => {
        const isPolitique = type === "politique";

        isPolitique ? setLoadingPolitique(true) : setLoadingTermes(true);

        const dataToSend = {
            title: isPolitique ? "POLITIQUE" : "TERMES",
            content: content[type],
        };

        try {
            const response = await fetch("https://www.backend.habla-mundo.com/api/v1/politiques-add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            console.log(response)

            if (response.ok) {
                const result = response.json()
                console.log(result)
                // alert("Données sauvegardées avec succès !");
                return snackbbar(document.querySelector("#body"), infos, "Demande prise en compte", 2000)
            } else {
                alert("Erreur lors de la sauvegarde.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur est survenue.");
        } finally {
            // Désactiver le bon loader
            isPolitique ? setLoadingPolitique(false) : setLoadingTermes(false);
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


    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }
    const handleEditable = () => {
        if (isEditable) {
            fetchData("update/users/admin", data, token).then((response) => {
                if (response.message === "update successful") {
                    return snackbbar(document.querySelector("#body"), infos, message1, 2000)
                }
            })
        }
        setIsEditable(!isEditable);
    }
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


    return (
        <div className="parent_main">
            <div className="sous_parent_main_comptes">
                <div className="sous_parent_main2">
                    <div className="sous_parent_main2_header">
                        <span className="info">Informations personnelles</span>
                        {!isEditable ? <div className="update_info_user" onClick={handleEditable}>
                            {/* <img src={edit} alt="edit" /> */}
                            <span>Modifier</span>
                        </div> : <div className="update_info_user" onClick={handleEditable}>
                            {/* <img src={edit} alt="edit" /> */}
                            <span>Enregistrer</span>
                        </div>}
                    </div>
                    <div className="sous_parent_main2_main">
                        <div className="space_infos">
                            <label htmlFor="last_name">Nom</label>
                            <input type="text" name="last_name" value={data.last_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="first_name">Prenom</label>
                            <input type="text" name="first_name" value={data.first_name} onChange={handleChange} disabled={!isEditable} />
                        </div>
                        <div className="space_infos">
                            <label htmlFor="email">Adresse mail</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} disabled={!isEditable} />
                        </div>
                    </div>
                </div>
                <p className="mentions">Mentions légales</p>
                <div className="sous_parent_main3">
                    <div className="parent_confidentialite">
                        {/* <a href="#" className="link_a">Thèmes et conditions d'utilisation</a> */}
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
                                {/* <div className="edit_textarea">
                                    <img src={edit} alt="edit" />
                                    <span>modifier</span>
                                </div> */}
                            </div>

                            <div
                                className="textarea"
                                contentEditable="true"
                                placeholder="Entrez un texte ici"
                                // ref={textareaRef}
                                ref={termesRef}
                                onInput={() => handleInput("termes")}
                            ></div>
                            <input type="hidden" name="reponse" value={content} />
                        </div>
                        <button
                            className="save_button_confidentialite"
                            onClick={() => handleSave("termes")}
                            disabled={loadingTermes}
                        >
                            {loadingTermes ? <span className="spinner"></span> : "Sauvegarder"}
                        </button>

                    </div>
                    <div className="parent_confidentialite">
                        {/* <a href="#" className="link_a">Politique de confidentialité</a> */}
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
                                placeholder="Entrez un texte ici"
                                // ref={textareaRef}
                                ref={politiqueRef}
                                onInput={() => handleInput("politique")}
                            ></div>
                            <input type="hidden" name="reponse" value={content} />
                        </div>
                        <button
                            className="save_button_confidentialite"
                            onClick={() => handleSave("politique")}
                            disabled={loadingPolitique}
                        >
                            {loadingPolitique ? <span className="spinner"></span> : "Sauvegarder"}
                        </button>
                    </div>


                </div>
            </div>
        </div>
    )
}