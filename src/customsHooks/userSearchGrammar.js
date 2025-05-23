import { useState, useCallback} from 'react';

export function useSearchGrammar(arrayInformation) {
  const [searchResultsGrammar, setSearchResultsGrammar] = useState([]);

  const searchElementUserNameGrammar = useCallback((userInformation) => {
    return new Promise((resolve) => {
      let timeOutId = null;
        clearTimeout(timeOutId);
      timeOutId = setTimeout(()=>{
        const searchName = () => {
          return new Promise((resolve) => {
            const searchName = arrayInformation.filter((info) => info.name);
            const searchNamesInfos = searchName.filter((info) => {
              if ( info.name.toLowerCase().includes(userInformation.toLowerCase())) {
                return info;
              }
            });
            return resolve(searchNamesInfos);
          });
        };
       
  
       
        Promise.all([searchName()]).then((response) => {
          const results = [...response[0]];
          const filterDoublon = [...new Set(results)];
          setSearchResultsGrammar(filterDoublon);
          return resolve(filterDoublon);
        });
    },500)
     });
  }, [arrayInformation]);
  
  return [searchResultsGrammar, searchElementUserNameGrammar];
}