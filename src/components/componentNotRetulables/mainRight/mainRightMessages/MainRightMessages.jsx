
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain";
import "./mainRightMessages.css";
import message from "../../../../assets/icons/message.png";
import next from "../../../../assets/icons/next.png";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gras from "../../../../assets/icons/gras.png";
import italique from "../../../../assets/icons/italique.png";
import link from "../../../../assets/icons/link.png";
import underline from "../../../../assets/icons/underline.png";
import list from "../../../../assets/icons/list.png";
import upload from "../../../../assets/icons/upload.png";
import police from "../../../../assets/icons/police.png";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { useForm } from 'react-hook-form';
import { fetchData } from "../../../../helpers/fetchData";
import { snackbbar } from "../../../../helpers/snackbars";
import { fetchDataGetToken } from "../../../../helpers/fetchDataGetToken";
import { formatTime } from "../../../../helpers/formatDate";
import { useNotifications } from "../NotificationsProvider";
import infos from "../../../../assets/icons/infos.svg";
import remove from "../../../../assets/icons/remove.png";
import { fetchDelete } from "../../../../helpers/fetchDelete";

export const MainRightMessages = () => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [etat, setEtat] = useState(false);
    const [etatNotify, setEtatNotify] = useState(false);
    const [activeStates, setActiveStates] = useState({});
    const [content, setContent] = useState(null);
    const [messageText, setMessageText] = useState(null);
    const [textName, setTextName] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const [id, setId] = useState(null);
    const [idMessages, setIdMessages] = useState(null);
    const [fichiers, setFichier] = useState(null);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [firstIndexComments, setFirstIndexComments] = useState(0);
    const [lastIndexComments, setLastIndexComments] = useState(8);
    const containUseref = useRef(null)
    const notificationsHeader = useNotifications();
    let message1 = "Demande prise en compte";
    let message2 = "Demande non prise en compte";



    useEffect(() => {
        fetchDataGetToken('https://www.backend.habla-mundo.com/api/v1/notifications', token).then((response) => {
            //console.log(response)
            const compareDate = response.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            setData(compareDate)
        })
        localStorage.removeItem('notificationsNews');
    }, [notificationsHeader]);



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


    const handleClick = (id, messageValue, name, fichiers, email, idMessages) => {
        setId(id)
        setEmail(email)
        setIdMessages(idMessages)
        setEtat(true);
        setMessageText(messageValue);
        setTextName(name);
        setFichier(fichiers)
        const dataSend = {
            id: idMessages
        }
        fetchData("https://www.backend.habla-mundo.com/api/v1/notifications/read", dataSend, token).then((response) => {
            if (response.message === "Notification marked as read") {
                console.log(true)
                setActiveStates((prevState) => ({
                    ...prevState,
                    [idMessages]: true,
                }));
            }
        })
    };

    const close = () => {
        setEtat(false);
    };
    const closeNotify = () => {
        setEtatNotify(false);
    };
    const onSubmit = async (data) => {
        const htmlContent = textareaRef.current.innerHTML;
        if (htmlContent.length === 0) {
            return snackbbar(document.querySelector("#body"), infos, message2, 2000);
        }

        const dataSend = {
            user_id: id,
            message: htmlContent
        }
        setLoading(true)
        try {
            const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/send-message", dataSend, token)
            if (result.message === "Notification sent successfully.") {
                snackbbar(document.querySelector("#body"), infos, message1, 2000);
                reset();
                setContent('');
                textareaRef.current.innerHTML = '';
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setEtat(false)
        }

    }
    const onSubmitData = async (data) => {
        const htmlContent = textareaRef.current.innerHTML;
        if (htmlContent.length === 0) {
            return snackbbar(document.querySelector("#body"), infos, message2, 2000);
        }

        const dataSend = {
            // user_id: id,
            message: htmlContent
        }
        setLoading(true)
        try {
            const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/send-notification-message", dataSend, token)
            console.log(result)
            if (result.success === "Jobs created successfully!") {
                snackbbar(document.querySelector("#body"), infos, message1, 2000);
                reset();
                setContent('');
                textareaRef.current.innerHTML = '';
                setEtatNotify(false);
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setEtat(false)
        }

    }
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();/*cree une instance pour lire les fichiers*/
            reader.onload = (e) => {
                const fileContent = e.target.result;
                if (textareaRef.current) {
                    const div = document.createElement('div');
                    div.innerHTML = `<a href="${fileContent}" target="_blank">${file.name}</a>`;
                    textareaRef.current.appendChild(div);
                }
            };
            reader.readAsDataURL(file);

        }
    };
    /****intersection observer messages */
    useEffect(() => {
        if (containUseref.current && lastIndexComments < data?.length) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLastIndexComments((prevIndex) => {
                            // je charge 8 éléments
                            const nextIndex = prevIndex + 8;
                            if (nextIndex <= data?.length) {
                                return nextIndex;
                            } else {
                                return data?.length; //  max d'éléments restants
                            }
                        });
                    }
                });
            }, {
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            });

            observer.observe(containUseref.current);

            return () => {
                if (containUseref.current) {
                    observer.unobserve(containUseref.current);
                }
            };
        }
    }, [containUseref.current, lastIndexComments, data?.length]);
    //fin intersection
    const handleRemove = (dataId) => {
        console.log(dataId);
        const data = {
            id: [dataId]
        }
        console.log(data)
        fetchDelete("https://www.backend.habla-mundo.com/api/v1/notifications", data, token).then((response) => {
            console.log(response)
            if (response.status === "200") {
                snackbbar(document.querySelector("#body"), infos, message1, 2000);
                setTimeout(() => {
                    fetchDataGetToken('https://www.backend.habla-mundo.com/api/v1/notifications', token).then((response) => {
                        //console.log(response)
                        const compareDate = response.sort((a, b) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateB - dateA;
                        });
                        setData(compareDate)
                    })

                }, 2000);
            }
        })
    }
    const handleCheckboxChange = (id) => {
        setSelectedMessages(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(messageId => messageId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedMessages?.length === data.length) {
            setSelectedMessages([]);
        }
        else {
            setSelectedMessages(data.map(info => info.id));
        }
    };
    const handleDeleteSelected = () => {
        const data = {
            id: selectedMessages
        }
        console.log(data)
        console.log(selectedMessages)
        fetchDelete("https://www.backend.habla-mundo.com/api/v1/notifications", data, token).then((response) => {
            console.log(response)
            if (response.status === "200") {
                snackbbar(document.querySelector("#body"), infos, message1, 2000);
                setTimeout(() => {
                    fetchDataGetToken('https://www.backend.habla-mundo.com/api/v1/notifications', token).then((response) => {
                        const compareDate = response.sort((a, b) => {
                            const dateA = new Date(a.created_at);
                            const dateB = new Date(b.created_at);
                            return dateB - dateA;
                        });
                        setData(compareDate)
                    })

                }, 2000);
            }
        })
    };
    console.log(selectedMessages)
    const checkNotification = () => {
        setEtatNotify(true)
    }

    return (
        <div className="parent_main">
            <div className="justifyContent">
                <HeaderTitleMain h1="Messages" />
                <button className="buttonSelectNotification" onClick={checkNotification}>
                    Envoyer les notifications
                </button>
                {selectedMessages.length === 0 ? <button disabled={selectedMessages.length === 0} className="buttonSelectNone">
                    Supprimer les messages sélectionnés
                </button> : <button onClick={handleDeleteSelected} className="buttonSelect">
                    Supprimer les messages sélectionnés
                </button>}
            </div>
            {etatNotify && <div id="masque"></div>}
            {etatNotify && <div id="answer_client">
                <div className="parentHeaderNotify">
                    <p className="answer_client_name_notify">Notification</p>
                    <FontAwesomeIcon icon={faClose} className="closeNotify" onClick={closeNotify} />
                </div>
                <form className="answer_form" onSubmit={handleSubmit(onSubmitData)}>
                    <div className="answer_mail_description">
                        {/* <label htmlFor="reponse">Réponse</label> */}
                        <div className="objet_mail">
                            <span className="objet">Message</span>
                            <span className="objet_mail_chil1">A:<span className="objet_mail_chil2">Tous</span></span>
                        </div>
                        <div className="answer_mail_sous_description">
                            <div className="answer_mail_sous_description_img">
                                <img src={gras} alt="" className="img_answer_profession" onClick={grasText} />
                                <img src={underline} alt="" className="img_answer_profession" onClick={underlineText} />
                                <img src={italique} alt="" className="img_answer_profession" onClick={italiqueText} />
                                <img src={police} alt="" className="img_answer_profession" onClick={() => changeFontSize(4)} />
                                <img src={link} alt="" className="img_answer_profession links" onClick={linkText} />
                                <img src={list} alt="" className="img_answer_profession lists" onClick={listText} />
                                <img src={upload} alt="" className="img_answer_profession upload" onClick={handleUploadClick} />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div
                                className="textarea_answer"
                                contentEditable="true"
                                placeholder="Entrez un message"
                                ref={textareaRef}
                            ></div>
                            <input type="hidden" name="reponse" value={content} />
                        </div>
                    </div>
                    {loading ? <button className="send_mail">En cours ...</button> : <button className="send_mail" type="submit">Envoyer</button>}
                </form>
            </div>}
            <div className="sous_parent_main_messages">
                {etat && <div id="masque"></div>}
                {etat && <div id="answer_client">
                    <FontAwesomeIcon icon={faClose} className="close" onClick={close} />
                    <p>Message de:<span className="answer_client_name">{textName}</span></p>
                    <span className="answer_client_messages">{messageText}</span>
                    {
                        fichiers?.map((fichier) => {
                            const Pdf = fichier.endsWith('.pdf');
                            return (
                                <div className="answer_client_file">
                                    {Pdf ? (
                                        <a href={fichier} target="_blank" rel="noopener noreferrer">Télécharger ou ouvrir le PDF</a>
                                    ) : (
                                        <img src={fichier} alt="" className="answer_client_file_img" />
                                    )}
                                </div>
                            );
                        })
                    }
                    <form className="answer_form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="objet_mail">
                            <span className="objet">Objet</span>
                            <span className="objet_mail_chil1">A:<span className="objet_mail_chil2">{email}</span></span>
                        </div>
                        <input type="text" name="objet" className="answer_email_input" placeholder="Entrer l'objet du message" {...register("objet", { required: "Veuillez entrer une question" })} />
                        {errors.objet && <span className="error">{errors.objet.message}</span>}
                        <div className="answer_mail_description">
                            <label htmlFor="reponse">Réponse</label>
                            <div className="answer_mail_sous_description">
                                <div className="answer_mail_sous_description_img">
                                    <img src={gras} alt="" className="img_answer_profession" onClick={grasText} />
                                    <img src={underline} alt="" className="img_answer_profession" onClick={underlineText} />
                                    <img src={italique} alt="" className="img_answer_profession" onClick={italiqueText} />
                                    <img src={police} alt="" className="img_answer_profession" onClick={() => changeFontSize(4)} />
                                    <img src={link} alt="" className="img_answer_profession links" onClick={linkText} />
                                    <img src={list} alt="" className="img_answer_profession lists" onClick={listText} />
                                    <img src={upload} alt="" className="img_answer_profession upload" onClick={handleUploadClick} />
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div
                                    className="textarea_answer"
                                    contentEditable="true"
                                    placeholder="Entrez un message"
                                    ref={textareaRef}
                                ></div>
                                <input type="hidden" name="reponse" value={content} />
                            </div>
                        </div>
                        {loading ? <button className="send_mail">En cours ...</button> : <button className="send_mail" type="submit">Envoyer par mail</button>}
                    </form>
                </div>}
                <div>
                    <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedMessages?.length === data.length}
                    />
                    <span>Tout sélectionner</span>
                </div>

                {
                        data?.slice().reverse().slice(firstIndexComments, lastIndexComments).map((info, index) => {
                    // data?.reverse().slice(firstIndexComments, lastIndexComments).map((info, index) => {
                        const isActive = activeStates[info.id] || info.read_at !== null;
                        const isSelected = selectedMessages?.includes(info.id);
                        console.log(isSelected)
                        return (
                            <div className={`parent_messages ${isActive ? 'active_message' : ''}`} key={index}>

                                <div className="parent_messages1">
                                    <img src={message} alt="message" className="message" onClick={() => handleClick(info.notifiable_id, info.data.body, info.username, info.data.fichier, info.email, info.id)} />
                                    <div className="infos_messages">
                                        <span className="infos_messages_child1">{info.username}</span>
                                        <span className="infos_messages_child2">{info.data.body}</span>
                                    </div>
                                </div>
                                <span className="parent_messages2">{formatTime(info.created_at)}</span>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleCheckboxChange(info.id)}
                                />
                                <img src={remove} alt="remove" className="remove_words_words" onClick={() => handleRemove(info.id)} />
                            </div>
                        );
                    })
                }
                {lastIndexComments < data?.length && (
                    <div className="observation" ref={containUseref}>chargement.......</div>
                )}
            </div>
        </div>
    );
};
