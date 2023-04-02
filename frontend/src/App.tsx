import React from 'react';
import {AppNavBar} from "./components/AppNavBar/AppNavBar.tsx";
import { Routes, Route } from "react-router-dom";
import EvolutionPrix from './components/pages/EvolutionPrix.tsx';
import MeilleurMoment from './components/pages/MeilleurMoment.tsx';

function App() {
  return (
    <div>
      <AppNavBar/>
      <Routes>
        <Route path="/" element={<EvolutionPrix/>}/>
        <Route path="/MeilleurMoment" element={<MeilleurMoment/>}/>
      </Routes>
    </div>
  );
}

export default App;
