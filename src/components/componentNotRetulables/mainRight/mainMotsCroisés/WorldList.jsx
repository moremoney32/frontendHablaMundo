
import { snackbbar } from "../../../../helpers/snackbars";
import infos from "../../../../assets/icons/infos.svg";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WordList({ data, onWordChange, onWordChangeFrench, setFocusedWord,onDeleteWord }) {
  const handleInputChange = (e, index) => {
    let newName = e.target.innerText;
    if (newName.length > 100) {
      snackbbar(
        document.querySelector("#body"),
        infos,
        "Le mot anglais ne doit pas dépasser 100 caractères.",
        4000
      );
      e.target.innerText = newName.slice(0, 100);
    } else {
      onWordChange(index, newName); // Mettre à jour le mot anglais
    }
  };

  const handleInputFrench = (e, index) => {
    let newName = e.target.innerText;
    onWordChangeFrench(index, newName); // Mettre à jour le mot français
  };

  const handleBlur = (e, index) => {
    handleInputChange(e, index); // Appeler le gestionnaire pour les changements
    setFocusedWord(null); // Réinitialiser le focus
  };

  return (
    <div className="sous_parent_main_croisés_left_parent">
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
          <span
            contentEditable
            className="content"
            onFocus={() => setFocusedWord(word.traduction)} // Définir le mot focusé
            onBlur={(e) => handleBlur(e, index)} // Combiner handleInputChange et setFocusedWord
          >
            {word.traduction}
          </span>
            <FontAwesomeIcon icon={faRemove}   className="edit-edit"   onClick={() => onDeleteWord(index)}/> 
        </div>
      ))}
    </div>
  );
}

export default WordList;
