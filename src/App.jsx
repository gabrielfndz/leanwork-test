import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Cadastro from './pages/Cadastro'
import MeusDados from './pages/MeusDados'

const App = () => {
  const [localStorageData, setLocalStorageData] = useState([]);
  let [id, setId] = useState(() => {
    const storedId = parseInt(localStorage.getItem('id')) || 0;
  return storedId;
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('meusDados')) || [];
    setLocalStorageData(data)
  }, []);

  const handleSubmit = (form) => {
    const newId = id + 1;
    const newData = [...localStorageData, {...form, id: newId}]
    setLocalStorageData(newData);
    localStorage.setItem('meusDados', JSON.stringify(newData))
    localStorage.setItem('id', newId.toString());
  }

  return (
    <Routes>
      <Route path="/Cadastro" element={ <Cadastro onSubmit={handleSubmit}/> } />
      <Route exact path="/" element={ <Navigate to="/Cadastro" /> } />
      <Route path="/MeusDados" element={ <MeusDados data={localStorageData}/> } />      
    </Routes>
  );
}

export default App;
