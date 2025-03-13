import { useState, useCallback } from 'react';

export function useSearchGrammarTheme(arrayInformation) {
    const [searchThemeGrammar, setSearchResults] = useState([]);

    const searchElementTheme = useCallback((userInformation) => {
        return new Promise((resolve) => {
            let timeOutId = null;
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                const searchName = () => {
                    return new Promise((resolve) => {
                        const searchName = arrayInformation.filter((info) => info.title);
                        const searchNamesInfos = arrayInformation.filter((info) => {

                            if (info.title && info.title.toLowerCase().includes(userInformation.toLowerCase())) {
                                return true;
                            }
                            return false;
                        });
                        return resolve(searchNamesInfos);
                    });
                };
                const searchNameTheme = () => {
                    return new Promise((resolve) => {
                        const searchName = arrayInformation.filter((info) => info.thematique_name
                        );
                        const searchNamesThemes = arrayInformation.filter((info) => {

                            if (info.thematique_name
                                && info.thematique_name
                                    .toLowerCase().includes(userInformation.toLowerCase())) {
                                return true;
                            }
                            return false;
                        });
                        return resolve(searchNamesThemes);
                    });
                };


                Promise.all([searchName(),searchNameTheme()]).then((response) => {
                    const results = [...response[0],...response[1]];
                    const filterDoublon = [...new Set(results)];
                    setSearchResults(filterDoublon);
                    return resolve(filterDoublon);
                });
            }, 500)
        });
    }, [arrayInformation]);

    return [searchThemeGrammar, searchElementTheme];
}