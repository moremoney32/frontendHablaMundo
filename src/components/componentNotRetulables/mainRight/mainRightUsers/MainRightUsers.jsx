
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain";
import search from "../../../../assets/icons/search.png";
import message from "../../../../assets/icons/message.png";
import messageOutlined from "../../../../assets/icons/messageOutlined.png";
import gras from "../../../../assets/icons/gras.png";
import italique from "../../../../assets/icons/italique.png";
import link from "../../../../assets/icons/link.png";
import underline from "../../../../assets/icons/underline.png";
import list from "../../../../assets/icons/list.png";
import upload from "../../../../assets/icons/upload.png";
import police from "../../../../assets/icons/police.png";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { useLocation } from "react-router-dom"
import { useForm } from "react-hook-form";
import "./mainRightUsers.css";
import "../mainRightMessages/mainRightMessages.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSearchInformation } from "../../../../customsHooks/useSearchInformation";
import { Select } from "../../select/Select";
import { fetchDataGetToken } from "../../../../helpers/fetchDataGetToken";
import { formatTime } from "../../../../helpers/formatDate";
import { searchAbonnes } from "../../../../helpers/searchAbonnes";
import { fetchData } from "../../../../helpers/fetchData";
import { snackbbar } from "../../../../helpers/snackbars";

