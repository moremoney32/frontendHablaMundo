import { HeaderTitleMain } from "../../../repeatableComponents/atomes/header/HeaderTitleMain"
import "./mainRightTheme.css"
export const MainRightTheme = () => {
    return (
        <div className="parent_main">
            <div className="title_main">
                <HeaderTitleMain h1="Thématiques" />
                <div className="update_theme">
                    <span>+</span>
                    <span>Ajouter une thématique</span>
                </div>
            </div>
            <div className="sous_parent_main">2</div>
        </div>
    )
}