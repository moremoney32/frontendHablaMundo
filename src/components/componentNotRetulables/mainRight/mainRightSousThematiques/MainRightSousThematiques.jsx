import { HeaderSousThematiques } from "../../../repeatableComponents/atomes/header/HeaderSousThematiques"
import "./mainRightSousThematiques.css";
import "../mainRightUsers/mainRightUsers.css";
import search from "../../../../assets/icons/search.png";
import { Select } from "../../select/Select";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "../../../../helpers/fetchData";
import { CardSousThematique } from "./cardSousThematiques";
import { useSearchNames } from "../../../../customsHooks/useSearchNames";
import {useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";


export const MainRightSousThematiques = () => {
    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue } = useForm();
    const dataSelectStatus = ["normal", "Aphabétiques","plus récents"]
    const [optionVisible, setOptionVisible] = useState(false);
    const [optionName, setOptionName] = useState("normal");
    const [rotateIcon, setRotateIcon] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sousThematiques, setSousThematique] = useState(null);
    const [searchResults, searchElementUserName] = useSearchNames(sousThematiques);
    const [etat, setEtat] = useState(false);
    const [level, setLevel] = useState(true);
    const dataValue = JSON.parse(localStorage.getItem('theme'))
    const resultValue = JSON.parse(localStorage.getItem('result'))
    const token = localStorage.getItem('token')
    const navigate =useNavigate();
    useEffect(() => {
        const id = {
            id: resultValue.id
        }
        fetchData("https://www.backend.habla-mundo.com/api/v1/theme",id).then((result) => {
            console.log(result)
             setSousThematique(result)
        })
    }, [])
    const sortAlphabet= (sousThematiques) => {
        return sousThematiques.sort((a, b) => a.name.localeCompare(b.name));
      };
    const selectRef = useRef(null);
    const changeIcon = () => {
        const select = selectRef.current
        setRotateIcon(!rotateIcon);
        if (rotateIcon) {
            // Deuxième clic : masquer les options
            select.style.borderBottomRightRadius = "5px"
            select.style.borderBottomLeftRadius = "5px"
            setOptionVisible(false);
        } else {
            // Premier clic : afficher les options
            select.style.borderBottomRightRadius = "0px"
            select.style.borderBottomLeftRadius = "0px"
            setOptionVisible(true);
        }
    };
    const handleChildClick = (value) => {
        if(value = "Aphabétiques"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareAphabetiques =   sousThematiques.sort((a, b) => a.name.localeCompare(b.name))
        console.log(compareAphabetiques)
           return setSousThematique(compareAphabetiques)
        }
        if(value = "normal"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareAphabetiques =   sousThematiques.sort((a, b) => b.name.localeCompare(a.name))
        console.log(compareAphabetiques)
           return setSousThematique(compareAphabetiques)
        }
        if(value = "plus récents"){
            const select = selectRef.current
        setOptionName(value);
        setOptionVisible(false);
        setRotateIcon(!rotateIcon);
        select.style.borderBottomRightRadius = "5px"
        select.style.borderBottomLeftRadius = "5px"
        const compareDate =   sousThematiques.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateA - dateB;
          });  
           return setSousThematique(compareDate)
        }
       
    };
    const handleWordls = async(id,name)=>{
        const dataId = {
            id:id
        }
        try {
            const result = await fetchData("https://www.backend.habla-mundo.com/api/v1/word",dataId,token);
            console.log(result)
            localStorage.setItem('datas', JSON.stringify(result));
            localStorage.setItem('name', JSON.stringify(name));
            localStorage.setItem('id', JSON.stringify(id));
            navigate("/motsCroisés");
        } catch (error) {
            console.log({ message: error.message });
        } finally {
            
        }
    }
    return (
        <div className="parent_main">
            <div className="parent_header_sous_thematiques">
                <HeaderSousThematiques theme={dataValue.name}/>
            </div>
             <div className="sous_parent_main_sous_theme">
                <div className="sous_parent_main_users_header">
                    <div className="sous_parent_main_users_header_input">
                        <input type="text" className="input_users" placeholder="Rechercher une sous thématique" name="checkValue" onChange={(e) => {
                            setLevel(false);
                            setEtat(true)
                            searchElementUserName(e.target.value);
                            if (e.target.value.length === 0) {
                                setLevel(true);
                                setEtat(false)
                            }
                            register("checkValue").onChange(e); 
                        }} />
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
                    {
                       level && sousThematiques?.map((thematique) => {
                        console.log(thematique.id)
                            return (
                                <CardSousThematique name={thematique?.name} key={thematique?.id}  created={thematique.created_at}  onClick={() => handleWordls(thematique.id,thematique.name)}/>
                            )
                        })
                    }
                    {
                       etat && searchResults?.map((thematique) => {
                            return (
                                <CardSousThematique name={thematique?.name} key={thematique?.id}  created={thematique.created_at}  onClick={() => handleWordls(thematique.id,thematique.name)}/>
                            )
                        })
                    }   
                </div>
            </div> 
        </div>
    )
}
