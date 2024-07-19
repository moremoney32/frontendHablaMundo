import { HeaderMotsCroisés } from "../../../repeatableComponents/atomes/header/HeaderMotsCroisés"
import "./mainMotsCroisés.css";
export const MainMotsCroisés = () => {
    const data = JSON.parse(localStorage.getItem('theme'))
    return (
        <div className="parent_main">
            <div className="parent_header_sous_thematiques">
                <HeaderMotsCroisés theme1={data?.theme} theme2="fruits jaunes" />
            </div>
            <div className="sous_parent_main_croisés">
                <div className="sous_parent_main_croisés_left">
                    <span className="title_words">Liste des mots</span>
                    <div className="sous_parent_main_croisés_left_1">
                        <span>Francais</span>
                        <span>Anglais</span>
                    </div>
                    <div className="sous_parent_main_croisés_left_parent">
                        <div className="sous_parent_main_croisés_left_2">
                            <span contentEditable className="content">Francais</span>
                            <span className="disable">Anglais</span>
                        </div>
                        <div className="sous_parent_main_croisés_left_2">
                            <span contentEditable className="content">Francais</span>
                            <span className="disable">Anglais</span>
                        </div>
                        <div className="sous_parent_main_croisés_left_2">
                            <span contentEditable className="content">Francais</span>
                            <span className="disable">Anglais</span>
                        </div>
                        <div className="sous_parent_main_croisés_left_2">
                            <span contentEditable className="content">Francais</span>
                            <span className="disable">Anglais</span>
                        </div>

                    </div>

                </div>
                <div className="sous_parent_main_croisés_right">
                    <div className="sous_parent_main_croisés_contenair">
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable></span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable></span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable></span>
                        <span contentEditable></span>
                        <span contentEditable></span>
                        <span contentEditable></span>
                        <span contentEditable></span>
                        <span contentEditable></span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        <span contentEditable>A</span>
                        
                    </div>
                    <button className="save">Sauvegarder</button>
                </div>
            </div>
        </div>
    )
}