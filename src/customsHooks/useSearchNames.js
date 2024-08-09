import { useState, useCallback} from 'react';

export function useSearchNames(arrayInformation) {
  const [searchResults, setSearchResults] = useState([]);

  const searchElementUserName = useCallback((userInformation) => {
    return new Promise((resolve) => {
      let timeOutId = null;
        clearTimeout(timeOutId);
      timeOutId = setTimeout(()=>{
        const searchName = () => {
          return new Promise((resolve) => {
            const searchName = arrayInformation.filter((info) => info.name);
            const searchNamesInfos = searchName.filter((info) => {
              if (info.name.toLowerCase().includes(userInformation.toLowerCase())) {
                return info;
              }
            });
            return resolve(searchNamesInfos);
          });
        };
       
  
       
        Promise.all([searchName()]).then((response) => {
          const results = [...response[0]];
          const filterDoublon = [...new Set(results)];
          setSearchResults(filterDoublon);
          return resolve(filterDoublon);
        });
    },500)
     });
  }, [arrayInformation]);
  
  return [searchResults, searchElementUserName];
}