export const MainRightUsers = () => {
    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = useForm();
    const dataSelectStatus = ["Tous", "Abonné", "Non abonné"]
    const [currentPage, setCurrentPage] = useState(1);
    const [etatValue, setEtatValue] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [searchResults, searchElementUser] = useSearchInformation(dataUser);
    const [name, setName] = useState(false);
    const [mail, setMail] = useState(false);
    const [id, setId] = useState(null);
    const [etatMasque, setEtatMasque] = useState(false);
    const [level, setLevel] = useState(true);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionName, setOptionName] = useState("Tous");
    const [rotateIcon, setRotateIcon] = useState(false);
    const selectRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const token = localStorage.getItem("token")
    const itemsPages = 10;
    const totalPages = Math.ceil(dataUser?.length / itemsPages);
    const message1 = "veuillez envoyer un contenu"
    const handleClick = (id, name, email) => {
        setEtatMasque(true);
        setName(name);
        setMail(email);
        setId(id)
    };
    const handleChangePages = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }
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
        document.execCommand('createLink', false, null);
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

    useEffect(() =>{
        fetchDataGetToken("https://www.backend.habla-mundo.com/api/v1/users",token).then((result) =>{
            setDataUser(result)
            localStorage.setItem('dataUser', JSON.stringify(result));
        }).catch((error)=>{
            console.log(error)
        })
},[])
    const close = () => {
        setEtatMasque(false);
    };
    const onSubmit =async (data) => {
        console.log(data)
        const htmlContent = textareaRef.current.innerHTML;
        if(htmlContent.length === 0){
            return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", message1, 4000)
        }
    
    const dataSend ={
        user_id:id,
        message:htmlContent
    }
    console.log(dataSend)
    setLoading(true)
    try{
       const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/send-message",dataSend,token)
            if(result.message === "Notification sent successfully."){
                return snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", result.message, 2000)
            }
       

    }catch(error){
        console.log(error)
    }finally{
        setLoading(false)
        setEtatMasque(false)
    }
    }
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
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
            // console.log(selectRef.current.classList.toggle("bottomRaduisNone"))
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    let status;
    const handleChildClick = (value) => {
        const dataUserLocal = JSON.parse(localStorage.getItem('dataUser'));
        if (value === "Non abonné") {
            status = value
            status = 0
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
            setLevel(true)
            setEtatValue(false)
            searchAbonnes(dataUserLocal,status).then((result)=>{
                setDataUser(result)
            })
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
         if (value === "Abonné") {
            status = value
            status = 1
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
             setLevel(true)
            setEtatValue(false)
            searchAbonnes(dataUserLocal,status).then((result)=>{
                setDataUser(result)
            })
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
        }
        if (value === "Tous") {
            const select = selectRef.current
            setOptionName(value);
            setOptionVisible(false);
            setRotateIcon(!rotateIcon);
             setLevel(true)
             setEtatValue(false)
            setDataUser(dataUserLocal)
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
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
    
    useEffect(() => {   
        if (location.state?.filter) {
            handleChildClick(location.state?.filter);
        }
    }, [location.state]);
    const startIndex = (currentPage - 1) * itemsPages
    const dataCurrent = dataUser?.slice(startIndex, startIndex + itemsPages)
  
    return (
        <div className="parent_main">
            <div>
                <HeaderTitleMain h1="Utilisateurs" />
            </div>
            <div className="sous_parent_main_users">
                {etatMasque && <div id="masque"></div>}
                {etatMasque && <div id="answer_client">
                    <FontAwesomeIcon icon={faClose} className="close" onClick={close} />
                    <p>Message A:<span className="answer_client_name">{name}</span></p>
                    <form className="answer_form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="objet_mail">
                            <span className="objet">Objet</span>
                            <span className="objet_mail_chil1">A:<span className="objet_mail_chil2">{mail}</span></span>
                        </div>
                        <input type="text" name="objet" className="answer_email_input" placeholder="Entrer l'objet du message" {...register("objet", { required: "Veuillez entrer l'objet du message" })} />
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
                                        onChange={handleFileChange} />
                                </div>
                                <div
                                    className="textarea_answer"
                                    contentEditable="true"
                                    placeholder="Entrez un message"
                                    ref={textareaRef}></div>
                                <input type="hidden" name="text" value={content}/>
                            </div>
                        </div>
                        {loading?<button className="send_mail">En cours ...</button>:<button className="send_mail" type="submit">Envoyer par mail</button>}
                    </form>
                </div>}
                <div className="sous_parent_main_users_header">
                    <div className="sous_parent_main_users_header_input">
                        <input type="text" className="input_users" placeholder="Rechercher un utilisateur" name="checkValue" onChange={(e) => {
                            setLevel(false);
                            setEtatValue(true)
                             searchElementUser(e.target.value);
                            //  handleChangePages(currentPage + 1) a regler
                            if (e.target.value.length === 0) {
                                setLevel(true);
                                setEtatValue(false)
                            }
                            register("checkValue").onChange(e); // Access onChange from register
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
                        defautClassName="select" />
                </div>
                <div className="sous_parent_main_users_information">
                    <div className="sous_parent_main_users_information-child1">
                        <span>Prénom</span>
                        <span>Adresse mail</span>
                        <span>Date d'inscription</span>
                        <span>Status</span>
                        {/* <span>Action</span> */}
                    </div>
                    {level && dataCurrent.reverse().slice()?.map((data) => {
                        return (
                            <div className="sous_parent_main_users_information-child2" key={data.id}>
                                <div className="prenom">
                                    {/* <img src={message} alt="message" onClick={() => handleClick(data.id, data.first_name, data.email)}/> */}
                                    <span>{data.first_name}</span>
                                </div>
                                <div className="user_adress_mail">{data.email}</div>
                                <div className="user_inscription">{formatTime(data.created_at)}</div>
                                 <div className={`status ${data.suscribe === "0" ? "Non abonné" : "Abonné"}`}>
                {data.suscribe === "1" ? "Abonné" : "Non abonné"}
            </div>
                                {/* <div>
                                    <div className="action" onClick={() => handleClick(data.id, data.first_name, data.email)}>
                                        <img src={messageOutlined} alt="message_outlined" />
                                        <span>Message</span>
                                    </div>

                                </div> */}
                               
                            </div>

                        )
                    })}

                     {etatValue && searchResults.reverse().slice()?.map((data) => {
                        return (
                            <div className="sous_parent_main_users_information-child2" key={data.id}>
                                <div className="prenom">
                                    {/* <img src={message} alt="message" /> */}
                                    <span>{data.first_name}</span>
                                </div>
                                <div className="user_adress_mail">{data.email}</div>
                                <div className="user_inscription">{formatTime(data.created_at)}</div>
                                 <div className={`status ${data.suscribe === "0" ? "Non abonné" : "Abonné"}`}>
                {data.suscribe === "1" ? "Abonné" : "Non abonné"}
            </div>
                                {/* <div>
                                    <div className="action" onClick={() => handleClick(data.id, data.first_name, data.email)}>
                                        <img src={messageOutlined} alt="message_outlined" />
                                        <span>Message</span>
                                    </div>

                                </div> */}
                               
                            </div>

                        )
                    })}
                </div>
                <div className="pagination">
                    {level ? <span className="pagination_nbrs_pages">{dataCurrent?.length}/{dataUser?.length} Utilisateurs</span> : <span className="pagination_nbrs_pages">{searchResults.length}/{dataUser.length} Utilisateurs</span>}
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
            </div>
        </div>
    );
};

