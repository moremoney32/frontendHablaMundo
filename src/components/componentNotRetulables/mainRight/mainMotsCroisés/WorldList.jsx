import { snackbbar } from "../../../../helpers/snackbars";
import infos from "../../../../assets/icons/infos.svg"


// function WordList({ data, onWordChange,onWordChangeFrench }) {
//    let message1 = "Demande prise en compte"
//     let message2 = "Demande non prise en compte"
//   const handleInputChange = (e, index) => {
//     let newName = e.target.innerText;
//     console.log(newName)
//     const dataMessage = "Le mot anglais ne doit pas dépasser 15 caractères."
//     if (newName.length > 15) {
//      snackbbar(document.querySelector("#body"), infos , message2,4000)
//       e.target.innerText = newName.slice(0, 15); 
//     } else {
//       onWordChange(index, newName);
//     }
//   };
//   const handleInputFrench = (e, index) => {
//     let newName = e.target.innerText;
//      onWordChangeFrench(index, newName);
//   };
  
//   return (
//     <div className="sous_parent_main_croisés_left_parent">
//       {
//         data?.map((word, index) => {
//           return (
//             <div className="sous_parent_main_croisés_left_2" key={index}>
//             <span className="content_number">{index + 1}</span> {/* Numéro */}
//             <span
//               contentEditable
//               className="content"
//               onBlur={(e) => handleInputChange(e, index)}
//             >
//               {word.word}
//             </span>
//             <span
//               contentEditable
//               className="content_words"
//               onBlur={(e) => handleInputFrench(e, index)}
//             >
//               {word.name}
//             </span>
//           </div>
//           )
//         })
//       }

//     </div>
//   );
// }

// export default WordList;
function WordList({ data, onWordChange, onWordChangeFrench, setFocusedWord }) {
  const handleInputChange = (e, index) => {
    let newName = e.target.innerText;
    if (newName.length > 15) {
      snackbbar(
        document.querySelector("#body"),
        infos,
        "Le mot anglais ne doit pas dépasser 15 caractères.",
        4000
      );
      e.target.innerText = newName.slice(0, 15);
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
            className="content"
            onFocus={() => setFocusedWord(word.word)} // Définir le mot focusé
            onBlur={(e) => handleBlur(e, index)} // Combiner handleInputChange et setFocusedWord
          >
            {word.word}
          </span>
          <span
            contentEditable
            className="content_words"
            onBlur={(e) => handleInputFrench(e, index)}
          >
            {word.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default WordList;

