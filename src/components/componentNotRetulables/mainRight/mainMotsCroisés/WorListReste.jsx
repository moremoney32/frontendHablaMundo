function WordListReste({ data, onWordChange }) {
    const handleInputChange = (e, index) => {
      const newName = e.target.innerText;
      onWordChange(index, newName);
    };
    return (
      <div className="reste">
        {
          data?.map((element, index) => {
            return (
                <span className="sous_parent_main_croisés_left_2 content_title" key={index} contentEditable onBlur={(e) => handleInputChange(e, index)}>{element}</span>
            )
          })
        }
  
      </div>
  
    );
  }
  
  export default WordListReste;