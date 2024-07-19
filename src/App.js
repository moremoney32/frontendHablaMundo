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

function App() {
  return (
    <BrowserRouter>
      <div id="body">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/theme" element={<Theme />} />
            <Route path="/user" element={<Users />} />
            <Route path="/message" element={<Messages />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/comptes" element={<Comptes />} />
            <Route path="/sousThematiques" element={<SousThematiques/>}/>
            <Route path="/motsCroisés" element={<MotsCroisés/>}/>
            <Route path="/" element={<Deconnexion />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;