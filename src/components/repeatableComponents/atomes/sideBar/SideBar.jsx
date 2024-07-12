import { ButtonMainLeft } from "../button/ButtonMainLeft"
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { faCircleMinus, faHome, faMessage, faUser, faVectorSquare } from '@fortawesome/free-solid-svg-icons'
import "./sideBar.css"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
export const SideBar = () => {
  let color = "grey"
  return (
    <div className='main_left'>
      <div className='main_child_left'>
        <NavLink to="/home" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faHome} name="Accueil"  isActive={window.location.pathname === "/home"}
          defaultClassName="icon_default"/></NavLink>
        <NavLink to="/theme" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faCircleMinus} name="Thématiques" isActive={window.location.pathname === "/theme"} defaultClassName="icon_default"/></NavLink>
        <NavLink to="/user" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faUser} name="Utilisateurs" defaultClassName="icon_default_black" isActive={window.location.pathname === "/user"}/></NavLink>
        <NavLink to="/message" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faMessage} name="Messages" defaultClassName="icon_default" isActive={window.location.pathname === "/message"}/></NavLink>
        <NavLink to="/faq" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faVectorSquare} name="FAQ" defaultClassName="icon_default_black" isActive={window.location.pathname === "/faq"} /></NavLink>
        <NavLink to="/comptes" exact className="navlink" activeClassName="active"><ButtonMainLeft icons={faUserCircle} name="Comptes" defaultClassName="icon_default" isActive={window.location.pathname === "/comptes"}/></NavLink>

      </div>
      <NavLink to="/" ><button className='deconnexion'>Déconnexion</button></NavLink>
    </div>
  )
}