

function WordList({ data,onWordChange }) {
  const handleInputChange = (e, index) => {
    const newName = e.target.innerText;
    onWordChange(index, newName);
  };
  return (
    <div className="sous_parent_main_croisés_left_parent">
      {
        data?.map((word, index) => {
          return (
            <div className="sous_parent_main_croisés_left_2" key={index}>
              <span contentEditable className="content" onBlur={(e) => handleInputChange(e, index)}>{word.name}</span>
              <span className="disable">{word.traduction}</span>
            </div>
          )
        })
      }

    </div>

  );
}

export default WordList;
