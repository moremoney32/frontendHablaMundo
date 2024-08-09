export const searchAbonnes = (arrayInformation,userInformation) => {
    return new Promise((resolve) => {
      const searchnewAbonnes = arrayInformation.filter((infos) => infos.suscribe);
      const searchNamesAbonnes = searchnewAbonnes.filter((infos) => {
        if (infos.suscribe.includes(userInformation)) {
          return infos;
        }
      });
      return resolve(searchNamesAbonnes);
    });
  };