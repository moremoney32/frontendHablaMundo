import { useEffect, useState } from "react";
import { HeaderConversation } from "../../../repeatableComponents/atomes/header/HeaderConversation"
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../../../helpers/fetchData";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import infos from "../../../../assets/icons/infos.svg";
import { snackbbar } from "../../../../helpers/snackbars";
import { fetchDelete } from "../../../../helpers/fetchDelete";

export const MainMotsConversationsDetails = () => {
  const location = useLocation();
  const { id, name } = location.state || {};
  const [dataFrench,setDataFrench] = useState([])
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem("token")
  const navigate = useNavigate();



    const handlePost =  () => {
      const dataId ={
          conversation_id: id 
      }
      console.log(dataId)
     
      try {
        fetchData("conversation_show_sentences",dataId,token).then((response)=>{
          console.log(response)
          setDataFrench(response)
        })
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(()=>{
handlePost()
    },[])
    const handleInputFrench = (e, index) => {
  const newData = [...dataFrench];
  newData[index].phrase = e.target.innerText;
  setDataFrench(newData);
};
const handleSave =  () => {
  console.log(true)
  setLoading(true);
  try {
    
    const payload = {
      phrases: dataFrench.map(({ id, phrase,conversation_id }) => ({ id, phrase,conversation_id })),
    };
console.log(payload)
    fetchData("phrase/update",payload,token).then((response)=>{
      console.log(response)
      if(response.status === 200){
       return  snackbbar(document.querySelector('#body'), infos, 'Demande prise en compte', 3000);
      }
    })
  } catch (error) {
    console.error("Erreur de sauvegarde :", error);
  }finally{
    setLoading(false);
  }
  
};
const handleDelete = async (id) => {
  try {
    const response = await fetch("https://www.backend.habla-mundo.com/api/v1/delete_phrase", {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phrase_id: id })
    });
    console.log(response)
      if (response.ok) {
             setDataFrench(prev => prev.filter(item => item.id !== id));
             return    snackbbar(document.querySelector('#body'), infos, 'Demande prise en compte', 3000);
            }
   
  } catch (err) {
    console.error("Erreur suppression :", err);
  }
};

const handleAddPhrase = () => {
  if (dataFrench.length < 25) {
    setDataFrench(prev => [...prev, {phrase: "",conversation_id:id }]);
  }
};
const handleDeletes = () =>{
   const dataSend = {       
            conversation_id: id
        }
        console.log(dataSend)
  try {
    fetchDelete("conversation", dataSend, token).then((result) => {
             console.log(result)
            if (result.status === 200) {
                snackbbar(document.querySelector("#body"), infos, "demande prise en compte", 4000);
                
                navigate("/conversation")
            }
        })
    
    
  } catch (error) {
    
  }
}
 


  return (
    <div className="parent_main">
      <div className="parent_header_sous_thematiques">
        <HeaderConversation theme={name} removeSousTheme={handleDeletes}/>
      </div>
      <div className="sous_parent_main_croisés">
        <div className="sous_parent_main_croisés_left">
          <span className="title_words">Liste des phrases</span>
          <div className="sous_parent_main_croisés_left_21">
            <span className="title_language">Numéro</span>
            <span className="title_languageAnglais">Francais</span>
          </div>
           <div className="sous_parent_main_croisés_left_parent1">
            {dataFrench.map((word, index) => (
              <div className="sous_parent_main_croisés_left_3" key={word.id || index}>
                <span className="content_number">{index + 1}</span>
                <span
                  contentEditable
                  className="content_words"
                  onBlur={(e) => handleInputFrench(e, index)}
                >
                  {word.phrase}
                </span>
                <FontAwesomeIcon icon={faRemove} className="edit-edit"  onClick={() => handleDelete(word.id)}/>
              </div>
            ))}
          </div> 

        </div>
      </div>
     <div className="parent_button_save">
         <button 
  className={dataFrench?.length < 25 ? "btn-green" : "btn-gray"}
  disabled={dataFrench.length >= 25}
  onClick={handleAddPhrase}
        >+ Ajouter un mot</button>
        {loading ? <button className="save">En Cours ....</button> : <button className="save" onClick={handleSave}>Sauvegarder</button>}
      </div>  

    </div>
  )
}
