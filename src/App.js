import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Theme } from './pages/theme/Theme';
import { Users } from './pages/users/Users';
import { Messages } from './pages/messages/Messages';
import { Faq } from './pages/faq/Faq';
import {Deconnexion} from './pages/deconnexion/Deconnexion';
import { Comptes } from './pages/comptes/Comptes';
import { SousThematiques } from './pages/sousThematiques/SousThematiques';
import { MotsCroisés } from './pages/motsCroisés/MotsCroisés';
import { NotificationsProvider } from './components/componentNotRetulables/mainRight/NotificationsProvider';
import { Grammaire } from './pages/grammaires/Grammaire';
import { MainRightAllTraduction } from './components/componentNotRetulables/mainRight/mainRightAllTraduction/MainRightAllTraduction';
import { Traduction } from './pages/traduction/Traduction';
import { List } from './pages/listes/List';


function App() {
  return (
    <BrowserRouter>
       <NotificationsProvider> 
        <div id="body">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/theme" element={<Theme />} />
              <Route path="/liste" element={<List />} />
              <Route path="/user" element={<Users />} />
              <Route path="/message" element={<Messages />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/comptes" element={<Comptes />} />
              <Route path="/sousThematiques" element={<SousThematiques/>}/>
              <Route path="/motsCroisés" element={<MotsCroisés/>}/>
              <Route path="/grammaire" element={<Grammaire/>}/>
              <Route path="/AllTraduction" element={<Traduction/>}/>
              <Route path="/" element={<Deconnexion />}/>
            </Routes>
        </div>
       </NotificationsProvider> 
    </BrowserRouter>
  );
}
export default App;