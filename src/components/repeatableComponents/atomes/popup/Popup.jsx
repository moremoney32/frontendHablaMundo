import "./popup.css"
export const Popup = ({h1,closePopup,text,TextRemove,removeLesson,closeLesson}) => {

    return (
        <div className="checkPopup">
            <div className="header_popup">
                <span className="span_header">{h1}</span>
                <img src={closePopup} alt="closePopup" className="closePopup" onClick={closeLesson}/>
            </div>
            <span className="text_Popup">{text}</span>
            <button className="remove_Popup" onClick={removeLesson}>{TextRemove}</button>
        </div>
    )
}