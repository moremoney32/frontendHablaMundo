import { snackbbar } from "../../../../helpers/snackbars";


function WordList({ data, onWordChange,onWordChangeFrench }) {
  const handleInputChange = (e, index) => {
    const newName = e.target.innerText;
    const dataMessage = "Le mot anglais ne doit pas dépasser 12 caractères."
    if (newName.length > 13) {
     snackbbar(document.querySelector("#body"), "../../../assets/icons/info.svg", dataMessage,4000)
      e.target.innerText = newName.slice(0, 12); 
    } else {
      onWordChange(index, newName);
    }
  };
  const handleInputFrench = (e, index) => {
    const newName = e.target.innerText;
     onWordChangeFrench(index, newName);
  };
  
  return (
    <div className="sous_parent_main_croisés_left_parent">
      {
        data?.map((word, index) => {
          return (
            <div className="sous_parent_main_croisés_left_2" key={index}>
              <span contentEditable className="content" onBlur={(e) => handleInputChange(e, index)}>{word.word}</span>
              <span  contentEditable  className="content_words" onBlur={(e) => handleInputFrench(e, index)}>{word.name}</span>
            </div>
          )
        })
      }

    </div>
  );
}

export default WordList;
