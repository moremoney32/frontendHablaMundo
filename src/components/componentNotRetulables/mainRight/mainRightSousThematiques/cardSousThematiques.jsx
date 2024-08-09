
import state from "../../../../assets/icons/state.png";
import { formatTime } from "../../../../helpers/formatDate";
export const CardSousThematique = ({ name, created, onClick }) => {
    return (
        <div className="sous_parent_main_users_main_bloc" onClick={onClick}>
            <div className="sous_parent_main_users_main_bloc1">
                <span>{name}</span>
                <span>{formatTime(created)}</span>
            </div>
            <div className="sous_parent_main_users_main_bloc2">
                <span>25 mots</span>
                <img src={state} alt="" />
            </div>
        </div>
    )
}