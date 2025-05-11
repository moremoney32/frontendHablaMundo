import { useEffect, useState } from "react";
import { HeaderConversation } from "../../../repeatableComponents/atomes/header/HeaderConversation"
import { useLocation } from "react-router-dom";

export const MainMotsConversationsDetails = () => {
  const location = useLocation();
  const { id, name } = location.state || {};
  const [dataFrench,setDataFrench] = useState([])
  const [loading,setLoading] = useState(false)
  const token = localStorage.getItem("token")




  //   const handleAddWord = () => {
  //     if (datas.positions.length < 25) {
  //       setDatas((prev) => {
  //         const newPositions = [...prev.positions, { name: "", traduction: "", id:  generateRandomId() }]; 
  //         return {
  //           ...prev,
  //           positions: newPositions,
  //         };
  //       });
  //       return console.log(datas)
  //     }
  //   };
  //   console.log(datas.positions)


    const handlePost = async () => {
      const dataId ={
          thematique_id: 18 
      }
     
      try {
        const response = await fetch("https://www.backend.habla-mundo.com/api/v1/historique_traductions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataId) 
        });
        console.log(response)
        const data = response.json()

        if (response.ok) {
          console.log(data)
         console.log(true)
        } 
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(()=>{
handlePost()
    },[])


  return (
    <div className="parent_main">
      <div className="parent_header_sous_thematiques">
        <HeaderConversation theme={name} />
      </div>
      <div className="sous_parent_main_croisés">
        <div className="sous_parent_main_croisés_left">
          <span className="title_words">Liste des phrases</span>
          <div className="sous_parent_main_croisés_left_1">
            <span className="title_language">Numéro</span>
            <span className="title_languageAnglais">Francais</span>
            {/* <span className="title_languageFrancais">Anglais</span> */}
          </div>
          {/* <div className="sous_parent_main_croisés_left_parent">
            {data.map((word, index) => (
              <div className="sous_parent_main_croisés_left_2" key={word.id || index}>
                <span className="content_number">{index + 1}</span>
                <span
                  contentEditable
                  className="content_words"
                  onBlur={(e) => handleInputFrench(e, index)}
                >
                  {word.name}
                </span>
                <FontAwesomeIcon icon={faRemove} className="edit-edit" onClick={() => onDeleteWord(index)} />
              </div>
            ))}
          </div> */}

        </div>
      </div>
     <div className="parent_button_save">
        <button    className={dataFrench?.length < 25 ? "btn-green" : "btn-gray"}
        >+ Ajouter un mot</button>
        {loading ? <button className="save">En Cours ....</button> : <button className="save" >Sauvegarder</button>}
      </div>  

    </div>
  )
}
