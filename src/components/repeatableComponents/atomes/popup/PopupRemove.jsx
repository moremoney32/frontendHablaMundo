import "./popup.css"
// export const PopupRemove = ({h1,closePopup,text,TextRemove,removeLesson,closeLesson,isLoading}) => {

//     return (
//         <div className="checkPopup">
//             <div className="header_popup">
//                 <span className="span_header">{h1}</span>
//                 <img src={closePopup} alt="closePopup" className="closePopup" onClick={closeLesson}/>
//             </div>
//             <span className="text_Popup">{text}</span>
//             <button className="remove_Popup" onClick={removeLesson} disabled={isLoading}>
//                 {isLoading ? "Suppression..." : TextRemove}
//             </button>
//             {/* <button className="remove_Popup" onClick={removeLesson}>{TextRemove}</button> */}
//         </div>
//     )
// }
export const PopupRemove = ({ h1, closePopup, text, TextRemove, removeLesson, isLoading }) => {
    return (
        <div className="checkPopup">
            <div className="header_popup">
                <span className="span_header">{h1}</span>
                <img src={closePopup} alt="closePopup" className="closePopup" onClick={!isLoading ? closePopup : null} />
            </div>
            <span className="text_Popup">{text}</span>
            <button className="remove_Popup" onClick={removeLesson} disabled={isLoading}>
                {isLoading ? "Suppression..." : TextRemove}
            </button>
        </div>
    );
};
