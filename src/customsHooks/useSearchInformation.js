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
  
        // const searchLevel = () => {
        //   return new Promise((resolve) => {
        //     const searchLevel = arrayInformation.filter((infos) => infos.level);
        //     const searchNamesLevel = searchLevel.filter((infos) => {
        //       if (infos.level.toLowerCase().includes(userInformation.toLowerCase())) {
        //         return infos;
        //       }
        //     });
        //     return resolve(searchNamesLevel);
        //   });
        // };
        // const searchSkills = () => {
        //   return new Promise((resolve) => {
        //     const searchSkills = arrayInformation.filter((infos) => infos.skills);
        //     const searchNamesSkills = searchSkills.filter((infos) => {
        //       if (infos.skills.toLowerCase().includes(userInformation.toLowerCase())) {
        //         return infos;
        //       }
        //     });
        //     return resolve(searchNamesSkills);
        //   });
        // };
        // const searchCity = () => {
        //   return new Promise((resolve) => {
        //     const searchCity = arrayInformation.filter((infos) => infos.city);
        //     const searchNamesCity = searchCity.filter((infos) => {
        //       if (infos.city.toLowerCase().includes(userInformation.toLowerCase())) {
        //         return infos;
        //       }
        //     });
        //     return resolve(searchNamesCity);
        //   });
        // };
        // const searchEstablishment = () => {
        //   return new Promise((resolve) => {
        //     const searchSchool = arrayInformation.filter((school) => school.establishment);
        //     const searchNamesEstablishment = searchSchool.filter((school) => {
        //       if (school.establishment.toLowerCase().includes(userInformation.toLowerCase())) {
        //         return school;
        //       }
        //     });
        //     return resolve(searchNamesEstablishment);
        //   });
        // };
  
        Promise.all([searchName()]).then((response) => {
          const results = [...response[0]];
          const filterDoublon = [...new Set(results)];
          setSearchResults(filterDoublon);
          return resolve(filterDoublon);
        });
    },500)
     });
  }, [arrayInformation]);
  
  return [searchResults, searchElementUser];
}