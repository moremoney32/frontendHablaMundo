import { HeaderSousThematiques } from "../../../repeatableComponents/atomes/header/HeaderSousThematiques"
import "./mainRightSousThematiques.css";
import "../mainRightUsers/mainRightUsers.css";
import search from "../../../../assets/icons/search.png";
import state from "../../../../assets/icons/state.png";
import { Select } from "../../select/Select";
import { useRef, useState } from "react";

export const MainRightSousThematiques = () => {
    const dataSelectStatus = ["normal", "Aphébétiques"]
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionName, setOptionName] = useState("normal");
    const [rotateIcon, setRotateIcon] = useState(false);
    //const [searchResults, searchElementUser] = useSearchInformation(dataUser);
    const selectRef = useRef(null);
    const data = JSON.parse(localStorage.getItem('theme'))
    const changeIcon = () => {
        const select = selectRef.current
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            console.log(rotateIcon)
            // Deuxième clic : masquer les options
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisible(false);
        } else {
            console.log(rotateIcon)
            // Premier clic : afficher les options
            // console.log(selectRef.current.classList.toggle("bottomRaduisNone"))
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    const handleChildClick = (value) => {
        const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        //searchElementUser(value)
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
    };
    return (
        <div className="parent_main">
            <div className="parent_header_sous_thematiques">
                <HeaderSousThematiques theme={data.theme}/>
            </div>
            <div className="sous_parent_main_sous_theme">
                <div className="sous_parent_main_users_header">
                    <div className="sous_parent_main_users_header_input">
                        <input type="text" className="input_users" placeholder="Rechercher un mot croisé" name="checkValue" />
                        <div className="parent_search_users">
                            <img src={search} alt="" className="search_users" />
                        </div>
                    </div>
                    <Select
                        dataSelectStatus={dataSelectStatus}
                        changeIcon={changeIcon}
                        handleChildClick={handleChildClick}
                        selectRef={selectRef}
                        optionName={optionName}
                        optionVisible={optionVisible}
                        rotateIcon={rotateIcon}
                        defautClassName="select" />
                </div>
                <div className="sous_parent_main_users_main">
                    <div className="sous_parent_main_users_main_bloc">
                        <div className="sous_parent_main_users_main_bloc1">
                            <span>fruits</span>
                            <span>5 min</span>
                        </div>
                        <div className="sous_parent_main_users_main_bloc2">
                            <span>25 mots</span>
                            <img src={state} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}