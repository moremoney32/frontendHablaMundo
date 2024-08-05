import { useEffect, useState } from "react";
import { HeaderMotsCroisés } from "../../../repeatableComponents/atomes/header/HeaderMotsCroisés"
import {Grid} from "./Grid";
import "./mainMotsCroisés.css";
import { dataMotsCroisés } from "../../../../helpers/dataMotsCroisés";
import WordList from "./WorldList";
import { fetchData } from "../../../../helpers/fetchData";
import { generateWordCoordinates } from "./generateCoordonnées";
export const MainMotsCroisés = () => {
  const words = ["miel", "avocat", "honey", "avocado", "lawyer"];
    const [datas, setDatas] = useState(dataMotsCroisés);
    const dataTheme = JSON.parse(localStorage.getItem('theme'));
    const dataValue = JSON.parse(localStorage.getItem('sousTheme'));
    const token = localStorage.getItem('token')
    console.log(dataTheme)
    console.log(dataValue)
     //const data = generateWordCoordinates(words);
    const handleCellChange = (x, y, letter) => {
        const newData = datas?.map((word) => {
          if (word.cellule){
            return {
              ...word,
              cellule: word.cellule.map((cell) =>
                cell.x === x && cell.y === y ? { ...cell, lettre: letter } : cell
              ),
            };
          }
          return word;
        });
        setDatas(newData);
      };
      const handleWordChange = (index, newName) => {
        const newData = datas?.map((word, i) => 
          i === index ? { ...word, name: newName } : word
        );
        setDatas(newData);
      };
    // useEffect(() => {
    //     const id = {
    //         id: dataValue.id
    //     }
    //     console.log(id)

    //     fetchData("https://www.backend.habla-mundo.com/api/v1/crossword", id, token).then((result) => {
    //         console.log(result)
    //         setDatas(result)

    //     })


    // }, [])
    return (
        <div className="parent_main">
            <div className="parent_header_sous_thematiques">
                <HeaderMotsCroisés theme1={dataTheme?.name} theme2="fruits jaunes" />
            </div>
            <div className="sous_parent_main_croisés">
                <div className="sous_parent_main_croisés_left">
                    <span className="title_words">Liste des mots</span>
                    <div className="sous_parent_main_croisés_left_1">
                        <span className="title_language">Francais</span>
                        <span className="title_language">Anglais</span>
                    </div>
                    <WordList data ={datas} onWordChange={handleWordChange}/>
                </div>
                <div className="sous_parent_main_croisés_right">
                    <Grid data={datas} onCellChange={handleCellChange}/> 
                    <button className="save">Sauvegarder</button>
                </div>
            </div>
        </div>
    )
}
