import { ButtonMainLeft } from "../button/ButtonMainLeft"
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { faCircleMinus, faHome, faCommentDots, faUser, faGripHorizontal, faCommentAlt, faSpellCheck } from '@fortawesome/free-solid-svg-icons'
import "./sideBar.css"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
export const SideBar = () => {

  const userId = localStorage.getItem("userId");
  // console.log(userId)
  const deconnexion = () => {
    localStorage.removeItem("token");
    //https://www.backend.habla-mundo.comapi/logout/{id}
  }
  return (
    <div className='main_left'>
      <div className='main_child_left'>
        <NavLink to="/home" className="navlink" activeClassName="active"><ButtonMainLeft icons={faHome} name="Accueil" isActive={window.location.pathname === "/home"}
          defaultClassName="icon_default" /></NavLink>
        <NavLink to="/theme" className="navlink" activeClassName="active"><ButtonMainLeft icons={faGripHorizontal} name="Thématiques" isActive={window.location.pathname === "/theme"} defaultClassName="icon_default" /></NavLink>
        <NavLink to="/liste" className="navlink" activeClassName="active"><ButtonMainLeft icons={faSpellCheck} name="Liste de mots" isActive={window.location.pathname === "/liste"} defaultClassName="icon_default" /></NavLink>
        <NavLink to="/grammaire" className="navlink" activeClassName="active"><ButtonMainLeft icons={faSpellCheck} name="Grammaires" defaultClassName="icon_default_black" isActive={window.location.pathname === "/grammaire"} /></NavLink>
        <NavLink to="/user" className="navlink" activeClassName="active"><ButtonMainLeft icons={faUser} name="Utilisateurs" defaultClassName="icon_default_black" isActive={window.location.pathname === "/user"} /></NavLink>
        <NavLink to="/message" className="navlink" activeClassName="active"><ButtonMainLeft icons={faCommentDots} name="Notifications" defaultClassName="icon_default" isActive={window.location.pathname === "/message"} /></NavLink>
        <NavLink to="/faq" className="navlink" activeClassName="active"><ButtonMainLeft icons={faCommentAlt} name="FAQ" defaultClassName="icon_default_black" isActive={window.location.pathname === "/faq"} /></NavLink>
        <NavLink to="/comptes" className="navlink" activeClassName="active"><ButtonMainLeft icons={faUserCircle} name="Compte" defaultClassName="icon_default" isActive={window.location.pathname === "/comptes"} /></NavLink>

      </div>
      <NavLink to="/" ><button className='deconnexion' onClick={deconnexion}>Déconnexion</button></NavLink>
    </div>
  )
}