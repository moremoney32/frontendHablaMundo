import { snackbbar } from "../../../../helpers/snackbars";
import infos from "../../../../assets/icons/infos.svg"

function WordList({ data, onWordChange, onWordChangeFrench, setFocusedWord }) {
  const handleInputChange = (e, index) => {
    let newName = e.target.innerText;
    if (newName.length > 50) {
      snackbbar(
        document.querySelector("#body"),
        infos,
        "Le mot anglais ne doit pas dépasser 50 caractères.",
        4000
      );
      e.target.innerText = newName.slice(0, 50);
    } else {
      onWordChange(index, newName);
    }
  };

  const handleInputFrench = (e, index) => {
    let newName = e.target.innerText;
    onWordChangeFrench(index, newName);
  };

  const handleBlur = (e, index) => {
    handleInputChange(e, index); // Appeler le gestionnaire pour les changements
    setFocusedWord(null); // Réinitialiser le focus
  };

  return (
    <div className="sous_parent_main_croisés_left_parent">
      {data?.map((word, index) => (
        <div className="sous_parent_main_croisés_left_2" key={index}>
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
            onFocus={() => setFocusedWord(word.word)} // Définir le mot focusé
            onBlur={(e) => handleBlur(e, index)} // Combiner handleInputChange et setFocusedWord...
          >
            {word.word}
          </span>
        </div>
      ))}
       {/* Ajouter une div vide si data < 25 */}
       {data.length < 25 && (
        <div className="sous_parent_main_croisés_left_2 empty" key="empty">
          <span className="content_number">{data.length + 1}</span>
          <span className="content" contentEditable></span>
          <span className="content_words" contentEditable></span>
        </div>
      )}
    </div>
  );
}

export default WordList;

