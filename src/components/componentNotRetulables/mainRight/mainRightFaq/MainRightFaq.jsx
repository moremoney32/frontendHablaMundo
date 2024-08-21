
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain";
import "./mainRightFaq.css";
import remove from "../../../../assets/icons/remove.png";
import gras from "../../../../assets/icons/gras.png";
import italique from "../../../../assets/icons/italique.png";
import link from "../../../../assets/icons/link.png";
import underline from "../../../../assets/icons/underline.png";
import list from "../../../../assets/icons/list.png";
import police from "../../../../assets/icons/police.png";
import upload from "../../../../assets/icons/upload.png";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchData } from '../../../../helpers/fetchData';
import { fetchDataGet } from '../../../../helpers/fetchDataGet';

export const MainRightFaq = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const textareaRef = useRef(null);
  const [content, setContent] = useState(null);
  const [datas, setDatas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  // const [fileLink, setFileLink] = useState('');

  useEffect(()=>{
    fetchDataGet("https://www.backend.habla-mundo.com/api/v1/faq").then((response)=>{
      setDatas(response)
    })

  },[])
  const onSubmit = (data) => {
    const htmlContent = textareaRef.current.innerHTML;
    data.reponse = htmlContent;
    console.log(data)
    fetchData("https://www.backend.habla-mundo.com/api/v1/faq",data).then((result)=>{
      console.log(result)
      if(result.success === "FAP as created"){
        fetchDataGet("https://www.backend.habla-mundo.com/api/v1/faq").then((response)=>{
          setDatas(response)
        })
        
      }
    })
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

  useEffect(() => {
    const storedData = localStorage.getItem("datasTextarea");
    if (storedData) {
      setDatas(JSON.parse(storedData));
    }
  }, []);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleRemoveQuestion = async (id) => {
    const url = `https://www.backend.habla-mundo.com/api/v1/faq/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        if(result.success === "successful delete"){
          const newData = datas.filter((data) => data.id !== id);
          setDatas(newData);

        }
    } catch (error) {
        console.error('error delete:', error);
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
};

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//           const fileContent = e.target.result;
//           setFileLink({ name: file.name, url: fileContent });
//       };
//       reader.readAsDataURL(file);
//   }
// };

// useEffect(() => {
//   if (fileLink.url && textareaRef.current) {
//       const linkElement = `<a href="${fileLink.url}" target="_blank" rel="noopener noreferrer">${fileLink.name}</a>`;
//       textareaRef.current.innerHTML += linkElement;
//   }
// }, [fileLink]);
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file){
      const reader = new FileReader();
      reader.onload = (e) => {
          const fileContent = e.target.result;
          if (textareaRef.current){
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
      <div>
        <HeaderTitleMain h1="FAQ" />
      </div>
      <div className="sous_parent_main_faq">
        <form className="sous_parent_main_faq_left" onSubmit={handleSubmit(onSubmit)}>
          <div className="question">
            <label htmlFor="question">Question</label>
            <input type="text" name="question" placeholder="Ajouter un titre" {...register("question", { required: "Veuillez entrer une question" })} />
            {errors.question && <span className="error">{errors.question.message}</span>}
          </div>
          <div className="description">
            <label htmlFor="reponse">Réponse</label>
            <div className="sous_description">
              <div className="sous_description_img">
                <img src={gras} alt="" className="img_profession" onClick={grasText} />
                <img src={underline} alt="" className="img_profession" onClick={underlineText} />
                <img src={italique} alt="" className="img_profession" onClick={italiqueText} />
                <img src={police} alt="" className="img_profession" onClick={() =>changeFontSize(4)} />
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
                placeholder="Entrez un message"
                ref={textareaRef}
              ></div>
              <input type="hidden" name="reponse" value={content} {...register("reponse", { required: "Veuillez entrer un message" })} />
            </div>
            {errors.reponse && <span className="error">{errors.reponse.message}</span>}
          </div>
          <button type="submit" className='button_description'>Sauvegarder</button>
        </form>
        <div className="sous_parent_main_faq_right">
          {/* {datas.length >= 1 && ( */}
            <div className="parent_description_question">
              {datas?.slice().reverse().map((info) => (
                <div key={info.id}>
                  <div className={`description_question ${openIndex === info.id ? "active" : ""}`}
                    onClick={() => toggleOpen(info.id)}>
                    <span className={`description_question_span ${openIndex === info.id ? "colorActive" : ""}`}>{info.question}</span>
                    <FontAwesomeIcon icon={faAngleDown} className={openIndex === info.id ? "icons_active" : "icons_inactive"} />
                  </div>
                  {openIndex === info.id && (
                    <div className="description_answer">
                      <p dangerouslySetInnerHTML={{__html: info.reponse}}/>
                      <img src={remove} alt="" className='remove' onClick={() => handleRemoveQuestion(info.id)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
