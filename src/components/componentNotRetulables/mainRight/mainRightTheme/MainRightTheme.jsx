import { useState } from "react"
import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { SketchPicker } from 'react-color';
import "./mainRightTheme.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import search from "../../../../assets/icons/search.png";
import { icons } from '../../../../helpers/icons';
import { Select } from "../../select/Select";
import { useForm } from 'react-hook-form';
export const MainRightTheme = () => {
    const [etat, setEtat] = useState(false);
    const [color, setColor] = useState('#ED4C5C');
    const [showPicker, setShowPicker] = useState(false);
    const [etatSousTheme, setEtatSousTheme] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIconIndex, setSelectedIconIndex] = useState(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const handleIconClick = (index) => {
        setSelectedIconIndex(index);
        const iconColor = {
            icon: icons[index].name,
            color: color
        };
        
        let storedIcons = JSON.parse(localStorage.getItem('selectedIconColors')) || [];
        storedIcons.push(iconColor);
        localStorage.setItem('selectedIconColors', JSON.stringify(storedIcons));
    };

    const filteredIcons = icons.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const checkTheme = () => {
        setEtat(true)
    }
    const close = () => {
        setEtat(false)
    }
    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };
 

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleInputChange = (e) => {
        setColor(e.target.value);
        if (e.target.value === '') {
            setShowPicker(true);
        } else {
            setShowPicker(false);
        }
    };
    const onSubmit = (data) => {
        console.log(data)
        if(data){
            setEtatSousTheme(true)
            setEtat(false)
        }
    }
    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Thématiques" />
                <div className="update_theme" onClick={checkTheme}>
                    <span>+</span>
                    <span>Ajouter une thématique</span>
                </div>
            </div>
            <div className="sous_parent_main">
                {etat && <div id="masqueTheme"></div>}
                {etat && <form id="answer_client_theme" onSubmit={handleSubmit(onSubmit)}>
                    <FontAwesomeIcon icon={faClose} className="close_theme" onClick={close} />
                    <h1 className="answer_client_theme1">CREATION DE LA THEMATIQUE</h1>
                    <div className="answer_client_theme2">
                        <div className="answer_client_theme2_child1">
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Nom de la thématique</label>
                                <input type="text" placeholder="Entrer le nom de la thematique" name ="thematique" {...register("thematique", { required: "Veuillez entrer une question" })}/>
                                {errors.thematique && <span className="error_theme">{errors.thematique.message}</span>}
                            </div>
                            <div className="answer_client_theme2_child1_left">
                                <label htmlFor="">Langue de la traduction</label>
                                <Select />
                            </div>
                        </div>
                        <div className="answer_client_theme2_child2">
                            <label htmlFor="">Couleur</label>
                            <span className="circle" style={{ backgroundColor: color }}></span>
                            <input type="text" value={color}
                                onChange={handleInputChange}
                                onFocus={() => setShowPicker(true)} />
                            {showPicker && (
                                <div className="parent_palette_color">
                                    <FontAwesomeIcon icon={faClose} className="close_color" style={{ color: color }} onClick={togglePicker} />
                                    <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="answer_client_theme3">
                        <label htmlFor="">Icone:</label>
                        <div className="answer_client_theme3_parent_input">
                            <input type="text" placeholder="Rechercher une icone" value={searchTerm}
                                onChange={handleSearchChange} />
                            <div className="answer_client_theme3_search">
                                <img src={search} alt="" className="search_theme" />
                            </div>
                        </div>
                    </div>
                    <div className="answer_client_theme4">
                        {filteredIcons.map((icon, index) => {
                            return (
                                <div key={index} className="icon-item">
                                    <FontAwesomeIcon icon={icon.icon}   onClick={() => handleIconClick(index)}
           className="icons_font_awesome"
           style={selectedIconIndex === index ? { backgroundColor: color, color: 'white',padding:'10px',borderRadius:'5px' } : {}}/>
                                </div>
                            )
                        })}
                    </div>
                    <button className="button_theme">Génerer les mots croisés</button>
                </form>}
                
            </div>
        </div>
    )
}
