import { useState } from "react";
import { HeaderMotsCroisés } from "../../../repeatableComponents/atomes/header/HeaderMotsCroisés";
import { Grid } from "./Grid";
import "./mainMotsCroisés.css";
import WordList from "./WorldList";
import { generateCrossword} from "./generateCoordonnées";
import WordListReste from "./WorListReste";
export const MainMotsCroisés = () => {
  const datasFrench = JSON.parse(localStorage.getItem('datas'));
  const translations = datasFrench.map(word => word.traduction);
  let names = datasFrench.map(word => word.name);
  const dataCrossword =  generateCrossword(translations).positions.map((item, index) => {
    return {
        ...item,
        name: names[index]
    };
});
const newDataCrossword ={
  positions:dataCrossword,
  gridSize:generateCrossword(translations).gridSize,
  reste:generateCrossword(translations).reste
}

  const [datas, setDatas] = useState(newDataCrossword);
  console.log(datas)
  const [dataswords, setDatasWords] = useState(names);
  const dataTheme = JSON.parse(localStorage.getItem('theme'));
  const name = JSON.parse(localStorage.getItem('name'))
  const id = JSON.parse(localStorage.getItem('id'));
  //const token = localStorage.getItem('token');
  const handleWordChange = (index, newName) => {
    const newPositions = datas.positions.map((word, i) =>
        i === index ? { ...word, word: newName } : word
    );
    const newWorldsEnglish = newPositions.map(word => word.word);
    const generatenewGrille = generateCrossword(newWorldsEnglish)
    const filterName  =  datas.positions.map(word => word.name);
    const generateFRenchEnglish =  generatenewGrille.positions.map((item, index) => {
      return {
          ...item,
          name: filterName[index]
      };
  });
  const newDataCrossword ={
    positions:generateFRenchEnglish,
    gridSize:generatenewGrille.gridSize,
    reste:datas.reste
  }
  
    setDatas(newDataCrossword);
   
};

const handleWordChangeReste = (index, newName) => {
  console.log(newName)
  const newReste = datas.reste.map((word, i) =>
    i === index ? newName : word
  );
  console.log(newReste)

const changeReste = datas.reste.push(...newReste);
console.log(changeReste)
const world = datas.positions.map(element =>element.word)
const newWords = world.push(changeReste) 
console.log(newWords)
const generatenewGrille = generateCrossword(newWords)
const filterName  =  datas.positions.map(word => word.name);
const generateFRenchEnglish =  generatenewGrille.positions.map((item, index) => {
  return {
      ...item,
      name: filterName[index]
  };
});
const newDataCrossword ={
positions:generateFRenchEnglish,
gridSize:generatenewGrille.gridSize,
reste:generatenewGrille.reste
}
setDatas(newDataCrossword);   
};
const handleWordChangeFrench = (index, newName) => {
  const newPositions = datas.positions.map((word, i) =>
    i === index ? { ...word, name: newName } : word
);
console.log(newPositions)
const datasFrench = newPositions.map(element =>element.name)
console.log(datasFrench)
setDatasWords(datasFrench)
 
}
console.log(dataswords)

// const handleWordls = async(id)=>{
//   console.log(id)
//   const dataId = {
//       id:id
//   }
//   try {
//       const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/words",dataId,token);
//       console.log(result);
     
//   } catch (error) {
//       console.log({ message: error.message });
//   } finally {
      
//   }
// }

  return (
    <div className="parent_main">
      <div className="parent_header_sous_thematiques">
        <HeaderMotsCroisés theme1={dataTheme?.name} theme2={name} />
      </div>
      <div className="sous_parent_main_croisés">
        <div className="sous_parent_main_croisés_left">
          <span className="title_words">Liste des mots</span>
          <div className="sous_parent_main_croisés_left_1">
            <span className="title_language">Anglais</span>
            <span className="title_language">Francais</span>
          </div>
          <WordList data={datas.positions} onWordChange={handleWordChange} onWordChangeFrench={handleWordChangeFrench}/>
          {datas.reste.length>=1 && <div className="parent_reste">
            <span className="title_parent">Mots anglais ayants plus de 12 caracteres à modifier</span>
            <div className="reste">
            <WordListReste data={datas.reste} onWordChange={handleWordChangeReste}/>
            </div>
          </div>}
        </div>
        <div className="sous_parent_main_croisés_right">
          <Grid positions={datas.positions} gridSize={datas.gridSize}/>
          <button className="save">Sauvegarder</button>
        </div>
      </div>
    </div>
  )
}
