import { useState } from "react";
import { HeaderMotsCroisés } from "../../../repeatableComponents/atomes/header/HeaderMotsCroisés";
import { Grid } from "./Grid";
import "./mainMotsCroisés.css";
import WordList from "./WorldList";
import { generateCrossword } from "./generateCoordonnées";
import WordListReste from "./WorListReste";
import { fetchData } from "../../../../helpers/fetchData";
import { snackbbar } from "../../../../helpers/snackbars";
import infos from "../../../../assets/icons/infos.svg";
export const MainMotsCroisés = () => {
  const datasFrench = JSON.parse(localStorage.getItem('datas'));
  const [focusedWord, setFocusedWord] = useState(null);
  const translations = datasFrench.map(word => word.traduction);
  let names = datasFrench.map(word => word.name);
  const dataCrossword = generateCrossword(translations).positions.map((item, index) => {
    return {
      ...item,
      name: names[index]
    };
  });
  const newDataCrossword = {
    positions: dataCrossword,
    gridSize: generateCrossword(translations).gridSize,
    reste: generateCrossword(translations).reste
  }
  let message1 = "Demande prise en compte"
  let message2 = "Demande non prise en compte"
  // const [datas, setDatas] = useState(newDataCrossword);
  const [datas, setDatas] = useState({
    positions: datasFrench, // Initialiser avec les données existantes
    gridSize: 15, // Exemple de taille de grille
    reste: [], // Exemple de reste
  });
  const [loading, setLoading] = useState(false);
  const [dataswords, setDatasWords] = useState(names);
  const dataTheme = JSON.parse(localStorage.getItem('theme'));
  const name = JSON.parse(localStorage.getItem('name'));
  const id = JSON.parse(localStorage.getItem('id'));
  const token = localStorage.getItem('token');
  // const handleWordChange = (index, newName) => {
  //   const newPositions = datas.positions.map((word, i) =>
  //     i === index ? { ...word, word: newName } : word
  //   );
  //   let newWorldsEnglish = newPositions.map(word => word.word);
  //   console.log(newWorldsEnglish)
  //   //newWorldsEnglish = newWorldsEnglish.sort((a, b) => a.localeCompare(b))
  //    const generatenewGrille = generateCrossword(newWorldsEnglish)
  //   const filterName = datas.positions.map(word => word.name);
  //   console.log(filterName)
  //   const generateFRenchEnglish = generateCrossword(newWorldsEnglish).positions.map((item, index) => {
  //     return {
  //       ...item,
  //       name: filterName[index]
  //     };
  //   });
  //   const newDataCrossword = {
  //     positions: generateFRenchEnglish,
  //     gridSize: generatenewGrille.gridSize,
  //     reste: datas.reste
  //   }

  //   setDatas(newDataCrossword);

  // };

console.log(datas)

  const handleWordChangeReste = (index, newName) => {
    let newReste = datas.reste.map((word, i) =>
      i === index ? newName : word
    );
    let world = datas.positions.map(element => element.word)
    world.push(...newReste)
    const generatenewGrille = generateCrossword(world)
    const filterName = datas.positions.map(word => word.name);
    const generateFRenchEnglish = generatenewGrille.positions.map((item, index) => {
      return {
        ...item,
        name: filterName[index]
      };
    });
    const newDataCrossword = {
      positions: generateFRenchEnglish,
      gridSize: generatenewGrille.gridSize,
      reste: generatenewGrille.reste
    }
    setDatas(newDataCrossword);
  };
  // const handleWordChangeFrench = (index, newName) => {
  //   const newPositions = datas.positions.map((word, i) =>
  //     i === index ? { ...word, name: newName } : word
  //   );
  //   const datasFrench = newPositions.map(element => element.name)
  //   console.log(datasFrench)
  //   setDatasWords(datasFrench)
  //   const updatedWords = datas.positions.map((item, index) => {
  //     if (index < datasFrench.length) {
  //       return { ...item, name: datasFrench[index] };
  //     }
  //     return item;
  //   });
  //   const newDataCrossword = {
  //     positions: updatedWords,
  //     gridSize: datas.gridSize,
  //     reste: datas.reste
  //   }
  //   setDatas(newDataCrossword);

  // }
  const handleWordChange = (index, newName) => {
  setDatas((prev) => {
    const newPositions = [...prev.positions];
    newPositions[index] = { ...newPositions[index], traduction: newName }; // Mettre à jour le mot anglais
    return {
      ...prev,
      positions: newPositions,
    };
  });
};
const handleWordChangeFrench = (index, newName) => {
  setDatas((prev) => {
    const newPositions = [...prev.positions];
    newPositions[index] = { ...newPositions[index], name: newName }; // Mettre à jour le mot français
    return {
      ...prev,
      positions: newPositions,
    };
  });
};

  const handleWordlsGrille = async () => {
    
    const dataPush = {
      crosswordId: id,
      words: datas.positions
    }
    console.log(dataPush)
    setLoading(true);
    try {
      const result = await fetchData("words", dataPush, token);
      console.log(result)

      if (result.message === "the words is created") {
        return snackbbar(document.querySelector("#body"), infos, message1, 4000);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  }
  
  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000); // Génère un nombre entre 10000000 et 99999999
  };
  
  const handleAddWord = () => {
    if (datas.positions.length < 25) {
      setDatas((prev) => {
        const newPositions = [...prev.positions, { name: "", traduction: "", id:  generateRandomId() }]; 
        return {
          ...prev,
          positions: newPositions,
        };
      });
      return console.log(datas)
    }
  };
  console.log(datas.positions)

  
  const handleDeleteWord = async (indexToDelete) => {
    const wordToDelete = datas.positions[indexToDelete];
    const id = wordToDelete?.id;
  
    if (!id) return;
  
    try {
      const response = await fetch("https://www.backend.habla-mundo.com/api/v1/words", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }) // on envoie { id: 1 }
      });
      console.log(response)
      console.log(response.json())
  
      if (response.ok) {
        setDatas((prev) => {
          const newPositions = prev.positions.filter((_, i) => i !== indexToDelete);
          return {
            ...prev,
            positions: newPositions,
          };
        });
  
        snackbbar(document.querySelector("#body"), infos, "Mot supprimé avec succès", 4000);
      } else {
        throw new Error("Échec de suppression");
      }
    } catch (err) {
      console.error(err);
      snackbbar(document.querySelector("#body"), infos, "Erreur lors de la suppression", 4000);
    }
  };
  
  
  return (
    <div className="parent_main">
      <div className="parent_header_sous_thematiques">
        <HeaderMotsCroisés theme1={dataTheme?.name} theme2={name} />
      </div>
      <div className="sous_parent_main_croisés">
        <div className="sous_parent_main_croisés_left">
          <span className="title_words">Liste des mots</span>
          <div className="sous_parent_main_croisés_left_1">
            <span className="title_language">Numéro</span>
            <span className="title_languageAnglais">Francais</span>
            <span className="title_languageFrancais">Anglais</span>
          </div>
          <WordList data={datas.positions} onWordChange={handleWordChange} onWordChangeFrench={handleWordChangeFrench} setFocusedWord={setFocusedWord}  onDeleteWord={handleDeleteWord}/>
          {/* {datas.reste.length >= 1 && <div className="parent_reste">
            <span className="title_parent">Mots anglais ayants plus de 15 caracteres</span>
            <div className="reste">
              <WordListReste data={datas.reste} onWordChange={handleWordChangeReste} />
            </div>
          </div>} */}
        </div>
      </div>
      <div className="parent_button_save">
        <button    className={datas.positions.length < 25 ? "btn-green" : "btn-gray"}
        onClick={handleAddWord}>+ Ajouter un mot</button>
        {loading ? <button className="save">En Cours ....</button> : <button className="save" onClick={handleWordlsGrille}>Sauvegarder</button>}
      </div>

    </div>
  )
}
