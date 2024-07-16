import { useState, useCallback} from 'react';

export function useSearchInformation(arrayInformation) {
  const [searchResults, setSearchResults] = useState([]);

  const searchElementUser = useCallback((userInformation) => {
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
  
        const searchAbonnes = () => {
          return new Promise((resolve) => {
            const searchnewAbonnes = arrayInformation.filter((infos) => infos.status);
            const searchNamesAbonnes = searchnewAbonnes.filter((infos) => {
              if (infos.status.toLowerCase().includes(userInformation.toLowerCase())) {
                return infos;
              }
            });
            return resolve(searchNamesAbonnes);
          });
        };
        const allUsers = () => {
          return new Promise((resolve) => {
            const searchUsers = arrayInformation.filter((infos) => infos.status);
            const searchNamesUsers = searchUsers.filter((infos) => {
              if (infos.status.toLowerCase().includes(userInformation.toLowerCase() === false)) {
                return searchUsers;
              }
            });
            return resolve(searchNamesUsers);
          });
        };
  
        Promise.all([searchName(),searchAbonnes(),allUsers()]).then((response) => {
          const results = [...response[0],...response[1],...response[2]];
          const filterDoublon = [...new Set(results)];
          setSearchResults(filterDoublon);
          return resolve(filterDoublon);
        });
    },500)
     });
  }, [arrayInformation]);
  
  return [searchResults, searchElementUser];
}