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
  const [datas, setDatas] = useState(newDataCrossword);
  const [loading, setLoading] = useState(false);
  const [dataswords, setDatasWords] = useState(names);
  const dataTheme = JSON.parse(localStorage.getItem('theme'));
  const name = JSON.parse(localStorage.getItem('name'));
  const id = JSON.parse(localStorage.getItem('id'));
  const token = localStorage.getItem('token');
  const handleWordChange = (index, newName) => {
    const newPositions = datas.positions.map((word, i) =>
      i === index ? { ...word, word: newName } : word
    );
    let newWorldsEnglish = newPositions.map(word => word.word);
    //newWorldsEnglish = newWorldsEnglish.sort((a, b) => a.localeCompare(b))
    const generatenewGrille = generateCrossword(newWorldsEnglish)
    const filterName = datas.positions.map(word => word.name);
    const generateFRenchEnglish = generateCrossword(newWorldsEnglish).positions.map((item, index) => {
      return {
        ...item,
        name: filterName[index]
      };
    });
    const newDataCrossword = {
      positions: generateFRenchEnglish,
      gridSize: generatenewGrille.gridSize,
      reste: datas.reste
    }

    setDatas(newDataCrossword);

  };



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
  const handleWordChangeFrench = (index, newName) => {
    const newPositions = datas.positions.map((word, i) =>
      i === index ? { ...word, name: newName } : word
    );
    const datasFrench = newPositions.map(element => element.name)
    setDatasWords(datasFrench)
    const updatedWords = datas.positions.map((item, index) => {
      if (index < datasFrench.length) {
        return { ...item, name: datasFrench[index] };
      }
      return item;
    });
    const newDataCrossword = {
      positions: updatedWords,
      gridSize: datas.gridSize,
      reste: datas.reste
    }
    setDatas(newDataCrossword);

  }

  const handleWordlsGrille = async () => {
    let updatedWords = datas.positions.map((word, index) => {
      if (index < datasFrench.length) {
        return { ...word, id: datasFrench[index].id };
      }
      return word;
    });
    console.log(updatedWords)

    //updatedWords =  updatedWords.map(({ row, col,direction, ...rest }) => rest);

    const dataPush = {
      crosswordId: id,
      words: updatedWords
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
  const handleAddWord = () => {
    if (datas.positions.length < 25) {
      setDatas((prev) => ({
        ...prev,
        positions: [...prev.positions, { word: "", name: "" }],
      }));
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
          <WordList data={datas.positions} onWordChange={handleWordChange} onWordChangeFrench={handleWordChangeFrench} setFocusedWord={setFocusedWord} />
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
