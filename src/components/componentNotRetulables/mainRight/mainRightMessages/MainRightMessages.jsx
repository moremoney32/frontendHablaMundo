
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

export const MainRightMessages = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [etat, setEtat] = useState(false);
    const [activeStates, setActiveStates] = useState({});
    const [content, setContent] = useState(null);
    const [messageText, setMessageText] = useState(null);
    const [textName, setTextName] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Charger les états actifs depuis le localStorage
        const savedActiveStates = JSON.parse(localStorage.getItem('activeStates')) || {};
        setActiveStates(savedActiveStates);
    }, []);

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

    const data = [{
        name: "gaelle tamho",
        message: "Insère un élément au point d'insertion en supprimant la sélection. Une chaîne de caractère",
        time: " A l'instant",
        id: "1"
    }, {
        name: "tamho",
        message: " élément au point d'insertion en supprimant la sélection.Une chaîne de caractère",
        time: "A l'instant",
        id: "2"
    }, {
        name: "franck",
        message: " point d'insertion en supprimant la sélection.Une chaîne de caractère",
        time: "11h30s",
        id: "3"
    }, {
        name: "julie",
        message: "Insère un élément au point d'insertion en supprimant la sélection.Une chaîne de caractère",
        time: "00h34s",
        id: "4"
    }, {
        name: "regis",
        message: "Insère un élément au point d'insertion en supprimant la sélection.Une chaîne de caractère",
        time: "A l'instant",
        id: "5"
    }];

    const handleClick = (id, messageValue, name) => {
        setActiveStates(prevState => {
            const newState = { ...prevState, [id]: true };
            localStorage.setItem('activeStates', JSON.stringify(newState));
            return newState;
        });
        setEtat(true);
        setMessageText(messageValue);
        setTextName(name);
    };

    const close = () => {
        setEtat(false);
    };
    const onSubmit = (data) => {
        console.log(data)
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
    

    return (
        <div className="parent_main">
            <div>
                <HeaderTitleMain h1="Messages" />
            </div>
            <div className="sous_parent_main_messages">
                {etat && <div id="masque"></div>}
                {etat && <div id="answer_client">
                    <FontAwesomeIcon icon={faClose} className="close" onClick={close} />
                    <p>Message de:<span className="answer_client_name">{textName}</span></p>
                    <span className="answer_client_messages">{messageText}</span>
                    <div className="answer_client_img">
                        <img src="" alt="pdf" />
                        <img src="" alt="pdf" />
                        <img src="" alt="docs" />
                    </div>
                    <form className="answer_form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="objet_mail">
                            <span className="objet">Objet</span>
                            <span className="objet_mail_chil1">A:<span className="objet_mail_chil2">jugalux111@gmail.com</span></span>
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
                                    <img src={police} alt="" className="img_answer_profession" onClick={() =>changeFontSize(4)} />
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
                                <input type="hidden" name="reponse" value={content} {...register("reponse")} />
                            </div>
                        </div>
                        <button className="send_mail" type="submit">Envoyer par mail</button>
                    </form>
                </div>}
                {
                    data.map((info) => {
                        return (
                            <div className={`parent_messages ${activeStates[info.id] ? 'active_message' : ''}`} key={info.id}>
                                <div className="parent_messages1">
                                    <img src={message} alt="message" className="message" />
                                    <div className="infos_messages">
                                        <span className="infos_messages_child1">{info.name}</span>
                                        <span className="infos_messages_child2">{info.message}</span>
                                    </div>
                                </div>
                                <span className="parent_messages2">{info.time}</span>
                                <div className="parent_messages3" onClick={() => handleClick(info.id, info.message, info.name)}>
                                    <span className="repondre">Répondre</span>
                                    <img src={next} alt="next" className="next" />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
