import { NavLink } from "react-router-dom";
import state from "../../../../assets/icons/state.png";
import { useEffect, useState } from "react";
import { getTimeNow } from "../../../../helpers/getTimeNow";
import { formatTime } from "../../../../helpers/formatDate";
export const CardSousThematique = ({name, created,onClick}) => {
    const [timeDate, setTimeDate] = useState(getTimeNow(created));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDate(getTimeNow(created));
        }, 1000);

        return () => clearInterval(interval);
    }, [created]);
    return (
        // <NavLink to="/motsCroisés" className="nav_link">
            <div className="sous_parent_main_users_main_bloc" onClick={onClick}>
                <div className="sous_parent_main_users_main_bloc1">
                    <span>{name}</span>
                    <span>{formatTime(timeDate)}</span>
                </div>
                <div className="sous_parent_main_users_main_bloc2">
                    <span>25 mots</span>
                    <img src={state} alt="" />
                </div>
            </div>
        // </NavLink>
    )
}